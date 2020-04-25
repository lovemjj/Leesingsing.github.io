<template>
  <div class="hui-yuan-ka">
    <div class="title">会员卡信息</div>
    <div class="list">
      <div class="item" style="width: 100%;">会员卡卡号：{{membershipCard.number}}</div>
      <div class="item">持卡人姓名：{{membershipCard.name}}</div>
      <div class="item">会员卡级别：{{membershipCard.level === 1 ? '铜卡会员' : membershipCard.level === 2 ? '铜卡会员' : membershipCard.level === 3 ? '铜卡会员' : ''}}</div>
      <div class="item">卡内充值余额：{{membershipCard.balance}}</div>
      <div class="item">卡内赠送余额：{{membershipCard.bonus}}</div>
    </div>
    <div class="title">余额变动明细</div>
    <div class="list">
      <table border="1">
        <tr>
          <th width="40%">更新时间</th>
          <th>变动金额</th>
          <th>类别</th>
        </tr>
        <tr v-for="(item, index) in balances" :key="index">
          <td width="40%">{{item.createdAt}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.type}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'huiyuanka',
  data () {
    return {
      membershipCard: {
        number: '',
        name: '',
        level: '',
        balance: '',
        bonus: ''
      },
      balances: []
    }
  },
  activated () {
    if (this.$route.query.id) {
      this.getInfo(this.$route.query.id)
      this.getBalances(this.$route.query.id)
    }
  },
  methods: {
    getInfo (id) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/membership-card/${id}`
      }).then((res) => {
        if (res.data.code === 200) {
          t.membershipCard = res.data.data
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getBalances (id) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/membership-card/${id}/balance-detail`
      }).then((res) => {
        if (res.data.code === 200) {
          t.balances = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.hui-yuan-ka {
  text-align: left;
  padding: calc(10 / 375 * 100vw);
}
.title {
  padding: 0 calc(7 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  border-left: calc(3 / 375 * 100vw) solid #ff9900;
  font-weight: bold;
}
.list {
  padding: calc(10 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  display: flex;
  flex-wrap: wrap;
}
.list .item {
  width: 50%;
  line-height: calc(30 / 375 * 100vw);
}
table {
  width: 100%;
  border: none;
  border-collapse: collapse;
  border-color: #999999;
  line-height: calc(30 / 375 * 100vw);
}
th {
  background-color: #f0f0f0;
}
th, td {
  padding: 0 calc(10 / 375 * 100vw);
}
</style>
