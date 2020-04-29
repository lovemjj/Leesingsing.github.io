<template>
  <div class="main">
    <div class="img">
      <img src="../assets/app/xiong.png" alt="bear">
    </div>
    <div class="selected">
      <div class="logo">
        <div class="icon">
          <img src="../assets/app/xiongzhang-ff9900.svg" alt="logo">
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="name">
            欢迎【{{$store.state.name}}】<br> 请选择您要进入的机构/门店
          </div>
          <div class="line"></div>
        </div>
      </div>
      <el-form class="item" :rules="formRules" ref="form" :model="form" label-position="left" label-width="120px">
        <el-form-item label="机构/门店:" prop="id">
          <el-select v-model="form" value-key="id" placeholder="请选择">
            <el-option v-for="item in $store.state.branches" :key="item.id" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btns">
        <div class="btn out" @click="navigationBack">
          退出
        </div>
        <div class="btn" @click="sessionBranch">进入</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'selected',
  data () {
    return {
      form: {
        name: '',
        id: ''
      },
      formRules: {
        id: [
          { required: true, message: '请选择机构/门店', trigger: 'change' }
        ]
      },
      showPicker: false,
      name: ''
    }
  },
  mounted () {
    this.getSession()
  },
  methods: {
    navigationBack () {
      localStorage.removeItem('authorization')
      localStorage.removeItem('branch_id')
      this.$router.replace({
        name: 'login'
      })
    },
    navigationTo () {
      if (this.$store.state.navAuthorities.length > 0) {
        this.$router.replace({
          name: this.$store.state.navAuthorities[0]
        })
      } else {
        this.$router.replace({
          name: 'index'
        })
      }
    },
    getSession (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/session'
      }).then((res) => {
        if (res.data.code === 200) {
          t.$store.state.branches = res.data.data.branches
          t.$store.state.name = res.data.data.name
          t.$store.state.id = res.data.data.id
          t.$store.state.authorities = []
          t.$store.state.navAuthorities = []
          t.$store.state.authorities = res.data.data.authorities
          if (res.data.data.authorities.length > 0) {
            for (const ele of res.data.data.authorities) {
              if (ele === '推拿接待' || ele === '推拿管理') {
                if (t.$store.state.navAuthorities.indexOf('推拿') < 0) {
                  t.$store.state.navAuthorities.push('推拿')
                }
              } else if (ele === '员工管理' || ele === '岗位管理' || ele === '组织机构') {
                if (t.$store.state.navAuthorities.indexOf('员工机构管理') < 0) {
                  t.$store.state.navAuthorities.push('员工机构管理')
                }
              } else {
                t.$store.state.navAuthorities.push(ele)
              }
            }
          }
          t.$store.state.navAuthorities.push('消息管理')
          if (e === 'navigationTo') {
            t.navigationTo()
          }
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    sessionBranch () {
      const t = this
      t.$refs['form'].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: '/api/session/branch',
            data: t.form
          }).then((res) => {
            if (res.data.code === 200) {
              t.$store.state.authorization = res.data.data.authorization
              localStorage.setItem('authorization', res.data.data.authorization)
              localStorage.setItem('branch_id', res.data.data.id)
              t.$store.state.branch_name = t.form.name
              t.getSession('navigationTo')
            } else {
              t.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
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
  margin-right: 100px;
}
.mobile .main .img {
  display: none;
}
.main .selected {
  box-shadow: 2px 2px 5px #ff9900;
  width: 617px;
  border: 1px solid #ff9900;
  border-radius: 4px;
  padding: 15px 40px;
  box-sizing: border-box;
}
.mobile .main .selected {
  width: 80%;
}
.main .selected .icon {
  width: 58px;
  margin: 0 auto;
  padding-bottom: 10px;
}
.main .selected .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  color: #ff9900;
  text-align: center;
}
.main .selected .title .line {
  width: 36px;
  height: 1px;
  background-color: #ff9900;
}
.main .selected .item {
  margin-top: 50px;
  margin-bottom: 100px;
}
.main .selected .btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.main .selected .btn {
  background-color: #ff9900;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  color: #ffffff;
}
.main .selected .btn + .btn {
  margin-left: 24px;
}
.main .selected .btn.out {
  background-color: #ff0000;
}
.el-select {
  width: 100%;
}
.select {
}
</style>
