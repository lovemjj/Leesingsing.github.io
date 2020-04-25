<template>
  <div class="main">
    <div class="login">
      <div class="logo">
        <div class="logo-icon">
          <img src="../assets/app/xiongzhang-ff9900.svg" alt="bear">
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="name">
            熊孩子推拿管理软件
          </div>
          <div class="line"></div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="../assets/app/zhanghao.svg" alt="acount">
        </div>
        <input v-model="employeeNumber" type="text" placeholder="工号/手机号">
      </div>
      <div class="item">
        <div class="icon">
          <img src="../assets/app/mima.svg" alt="password">
        </div>
        <input v-model="password" type="password" placeholder="密码" @keyup.enter="login">
      </div>
      <div class="btn" @click="login">
        登录
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import md5 from 'md5'
export default {
  name: 'login',
  data () {
    return {
      employeeNumber: '',
      password: ''
    }
  },
  mounted () {
  },
  methods: {
    login () {
      const t = this
      if (t.employeeNumber !== '') {
        if (t.password !== '') {
          const salt = Math.random().toString(36).substr(2).slice(0, 4)
          const secret = md5(salt + t.password)
          axios({
            method: 'post',
            data: {
              employeeNumber: t.employeeNumber,
              secret,
              salt
            },
            url: '/api/session'
          }).then((res) => {
            if (res.data.code === 200) {
              localStorage.setItem('authorization', res.data.data.authorization)
              localStorage.setItem('id', res.data.data.id)
              t.$router.replace({
                name: 'selected'
              })
            } else {
              t.$notify({ message: res.data.message, type: 'warning' })
            }
          })
        } else {
          t.$notify({ message: '密码不能为空', type: 'warning' })
        }
      } else {
        t.$notify({ message: '工号/手机号不能为空', type: 'warning' })
      }
    }
  }
}
</script>
<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
.main .login {
  box-shadow: 2px 2px 5px #ff9900;
  width: 80%;
  border: 1px solid #ff9900;
  border-radius: calc(4 / 375 * 100vw);
  padding: calc(20 / 375 * 100vw);
  box-sizing: border-box;
}
.mobile .main .login {
  width: 80%;
}
.main .login .logo-icon {
  width: calc(58 / 375 * 100vw);
  margin: 0 auto;
  padding-bottom: calc(10 / 375 * 100vw);
}
.main .login .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(18 / 375 * 100vw);
  font-weight: bold;
  color: #ff9900;
  text-align: center;
}
.main .login .title .line {
  width: calc(36 / 375 * 100vw);
  height: 1px;
  background-color: #ff9900;
}
.main .login .item {
  display: flex;
  align-items: center;
  width: calc(220 / 375 * 100vw);
  height: calc(30 / 375 * 100vw);
  margin: calc(30 / 375 * 100vw) auto;
  border: 1px solid #ff9900;
  font-size: calc(14 / 375 * 100vw);
}
.main .login .item .icon {
  width: calc(16 / 375 * 100vw);
  margin: 0 calc(8 / 375 * 100vw);
}
.main .login .btn {
  background-color: #ff9900;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(220 / 375 * 100vw);
  height: calc(40 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  font-weight: bold;
  border-radius: calc(4 / 375 * 100vw);
  margin: 0 auto;
  margin-top: calc(50 / 375 * 100vw);
  color: #ffffff;
}
</style>
