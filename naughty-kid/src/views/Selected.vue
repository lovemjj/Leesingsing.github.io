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
            欢迎【{{$store.state.name}}】，请选择您要进入的机构/门店
          </div>
          <div class="line"></div>
        </div>
      </div>
      <el-form class="item" :rules="formRules" ref="form" :model="form" label-position="left" label-width="120px">
        <el-form-item label="机构/门店:" prop="id">
          <el-select v-model="form.id" placeholder="请选择">
            <el-option v-for="item in $store.state.branches" :key="item.id" :label="item.name" :value="item.id">
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
        id: ''
      },
      formRules: {
        id: [
          { required: true, message: '请选择机构/门店', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    navigationBack () {
      localStorage.removeItem('authorization')
      this.$router.replace({
        name: 'login'
      })
    },
    navigationTo () {
      if (this.$store.state.authorities.length > 0) {
        this.$router.push({
          name: this.$store.state.authorities[0]
        })
      } else {
        this.$router.push({
          name: 'index'
        })
      }
    },
    branch () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch'
      }).then((res) => {
        if (res.data.code === 200) {
          t.$store.state.branches = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
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
              localStorage.setItem('authorization', res.data.data.authorization)
              t.$store.state.branch_name = res.data.data.name
              t.$store.state.branch_id = res.data.data.id
              t.navigationTo()
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
}
.main .selected {
  box-shadow: 2px 2px 5px #ff9900;
  width: 617px;
  border: 1px solid #ff9900;
  border-radius: 4px;
  margin-left: 100px;
  padding: 15px 40px;
  box-sizing: border-box;
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
</style>
