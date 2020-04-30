<template>
  <div class="home">
    <div class="nav">
      <div class="info">
        <div class="name">{{name}}</div>
        <div class="role">职务：<span v-for="item in roles" :key="item.id">{{item.name}}</span></div>
      </div>
      <div class="branch">
        <div class="name">{{branch.name}}</div>
        <div class="change" @click="showPicker = true">
          <div class="text">切换机构</div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="item in authorities" :key="item.name" @click="navition(item.url)">
        <div class="img" v-if="item.name === '问诊接待'"><img src="../assets/app/1.svg" alt=""></div>
        <div class="img" v-if="item.name === '接单历史'"><img src="../assets/app/2.svg" alt=""></div>
        <div class="img" v-if="item.name === '诊断开方'"><img src="../assets/app/3.svg" alt=""></div>
        <div class="img" v-if="item.name === '推拿执行'"><img src="../assets/app/4.svg" alt=""></div>
        <div class="img" v-if="item.name === '物料管理'"><img src="../assets/app/5.svg" alt=""></div>
        <div class="img" v-if="item.name === '提成'"><img src="../assets/app/6.svg" alt=""></div>
        <div class="img" v-if="item.name === '档案'"><img src="../assets/app/7.svg" alt=""></div>
        <div class="img" v-if="item.name === '消息'"><img src="../assets/app/8.svg" alt=""></div>
        <div class="img" v-if="item.name === '我的报告'"><img src="../assets/app/9.svg" alt=""></div>
        <div class="img" v-if="item.name === '员工报告'"><img src="../assets/app/10.svg" alt=""></div>
        <div class="img" v-if="item.name === '门店运营'"><img src="../assets/app/11.svg" alt=""></div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="branches"
        value-key="name"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      name: '',
      branches: '',
      roles: [],
      branch: {},
      authorities: [],
      showPicker: false
    }
  },
  activated () {
    this.getSession()
    this.getMenu()
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
          t.branches = res.data.data.branches
          t.roles = res.data.data.roles
          const arr = t.branches.filter((ele) => {
            return ele.id === parseInt(t.$store.state.branch_id)
          })
          t.branch = arr[0]
          t.$store.state.id = res.data.data.id
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    getMenu () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/session/menu'
      }).then((res) => {
        if (res.data.code === 200) {
          t.authorities = []
          for (const i of res.data.data.items) {
            if (i === '问诊接待') {
              t.authorities.push({
                name: '问诊接待',
                url: 'wenzhenjiedai'
              })
            }
            if (i === '接单历史') {
              t.authorities.push({
                name: '接单历史',
                url: 'jiedanlishi'
              })
            }
            if (i === '诊断开方') {
              t.authorities.push({
                name: '诊断开方',
                url: 'zhenduankaifang'
              })
            }
            if (i === '推拿执行') {
              t.authorities.push({
                name: '推拿执行',
                url: 'tuinazhixing'
              })
            }
            if (i === '物料管理') {
              t.authorities.push({
                name: '物料管理',
                url: 'wuliaoguanli'
              })
            }
            if (i === '提成') {
              t.authorities.push({
                name: '提成',
                url: 'ticheng'
              })
            }
            if (i === '档案') {
              t.authorities.push({
                name: '档案',
                url: 'danganpaiban'
              })
            }
            if (i === '消息') {
              t.authorities.push({
                name: '消息',
                url: 'xiaoxi'
              })
            }
            if (i === '我的报告') {
              t.authorities.push({
                name: '我的报告',
                url: 'wodebaogao'
              })
            }
            if (i === '员工报告') {
              t.authorities.push({
                name: '员工报告',
                url: 'yuangongbaogao'
              })
            }
            if (i === '门店运营') {
              t.authorities.push({
                name: '门店运营',
                url: 'mendianyunying'
              })
            }
          }
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    onConfirm (e) {
      this.branch = e
      this.showPicker = false
    },
    navition (name) {
      this.$router.push({ name })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding: calc(10 / 375 * 100vw);
}
.nav {
  border: 1px solid #ff9900;
  text-align: left;
  border-radius: calc(4 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  padding: calc(10 / 375 * 100vw);
  font-weight: bold;
}
.role {
  padding-top: calc(5 / 375 * 100vw);
}
.branch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(12 / 375 * 100vw);
  font-weight: bold;
  padding-top: calc(5 / 375 * 100vw);
}
.branch .change {
  display: flex;
  align-items: center;
  font-size: calc(14 / 375 * 100vw);
  color: #ff9900;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.list .item {
  width: 25%;
  padding-top: calc(20 / 375 * 100vw);
}
.list .item .img {
  width: calc(60 / 375 * 100vw);
  height: calc(60 / 375 * 100vw);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #ff9900;
  padding: calc(10 / 375 * 100vw);
  box-sizing: border-box;
  margin: 0 auto;
}
.list .item .name {
  color: #ff9900;
  font-size: calc(14 / 375 * 100vw);;
  line-height: calc(32 / 375 * 100vw);;
}
</style>
