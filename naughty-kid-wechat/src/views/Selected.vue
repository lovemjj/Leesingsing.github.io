<template>
  <div class="main">
    <div class="selected">
      <div class="logo">
        <div class="icon">
          <img src="../assets/app/xiongzhang-ff9900.svg" alt="logo">
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="name">
            欢迎【{{name}}】<br> 请选择您要进入的机构/门店
          </div>
          <div class="line"></div>
        </div>
      </div>
      <van-form ref="form" @submit="onSubmit">
        <van-field required label="机构/门店：" is-link :border="false" class="item" v-model="branch.name" placeholder="请选择" readonly :rules="[{ required: true, message: '请选择机构/门店', trigger: 'onChange' }]" @click="showPicker = true" />
      </van-form>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="branches"
          value-key="name"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
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
      branch: {
        id: '',
        name: ''
      },
      id: '',
      name: '',
      branches: [],
      showPicker: false
    }
  },
  mounted () {
    this.getSession()
  },
  methods: {
    navigationBack () {
      localStorage.removeItem('authorization')
      this.$router.replace({
        name: 'login'
      })
    },
    navigationTo () {
      this.$router.replace({
        name: 'home'
      })
    },
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
          t.branches = res.data.data.branches
          t.name = res.data.data.name
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    onConfirm (e) {
      this.branch = e
      this.showPicker = false
    },
    sessionBranch () {
      this.$refs.form.submit()
    },
    onSubmit () {
      const t = this
      axios({
        method: 'post',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/session/branch',
        data: {
          id: t.branch.id
        }
      }).then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem('authorization', res.data.data.authorization)
          localStorage.setItem('branch_id', res.data.data.id)
          t.navigationTo()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
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
  height: 100vh;
}
.main .selected {
  box-shadow: 2px 2px 5px #ff9900;
  width: 90%;
  border: 1px solid #ff9900;
  border-radius: calc(4 / 375 * 100vw);
  padding: calc(15 / 375 * 100vw);
  box-sizing: border-box;
}
.mobile .main .selected {
  width: 80%;
}
.main .selected .icon {
  width: calc(58 / 375 * 100vw);
  margin: 0 auto;
  padding-bottom: calc(10 / 375 * 100vw);
}
.main .selected .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(18 / 375 * 100vw);
  font-weight: bold;
  color: #ff9900;
  text-align: center;
}
.main .selected .title .line {
  width: calc(36 / 375 * 100vw);
  height: 1px;
  background-color: #ff9900;
}
.main .selected .item {
  margin-top: calc(50 / 375 * 100vw);
  margin-bottom: calc(80 / 375 * 100vw);
}
.main .selected .btns {
  display: flex;
  align-items: center;
  justify-content: center;
}
.main .selected .btn {
  background-color: #ff9900;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(104 / 375 * 100vw);
  height: calc(40 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  font-weight: bold;
  border-radius: calc(4 / 375 * 100vw);
  color: #ffffff;
}
.main .selected .btn + .btn {
  margin-left: calc(24 / 375 * 100vw);
}
.main .selected .btn.out {
  background-color: #ff0000;
}
.picker {
  width: 100%;
  border: 1px solid #ff9900;
  border-radius: calc(4 / 375 * 100vw);
  padding: 0 calc(5 / 375 * 100vw);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
