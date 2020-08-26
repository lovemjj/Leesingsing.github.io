<template>
  <div class="zhen-duan-kai-fang">
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
      <div class="i" style="width: 100%;">
        <div class="name">本次费用：</div><div class="value"><span class="money">¥{{info.priceAfterBonus}}</span></div>
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
    <div class="info">
      <div class="i title" style="width: 100%;margin-bottom: 8px;">
        <div class="name">家长/陪同人员签名（上传理疗单）</div>
      </div>
      <van-image width="90" height="90" :src="item" v-for="(item, index) in info.signature" :key="index" @click="pre(info.signature, index)" />
    </div>
    <div class="info">
      <div class="i title" style="width: 100%;">
        <div class="name">客户满意度评分</div>
      </div>
      <van-row style="width: 100%;">
        <van-col span="10">服务态度：</van-col>
        <van-col span="14"><van-rate v-model="info.satisfaction[0]" color="#ff9900" void-color="#ff9900" readonly /></van-col>
      </van-row>
      <van-row style="width: 100%;">
        <van-col span="10">服务流程规范：</van-col>
        <van-col span="14"><van-rate v-model="info.satisfaction[1]" color="#ff9900" void-color="#ff9900" readonly /></van-col>
      </van-row>
      <van-row style="width: 100%;">
        <van-col span="10">服务时间标准：</van-col>
        <van-col span="14"><van-rate v-model="info.satisfaction[2]" color="#ff9900" void-color="#ff9900" readonly /></van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ImagePreview } from 'vant'
export default {
  name: 'yiqueren',
  data () {
    return {
      info: {
        customer: {},
        membershipCard: {
          level: {}
        },
        symptoms: [],
        id: '',
        appendixes: [],
        signature: [],
        satisfaction: []
      }
    }
  },
  activated () {
    if (this.$route.query.id) {
      this.getInfo(this.$route.query.id)
    }
  },
  methods: {
    pre (e, i) {
      ImagePreview({
        images: e,
        startPosition: i
      })
    },
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
          t.info.signature = [t.info.signature]
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
.info + .info {
  margin-top: calc(10 / 375 * 100vw);
  padding: calc(10 / 375 * 100vw);
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
.title {
  justify-content: space-between;
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
.header {
  font-size: calc(16 / 375 * 100vw);
  line-height: calc(32 / 375 * 100vw);
  color: #ff9900;
}
.line {
  line-height: calc(30 / 375 * 100vw);
}
.line + .line {
  border-top: 1px dashed #ff9900;
}
</style>
