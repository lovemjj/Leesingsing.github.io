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
            欢迎【{{doctor}}】，请选择您要进入的机构/门店
          </div>
          <div class="line"></div>
        </div>
      </div>
      <div class="item">
        <div class="text">
          机构/门店：
        </div>
        <div class="value">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="btns">
        <div class="btn out" @click="navigationBack">
          退出
        </div>
        <div class="btn" @click="navigationTo">进入</div>
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
      doctor: '张医生',
      value: '',
      shops: [
        {
          value: 0,
          name: '熊孩子小儿推拿（锦绣东苑店）'
        },
        {
          value: 1,
          name: '熊孩子小儿推拿（新北万达店）'
        }
      ]
    }
  },
  mounted () {
    this.branch()
  },
  methods: {
    navigationBack () {
      localStorage.removeItem('authorization')
      this.$router.replace({
        name: 'login'
      })
    },
    navigationTo () {
      this.$router.push({
        name: 'index'
      })
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 100px;
}
.main .selected .item .text {
  font-size: 14px;
  white-space: nowrap;
}
.main .selected .item .value {
  width: 100%;
}
.main .selected .item .value select {
  width: 100%;
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
