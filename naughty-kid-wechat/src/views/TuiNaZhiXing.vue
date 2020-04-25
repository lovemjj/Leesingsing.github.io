<template>
  <van-collapse class="tuinazhixing" v-model="activeNames" accordion>
    <van-collapse-item title="指派给我（未完成）" name="1">
      <van-cell v-for="item in massages0" :key="item.id" :title="item.id" @click="navition(item.status, item.id)">
        <template #title>
          <div class="info">
            <div class="top">{{item.customer.name}}（{{item.customer.age}}岁） <div class="status first" v-if="item.customer.firstVisit">初诊</div></div>
            <div :class="'status' + ' status' + item.status + (item.disabled ? ' disabled' : '')">{{item.disabled ? '流程终止' : item.status === 0 ? '咨询接待' : item.status === 1 ? '已开方未收费' : item.status === 2 ? '收费待执行' : item.status === 3 ? '执行中' : item.status === 4 ? '已执行' : item.status === 5 ? '家长已确认' : ''}}</div>
          </div>
          <div class="sub">{{item.consultedAt}}（{{item.customer.id}}）</div>
        </template>
      </van-cell>
    </van-collapse-item>
    <van-collapse-item title="未指派技师" name="2">
      <van-cell v-for="item in massages1" :key="item.id" :title="item.id" @click="navition(item.status, item.id)">
        <template #title>
          <div class="info">
            <div class="top">{{item.customer.name}}（{{item.customer.age}}岁） <div class="status first" v-if="item.customer.firstVisit">初诊</div></div>
            <div :class="'status' + ' status' + item.status + (item.disabled ? ' disabled' : '')">{{item.disabled ? '流程终止' : item.status === 0 ? '咨询接待' : item.status === 1 ? '已开方未收费' : item.status === 2 ? '收费待执行' : item.status === 3 ? '执行中' : item.status === 4 ? '已执行' : item.status === 5 ? '家长已确认' : ''}}</div>
          </div>
          <div class="sub">{{item.consultedAt}}（{{item.customer.id}}）</div>
        </template>
      </van-cell>
    </van-collapse-item>
    <van-collapse-item title="本日我已完成执行" name="3">
      <van-cell v-for="item in massages2" :key="item.id" :title="item.id" @click="navition(item.status, item.id)">
        <template #title>
          <div class="info">
            <div class="top">{{item.customer.name}}（{{item.customer.age}}岁） <div class="status first" v-if="item.customer.firstVisit">初诊</div></div>
            <div :class="'status' + ' status' + item.status + (item.disabled ? ' disabled' : '')">{{item.disabled ? '流程终止' : item.status === 0 ? '咨询接待' : item.status === 1 ? '已开方未收费' : item.status === 2 ? '收费待执行' : item.status === 3 ? '执行中' : item.status === 4 ? '已执行' : item.status === 5 ? '家长已确认' : ''}}</div>
          </div>
          <div class="sub">{{item.consultedAt}}（{{item.customer.id}}）</div>
        </template>
      </van-cell>
    </van-collapse-item>
  </van-collapse>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'tuinazhixing',
  data () {
    return {
      activeNames: [],
      massages0: [],
      massages1: [],
      massages2: []
    }
  },
  mounted () {
    this.getMassages()
  },
  activated () {

  },
  methods: {
    getMassages () {
      const t = this
      t.$store.state.show = true
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/massage-order'
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.massages0 = res.data.data.records.filter((ele) => {
            return (ele.status === 2 && ele.assigned.id === t.$store.state.id) || (ele.status === 3 && ele.assigned.id === t.$store.state.id) || (ele.status === 2 && ele.massagedBy.id === t.$store.state.id) || (ele.status === 3 && ele.massagedBy.id === t.$store.state.id)
          })
          t.massages1 = res.data.data.records.filter((ele) => {
            return ele.status === 2 && ele.assigned === ''
          })
          t.massages2 = res.data.data.records.filter((ele) => {
            return ele.status > 3 && ele.massagedBy.id === t.$store.state.id && ele.massagedCompletedAt.split(' ')[0] === moment().format('YYYY-MM-DD')
          })
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    navition (status, id) {
      if (status === 2) {
        this.$router.push({ name: 'kaishizhixing', query: { id } })
      }
      if (status === 3) {
        this.$router.push({ name: 'zhixingzhong', query: { id } })
      }
      if (status === 4) {
        this.$router.push({ name: 'querenwancheng', query: { id } })
      }
      if (status === 5) {
        this.$router.push({ name: 'yiqueren', query: { id } })
      }
    }
  }
}
</script>
<style scoped>
.tuinazhixing {
  text-align: left;
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
  color: #ffffff;
  border-radius: calc(6 / 375 * 100vw);
}
.info .status.first {
  background-color: rgba(255, 255, 51, 0.35);
  color: #ff9900;
}
.info .status.status3 {
  background-color: rgba(255, 153, 0, 0.35);
  color: #ff9900;
}
.info .status.status4 {
  background-color: #00cc99;
  color: #ffffff;
}
.info .status.status5 {
  background-color: #00cc99;
  color: #ffffff;
}
.info .status.disabled {
  background-color: #ff0000;
  color: #ffffff;
}
.sub {
  font-size: calc(14 / 375 * 100vw);
  color: #bcbcbc;
  text-align: left;
}
</style>
