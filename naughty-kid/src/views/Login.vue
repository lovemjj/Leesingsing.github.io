<template>
  <div class="main">
    <div class="img">
      <img src="../assets/app/xiong.png" alt="bear">
    </div>
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
          let salt = Math.random().toString(36).substr(2).slice(0, 4)
          let secret = md5(salt + t.password)
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
              t.$store.state.navList = res.data.data.authorities
              t.$router.push({
                name: 'selected'
              })
            } else {
              t.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          t.$message({
            showClose: true,
            message: '密码不能为空',
            type: 'error'
          })
        }
      } else {
        t.$message({
          showClose: true,
          message: '工号/手机号不能为空',
          type: 'error'
        })
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
}
.main .img {
  width: 338px;
}
.main .login {
  box-shadow: 2px 2px 5px #ff9900;
  width: 315px;
  border: 1px solid #ff9900;
  border-radius: 4px;
  margin-left: 100px;
  padding: 20px;
  box-sizing: border-box;
}
.main .login .logo-icon {
  width: 58px;
  margin: 0 auto;
  padding-bottom: 10px;
}
.main .login .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  color: #ff9900;
}
.main .login .title .line {
  width: 36px;
  height: 1px;
  background-color: #ff9900;
}
.main .login .item {
  display: flex;
  align-items: center;
  width: 220px;
  height: 30px;
  margin: 30px auto;
  border: 1px solid #ff9900;
}
.main .login .item .icon {
  width: 16px;
  margin: 0 8px;
}
.main .login .btn {
  background-color: #ff9900;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 50px;
  color: #ffffff;
}
</style>
