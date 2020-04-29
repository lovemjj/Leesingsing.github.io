<template>
  <div class="tuina xiaoxi">
    <div class="nav-left">
      <div class="title">
        消息管理
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="select(0)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">消息推送</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="select(1)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">历史消息</div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 0">
      <div class="tabel">
        <el-form ref="form" :model="form" class="demo-form-inline" label-width="200px" size="small">
          <el-form-item label="推送的消息（200字内）:" prop="content" :rules="{ required: true, message: '请输入消息', trigger: 'blur' }">
            <el-input type="textarea" v-model="form.content" maxlength="200"></el-input>
          </el-form-item>
          <el-form-item label="接收人:" prop="receivedBy" :rules="{ type: 'array', required: true, message: '至少选择一个接收人', trigger: 'change' }">
            <el-select v-model="form.receivedBy" multiple value-key="id">
                <el-option :label="item.name" :value="{id: item.id}" v-for="(item, index) in receivedBys" :key="index"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="info" @click="resetForm">清空</el-button>
            <el-button size="small" type="primary" @click="postMessage">发送</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 1">
      <div class="tabel">
        <div class="title">
          <div class="value">
            <div class="name">推送日期：</div>
            <el-date-picker v-model="time" size="small" type="daterange" value-format="yyyy-MM-dd">
            </el-date-picker>
            <div class="name" style="margin-left: 10px">推送人：</div>
            <el-input v-model="from" size="small" suffix-icon="el-icon-search" clearable></el-input>
            <div class="name" style="margin-left: 10px">包含接收人：</div>
            <el-input v-model="receivedBy" size="small" suffix-icon="el-icon-search" clearable></el-input>
            <div class="name" style="margin-left: 10px">包含消息内容：</div>
            <el-input v-model="content" size="small" suffix-icon="el-icon-search" clearable></el-input>
          </div>
          <el-button size="small" type="primary" @click="getMessages">查询</el-button>
        </div>
        <div class="items">
          <el-table
            :data="messages"
            border
            style="width: 100%">
            <el-table-column
              prop="createdAt"
              label="推送时间">
            </el-table-column>
            <el-table-column
              prop="from.name"
              label="推送人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="接收人"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-for="item in scope.row.receivedBy" :key="item.id">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="消息内容"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="messagesTotal"
            @current-change="messagesCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      selected: 0,
      form: {
        content: '',
        receivedBy: []
      },
      receivedBys: [],
      time: [],
      from: '',
      receivedBy: '',
      content: '',
      messages: [],
      messagesPage: 0,
      messagesTotal: 0
    }
  },
  mounted () {
    this.getReceivedBys()
  },
  methods: {
    select (i) {
      this.selected = i
      if (i === 1) {
        this.getMessages()
      }
    },
    getReceivedBys () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/employee'
      }).then((res) => {
        if (res.data.code === 200) {
          t.receivedBys = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    postMessage () {
      const t = this
      t.$refs['form'].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: '/api/session/message',
            data: t.form
          }).then((res) => {
            if (res.data.code === 200) {
              t.$message({
                showClose: true,
                message: '推送成功',
                type: 'success'
              })
              t.resetForm()
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
    },
    resetForm () {
      this.$refs['form'].resetFields()
    },
    getMessages () {
      const t = this
      let before = ''
      let after = ''
      if (t.time && t.time.length === 2) {
        after = t.time[0]
        before = t.time[1]
      }
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/session/message',
        params: {
          page: t.messagesPage,
          size: 10,
          before,
          after,
          from: t.from,
          receivedBy: t.receivedBy,
          content: t.content
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.messages = res.data.data.records
          t.messagesTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    messagesCurrentChange (e) {
      this.messagesPage = e
      this.getMessages()
    }
  }
}
</script>
<style scoped>
.tuina {
  display: flex;
  width: 100%;
  height: calc(100vh - 45px);
  background-color: rgba(234, 234, 234, 0.8);
}
.tuina .nav-left {
  width: calc(200/1598*100%);
  background-color: #ffffff;
  height: calc(100vh - 45px);
}
.tuina .nav-left .title {
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
  font-weight: bold;
  color: #ff9900;
  border-bottom: 1px solid rgba(188, 188, 188, 1);
  height: 50px;
}
.tuina .nav-left .item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
  border-right: 3px solid #ffffff;
  height: 50px;
}
.tuina .nav-left .item.selected {
  border-color: #ff9900;
  color: #ff9900;
}
.tuina .nav-left .item .icon {
  width: 20px;
  margin-right: 10px;
}
.tuina .tuina-main {
  width: calc(1398/1598*100%);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.tuina .tuina-main .tabel {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 65px);
  overflow: auto;
  width: 100%;
  text-align: left;
}
.tuina .tuina-main .title {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  white-space: nowrap;
}
.tuina .tuina-main .title .value {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
.tuina .title .value .name {
  white-space: nowrap;
}
.tuina .tuina-main .items {
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
}
</style>
<style>
.xiaoxi .el-textarea, .xiaoxi .el-select {
  width: 600px;
}
.xiaoxi .title .el-input {
  width: 200px;
}
.xiaoxi .title .el-date-editor {
  width: 300px;
}
</style>
