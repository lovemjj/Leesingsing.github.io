<template>
  <div class="jie-dan-li-shi">
    <div class="nav">
      <van-dropdown-menu>
        <van-dropdown-item title="报告类型" v-model="type" :options="types" @change="menuChange" />
      </van-dropdown-menu>
      <div class="date-list">
        <div :class="select_id === 0 ? 'i selected' : 'i'" @click="selected(0)">本日</div>
        <div :class="select_id === 1 ? 'i selected' : 'i'" @click="selected(1)">本周</div>
        <div :class="select_id === 2 ? 'i selected' : 'i'" @click="selected(2)">本月</div>
        <div :class="select_id === 3 ? 'i selected' : 'i'" @click="selected(3)">本年</div>
        <div :class="select_id === 4 ? 'i selected' : 'i'" @click="selected(4)">自定义</div>
      </div>
      <div class="date-arr">
        <div class="right i" @click="select_id === 4 ? popup.after = true : ''">
          <van-icon name="arrow-left" />
          <div>{{after}}</div>
        </div>
        <div class="center"></div>
        <div class="left i" @click="select_id === 4 ? popup.before = true : ''">
          <div>{{before}}</div>
          <van-icon name="arrow" />
        </div>
      </div>
      <van-popup
        v-model="popup.before"
        position="bottom">
        <van-datetime-picker
          :value="before ? new Date(before) : new Date()"
          type="date"
          :min-date="before_min_date"
          @confirm="onConfirm($event, 'before')"
          @cancel="popup.before = false" />
      </van-popup>
      <van-popup
        v-model="popup.after"
        position="bottom">
        <van-datetime-picker
          :value="after ? new Date(after) : new Date()"
          type="date"
          :min-date="after_min_date"
          @confirm="onConfirm($event, 'after')"
          @cancel="popup.after = false" />
      </van-popup>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="到底了"
      offset="30"
      @load="onLoad"
    >
      <van-cell v-for="item in massages" :key="item.id" :title="item.id" @click="navigation({ name: 'bianxiebaogao', query: { type: item.type, id: item.id, readonly: '1' } })">
        <template #title>
          <div class="info">
            <div class="top">员工{{item.type === 0 ? '日' : item.type === 1 ? '周' : item.type === 2 ? '月' : '年'}}报 {{item.employee.name}}</div>
            <div :class="'status' + ' status' + item.type">{{item.type === 0 ? '日' : item.type === 1 ? '周' : item.type === 2 ? '月' : '年'}}报</div>
          </div>
          <div class="sub">{{item.createdAt}}（{{item.id}}）</div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'baogaolishi',
  data () {
    return {
      select_id: 0,
      before: '',
      after: '',
      before_min_date: new Date('1900-01-01'),
      after_min_date: new Date('1900-01-01'),
      popup: {
        before: false,
        after: false,
        type: false
      },
      massages: [],
      massagesPage: 0,
      massagesTotal: 0,
      loading: false,
      finished: false,
      type: '',
      types: [
        { text: '全部', value: '' },
        { text: '日报', value: 0 },
        { text: '周报', value: 1 },
        { text: '月报', value: 2 },
        { text: '年报', value: 3 }
      ]
    }
  },
  mounted () {
    this.selected(0)
  },
  methods: {
    selected (e) {
      if (e === 0) {
        this.after = moment().startOf('day').format('YYYY-MM-DD')
        this.before = moment().endOf('day').format('YYYY-MM-DD')
      }
      if (e === 1) {
        this.after = moment().startOf('week').format('YYYY-MM-DD')
        this.before = moment().endOf('week').format('YYYY-MM-DD')
      }
      if (e === 2) {
        this.after = moment().startOf('month').format('YYYY-MM-DD')
        this.before = moment().endOf('month').format('YYYY-MM-DD')
      }

      if (e === 3) {
        this.after = moment().startOf('year').format('YYYY-MM-DD')
        this.before = moment().endOf('year').format('YYYY-MM-DD')
      }
      if (e === 4) {
        this.before = moment().format('YYYY-MM-DD')
        this.after = moment().format('YYYY-MM-DD')
      }
      this.select_id = e
      this.massagesPage = 0
      this.massages = []
      this.getMassages()
    },
    onConfirm (e, pro) {
      this[pro] = e
      if (pro === 'before' || pro === 'after') {
        this[pro] = moment(e).format('YYYY-MM-DD')
        if (pro === 'after' && moment(this.before) < moment(this.after)) {
          this.before = this.after
        }
        if (pro === 'before' && moment(this.before) < moment(this.after)) {
          this.after = this.before
        }
        this.massagesPage = 0
        this.massages = []
        this.getMassages()
      }
      this.popup[pro] = false
    },
    menuChange () {
      this.massages = []
      this.getMassages()
    },
    getMassages () {
      const t = this
      t.loading = true
      t.finished = false
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/session/summary',
        params: {
          page: t.massagesPage,
          size: 10,
          before: t.before,
          after: t.after,
          draft: false,
          type: t.type
        }
      }).then((res) => {
        t.loading = false
        if (res.data.code === 200) {
          t.massages = t.massages.concat(res.data.data.records)
          t.massagesTotal = res.data.data.total
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    onLoad () {
      if (this.massagesTotal > (this.massagesPage + 1) * 10) {
        this.massagesPage++
        this.getMassages()
      } else {
        this.finished = true
      }
    },
    navigation (e) {
      this.$router.push(e)
    }
  }
}
</script>

<style scoped>
.jie-dan-li-shi {
  padding: 0 calc(10 / 375 * 100vw) calc(10 / 375 * 100vw) calc(10 / 375 * 100vw);
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 0 calc(10 / 375 * 100vw);
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow:0px 2px 10px 0px rgba(72,73,77,0.2);
  text-align: left;
}
.van-list {
  margin-top: calc((90 / 375 * 100vw) + 50px);
  border: 1px solid #ff9900;
}
.van-cell:not(:last-child)::after {
  border-color: #ff9900;
}
.date-list {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: calc(40 / 375 * 100vw);
}
.date-list .i {
  width: 19%;
  text-align: center;
  border: 1px solid #f0f0f0;
  color: #999999;
  font-size: calc(14 / 375 * 100vw);
  line-height: calc(28 / 375 * 100vw);
  border-radius: calc(2 / 375 * 100vw);
}
.date-list .i.selected {
  color: #ff9900;
  border-color: #ff9900;
}
.date-arr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(40 / 375 * 100vw);
}
.date-arr .i {
  display: flex;
  align-items: center;
  color: #ff9900;
  font-size: calc(14 / 375 * 100vw);
}
.date-arr .center {
  width: calc(30 / 375 * 100vw);
  height: 1px;
  background-color: #ff9900;
}
.date-arr .i .van-icon {
  font-size: calc(20 / 375 * 100vw);
  font-weight: blod;
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(14 / 375 * 100vw);
  color: #333333;
}
.info .top {
  display: flex;
  align-items: center;
}
.info .status {
  padding: 0 calc(10 / 375 * 100vw);
  line-height: calc(24 / 375 * 100vw);
  background-color: #c9c9c9;
  color: #333333;
  border-radius: calc(6 / 375 * 100vw);
}
.info .status.status0 {
  background-color: rgb(250, 220, 184);
}
.info .status.status1 {
  background-color: rgb(184, 209, 176);
}
.info .status.status2 {
  background-color: rgb(164, 178, 251);
}
.info .status.status3 {
  background-color: rgb(255, 254, 194);
}
.sub {
  font-size: calc(14 / 375 * 100vw);
  color: #bcbcbc;
  text-align: left;
}
</style>
