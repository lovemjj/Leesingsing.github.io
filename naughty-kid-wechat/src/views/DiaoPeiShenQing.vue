<template>
  <div class="diaopeishenqing">
    <div class="pop">
      <div class="item">
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
          <div class="i" style="width: 100%">店长姓名：{{item.branch.name}}</div>
          <div class="i" style="width: 100%">店长电话：{{item.branch.photo}}</div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="title">
        调货申请单
      </div>
      <div class="item">
        <van-field required label="申请调配库存：" label-width="100" v-model="amount" placeholder="请输入申请调配库存" />
        <van-field label="备注信息：" type="textarea" label-width="100" v-model="reason" placeholder="请输入备注信息" />
      </div>
    </div>
    <div class="buttons">
      <van-button type="default" block @click="application">提交申请</van-button>
      <van-button type="danger" block @click="back">取消申请</van-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'diaopeishenqing',
  data () {
    return {
      item: {
        branch: {},
        material: {}
      },
      material_id: 0,
      amount: '',
      reason: ''
    }
  },
  activated () {
    if (this.$route.query.id) {
      this.material_id = this.$route.query.id
      this.getInfo()
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    application () {
      const t = this
      if (t.amount === '') {
        t.$notify({ message: '请输入申请调配库存', type: 'warning' })
        return
      }
      axios({
        method: 'post',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/repository-application',
        data: {
          from: {
            id: t.item.branch.id
          },
          to: {
            id: t.$store.state.branch_id
          },
          material: {
            id: t.item.material.id
          },
          amount: t.amount,
          reason: t.reason
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'zongkucun' && ele !== 'bendiankucun'
          })
          t.back()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
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
    }
  }
}
</script>
<style scoped>
.diaopeishenqing {
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
  padding-top: calc(240 / 375 * 100vw)
}
.item {
  border: 1px solid #ff9900;
  border-radius: calc(4 / 375 * 100vw);
  padding: calc(10 / 375 * 100vw);
  box-sizing: border-box;
}
.item .name {
  font-weight: bold;
  padding-bottom: calc(10 / 375 * 100vw);
}
.item .info {
  display: flex;
  align-items: center;
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
.list .title {
  border-left: 3px solid #ff9900;
  padding-left: calc(10 / 375 * 100vw);
  margin: calc(10 / 375 * 100vw) 0;
}
</style>
