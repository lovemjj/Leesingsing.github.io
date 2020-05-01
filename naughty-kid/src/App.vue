<template>
  <div id="app">
    <div class="navigation">
      <div class="logo" @click="goto('index')">
        <div class="icon"><img src="./assets/app/xiongzhang.svg" alt="logo"></div>
        <div class="name">熊孩子推拿</div>
      </div>
      <div class="list" v-if="$store.state.urlName !== 'login' && $store.state.urlName !== 'selected'">
        <div class="item" :class="{selected: $store.state.urlName === item}" v-for="(item, index) in $store.state.navAuthorities" :key="index" @click="goto(item)">
          {{item}}
        </div>
      </div>
      <div class="info" v-if="$store.state.urlName !== 'login' && $store.state.urlName !== 'selected'">
        <div class="icon" @click="getMessages">
          <img src="./assets/app/xiaoxi.svg" alt="">
          <!-- <div class="num">
            4
          </div> -->
        </div>
        <div class="information">
          <div class="head-portrait">
            <img src="./assets/app/touxiang.svg" alt="">
          </div>
          <el-dropdown @command="caozuo">
            <div class="name">{{$store.state.name}}</div>
            <div class="down">
              <img src="./assets/app/xia.svg" alt="">
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="shop-name">
          {{$store.state.branch_name}}
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <el-dialog title="消息通知" width="600px" :visible.sync="xiaoxi">
      <div class="xiao-xi-list">
        <div class="xiao-xi-item" v-for="(item, index) in messages" :key="index">
          <div class="xiao-xi-date">{{item.createdAt}}</div>
          <div class="xiao-xi-main">
            <div class="xiao-xi-main-list">
              <div class="xiao-xi-main-item">
                <div class="xiao-xi-name">消息推送机构/门店：</div>
                <div class="xiao-xi-value">熊孩子小儿推拿（锦绣东苑店）</div>
              </div>
              <div class="xiao-xi-main-item">
                <div class="xiao-xi-name">推送人：</div>
                <div class="xiao-xi-value">{{item.from.name}}</div>
              </div>
              <div class="xiao-xi-main-item">
                <div class="xiao-xi-name">消息内容：</div>
                <div class="xiao-xi-value">{{item.content}}</div>
              </div>
            </div>
            <div class="xiao-xi-footer" @click="goto('消息管理')">
              <div>查看详情</div>
              <div>>></div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="xiaoxi = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码"  width="500px" :visible.sync="changePassword">
      <el-form :model="changePasswordFrom" label-width="120px">
        <el-form-item label="请输入原始密码:">
          <el-input v-model="changePasswordFrom.oldPassWord"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码:">
          <el-input v-model="changePasswordFrom.newPassWord"></el-input>
        </el-form-item>
        <el-form-item label="再次确认新密码:">
          <el-input v-model="changePasswordFrom.affirmPassWord"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="changePassword = false">取 消</el-button>
        <el-button size="small" type="primary" @click="changePassword = false">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'app',
  components: {
  },
  computed: {
  },
  data () {
    return {
      name: '',
      branch_id: '',
      branch_name: '',
      xiaoxi: false,
      changePassword: false,
      changePasswordFrom: {
        oldPassWord: '',
        newPassWord: '',
        affirmPassWord: ''
      },
      messages: []
    }
  },
  methods: {
    goto (name) {
      this.$router.push({
        name
      })
      this.xiaoxi = false
    },
    caozuo (e) {
      if (e === 'logout') {
        localStorage.removeItem('authorization')
        localStorage.removeItem('branch_id')
        this.$router.replace({
          name: 'login'
        })
      }
      if (e === 'changePassword') {
        this.changePassword = true
      }
    },
    version () {
      axios({
        method: 'get',
        url: '/api/version'
      }).then((res) => {

      })
    },
    session (authorization) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization
        },
        url: '/api/session'
      }).then((res) => {
        if (res.data.code === 200) {
          t.$store.state.name = res.data.data.name
          t.$store.state.id = res.data.data.id
          t.$store.state.branches = res.data.data.branches
          let arr = res.data.data.branches.filter((ele) => {
            return ele.id === t.branch_id
          })
          if (arr.length > 0) {
            t.$store.state.branch_name = arr[0].name
          }
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
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getMessages () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/session/message'
      }).then((res) => {
        if (res.data.code === 200) {
          t.messages = res.data.data.records
          t.xiaoxi = true
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    }
  },
  mounted () {
    moment.updateLocale('en', {
      week: {
        dow: 1
      }
    })
    if (localStorage.getItem('authorization')) {
      this.session(localStorage.getItem('authorization'))
    }
    if (localStorage.getItem('branch_id')) {
      this.branch_id = parseInt(localStorage.getItem('branch_id'))
    }
    // this.version()
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}
body {
  margin: 0;
  box-sizing: border-box;
  min-width: 1600px;
}
input {
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
  display: block;
  width: 100%;
}
img {
  display: block;
  width: 100%;
}
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ff9900;
  color: #ffffff;
  padding: 0 10px;
  height: 45px;
}
.navigation .logo {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 100px;
  white-space: nowrap;
}
.navigation .logo .icon {
  min-width: 25px;
  width: 25px;
  margin-right: 10px;
}
.navigation .list {
  display: flex;
  align-items: center;
  width: 100%;
}
.navigation .list .item {
  width: 100px;
  font-size: 13px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.navigation .list .item.selected {
  height: 39px;
  border-top: 3px solid #ff9900;
  border-bottom: 3px solid #ffffff;
  font-size: 16px;
  font-weight: bold;
}
.navigation .info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  white-space: nowrap;
}
.navigation .info .icon {
  width: 20px;
  position: relative;
  height: 20px;
  margin-right: 30px;
}
.navigation .info .information {
  display: flex;
  align-items: center;
}
.navigation .info .information .el-dropdown {
  display: flex;
  align-items: center;
  color: #ffffff;
}
.navigation .info .head-portrait {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 20px;
}
.navigation .info .information .down {
  width: 10px;
  margin-left: 5px;
  margin-right: 10px;
}
.navigation .info .icon .num {
  position: absolute;
  width: 15px;
  height: 15px;
  top: -5px;
  right: -5px;
  background-color: #ff0000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}
.navigation .info .shop-name {
  font-weight: bold;
}
.main {
  min-height: calc(100vh - 45px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.mobile .main {
  min-height: 100vh;
}
.el-dropdown-menu li {
  white-space: nowrap;
}
.xiao-xi-list {
  height: 300px;
  overflow: auto;
}
.xiao-xi-item {
  padding-bottom: 10px;
}
.xiao-xi-date {
  text-align: center;
  padding-bottom: 10px;
}
.xiao-xi-main {
  border-radius: 10px;
  border: 1px solid rgba(204, 204, 204, 1);
}
.xiao-xi-main-list {
  padding: 10px;
  border-bottom: 1px solid rgba(204, 204, 204, 1);
}
.xiao-xi-main-item {
  display: flex;
  align-items: center;
}
.xiao-xi-name {
  font-weight: bold;
}
.xiao-xi-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.dislog-jiedai .el-dialog {
  background-color: rgba(0, 0, 0, 0);
}
.dislog-jiedai .el-dialog__headerbtn {
  font-size: 20px;
  right: 10px;
}
.dislog-jiedai .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}
.dislog-jiedai .el-dialog__header {
  padding: 0;
}
.dislog-jiedai .el-dialog__body {
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.dislog-jiedai-main {
  height: 100%;
  display: flex;
}
.dislog-jiedai-left {
  min-width: 200px;
  margin-right: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.dislog-jiedai-right {
  width: calc(100% - 240px);
}
.dislog-jiedai-title {
  width: 100%;
  background-color: #ffffff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 0 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.dislog-jiedai-title-info {
  display: flex;
  align-items: center;
}
.dislog-jiedai-name {
  color: #bcbcbc;
  margin-left: 10px;
}
.dislog-jiedai-step {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-bottom: 10px;
  width: 100%;
}
.dislog-jiedai-step .el-steps {
  width: 80%;
}
.dislog-jiedai-info {
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  height: calc(100% - 140px);
  overflow: auto;
}
.dislog-jiedai-info-title {
  font-size: 14px;
  border-left: 3px solid #ff9900;
  height: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-weight: bold;
}
.dislog-jiedai-info-biaoti {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #ff9900;
  margin-bottom: 18px;
}
.dislog-jiedai-info-biaoti .line {
  width: 90px;
  height: 1px;
  background-color: #ff9900;
  margin: 0 10px;
}
.dislog-jiedai-info-note {
  width: calc(248 / 1378 * 100%);
  background-color: #ffffff;
  min-height: calc(100vh - 125px);
}
.dislog-jiedai-info-note-title {
  font-weight: bold;
  color: #595959;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dislog-jiedai-info-pay {
  font-size: 14px;
}
.dislog-jiedai-info-attention {
  display: flex;
  width: 100%;
  background-color: rgba(254, 154, 0, 0.25);
  padding: 10px 20px;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 18px;
}
.dislog-jiedai-info-attention .icon {
  width: 20px;
  padding-right: 10px;
}
.dislog-jiedai-info-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  padding-bottom: 18px;
  box-sizing: border-box;
  color: #333333;
}
.dislog-jiedai-info-item .i + .i {
  margin-left: 50px;
}
.dislog-jiedai-info-money {
  font-size: 18px;
  color: #ff9900;
  font-weight: bolder;
}
.dislog-jiedai-info .chongzhi  {
  text-decoration: underline;
  color: #0000ff;
  font-size: 14px;
}
.dislog-jiedai-info .else {
  display: inline-block;
  padding-right: 10px;
  font-size: 14px;
}
.dislog-jiedai-info .el-form {
  padding: 0 15px;
}
.dislog-jiedai-info .short {
  white-space: nowrap;
}
.dislog-jiedai-info .short .el-input {
  width: 50px;
}
.dislog-jiedai-info .whole {
  width: 100%;
  display: flex;
}
.dislog-jiedai-info .el-select {
  width: 100%;
}
.dislog-jiedai-info .el-input {
  width: 100%;
}
.el-pagination {
  margin-top: 10px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader + .avatar-uploader {
  margin-left: 10px;
}
.avatar-uploader input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
}
.avatar-uploader:hover {
  border-color: #ff9900;
}
.avatar-uploader .del {
  display: none;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 2;
  color: #ff0000;
  font-size: 20px;
}
.avatar-uploader:hover .del {
  display: inline-block;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
</style>
