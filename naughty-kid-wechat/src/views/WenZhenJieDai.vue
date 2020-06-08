<template>
  <div class="wen-zhen-jie-dai">
    <van-form
      ref="form"
      :label-width="100">
      <van-field
        label="咨询日期:"
        placeholder="请选择咨询日期"
        required
        is-link
        readonly
        :value="form.consultedAt"
        @click="onPopup('consultedAt')" />
      <van-popup
        v-model="popup.consultedAt"
        position="bottom">
        <van-datetime-picker
          :value="form.consultedAt ? new Date(form.consultedAt) : new Date()"
          type="date"
          :min-date="minDate"
          @confirm="onConfirm($event, 'consultedAt')"
          @cancel="popup.consultedAt = false" />
      </van-popup>

      <van-field
        label="咨询方式:"
        placeholder="请选择咨询方式"
        is-link
        readonly
        :value="form.consultMethod.name"
        @click="onPopup('consultMethod')" />
      <van-popup
        v-model="popup.consultMethod"
        position="bottom">
        <van-picker
          show-toolbar
          :columns="consultMethods"
          value-key="name"
          @confirm="onConfirm($event, 'consultMethod')"
          @cancel="popup.consultMethod = false" />
      </van-popup>

      <van-field
        label="预约日期:"
        placeholder="请选择预约日期"
        is-link
        readonly
        :value="form.appointmentDate"
        @click="onPopup('appointmentDate')" />
      <van-popup
        v-model="popup.appointmentDate"
        position="bottom">
        <van-datetime-picker
          :value="form.appointmentDate ? new Date(form.appointmentDate) : new Date()"
          type="date"
          :min-date="minDate"
          @confirm="onConfirm($event, 'appointmentDate')"
          @cancel="popup.appointmentDate = false" />
      </van-popup>

      <van-field
        label="调理日期:"
        placeholder="请选择调理日期"
        is-link
        readonly
        :value="form.treatmentDate"
        @click="onPopup('treatmentDate')" />
      <van-popup
        v-model="popup.treatmentDate"
        position="bottom">
        <van-datetime-picker
          :value="form.treatmentDate ? new Date(form.treatmentDate) : new Date()"
          type="date"
          :min-date="minDate"
          @confirm="onConfirm($event, 'treatmentDate')"
          @cancel="popup.treatmentDate = false" />
      </van-popup>

      <div class="biaoti">
        <div class="line"></div>
        <div>调理人信息</div>
        <div class="line"></div>
      </div>

      <van-field
        label="调理人姓名:"
        placeholder="请选择调理人"
        required
        is-link
        readonly
        :value="form.customer.name"
        @click="onPopup('customer')" />
      <van-popup
        v-model="popup.customer"
        position="bottom">
        <van-search
          show-action
          v-model="customer_search"
          placeholder="请添加调理人姓名"
          @input="onInput($event, 'customer')">
          <template #action>
            <div class="van-picker__confirm" @click="onConfirm($refs.customer.getValues()[0], 'customer')">确认</div>
          </template>
        </van-search>
        <van-picker
          ref="customer"
          :columns="customers"
          value-key="name" />
      </van-popup>

      <van-field
        label="出生年月:"
        placeholder="请选择出生年月"
        is-link
        readonly
        :value="form.customer.birthday"
        @click="!form.customer.disabled ? onPopup('customer_birthday') : ''" />
      <van-popup
        v-model="popup.customer_birthday"
        position="bottom">
        <van-datetime-picker
          :value="form.customer.birthday ? new Date(form.customer.birthday) : new Date()"
          type="date"
          :min-date="minDate"
          @confirm="onConfirm($event, 'customer_birthday')"
          @cancel="popup.customer_birthday = false" />
      </van-popup>

      <van-field
        label="顾客档案编号:"
        disabled
        :value="form.customer.id" />

      <van-field
        label="性别:">
        <template #input>
          <van-radio-group
            v-model="form.customer.gender"
            direction="horizontal"
            checked-color="#ff9900"
            :disabled="form.customer.disabled">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        label="是否初审:">
        <template #input>
          <van-radio-group
            v-model="form.customer.firstVisit"
            direction="horizontal"
            checked-color="#ff9900"
            :disabled="form.customer.disabled">
            <van-radio :name="true">是</van-radio>
            <van-radio :name="false">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        label="调理人手机号:"
        placeholder="请输入调理人手机号"
        :disabled="form.customer.disabled"
        v-model="form.customer.contact" />

      <div class="biaoti">
        <div class="line"></div>
        <div>会员卡信息</div>
        <div class="line"></div>
      </div>

      <van-field
        label="会员卡卡号:"
        placeholder="请选择会员卡"
        is-link
        readonly
        :value="form.membershipCard.number"
        @click="onPopup('membershipCard')" />
      <van-popup
        v-model="popup.membershipCard"
        position="bottom">
        <van-search
          show-action
          v-model="membershipCard_search"
          placeholder="请输入会员卡卡号"
          @input="onInput($event, 'membershipCard')">
          <template #action>
            <div class="van-picker__confirm" @click="onConfirm($refs.membershipCard.getValues()[0], 'membershipCard')">确认</div>
          </template>
        </van-search>
        <van-picker
          ref="membershipCard"
          :columns="membershipCards"
          value-key="number" />
      </van-popup>

      <van-row class="row">
        <van-col class="item" span="12">持卡人姓名：{{form.membershipCard.name}}</van-col>
        <van-col class="item" span="12">会员卡级别：{{form.membershipCard.level === 1 ? '铜卡会员' : form.membershipCard.level === 2 ? '铜卡会员' : form.membershipCard.level === 3 ? '铜卡会员' : ''}}</van-col>
        <van-col class="item" span="12">卡内充值余额：{{form.membershipCard.balance}}</van-col>
        <van-col class="item" span="12">卡内赠送余额：{{form.membershipCard.bonus}}</van-col>
      </van-row>

      <van-cell>
        <template #title v-if="form.membershipCard.id">
          <router-link :to="{ name: 'huiyuanka', query: { id: form.membershipCard.id } }"><u>查看会员卡详情</u></router-link>
        </template>
      </van-cell>

      <div class="biaoti">
        <div class="line"></div>
        <div>本次咨询症状</div>
        <div class="line"></div>
      </div>

      <van-cell required title="本次调理前症状自我描述（家长陪同可补充）:">
        <template #label>
          <div
            class="selectes"
            @click.self="onPopup('symptoms')">
            <div class="item" v-for="(item, index) in form.symptoms" :key="index">{{item.name}}<van-icon name="clear" @click="onDelete(item, 'symptoms')" /></div>
            <van-icon class="icon" name="arrow-down" />
          </div>
        </template>
      </van-cell>
      <van-popup
        v-model="popup.symptoms"
        position="bottom">
        <van-search
          show-action
          v-model="symptoms_search"
          placeholder="请输入症状"
          @input="onInput($event, 'symptoms')">
          <template #action>
            <div class="van-picker__confirm" @click="onConfirm(symptoms_selected, 'symptoms')">确认</div>
          </template>
        </van-search>
        <div class="select">
          <div :class="symptoms_selected.indexOf(item.number) > -1 ? 'item selected' : 'item'" v-for="(item, index) in symptoms" :key="index" @click="onSelected(item, 'symptoms_selected')">{{item.name}}</div>
        </div>
      </van-popup>

      <van-cell title="其他症状说明::">
        <template #label>
          <div class="selectes">
            <van-field
              v-model="form.symptomsDescription"
              rows="2"
              autosize
              type="textarea"
              placeholder="请输入其他症状说明:"
              show-word-limit />
          </div>
        </template>
      </van-cell>

      <van-cell title="添加照片:">
        <template #label>
          <van-uploader v-model="form.appendixes" max-count="3" multiple />
        </template>
      </van-cell>

      <div class="biaoti">
        <div class="line"></div>
        <div>本次陪同人员信息</div>
        <div class="line"></div>
      </div>

      <van-cell title="陪同人员类型:">
        <template #label>
          <van-radio-group
            class="radio"
            v-model="form.partnerType.number"
            direction="horizontal"
            checked-color="#ff9900">
            <van-radio :name="item.number" v-for="(item, index) in partnerTypes" :key="index">{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-cell>

      <van-field
        label="其他陪同人员:"
        placeholder="请输入其他陪同人员"
        v-model="form.otherPartner"
        v-if="form.partnerType.number === 7" />

      <van-field
        label="陪同人姓名:"
        placeholder="请输入陪同人姓名"
        v-model="form.partnerName" />

      <van-field
        label="陪同人手机号:"
        placeholder="请输入陪同人手机号"
        v-model="form.partnerContact" />

      <van-field
        label="咨询接待人:"
        placeholder="请选择咨询接待人"
        is-link
        readonly
        :value="form.createdBy.name"
        @click="onPopup('createdBy')" />
      <van-popup
        v-model="popup.createdBy"
        position="bottom">
        <van-picker
          show-toolbar
          :columns="createdBys"
          value-key="name"
          @confirm="onConfirm($event, 'createdBy')"
          @cancel="popup.createdBy = false" />
      </van-popup>
    </van-form>
    <div class="buttons">
      <!-- <van-button type="info" block @click="postOrder('post')" v-if="method !== 'post'">保存预约</van-button> -->
      <van-button type="default" block @click="postOrder('')">确认接待</van-button>
      <!-- <van-button type="danger" block>终止流程</van-button> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'wenzhenjiedai',
  data () {
    return {
      method: '',
      form: {
        consultedAt: '', // 咨询日期
        consultMethod: {}, // 咨询方式
        appointmentDate: '', // 预约日期
        treatmentDate: '', // 调理日期
        customer: {
          name: '',
          birthday: '',
          id: '',
          gender: 1,
          firstVisit: true,
          contact: '',
          disabled: false
        }, // 调理人
        membershipCard: {},
        symptomsDescription: '',
        symptoms: [],
        appendixes: [],
        partnerType: {},
        createdBy: {}
      },
      minDate: new Date('1900-01-01'),
      consultMethods: [
        {
          name: '到店咨询',
          id: 0
        },
        {
          name: '电话咨询',
          id: 1
        }
      ], // 咨询方式数组
      customers: [], // 调理人数组
      membershipCards: [],
      symptoms: [],
      partnerTypes: [],
      customer_search: '',
      membershipCard_search: '',
      symptoms_search: '',
      symptoms_selected: [],
      createdBys: [],
      popup: {
        consultedAt: false,
        consultMethod: false,
        appointmentDate: false,
        treatmentDate: false,
        customer: false,
        customer_birthday: false,
        membershipCard: false,
        symptoms: false,
        createdBy: false
      },
      show: false
    }
  },
  mounted () {
    this.getPartnerTypes()
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
          t.form = res.data.data
          const arr = JSON.parse(JSON.stringify(t.form.appendixes))
          t.form.appendixes = []
          for (const i of arr) {
            t.form.appendixes.push({
              content: i
            })
          }
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    onConfirm (e, pro) {
      if (e) {
        this.form[pro] = e
        if (pro === 'consultedAt' || pro === 'appointmentDate' || pro === 'treatmentDate') {
          this.form[pro] = moment(e).format('YYYY-MM-DD')
        }
        if (pro === 'customer_birthday') {
          this.form.customer.birthday = moment(e).format('YYYY-MM-DD')
        }
        if (pro === 'customer') {
          if (!this.form[pro].id) {
            this.getCustomerId(e.name, pro)
          } else {
            this.form[pro] = {
              name: e.name,
              birthday: e.birthday,
              id: e.id,
              gender: e.gender,
              contact: e.contact,
              firstVisit: false,
              disabled: true
            }
          }
        }
        if (pro === 'symptoms') {
          this.form[pro] = this[pro].filter((ele) => {
            return e.indexOf(ele.number) > -1
          })
        }
      }
      this.popup[pro] = false
    },
    onInput (e, pro) {
      if (pro === 'customer') {
        this.getCustomers(e)
      }
      if (pro === 'membershipCard') {
        this.getMembershipCards(e)
      }
      if (pro === 'symptoms') {
        this.getSymptoms(e)
      }
    },
    onPopup (pro) {
      if (pro === 'customer') {
        this.customer_search = this.form[pro].name
        this.getCustomers(this.customer_search)
      }
      if (pro === 'membershipCard') {
        this.membershipCard_search = ''
        this.getMembershipCards(this.membershipCard_search)
      }
      if (pro === 'symptoms') {
        this.symptoms_selected = []
        for (const i of this.form[pro]) {
          this.symptoms_selected.push(i.number)
        }
        this.symptoms_search = ''
        this.getSymptoms()
      }
      if (pro === 'createdBy') {
        this.getCreatedBys()
      }
      this.popup[pro] = true
    },
    onSelected (e, pro) {
      if (pro === 'symptoms_selected') {
        if (this[pro].indexOf(e.number) > -1) {
          this[pro] = this[pro].filter((ele) => {
            return ele !== e.number
          })
        } else {
          this[pro].push(e.number)
        }
      }
    },
    onDelete (e, pro) {
      if (pro === 'symptoms') {
        this.form[pro] = this.form[pro].filter((ele) => {
          return ele.number !== e.number
        })
      }
    },
    getCustomers (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/customer',
        params: {
          like: e || ''
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.customers = res.data.data.records
          if (e) {
            const arr = t.customers.filter((ele) => {
              return ele.name === e
            })
            if (arr.length === 0) {
              t.customers.unshift({
                name: e
              })
            }
          }
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getCustomerId (e, pro) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/customer-id'
      }).then((res) => {
        if (res.data.code === 200) {
          t.form[pro] = {
            id: res.data.data,
            name: e,
            birthday: '',
            gender: 1,
            firstVisit: true,
            contact: '',
            disabled: false
          }
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getMembershipCards (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/membership-card',
        params: {
          number: e
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.membershipCards = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getSymptoms (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/4/item',
        params: {
          like: e
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.symptoms = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getPartnerTypes () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/2/item'
      }).then((res) => {
        if (res.data.code === 200) {
          t.partnerTypes = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getCreatedBys () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch/' + t.$store.state.branch_id + '/employee?role=门店店长_市场督导_儿童理疗师_中医理疗师'
      }).then((res) => {
        if (res.data.code === 200) {
          t.createdBys = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    remoteForm () {
      localStorage.removeItem('form')
      this.form = {
        consultedAt: '',
        consultMethod: {},
        appointmentDate: '',
        treatmentDate: '',
        customer: {
          name: '',
          birthday: '',
          id: '',
          gender: 1,
          firstVisit: true,
          contact: '',
          disabled: false
        },
        membershipCard: {},
        symptomsDescription: '',
        symptoms: [],
        appendixes: [],
        partnerType: {},
        createdBy: {}
      }
      this.$notify({ message: '清除成功', type: 'success' })
    },
    saveForm () {
      localStorage.setItem('form', JSON.stringify(this.form))
      this.$notify({ message: '保存成功', type: 'success' })
    },
    postOrder (e) {
      const t = this
      if (!t.form.consultedAt) {
        this.$notify({ message: '请选择咨询日期', type: 'warning' })
        return true
      }
      if (!t.form.customer.name) {
        this.$notify({ message: '请选择调理人', type: 'warning' })
        return true
      }
      if (t.form.customer.contact && t.form.customer.contact.length !== 11) {
        this.$notify({ message: '调理人手机号格式不对', type: 'warning' })
        return true
      }
      if (t.form.partnerContact && t.form.partnerContact.length !== 11) {
        this.$notify({ message: '陪同人手机号格式不对', type: 'warning' })
        return true
      }
      if (t.form.symptoms.length === 0) {
        this.$notify({ message: '请选择本次调理前症状', type: 'warning' })
        return true
      }
      t.$store.state.show = true
      const appendixes = []
      for (const i of t.form.appendixes) {
        appendixes.push(i.content)
      }
      const symptoms = []
      for (const i of t.form.symptoms) {
        symptoms.push({
          number: i.number
        })
      }
      let method = 'post'
      if (t.method === 'post') {
        method = 'patch'
      } else {
        t.method = e
      }
      axios({
        method,
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/massage-order',
        data: {
          membershipCard: {
            id: t.form.membershipCard.id
          },
          customer: {
            id: t.form.customer.id,
            name: t.form.customer.name,
            birthday: t.form.customer.birthday,
            gender: t.form.customer.gender,
            firstVisit: t.form.customer.firstVisit,
            contact: t.form.customer.contact
          },
          partnerContact: t.form.partnerContact,
          symptomsDescription: t.form.symptomsDescription,
          appointmentDate: t.form.appointmentDate,
          createdBy: {
            id: t.form.createdBy.id
          },
          partnerName: t.form.partnerName,
          partnerType: {
            number: t.form.partnerType.number
          },
          consultMethod: t.form.consultMethod.id,
          treatmentDate: t.form.treatmentDate,
          symptoms,
          consultedAt: t.form.consultedAt,
          appendixes,
          createdAt: moment().format('YYYY-MM-DD HH:mm'),
          status: 0
        }
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          t.$store.state.include = t.$store.state.include.filter((ele) => {
            return ele !== 'jiedanlishi'
          })
          if (e === '') {
            t.form = {
              consultedAt: '',
              consultMethod: {},
              appointmentDate: '',
              treatmentDate: '',
              customer: {
                name: '',
                birthday: '',
                id: '',
                gender: 1,
                firstVisit: true,
                contact: '',
                disabled: false
              },
              membershipCard: {},
              symptomsDescription: '',
              symptoms: [],
              appendixes: [],
              partnerType: {},
              createdBy: {}
            }
            t.$router.back()
          }
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    }
  }
}
</script>

<style scoped>
.wen-zhen-jie-dai {
  text-align: left;
}
.biaoti {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(14 / 375 * 100vw);
  color: #ff9900;
  height: calc(40 / 375 * 100vw);
}
.biaoti .line {
  width: calc(90 / 375 * 100vw);
  margin: 0 calc(10 / 375 * 100vw);
  height: 1px;
  background-color: #ff9900;
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
.row {
  padding: 0 16px;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
}
.row .item {
  padding-top: 10px;
}
.radio .van-radio--horizontal {
  margin: 6px;
}
</style>
