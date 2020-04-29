<template>
  <div class="jie-dan-li-shi">
    <div class="nav">
      <van-dropdown-menu>
        <van-dropdown-item title="当前状态" v-model="status" :options="type === 'from' ? aStatus : bStatus" @change="menuChange" />
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
      <div class="list">
        <div class="item" v-for="(item, index) in massages" :key="index">
          <div class="name">{{type === 'to' ? item.to.name : item.from.name}}</div>
          <div class="info">
            <van-image width="80" height="80" :src="item.material.photo" />
            <div class="names">
              <div class="name">{{item.material.name}}（单位：{{item.material.unitName}}）</div>
              <div class="id">{{item.material.number}}</div>
            </div>
          </div>
          <div class="num">
            <div class="i" style="width: 100%">店长姓名：{{type === 'to' ? item.to.name : item.from.name}}</div>
            <div class="i" style="width: 100%">店长电话：{{type === 'to' ? item.to.photo : item.from.photo}}</div>
            <div class="i">申请调配库存：{{item.amount0}}</div>
            <div class="i">实际调配数量：{{item.amount2}}</div>
            <div class="i" style="width: 100%">备注信息：{{item.reason}}</div>
            <div class="i" style="width: 100%">申请人：{{item.createdBy.name}}</div>
            <div class="i" style="width: 100%">申请时间：{{item.createdAt}}</div>
          </div>
          <div class="button" v-if="(type === 'to' &&item.status === 2) || (type === 'from' && item.status === 1) || item.status === 0">
            <van-button color="#ff9900" plain size="small" v-if="type === 'to' && item.status === 2" @click="onPop('returnPop', item)">确认退库</van-button>
            <van-button color="#ff9900" plain size="small" v-if="type === 'to' && item.status === 0" @click="onPop('affirmPop', item)">确认出库</van-button>
            <van-button color="#ff0000" size="small" v-if="type === 'to' && item.status === 0" @click="cancelPop('to', item)">拒绝</van-button>
            <van-button color="#ff0000" size="small" v-if="type === 'from' && item.status === 0" @click="cancelPop('from', item)">取消调配</van-button>
            <van-button color="#ff9900" plain size="small" v-if="type === 'from' && item.status === 1" @click="onPop('affirmPop', item)">确认入库</van-button>
          </div>
        </div>
      </div>
    </van-list>
    <van-dialog v-model="affirmPop" title="确认实际出库数量" show-cancel-button :beforeClose="beforeClose">
      <van-field
        label="申请数量:"
        label-width="120"
        v-model="info.amount0"
        readonly
        :border="false" />
      <van-field
        required
        label="实际出库数量:"
        label-width="120"
        placeholder="请输入实际出库数量"
        v-model="info.amount" />
    </van-dialog>
    <van-dialog v-model="returnPop" title="确认退库数量" show-cancel-button :beforeClose="returnBeforeClose">
      <van-field
        label="对方未入库数量:"
        label-width="120"
        :value="info.amount1 - info.amount2"
        readonly
        :border="false" />
      <van-field
        required
        label="实际退库数量:"
        label-width="120"
        placeholder="请输入实际退库数量"
        v-model="info.amount"
        :border="false" />
      <van-cell title="退库完成将释放冻结的库存" />
    </van-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { Dialog } from 'vant'
