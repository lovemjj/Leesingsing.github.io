<template>
  <div class="zhen-duan-kai-fang">
    <div class="status">
      <van-icon name="warning" />
      <div>
        本系统不做实际收费，仅做费用登记。确认收费前请确保顾客已经通过收费系统完成付费。
      </div>
    </div>
    <div class="info">
      <div class="sub">{{info.consultedAt}}（{{info.customer.id}}）</div>
      <div class="i">
        <div class="name">调理人姓名：</div><div class="value">{{info.customer.name}}（{{info.customer.gender === 1 ? '男' : '女'}}）</div>
      </div>
      <div class="i">
        <div class="name">调理人年龄：</div><div class="value">{{info.customer.age}}岁</div>
      </div>
      <div class="i" style="width: 100%;">
        <div class="name">症状：</div><div class="value"><span class="symptoms" v-for="(item, index) in info.symptoms" :key="index"><span class="dian">、</span>{{item.name}}</span></div>
      </div>
      <div class="i" v-if="info.membershipCard.number">
        <div class="name">会员卡：</div><div class="value">{{info.membershipCard.number}}</div>
      </div>
      <div class="i" v-if="info.membershipCard.level">
        <div class="name">会员卡级别：</div><div class="value">{{info.membershipCard.level.name}}</div>
      </div>
      <div class="i" v-if="info.membershipCard.balance">
        <div class="name">卡内充值余额：</div><div class="value">{{info.membershipCard.balance}}</div>
      </div>
      <div class="i" v-if="info.membershipCard.bonus">
        <div class="name">卡内赠送余额：</div><div class="value">{{info.membershipCard.bonus}}</div>
      </div>
      <div class="i" style="width: 100%;" v-if="info.appendixes.length > 0">
        <div class="name">相关照片照片：</div>
      </div>
      <div class="i" style="width: 100%;" v-if="info.appendixes.length > 0">
        <van-image width="90" height="90" :src="item" v-for="(item, index) in info.appendixes" :key="index" @click="pre(info.appendixes, index)" />
      </div>
      <div class="i" style="width: 100%;">
        <div class="name">调理方案：</div><div class="value"><span class="symptoms" v-for="(item, index) in info.schemes" :key="index"><span class="dian">、</span>{{item.name}}</span></div>
      </div>
      <div class="i" style="width: 100%;">
        <div class="name">调理项目：</div><div class="value"><span class="symptoms" v-for="(item, index) in info.items" :key="index"><span class="dian">、</span>{{item.name}}</span></div>
      </div>
    </div>

    <van-cell>
      <template #title>
        本次可用的赠送服务次数：{{info.availableBonusServicesCount}}次
      </template>
    </van-cell>

    <van-cell>
      <template #title>
        <div class="flex-center">本次是否使用赠送服务：<van-checkbox v-model="info.useBonusService" checked-color="#ff9900" shape="square" :disabled="info.availableBonusServicesCount === 0">使用</van-checkbox></div>
      </template>
    </van-cell>

    <van-cell>
      <template #title>
        剩余待收费费用合计：<span class="money">￥{{info.useBonusService ? info.priceAfterBonus : info.price}}</span>
      </template>
    </van-cell>

    <van-cell>
      <template #title>
        <van-row>
          <van-col span="12">
            已录入费用：<span class="no_need">￥{{info.no_need_price}}</span>
          </van-col>
          <van-col span="12">
            还需录入费用：<span class="no_need">￥{{info.useBonusService ? (info.priceAfterBonus - info.no_need_price) : (info.price - info.no_need_price)}}</span>
          </van-col>
        </van-row>
      </template>
    </van-cell>

    <van-swipe-cell v-for="(item, index) in info.pay" :key="index">
      <van-row>
        <van-col span="12">
          <van-cell is-link @click="pop(index)">
            <template #title>
              收费方式：{{item.type === 'wechat' ? '微信' : item.type === 'cash' ? '现金' : item.type === 'membershipCard' ? '会员卡' : item.type === 'ali' ? '支付宝' : '请选择'}}
            </template>
          </van-cell>
        </van-col>
        <van-col span="12">
          <van-field v-model="item.amount" label="收费：" placeholder="请输入" label-width="50" @input="input" />
        </van-col>
      </van-row>
      <template #right>
        <van-button square type="danger" text="删除" @click="delPrice(index)" />
      </template>
    </van-swipe-cell>
    <div class="buttons">
      <van-button color="#bcbcbc" plain hairline type="info" block @click="pushPrice">添加收费</van-button>
    </div>

    <van-popup
      v-model="popup"
      position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        value-key="name"
        @confirm="onConfirm($event, 'diagnosedBy')"
        @cancel="popup = false" />
    </van-popup>
    <div class="buttons" v-if="info.disabled">
      <van-button type="primary" block @click="tocontinue">继续执行</van-button>
    </div>
    <div class="buttons" v-else>
      <van-button type="default" block @click="patchOrder">确认收费</van-button>
      <van-button type="danger" block>暂不计费</van-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ImagePreview } from 'vant'
