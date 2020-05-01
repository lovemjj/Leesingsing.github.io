<template>
  <div class="jie-dan-li-shi">
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
            <div class="i"><span>调理人姓名：</span>张鹏鹏（男）</div>
            <div class="i"><span>调理人年龄：</span>3岁</div>
            <div class="i"><span>已调理次数：</span>5</div>
            <div class="i"><span>共计消费金额：</span>¥5000</div>
            <div class="i" style="width: 100%"><span>最近使用会员卡卡号：</span>43636464654</div>
            <div class="i" style="width: 100%"><span>卡余额：</span>550</div>
            <div class="i"><span>本人服务次数：</span>3</div>
            <div class="i money"><span>本人共计提成：￥300</span></div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'fuwuguke',
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
  padding: calc(10 / 375 * 100vw);
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
.van-cell:not(:last-child)::after {
  border-color: #ff9900;
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
