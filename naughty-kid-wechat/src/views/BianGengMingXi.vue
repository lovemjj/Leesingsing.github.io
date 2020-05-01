<template>
  <div class="biangengmingxi">
    <div class="pop">
      <div class="item">
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
          <div class="i">存放位置信息：{{item.location}}</div>
        </div>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="到底了"
      offset="30"
      @load="onLoad">
      <div class="list">
        <div class="title">物料库存变化记录</div>
        <van-steps direction="vertical" 物料库存变化记录 active-color="#ff9900">
          <van-step class="i" v-for="(item, index) in detail" :key="index">
            <div class="status">{{item.type === 0 ? '调增库存' : item.type === 1 ? '调减库存' : item.type === 2 ? '出库 ' : item.type === 3 ? '入库' : item.type === 4 ? '退库' : ''}}：{{item.amount}}</div>
            <div>{{item.createdAt}}</div>
            <div>操作人：{{item.foreign.name}}</div>
            <div>调整原因：{{item.reason}}</div>
          </van-step>
        </van-steps>
      </div>
    </van-list>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'biangengmingxi',
  data () {
    return {
      item: {
        material: {}
      },
      material_id: 0,
      detail: [],
      detailPage: 0,
      detailTotal: 0,
      loading: false,
      finished: false
    }
  },
  activated () {
    if (this.$route.query.id) {
      this.material_id = this.$route.query.id
      this.detail = []
      this.getInfo()
      this.getDetail()
    }
  },
  methods: {
    getInfo () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/branch/${t.$store.state.branch_id}/repository/${t.material_id}`
      }).then((res) => {
        if (res.data.code === 200) {
          t.item = res.data.data
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    getDetail () {
      const t = this
      t.loading = true
      t.finished = false
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/branch/${t.$store.state.branch_id}/repository/${t.material_id}/detail`,
        params: {
          page: t.detailPage,
          size: 10
        }
      }).then((res) => {
        t.loading = false
        if (res.data.code === 200) {
          t.detail = t.detail.concat(res.data.data.records)
          t.detailTotal = res.data.data.total
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    onLoad () {
      console.log('1')
      if (this.detailTotal > (this.detailPage + 1) * 10) {
        this.detailPage++
        this.getDetail()
      } else {
        this.finished = true
      }
    }
  }
}
</script>
<style scoped>
.biangengmingxi {
  text-align: left;
  font-size: calc(14 / 375 * 100vw);
}
.pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  padding: calc(10 / 375 * 100vw);
  box-sizing: border-box;
  background-color: #ffffff;
}
.list {
  padding: calc(10 / 375 * 100vw);
  text-align: left;
  padding-top: calc(190 / 375 * 100vw)
}
.item {
  border: 1px solid #ff9900;
  border-radius: calc(4 / 375 * 100vw);
  padding: calc(10 / 375 * 100vw);
  box-sizing: border-box;
}
.item .name {
  font-weight: bold;
}
.item .info {
  display: flex;
  align-items: center;
  line-height: calc(28 / 375 * 100vw);
}
.item .info .names {
  padding-left: calc(10 / 375 * 100vw);
}
.item .num {
  display: flex;
  flex-wrap: wrap;
  padding-top: calc(10 / 375 * 100vw);
}
.item .num .i {
  width: 50%;
}
.item .num .i:last-child {
  width: 100%;
}
.list .title {
  border-left: 3px solid #ff9900;
  padding-left: calc(10 / 375 * 100vw);
  margin: calc(10 / 375 * 100vw) 0;
}
.list .i {
  padding: calc(10 / 375 * 100vw);
  box-sizing: border-box;
  color: #333333;
}
.list .i .status {
  font-size: calc(16 / 375 * 100vw);
  font-weight: bold;
}
</style>
<style>
  .biangengmingxi .list i {
    font-size: calc(18 / 375 * 100vw) !important;
  }
</style>