export default {
  name: 'shoufei',
  data () {
    return {
      info: {
        customer: {},
        membershipCard: {
          level: {}
        },
        symptoms: [],
        id: '',
        pay: [],
        price: 0,
        no_need_price: 0,
        appendixes: []
      },
      popup: false,
      index: 0,
      columns: [
        {
          type: 'wechat',
          name: '微信'
        },
        {
          type: 'cash',
          name: '现金'
        },
        {
          type: 'membershipCard',
          name: '会员卡'
        },
        {
          type: 'ali',
          name: '支付宝'
        }
      ]
    }
  },
  activated () {
    if (this.$route.query.id) {
      this.getInfo(this.$route.query.id)
    }
  },
  methods: {
    getInfo (id) {
      const t = this
      t.$store.state.show = true
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/massage-order/${id}`
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.info = res.data.data
          t.info.no_need_price = 0
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    pre (e, i) {
      ImagePreview({
        images: e,
        startPosition: i
      })
    },
    pop (index) {
      this.index = index
      this.popup = true
    },
    pushPrice () {
      this.info.pay.push({
        type: '',
        amount: ''
      })
    },
    delPrice (i) {
      this.info.pay = this.info.pay.filter((ele, index) => {
        return index !== i
      })
      this.input()
    },
    onConfirm (e) {
      this.info.pay[this.index].type = e.type
      this.popup = false
    },
    input () {
      this.info.no_need_price = 0
      for (const i of this.info.pay) {
        this.info.no_need_price = this.info.no_need_price + parseFloat(i.amount || 0)
      }
      const price = this.info.useBonusService ? this.info.priceAfterBonus : this.info.price
      if (this.info.no_need_price > price) {
        this.info.no_need_price = price
      }
    },
    back () {
      this.$router.replace({
        name: 'wenzhenjiedai',
        query: this.$route.query
      })
    },
    patchOrder () {
      const t = this
      const price = t.info.useBonusService ? t.info.priceAfterBonus : t.info.price
      if (t.info.no_need_price < price) {
        this.$notify({ message: '至还需录入费用：¥' + (t.info.price - t.info.no_need_price), type: 'warning' })
        return true
      }
      for (const i of t.info.pay) {
        if (i.type === '') {
          this.$notify({ message: '请输入支付方式', type: 'warning' })
          return true
        }
      }
      t.$store.state.show = true
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/massage-order/${t.info.id}`,
        data: {
          useBonusService: t.info.useBonusService,
          status: 2,
          pay: t.info.pay
        }
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'jiedanlishi' && ele !== 'zhenduankaifang' && ele !== 'tuinazhixing'
          })
          t.$router.replace({ name: 'kaishizhixing', query: t.$route.query })
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    tocontinue () {
      const t = this
      t.$store.state.show = true
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api//massage-order/${t.info.id}`,
        data: {
          disabled: false
        }
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'jiedanlishi' && ele !== 'zhenduankaifang' && ele !== 'tuinazhixing'
          })
          t.$router.back()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    termination () {
      const t = this
      t.$store.state.show = true
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api//massage-order/${t.info.id}`,
        data: {
          disabled: true
        }
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'jiedanlishi' && ele !== 'zhenduankaifang' && ele !== 'tuinazhixing'
          })
          t.$router.back()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    }
  }
}
</script>
<style scoped>
.zhen-duan-kai-fang {
  padding: calc(10 / 375 * 100vw) 0;
  text-align: left;
}
.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #ff9900;
  padding: 0 calc(10 / 375 * 100vw) calc(10 / 375 * 100vw) calc(10 / 375 * 100vw);
  border-radius: calc(6 / 375 * 100vw);
  margin: 0 calc(10 / 375 * 100vw);
}
.sub {
  width: 100%;
  font-size: calc(12 / 375 * 100vw);
  color: #bcbcbc;
  line-height: calc(30 / 375 * 100vw);
}
.i {
  display: flex;
  align-items: center;
  width: 50%;
  font-size: calc(14 / 375 * 100vw);
}
.i .name {
  color: #333333;
  font-weight: bold;
  line-height: calc(24 / 375 * 100vw);
}
.symptoms .dian {
  display: none;
}
.symptoms + .symptoms .dian {
  display: inline-block;
}
.selectes {
  border: 1px solid #f0f0f0;
  border-radius: calc(4 / 375 * 100vw);
  min-height: 68px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.selectes .item {
  font-size: calc(12 / 375 * 100vw);
  color: #ff9900;
  padding: calc(5 / 375 * 100vw);
  border: 1px solid #ff9900;
  border-radius: calc(4 / 375 * 100vw);
  display: flex;
  align-items: center;
  height: calc(15 / 375 * 100vw);
  margin: calc(5 / 375 * 100vw);
}
.selectes .item i {
  font-size: calc(14 / 375 * 100vw);
  padding-left: calc(5 / 375 * 100vw);
}
.selectes .icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.select {
  height: calc(375 / 375 * 100vw);
  overflow: auto;
  border-top: 1px solid #f0f0f0;
  padding: 0 calc(10 / 375 * 100vw);
}
.select .item {
  padding: calc(10 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  color: #333333;
  text-align: center;
  border: 1px solid #f0f0f0;
  margin: calc(10 / 375 * 100vw) 0;
  border-radius: calc(4 / 375 * 100vw);
}
.select .item.selected {
  border-color: #ff9900;
  color: #ff9900;
}
.flex-center {
  display: flex;
  align-items: center;
}
.money {
  font-size: calc(18 / 375 * 100vw);
  font-weight: bold;
  color: #ff9900;
}
.van-swipe-cell:not(:last-child)::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}

.status {
  display: flex;
  align-items: center;
  background-color: rgba(254, 154, 0, 0.25);
  border-radius: calc(8 / 375 * 100vw);
  margin: 0 calc(10 / 375 * 100vw) calc(10 / 375 * 100vw) calc(10 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  padding: calc(5 / 375 * 100vw) calc(10 / 375 * 100vw);
}
.status i {
  font-size: calc(20 / 375 * 100vw);
  color: #ff9900;
  padding-right: calc(10 / 375 * 100vw);
}
</style>
