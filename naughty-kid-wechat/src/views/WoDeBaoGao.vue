<template>
  <div class="index">
    <div class="nav">
      <div class="i" @click="navigation({ name: 'baogaolishi' })"><van-icon name="clock-o" />历史报告</div>
      <div class="i" @click="navigation({ name: 'caogaoxiang' })"><van-icon name="edit" />我的草稿箱</div>
    </div>
    <div class="list">
      <div class="title">
        报告模板
      </div>
      <div class="i" @click="navigation({ name: 'bianxiebaogao', query: { type: 0} })">
        <div class="icon">
          <van-icon name="records" />
        </div>
        <div class="name">
          员工日报
        </div>
      </div>
      <div class="i" @click="navigation({ name: 'bianxiebaogao', query: { type: 1} })">
        <div class="icon">
          <van-icon name="records" />
        </div>
        <div class="name">
          员工周报
        </div>
      </div>
      <div class="i" @click="navigation({ name: 'bianxiebaogao', query: { type: 2} })">
        <div class="icon">
          <van-icon name="records" />
        </div>
        <div class="name">
          员工月报
        </div>
      </div>
      <div class="i" @click="navigation({ name: 'bianxiebaogao', query: { type: 3} })">
        <div class="icon">
          <van-icon name="records" />
        </div>
        <div class="name">
          员工年报
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wodebaogao',
  data () {
    return {

    }
  },
  methods: {
    navigation (e) {
      this.$router.push(e)
    }
  }
}
</script>
<style scoped>
.index {
  font-size: calc(14 / 375 * 100vw);
}
.nav {
  display: flex;
  align-items: center;
}
.nav .i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: calc(50 / 375 * 100vw);
  border-bottom: 1px solid #bcbcbc;
  font-weight: bold;
}
.nav .i + .i {
  border-left: 1px solid #bcbcbc;
}
.nav i {
  color: #ff9900;
  margin-right: calc(5 / 375 * 100vw);
  font-size: calc(16 / 375 * 100vw);
}
.list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: calc(10 / 375 * 100vw);
}
.list .title {
  border-left: calc(3 / 375 * 100vw) solid #ff9900;
  padding-left: calc(10 / 375 * 100vw);
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin-bottom: calc(10 / 375 * 100vw);
}
.list .i {
  width: 33.33%;
}
.list .i .icon {
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ff9900;
  border-radius: calc(5 / 375 * 100vw);
  font-size: calc(60 / 375 * 100vw);
  height: calc(100 / 375 * 100vw);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: #ff9900;
}
.list .i .name {
  line-height: calc(40 / 375 * 100vw);
  font-weight: bold;
}
</style>
