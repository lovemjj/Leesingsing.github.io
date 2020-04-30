<template>
  <div class="jie-dan-li-shi">
    <div class="nav">
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
        <div class="item">
          <div class="num">
            <div class="i" style="width: 100%"><span>调理时间：</span>2020-01-01 12:33 ~ 2020-01-01 13:33</div>
            <div class="i"><span>调理人姓名：</span>张鹏鹏（男）</div>
            <div class="i"><span>调理人年龄：</span>3岁</div>
            <div class="i" style="width: 100%"><span>调理方案：</span>小儿推拿</div>
            <div class="i"><span>共计消费金额：</span>￥500</div>
            <div class="i money"><span>共计提成：￥300</span></div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'fuwujilu',
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
      loading: false,
      finished: false
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
    },
    onLoad () {

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
  margin-top: calc(90 / 375 * 100vw);
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
  font-size: calc(13 / 375 * 100vw);
}
.list .item .num .i {
  width: 50%;
}
.list .item .num .i span {
  font-weight: bold;
}
.list .item .num .i.money {
  color: #ff9900;
}
</style>
