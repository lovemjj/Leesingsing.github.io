<template>
  <div class="zongkucun">
    <van-search class="pop" label="物料名称" show-action v-model="material" placeholder="请输入物料名称">
      <template #action>
        <div @click="getRepositorys">搜索</div>
      </template>
    </van-search>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="到底了"
      offset="30"
      @load="onLoad"
    >
      <div class="list">
        <div class="item" v-for="(item, index) in repositorys" :key="index">
          <div class="name">{{item.branch.name}}</div>
          <div class="info">
            <van-image width="80" height="80" :src="item.material.photo" />
            <div class="names">
              <div class="name">{{item.material.name}}（单位：{{item.material.unitName}}）</div>
              <div class="id">{{item.material.number}}</div>
            </div>
          </div>
          <div class="num">
            <div class="i">现有库存：<span style="color: #ff9900">{{item.total}}</span></div>
            <div class="i">待入库存：<span style="color: green;">{{item.frozen}}</span></div>
            <div class="i">冻结库存：<span style="color: #ff0000;">{{item.pending}}</span></div>
            <div class="i">可用库存：<span style="color: green;">{{item.available}}</span></div>
          </div>
          <div class="button">
            <van-button color="#ff9900" plain size="small" @click="navition({name: 'diaopeishenqing',query:{id:item.material.id}})">库存调配申请</van-button>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'zongkucun',
  data () {
    return {
      material: '',
      repositorys: [],
      repositorysPage: 0,
      repositorysTotal: 0,
      loading: false,
      finished: false
    }
  },
  mounted () {
    this.getRepositorys()
  },
  methods: {
    navition (e) {
      this.$router.push(e)
    },
    getRepositorys () {
      const t = this
      t.loading = true
      t.finished = false
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/repository',
        params: {
          material: t.material,
          page: t.repositorysPage,
          size: 10
        }
      }).then((res) => {
        t.loading = false
        if (res.data.code === 200) {
          t.repositorys = res.data.data.records
          t.repositorysTotal = res.data.data.total
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    onLoad () {
      if (this.repositorysTotal > (this.repositorysPage + 1) * 10) {
        this.repositorysPage++
        this.getRepositorys()
      } else {
        this.finished = true
      }
    }
  }
}
</script>
<style scoped>
.pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}
.zongkucun {
  text-align: left;
}
.list {
  padding: calc(10 / 375 * 100vw);
  text-align: left;
  font-size: calc(14 / 375 * 100vw);
  padding-top: 54px;
}
.list .item {
  border: 1px solid #ff9900;
  border-radius: calc(4 / 375 * 100vw);
  padding: calc(10 / 375 * 100vw);
}
.list .item + .item {
  margin-top: calc(10 / 375 * 100vw);
}
.list .item .name {
  font-weight: bold;
  padding-bottom: calc(10 / 375 * 100vw);
}
.list .item .info {
  display: flex;
  align-items: center;
}
.list .item .info .names {
  padding-left: calc(10 / 375 * 100vw);
}
.list .item .num {
  display: flex;
  flex-wrap: wrap;
  padding-top: calc(10 / 375 * 100vw);
}
.list .item .num .i {
  width: 50%;
}
.button {
  border-top: 1px solid #ff9900;
  padding-top: calc(10 / 375 * 100vw);
  margin-top: calc(10 / 375 * 100vw);
  text-align: right;
}
</style>
