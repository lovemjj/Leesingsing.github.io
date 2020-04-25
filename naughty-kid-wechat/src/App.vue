<template>
  <div id="app">
    <keep-alive :include="$store.state.include">
      <router-view/>
    </keep-alive>
    <van-overlay :show="$store.state.show">
      <div class="wrapper">
        <van-loading type="spinner" size="24px" color="#ffffff" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}
body {
  margin: 0;
  box-sizing: border-box;
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.buttons {
  padding: 10px 16px;
}
.buttons .van-button + .van-button {
  margin-top: 10px;
}
.buttons .van-button--default {
  color: #ffffff;
  background-color: #ff9900;
  border-color: #ff9900;
}
.tuinazhixing .van-collapse-item__content {
  padding: 0;
}
.tuinazhixing .van-cell:not(:last-child)::after {
  border-color: #ff9900;
}
</style>
