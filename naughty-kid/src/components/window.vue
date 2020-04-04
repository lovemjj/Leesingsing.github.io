<template>
  <div class="pop">
    <div class="window">
      <div class="title">
        <div class="label">
          <slot name="title-label">
            {{title}}
          </slot>
        </div>
        <div class="close">
          <slot name="title-close">
            <img class="icon" src="../assets/app/title-close.svg" alt="">
          </slot>
        </div>
      </div>
      <div class="window-main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped>
  .pop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .window {
    background-color: #ffffff;
    border-radius: 5px;
    min-width: 400px;
    min-height: 200px;
  }
  .window .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #999999;
  }
 .window .title .label {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
 }
 .window .title .close .icon {
   width: 18px;
 }
 .window-main {
   padding: 10px;
 }
</style>
