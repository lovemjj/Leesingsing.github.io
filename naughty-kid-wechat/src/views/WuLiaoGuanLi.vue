<template>
  <div class="wuliaoguanli">
    <van-cell title="本店库存" is-link @click="navition({name: 'bendiankucun'})" />
    <van-cell title="总库存查询与调配" is-link @click="navition({name: 'zongkucun'})" />
    <van-cell title="调配申请记录" is-link @click="navition({name: 'diaopeijilu', query: {type: 'from'}})" />
    <van-cell title="调配分发记录" is-link @click="navition({name: 'diaopeijilu', query: {type: 'to'}})" />
  </div>
</template>
<script>
export default {
  name: 'wuliaoguanli',
  methods: {
    navition (e) {
      this.$router.push(e)
    }
  }
}
</script>
<style scoped>
.wuliaoguanli {
  text-align: left;
}
</style>
