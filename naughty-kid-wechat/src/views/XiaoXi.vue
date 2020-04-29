<template>
  <div class="xiaoxi">
    <div class="list" v-for="(item, index) in messages" :key="index">
      <div class="title">{{item.createdAt}}</div>
      <div class="item">
        <div class="value"><span>消息推送机构/门店：</span>熊孩子小儿推拿（锦绣东苑店）</div>
        <div class="value"><span>推送人：</span>{{item.from.name}}</div>
        <div class="value"><span>消息内容：</span>{{item.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'xiaoxi',
  data () {
    return {
      messages: []
    }
  },
  activated () {
    this.getMessages()
  },
  methods: {
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
.xiaoxi {
  padding: 0 calc(10 / 375 * 100vw);
}
.xiaoxi .list .title {
  font-size: calc(14 / 375 * 100vw);
  line-height: calc(35 / 375 * 100vw);
  color: #999999;
}
.xiaoxi .list .item {
  border: 1px solid #ff9900;
  text-align: left;
  padding: calc(10 / 375 * 100vw);
  box-sizing: border-box;
  font-size: calc(14 / 375 * 100vw);
  line-height: calc(28 / 375 * 100vw);
  border-radius: calc(5 / 375 * 100vw);
}
.xiaoxi .list .item span {
  font-weight: bold;
}
</style>
