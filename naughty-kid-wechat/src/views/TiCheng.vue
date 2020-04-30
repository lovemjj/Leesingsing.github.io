<template>
  <div class="ticheng">
    <div class="item">
      <div class="i">{{info.name}}（{{info.number}}）</div>
      <div class="i">服务机构/门店：{{info.branches.length}}家</div>
      <div class="i">职务：<span v-for="(item, index) in info.roles" :key="index">{{item.name}}</span></div>
    </div>
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
    <div class="item">
      <div class="text">
        <div>累计提成(元)</div>
        <div>687.34</div>
      </div>
      <div class="text">
        <div>累计服务次数</div>
        <div>20</div>
      </div>
      <div class="text">
        <div>累计服务顾客数</div>
        <div>5</div>
      </div>
    </div>
    <div class="item">
      <div class="title">查看明细</div>
      <div class="row" @click="navigation({ name: 'fuwujilu'})">
        <div>服务记录</div>
        <van-icon name="arrow" />
      </div>
      <div class="row" @click="navigation({ name: 'fuwuguke'})">
        <div>服务顾客</div>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'ticheng',
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
      info: {
        branches: [],
        roles: []
      }
    }
  },
  mounted () {
    this.selected(0)
    this.getSession()
  },
  methods: {
    navigation (e) {
      this.$router.push(e)
    },
    getSession () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/session'
      }).then((res) => {
        if (res.data.code === 200) {
          t.info = res.data.data
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
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
      }
      this.popup[pro] = false
    }
  }
}
</script>
<style scoped>
 .ticheng {
  padding: calc(20 / 750 * 100vw);
}
.item {
    border: 1px solid #ff9900;
    border-radius: calc(10 / 750 * 100vw);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    text-align: left;
    padding: calc(20 / 750 * 100vw);
    font-size: calc(26 / 750 * 100vw);
  }
  .item + .item {
    margin-top: calc(20 / 750 * 100vw);
  }
  .item .i {
    width: 50%;
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
.item .title {
  border-left: 3px solid #ff9900;
  font-size: calc(26 / 750 * 100vw);
  font-weight: bold;
  margin-bottom: calc(10 / 750 * 100vw);
  padding-left: calc(10 / 750 * 100vw);
  width: 100%;
}
.item .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(28 / 750 * 100vw);
  line-height: calc(56 / 750 * 100vw);
  width: 100%;
}
.item .row  + .row {
  border-top: 1px dotted #ff9900;
}
.item .text {
  width: 33%;
  text-align: center;
  color: #ff9900;
}
.item .text + .text {
  border-left: 1px solid #ff9900;
}
</style>
