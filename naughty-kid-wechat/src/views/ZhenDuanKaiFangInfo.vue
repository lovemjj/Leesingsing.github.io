<template>
  <div class="zhen-duan-kai-fang">
    <div class="info">
      <div class="sub">{{info.consultedAt}}（{{info.customer.id}}）</div>
      <div class="i">
        <div class="name">调理人姓名：</div><div class="value">{{info.customer.name}}（{{info.customer.gender === 1 ? '男' : '女'}}）</div>
      </div>
      <div class="i">
        <div class="name">调理人年龄：</div><div class="value">{{info.customer.age}}岁</div>
      </div>
      <div class="i" style="width: 100%;">
        <div class="name">症状：</div><div class="value"><span class="symptoms" v-for="(item, index) in info.symptoms" :key="index"><span class="dian">、</span>{{item.name}}</span></div>
      </div>
      <div class="i" v-if="info.membershipCard.number">
        <div class="name">会员卡：</div><div class="value">{{info.membershipCard.number}}</div>
      </div>
      <div class="i" v-if="info.membershipCard.level">
        <div class="name">会员卡级别：</div><div class="value">{{info.membershipCard.level}}</div>
      </div>
      <div class="i" v-if="info.membershipCard.balance">
        <div class="name">卡内充值余额：</div><div class="value">{{info.membershipCard.balance}}</div>
      </div>
      <div class="i" v-if="info.membershipCard.bonus">
        <div class="name">卡内赠送余额：</div><div class="value">{{info.membershipCard.bonus}}</div>
      </div>
      <div class="i" style="width: 100%;" v-if="info.appendixes.length > 0">
        <div class="name">相关照片照片：</div>
      </div>
      <div class="i" style="width: 100%;" v-if="info.appendixes.length > 0">
        <van-image width="90" height="90" :src="item" v-for="(item, index) in info.appendixes" :key="index" @click="pre(info.appendixes, index)" />
      </div>
    </div>

    <van-form
      ref="form"
      :label-width="120">
      <van-cell required title="专家团体体质辩证意见:">
        <template #label>
          <div
            class="selectes"
            @click.self="onPopup('constitutions')">
            <div class="item" v-for="(item, index) in form.constitutions" :key="index">{{item.name}}<van-icon name="clear" @click="onDelete(item, 'constitutions')" /></div>
            <van-icon class="icon" name="arrow-down" />
          </div>
        </template>
      </van-cell>
      <van-popup
        v-model="popup.constitutions"
        position="bottom">
        <van-search
          show-action
          v-model="constitutions_search"
          placeholder="请输入体质辩证"
          @input="onInput($event, 'constitutions')">
          <template #action>
            <div class="van-picker__confirm" @click="onConfirm(constitutions_selected, 'constitutions')">确认</div>
          </template>
        </van-search>
        <div class="select">
          <div :class="constitutions_selected.indexOf(item.number) > -1 ? 'item selected' : 'item'" v-for="(item, index) in constitutions" :key="index" @click="onSelected(item, 'constitutions_selected')">{{item.name}}</div>
        </div>
      </van-popup>

      <van-cell required title="专家团体设定调理方案:">
        <template #label>
          <div
            class="selectes"
            @click.self="onPopup('schemes')">
            <div class="item" v-for="(item, index) in form.schemes" :key="index">{{item.name}}<van-icon name="clear" @click="onDelete(item, 'schemes')" /></div>
            <van-icon class="icon" name="arrow-down" />
          </div>
        </template>
      </van-cell>
      <van-popup
        v-model="popup.schemes"
        position="bottom">
        <van-search
          show-action
          v-model="schemes_search"
          placeholder="请输入设定调理"
          @input="onInput($event, 'schemes')">
          <template #action>
            <div class="van-picker__confirm" @click="onConfirm(schemes_selected, 'schemes')">确认</div>
          </template>
        </van-search>
        <div class="select">
          <div :class="schemes_selected.indexOf(item.number) > -1 ? 'item selected' : 'item'" v-for="(item, index) in schemes" :key="index" @click="onSelected(item, 'schemes_selected')">{{item.name}}</div>
        </div>
      </van-popup>

      <van-field
        required
        type="number"
        label="预计调理次数:"
        placeholder="请输入预计调理次数"
        v-model="form.customer.course[1]" />

      <van-cell required title="本次调理项目意见:">
        <template #label>
          <div
            class="selectes"
            @click.self="onPopup('items')">
            <div class="item" v-for="(item, index) in form.items" :key="index">{{item.name}}<van-icon name="clear" @click="onDelete(item, 'items')" /></div>
            <van-icon class="icon" name="arrow-down" />
          </div>
        </template>
      </van-cell>
      <van-popup
        v-model="popup.items"
        position="bottom">
        <van-search
          show-action
          v-model="items_search"
          placeholder="请输入调理项目"
          @input="onInput($event, 'items')">
          <template #action>
            <div class="van-picker__confirm" @click="onConfirm(items_selected, 'items')">确认</div>
          </template>
        </van-search>
        <div class="select">
          <div :class="items_selected.indexOf(item.number) > -1 ? 'item selected' : 'item'" v-for="(item, index) in items" :key="index" @click="onSelected(item, 'items_selected')">{{item.name}}</div>
        </div>
      </van-popup>

      <van-field
        label="调理总时长(分钟):"
        placeholder="自动计算"
        disabled
        v-model="form.duration" />

      <van-field
        label="调理总费用(￥):"
        placeholder="自动计算"
        disabled
        v-model="form.price" />

      <van-field
        label="指派技师:"
        placeholder="请选择技师"
        is-link
        readonly
        :value="form.assigned.name"
        @click="onPopup('assigned')" />
      <van-popup
        v-model="popup.assigned"
        position="bottom">
        <van-picker
          show-toolbar
          :columns="assigneds"
          value-key="name"
          @confirm="onConfirm($event, 'assigned')"
          @cancel="popup.assigned = false" />
      </van-popup>

      <van-field
        label="诊断开方人:"
        placeholder="请选择诊断开方人"
        is-link
        readonly
        :value="form.diagnosedBy.name"
        @click="onPopup('diagnosedBy')" />
      <van-popup
        v-model="popup.diagnosedBy"
        position="bottom">
        <van-picker
          show-toolbar
          :columns="diagnosedBys"
          value-key="name"
          @confirm="onConfirm($event, 'diagnosedBy')"
          @cancel="popup.diagnosedBy = false" />
      </van-popup>
    </van-form>
    <div class="buttons" v-if="info.disabled">
      <van-button type="primary" block @click="tocontinue">继续执行</van-button>
    </div>
    <div class="buttons" v-else>
      <van-button type="default" block @click="patchOrder">确认开方</van-button>
      <van-button type="danger" block @click="termination">终止流程</van-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ImagePreview } from 'vant'
