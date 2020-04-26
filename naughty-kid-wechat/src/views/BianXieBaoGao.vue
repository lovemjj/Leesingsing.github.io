<template>
  <div class="index">
    <div class="list">
      <div class="name">
        员工{{parseInt($route.query.type) === 0 ? '日' : parseInt($route.query.type) === 1 ? '周' : parseInt($route.query.type) === 2 ? '月' : '年'}}报（{{name}}）
      </div>
      <div class="title">
        服务顾客人次数
      </div>
      <van-field v-model="massagedCount" placeholder="0" readonly />
      <div class="title">
        顾客总消费金额
      </div>
      <van-field v-model="totalAmount" placeholder="0" readonly />
      <div class="title">
        我的提成总额
      </div>
      <van-field v-model="royalty" placeholder="0" readonly />
      <div class="title">
        我的工作感悟
      </div>
      <van-field type="textarea" v-model="thought" placeholder="请填写工作感悟" :readonly="$route.query.readonly === '1'" />
      <div class="title">
        我的工作计划
      </div>
      <van-field type="textarea" v-model="plan" placeholder="请填写工作计划" :readonly="$route.query.readonly === '1'" />
      <div class="title img">
        添加照片
      </div>
      <van-uploader v-model="appendixes" max-count="3" multiple :readonly="$route.query.readonly === '1'" />
    </div>
    <div class="buttons" v-if="$route.query.readonly !== '1'">
      <van-button type="info" block @click="postSummary(true)">保存我的报告</van-button>
      <van-button type="default" block @click="postSummary(false)">提交我的报告</van-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'bianxiebaogao',
  data () {
    return {
      name: '',
      massagedCount: 0,
      totalAmount: 0,
      royalty: 0,
      thought: '',
      plan: '',
      appendixes: []
    }
  },
  mounted () {
    this.getSession()
  },
  activated () {
    this.getSummaryInfo()
    if (this.$route.query.id) {
      this.getSummary()
    }
  },
  methods: {
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
          t.name = res.data.data.name
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    getSummaryInfo () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/session/summary-info',
        params: {
          type: 0
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.massagedCount = res.data.massagedCount
          t.totalAmount = res.data.totalAmount
          t.royalty = res.data.royalty
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    getSummary () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/summary/${t.$route.query.id}`
      }).then((res) => {
        if (res.data.code === 200) {
          t.thought = res.data.data.thought
          t.plan = res.data.data.plan
          t.appendixes = []
          for (const i of res.data.data.appendixes) {
            t.appendixes.push({
              url: 'http://49.233.137.52:8080/' + i,
              isImage: true
            })
          }
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    postSummary (draft) {
      const t = this
      if (!t.thought) {
        this.$notify({ message: '请填写工作感悟', type: 'warning' })
        return true
      }
      if (!t.plan) {
        this.$notify({ message: '请填写工作计划', type: 'warning' })
        return true
      }
      const appendixes = []
      for (const i of t.appendixes) {
        appendixes.push(i.content || i.url.split('http://49.233.137.52:8080/')[1])
      }
      let method = 'post'
      if (t.$route.query.readonly === '0') {
        method = 'put'
      }
      let url = '/api/summary'
      if (t.$route.query.id) {
        url = `/api/summary/${t.$route.query.id}`
      }
      t.$store.state.show = true
      axios({
        method,
        headers: {
          authorization: t.$store.state.authorization
        },
        url,
        data: {
          type: t.$route.query.type,
          thought: t.thought,
          plan: t.plan,
          appendixes,
          draft
        }
      }).then((res) => {
        t.$store.state.show = false
        t.$store.state.include = t.$store.state.include.filter((ele) => {
          return ele !== 'baogaolishi' && ele !== 'caogaoxiang' && ele !== 'yuangongbaogao'
        })
        if (res.data.code === 200) {
          t.thought = ''
          t.plan = ''
          t.appendixes = []
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
.index {
  text-align: left;
}
.name {
  font-size: calc(20 / 375 * 100vw);
  text-align: center;
  font-weight: bold;
}
.list {
  padding: calc(10 / 375 * 100vw) calc(16 / 375 * 100vw);
}
.title {
  border-left: calc(3 / 375 * 100vw) solid #ff9900;
  padding-left: calc(10 / 375 * 100vw);
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin: 8px 0;
}
</style>