export default {
  name: 'baogaolishi',
  data () {
    return {
      type: 'to',
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
      status: '',
      aStatus: [
        {
          vlaue: -1,
          text: '已取消'
        },
        {
          value: 0,
          text: '等待对方出库'
        },
        {
          value: 1,
          text: '还未确认入库'
        },
        {
          value: 2,
          text: '已确认出库'
        }
      ],
      bStatus: [
        {
          value: -2,
          text: '拒绝'
        },
        {
          value: 0,
          text: '还未出库'
        },
        {
          value: 1,
          text: '已确认出库'
        },
        {
          value: 2,
          text: '还没确认退库'
        },
        {
          value: 3,
          text: '已经确认退库或者不需要退库'
        }
      ],
      info: {},
      affirmPop: false,
      returnPop: false
    }
  },
  mounted () {
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
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
        url: '/api/repository-application',
        params: {
          from: t.type === 'to' ? t.$store.state.branch_id : null,
          to: t.type === 'from' ? t.$store.state.branch_id : null,
          page: t.massagesPage,
          size: 10,
          before: t.before,
          after: t.after,
          status: t.status
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
    onPop (pro, e) {
      this[pro] = true
      this.info = e
    },
    onAffirm (pro) {
      this.$refs[pro].submit()
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        if (this.info.amount) {
          if (this.type === 'from') {
            this.affirmIn()
          } else {
            this.affirmOut()
          }
          done()
        } else {
          this.$notify({ message: '请输入数量', type: 'warning' })
          done(false)
        }
      } else {
        done()
      }
    },
    returnBeforeClose (action, done) {
      if (action === 'confirm') {
        if (this.info.amount) {
          this.affirmReturn()
          done()
        } else {
          this.$notify({ message: '请输入数量', type: 'warning' })
          done(false)
        }
      } else {
        done()
      }
    },
    cancelPop (type, e) {
      this.info = e
      const t = this
      Dialog.alert({
        message: type === 'to' ? '确认拒绝调配?' : '确认取消调配?'
      }).then(() => {
        if (type === 'to') {
          t.cancelOut()
        } else {
          t.cancelIn()
        }
      })
    },
    affirmOut () {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/repository-application/${t.info.id}`,
        data: {
          status: 1,
          amount: t.info.amount
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'zongkucun' && ele !== 'bendiankucun'
          })
          t.massagesPage = 0
          t.massages = []
          t.getMassages()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    cancelOut () {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/repository-application/${t.info.id}`,
        data: {
          status: -2
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'zongkucun' && ele !== 'bendiankucun'
          })
          t.massagesPage = 0
          t.massages = []
          t.getMassages()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    affirmReturn () {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/repository-application/${t.info.id}`,
        data: {
          status: 3,
          amount: t.info.amount
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'zongkucun' && ele !== 'bendiankucun'
          })
          t.massagesPage = 0
          t.massages = []
          t.getMassages()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    affirmIn () {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/repository-application/${t.info.id}`,
        data: {
          status: 2,
          amount: t.info.amount
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'zongkucun' && ele !== 'bendiankucun'
          })
          t.massagesPage = 0
          t.massages = []
          t.getMassages()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    cancelIn () {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/repository-application/${t.info.id}`,
        data: {
          status: -1
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'zongkucun' && ele !== 'bendiankucun'
          })
          t.massagesPage = 0
          t.massages = []
          t.getMassages()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
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
.list {
  text-align: left;
  font-size: calc(14 / 375 * 100vw);
}
.list .item {
  border: 1px solid #ff9900;
  border-radius: calc(4 / 375 * 100vw);
  padding: calc(10 / 375 * 100vw);
}
.list .item + .item {
  margin-top: calc(10 / 375 * 100vw);
}
.list .item .name {
  font-weight: bold;
  padding-bottom: calc(10 / 375 * 100vw);
}
.list .item .info {
  display: flex;
  align-items: center;
}
.list .item .info .names {
  padding-left: calc(10 / 375 * 100vw);
}
.list .item .num {
  display: flex;
  flex-wrap: wrap;
  padding-top: calc(10 / 375 * 100vw);
}
.list .item .num .i {
  width: 50%;
}
.button {
  border-top: 1px solid #ff9900;
  padding-top: calc(10 / 375 * 100vw);
  margin-top: calc(10 / 375 * 100vw);
  text-align: right;
}
.van-button--small + .van-button--small {
  margin-left: calc(10 / 375 * 100vw);
}
.van-dialog {
  text-align: left;
}
</style>
