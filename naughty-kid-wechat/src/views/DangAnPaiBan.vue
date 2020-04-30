<template>
  <div class="danganpaiban">
    <div class="item">
      <div class="i">{{info.name}}（{{info.number}}）</div>
      <div class="i">职务：<span v-for="(item, index) in info.roles" :key="index">{{item.name}}</span></div>
      <div class="i" style="width: 100%;">手机号：{{info.contact}}</div>
      <div class="i" style="width: 100%;">授权服务机构/门店：{{info.branches.length}}家</div>
      <div class="i name" style="width: 100%;" v-for="(item, index) in info.branches" :key="index">{{item.name}}</div>
    </div>
    <div class="item">
      <div class="title">服务记录</div>
      <div class="row" style="width: 100%;" v-for="(item, index) in info.branches" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.number}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'danganpaiban',
  data () {
    return {
      info: {
        branches: [],
        roles: []
      }
    }
  },
  mounted () {
    this.getSession()
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
          t.info = res.data.data
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    }
  }
}
</script>
<style scoped>
  .danganpaiban {
    padding: calc(20 / 750 * 100vw);
  }
  .item {
    border: 1px solid #ff9900;
    border-radius: calc(10 / 750 * 100vw);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    text-align: left;
    padding: calc(20 / 750 * 100vw);
    font-size: calc(26 / 750 * 100vw);
  }
  .item + .item {
    margin-top: calc(20 / 750 * 100vw);
  }
  .item .i {
    width: 50%;
  }
  .item .i.name {
    font-size: calc(26 / 750 * 100vw);
    font-weight: bold;
    text-indent: calc(64 / 750 * 100vw);
    padding-top: calc(20 / 750 * 100vw);
  }
  .item .title {
    border-left: 3px solid #ff9900;
    font-size: calc(26 / 750 * 100vw);
    font-weight: bold;
    margin-bottom: calc(10 / 750 * 100vw);
    padding-left: calc(10 / 750 * 100vw);
    width: 100%;
  }
  .item .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: calc(24 / 750 * 100vw);
    font-weight: bold;
    line-height: calc(48 / 750 * 100vw);
    width: 100%;
  }
  .item .row  + .row {
    border-top: 1px dotted #ff9900;
  }
</style>