export default {
  name: 'zhenduankaifanginfo',
  data () {
    return {
      info: {
        customer: {},
        membershipCard: {},
        symptoms: [],
        id: '',
        appendixes: []
      },
      form: {
        constitutions: [],
        schemes: [],
        items: [],
        customer: {
          course: [0, '']
        },
        duration: '',
        price: '',
        assigned: {},
        diagnosedBy: {}
      },
      popup: {
        constitutions: false,
        schemes: false,
        items: false,
        assigned: false,
        diagnosedBy: false
      },
      constitutions: [],
      schemes: [],
      items: [],
      assigneds: [],
      diagnosedBys: [],
      constitutions_search: '',
      schemes_search: '',
      items_search: '',
      constitutions_selected: [],
      schemes_selected: [],
      items_selected: []
    }
  },
  activated () {
    if (this.$route.query.id) {
      this.getInfo(this.$route.query.id)
    }
  },
  methods: {
    getInfo (id) {
      const t = this
      t.$store.state.show = true
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/massage-order/${id}`
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.info = res.data.data
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    pre (e, i) {
      ImagePreview({
        images: e,
        startPosition: i
      })
    },
    onDelete (e, pro) {
      if (pro === 'constitutions' || pro === 'schemes' || pro === 'items') {
        this.form[pro] = this.form[pro].filter((ele) => {
          return ele.number !== e.number
        })
      }
    },
    onPopup (pro) {
      if (pro === 'constitutions' || pro === 'schemes' || pro === 'items') {
        this[pro + '_selected'] = []
        for (const i of this.form[pro]) {
          this[pro + '_selected'].push(i.number)
        }
        this[pro + '_search'] = ''
      }
      if (pro === 'constitutions') {
        this.getConstitutions()
      }
      if (pro === 'schemes') {
        this.getSchemes()
      }
      if (pro === 'items') {
        this.getItems()
      }
      if (pro === 'assigned') {
        this.getAssigneds()
      }
      if (pro === 'diagnosedBy') {
        this.getDiagnosedBys()
      }
      this.popup[pro] = true
    },
    onInput (e, pro) {
      if (pro === 'constitutions_selected') {
        this.getConstitutions(e)
      }
      if (pro === 'schemes_selected') {
        this.getSchemes(e)
      }
      if (pro === 'items_selected') {
        this.getItems(e)
      }
    },
    onSelected (e, pro) {
      if (pro === 'constitutions_selected' || pro === 'schemes_selected' || pro === 'items_selected') {
        if (this[pro].indexOf(e.number) > -1) {
          this[pro] = this[pro].filter((ele) => {
            return ele !== e.number
          })
        } else {
          this[pro].push(e.number)
        }
      }
    },
    onConfirm (e, pro) {
      if (e) {
        this.form[pro] = e
        if (pro === 'constitutions' || pro === 'schemes' || pro === 'items') {
          this.form[pro] = this[pro].filter((ele) => {
            return e.indexOf(ele.number) > -1
          })
        }
      }
      this.popup[pro] = false
    },
    getConstitutions (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/5/item',
        params: {
          like: e
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.constitutions = res.data.data.records
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    getSchemes (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/massage-scheme',
        params: {
          like: e
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.schemes = res.data.data.records
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    getItems (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/massage-item',
        params: {
          like: e
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.items = res.data.data.records
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    getAssigneds () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/employee',
        params: {
          role: '5'
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.assigneds = res.data.data.records
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    getDiagnosedBys () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/branch/${t.$store.state.branch_id}/employee`
      }).then((res) => {
        if (res.data.code === 200) {
          t.diagnosedBys = res.data.data.records
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    back () {
      this.$router.replace({
        name: 'wenzhenjiedai',
        query: this.$route.query
      })
    },
    patchOrder () {
      const t = this
      if (t.form.constitutions.length < 1) {
        this.$notify({ message: '至少选择一次专家团体体质辩证意见', type: 'warning' })
        return true
      }
      if (t.form.schemes.length < 1) {
        this.$notify({ message: '至少选择一次专家团体设定调理方案', type: 'warning' })
        return true
      }
      if (t.form.customer.course[1] < 1) {
        this.$notify({ message: '请填写调理次数', type: 'warning' })
        return true
      }
      if (t.form.items.length < 1) {
        this.$notify({ message: '至少选择一次本次调理项目意见', type: 'warning' })
        return true
      }
      t.$store.state.show = true
      const items = []
      for (const i of t.form.items) {
        items.push({
          id: i.id
        })
      }
      const schemes = []
      for (const i of t.form.schemes) {
        schemes.push({
          id: i.id
        })
      }
      const constitutions = []
      for (const i of t.form.constitutions) {
        constitutions.push({
          number: i.number
        })
      }
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/massage-order/${t.info.id}`,
        data: {
          membershipCard: {
            id: t.info.membershipCard.id
          },
          id: t.info.id,
          assigned: {
            id: t.form.assigned.id
          },
          status: 1,
          items,
          schemes,
          constitutions,
          customer: {
            course: t.form.customer.course
          },
          diagnosedBy: {
            id: t.form.diagnosedBy.id
          }
        }
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'jiedanlishi' && ele !== 'zhenduankaifang' && ele !== 'tuinazhixing'
          })
          t.$router.replace({ name: 'shoufei', query: t.$route.query })
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    tocontinue () {
      const t = this
      t.$store.state.show = true
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api//massage-order/${t.info.id}`,
        data: {
          disabled: false
        }
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'jiedanlishi' && ele !== 'zhenduankaifang' && ele !== 'tuinazhixing'
          })
          t.$router.back()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    termination () {
      const t = this
      t.$store.state.show = true
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api//massage-order/${t.info.id}`,
        data: {
          disabled: true
        }
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'jiedanlishi' && ele !== 'zhenduankaifang' && ele !== 'tuinazhixing'
          })
          t.$router.back()
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    }
  }
}
</script>
<style scoped>
.zhen-duan-kai-fang {
  padding: calc(10 / 375 * 100vw) 0;
  text-align: left;
}
.info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #ff9900;
  padding: 0 calc(10 / 375 * 100vw) calc(10 / 375 * 100vw) calc(10 / 375 * 100vw);
  border-radius: calc(6 / 375 * 100vw);
  margin: 0 calc(10 / 375 * 100vw);
}
.sub {
  width: 100%;
  font-size: calc(12 / 375 * 100vw);
  color: #bcbcbc;
  line-height: calc(30 / 375 * 100vw);
}
.i {
  display: flex;
  align-items: center;
  width: 50%;
  font-size: calc(14 / 375 * 100vw);
}
.i .name {
  color: #333333;
  font-weight: bold;
  line-height: calc(24 / 375 * 100vw);
}
.symptoms .dian {
  display: none;
}
.symptoms + .symptoms .dian {
  display: inline-block;
}
.selectes {
  border: 1px solid #f0f0f0;
  border-radius: calc(4 / 375 * 100vw);
  min-height: 68px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.selectes .item {
  font-size: calc(12 / 375 * 100vw);
  color: #ff9900;
  padding: calc(5 / 375 * 100vw);
  border: 1px solid #ff9900;
  border-radius: calc(4 / 375 * 100vw);
  display: flex;
  align-items: center;
  height: calc(15 / 375 * 100vw);
  margin: calc(5 / 375 * 100vw);
}
.selectes .item i {
  font-size: calc(14 / 375 * 100vw);
  padding-left: calc(5 / 375 * 100vw);
}
.selectes .icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.select {
  height: calc(375 / 375 * 100vw);
  overflow: auto;
  border-top: 1px solid #f0f0f0;
  padding: 0 calc(10 / 375 * 100vw);
}
.select .item {
  padding: calc(10 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
  color: #333333;
  text-align: center;
  border: 1px solid #f0f0f0;
  margin: calc(10 / 375 * 100vw) 0;
  border-radius: calc(4 / 375 * 100vw);
}
.select .item.selected {
  border-color: #ff9900;
  color: #ff9900;
}
</style>
