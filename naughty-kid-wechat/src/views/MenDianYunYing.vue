<template>
  <div class="mendianyunying">
    <div class="nav">
      <van-dropdown-menu>
        <van-dropdown-item title="机构/门店" v-model="branche_id" :options="branches" @change="menuChange" />
      </van-dropdown-menu>
      <div class="date-list">
        <div :class="select_id === 0 ? 'i selected' : 'i'" @click="selected(0)">本日</div>
        <div :class="select_id === 1 ? 'i selected' : 'i'" @click="selected(1)">本周</div>
        <div :class="select_id === 2 ? 'i selected' : 'i'" @click="selected(2)">本月</div>
        <div :class="select_id === 3 ? 'i selected' : 'i'" @click="selected(3)">本年</div>
        <div :class="select_id === 4 ? 'i selected' : 'i'" @click="selected(4)">自定义</div>
      </div>
      <div class="date-arr">
        <div class="right i" @click="select_id === 4 ? popup.after = true : ''">
          <van-icon name="arrow-left" />
          <div>{{after}}</div>
        </div>
        <div class="center"></div>
        <div class="left i" @click="select_id === 4 ? popup.before = true : ''">
          <div>{{before}}</div>
          <van-icon name="arrow" />
        </div>
      </div>
      <van-popup
        v-model="popup.before"
        position="bottom">
        <van-datetime-picker
          :value="before ? new Date(before) : new Date()"
          type="date"
          :min-date="before_min_date"
          @confirm="onConfirm($event, 'before')"
          @cancel="popup.before = false" />
      </van-popup>
      <van-popup
        v-model="popup.after"
        position="bottom">
        <van-datetime-picker
          :value="after ? new Date(after) : new Date()"
          type="date"
          :min-date="after_min_date"
          @confirm="onConfirm($event, 'after')"
          @cancel="popup.after = false" />
      </van-popup>
    </div>
    <div class="times">
      <div class="item">
        <div class="title">
          顾客数量统计
        </div>
        <div class="value">
          <div class="num"><span>{{data.customerStatistic.count}}</span>人</div>
          <div class="type">
            <div class="i"><div class="c zeng"></div>同比</div>
            <div class="i"><div class="c jiang"></div>环比</div>
          </div>
          <div class="percent">
            <div class="i zeng">
              {{data.customerStatistic.chainRatio}}%
              <div class="icon">
                <img src="../assets/app/zeng.svg" alt="">
              </div>
            </div>
            <div class="i jiang">
              {{data.customerStatistic.yearOnYear}}%
              <div class="icon">
                <img src="../assets/app/jiang.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">
          服务次数统计
        </div>
        <div class="value">
          <div class="num"><span>{{data.massageStatistic.count}}</span>人次</div>
          <div class="type">
            <div class="i"><div class="c zeng"></div>同比</div>
            <div class="i"><div class="c jiang"></div>环比</div>
          </div>
          <div class="percent">
            <div class="i zeng">
              {{data.massageStatistic.chainRatio}}%
              <div class="icon">
                <img src="../assets/app/zeng.svg" alt="">
              </div>
            </div>
            <div class="i jiang">
              {{data.massageStatistic.yearOnYear}}%
              <div class="icon">
                <img src="../assets/app/jiang.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">
          本店服务技师统计
        </div>
        <div class="value">
          <div class="num"><span>{{data.technicianStatistic.count}}</span>人</div>
          <div class="type">
            <div class="i"><div class="c zeng"></div>同比</div>
            <div class="i"><div class="c jiang"></div>环比</div>
          </div>
          <div class="percent">
            <div class="i zeng">
              {{data.technicianStatistic.chainRatio}}%
              <div class="icon">
                <img src="../assets/app/zeng.svg" alt="">
              </div>
            </div>
            <div class="i jiang">
              {{data.technicianStatistic.yearOnYear}}%
              <div class="icon">
                <img src="../assets/app/jiang.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">
          消费统计
        </div>
        <div class="value">
          <div class="num"><span>{{data.consumptionStatistic.count}}</span>元</div>
          <div class="type">
            <div class="i"><div class="c zeng"></div>同比</div>
            <div class="i"><div class="c jiang"></div>环比</div>
          </div>
          <div class="percent">
            <div class="i zeng">
              {{data.consumptionStatistic.chainRatio}}%
              <div class="icon">
                <img src="../assets/app/zeng.svg" alt="">
              </div>
            </div>
            <div class="i jiang">
              {{data.consumptionStatistic.yearOnYear}}%
              <div class="icon">
                <img src="../assets/app/jiang.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">
          充值统计
        </div>
        <div class="value">
          <div class="num"><span>{{data.rechargeStatistic.count}}</span>元</div>
          <div class="type">
            <div class="i"><div class="c zeng"></div>同比</div>
            <div class="i"><div class="c jiang"></div>环比</div>
          </div>
          <div class="percent">
            <div class="i zeng">
              {{data.rechargeStatistic.chainRatio}}%
              <div class="icon">
                <img src="../assets/app/zeng.svg" alt="">
              </div>
            </div>
            <div class="i jiang">
              {{data.rechargeStatistic.yearOnYear}}%
              <div class="icon">
                <img src="../assets/app/jiang.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item total">
        <div class="title">
          消费情况统计
        </div>
        <div class="value">
          <div id="totalId" class="echartsClass"></div>
        </div>
      </div>
      <div class="item total">
        <div class="title">
          会员卡充值统计
        </div>
        <div class="value">
          <div id="rechargeId" class="echartsClass"></div>
        </div>
      </div>
      <div class="item pay">
        <div class="title">
          支付方式统计
        </div>
        <div class="value">
          <div id="payId" class="echartsClass"></div>
        </div>
      </div>
      <div class="item schedule">
        <div class="title">
          服务进度统计
        </div>
        <div class="value">
          <div id="scheduleId" class="echartsClass"></div>
        </div>
      </div>
      <div class="item" v-for="(item, index) in data.tops" :key="index">
        <div class="title">
          {{item.title}}
        </div>
        <div class="value">
          <div class="i" v-for="(e, i) in item.items" :key="i">
            <div class="name">
              <div class="num">
                {{i + 1}}
              </div>
              <div>{{e.name}}</div>
            </div>
            <div class="money">{{e.amont}}元</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import echarts from 'echarts'
export default {
  name: 'mendianyunying',
  data () {
    return {
      select_id: 0,
      after: '',
      before: '',
      after_min_date: new Date('1900-01-01'),
      before_min_date: new Date('1900-01-01'),
      popup: {
        before: false,
        after: false
      },
      branche_id: '',
      branches: [],
      data: {
        customerStatistic: {},
        massageStatistic: {},
        technicianStatistic: {},
        consumptionStatistic: {},
        rechargeStatistic: {},
        tops: []
      }
    }
  },
  mounted () {
    this.selected(0)
    this.getBranch()
  },
  methods: {
    selected (e) {
      if (e === 0) {
        this.after = moment().startOf('day').format('YYYY-MM-DD')
        this.before = moment().endOf('day').format('YYYY-MM-DD')
      }
      if (e === 1) {
        this.after = moment().startOf('week').format('YYYY-MM-DD')
        this.before = moment().endOf('week').format('YYYY-MM-DD')
      }
      if (e === 2) {
        this.after = moment().startOf('month').format('YYYY-MM-DD')
        this.before = moment().endOf('month').format('YYYY-MM-DD')
      }

      if (e === 3) {
        this.after = moment().startOf('year').format('YYYY-MM-DD')
        this.before = moment().endOf('year').format('YYYY-MM-DD')
      }
      if (e === 4) {
        this.before = moment().format('YYYY-MM-DD')
        this.after = moment().format('YYYY-MM-DD')
      }
      this.select_id = e
      this.getWorkbench()
    },
    onConfirm (e, pro) {
      this[pro] = e
      if (pro === 'before' || pro === 'after') {
        this[pro] = moment(e).format('YYYY-MM-DD')
        if (pro === 'after' && moment(this.before) < moment(this.after)) {
          this.before = this.after
        }
        if (pro === 'before' && moment(this.before) < moment(this.after)) {
          this.after = this.before
        }
      }
      this.getWorkbench()
      this.popup[pro] = false
    },
    getBranch () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch'
      }).then((res) => {
        if (res.data.code === 200) {
          t.branches = []
          for (const i of res.data.data.records) {
            t.branches.push({
              text: i.name,
              value: i.id
            })
          }
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    menuChange () {
      this.getWorkbench()
    },
    getWorkbench () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/workbench',
        params: {
          after: t.after,
          before: t.before,
          branchId: t.branch_id
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.data = res.data.data
          const scheduleChart = echarts.init(document.getElementById('scheduleId'))
          const payChart = echarts.init(document.getElementById('payId'))
          const totalChart = echarts.init(document.getElementById('totalId'))
          const rechargeChart = echarts.init(document.getElementById('rechargeId'))
          const data0 = []
          const data1 = []
          const data2 = []
          const data3 = []
          const data4 = []
          for (const i of this.data.massageStatus0.items) {
            data0.push(i.title)
            data1.push({
              value: i.value,
              name: i.title
            })
          }
          for (const i of this.data.massageStatus1.items) {
            data2.push({
              value: i.value,
              name: i.title
            })
          }

          const scheduleOption = {
            tooltip: {
              trigger: 'item',
              formatter: '{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'auto',
              data: data0
            },
            series: [
              {
                name: this.data.massageStatus0.title,
                type: 'pie',
                radius: [0, '30%'],

                label: {
                  position: 'inner'
                },
                labelLine: {
                  show: false
                },
                data: data2
              },
              {
                name: this.data.massageStatus0.title,
                type: 'pie',
                radius: ['40%', '55%'],
                data: data1
              }
            ]
          }
          for (const i of this.data.paymentStatistic.items) {
            data3.push(i.title)
            data4.push({
              value: i.value,
              name: i.title
            })
          }

          const payOption = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: data3
            },
            series: [
              {
                name: this.data.paymentStatistic.title,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data4,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
          const data5 = []
          const data6 = []
          for (const i of this.data.histograms[0].yaxis) {
            data5.push(i.value)
            data6.push(i.proportion)
          }
          const totalOption = {
            xAxis: {
              type: 'category',
              data: this.data.histograms[0].xaxis
            },
            yAxis: [
              {
                name: '金额（元）',
                type: 'value'
              },
              {
                name: '百分比（%）',
                type: 'value',
                max: 100,
                min: 0
              }
            ],
            series: [
              {
                label: {
                  show: true,
                  position: 'top'
                },
                data: data5,
                type: 'bar'
              },
              {
                label: {
                  show: true,
                  position: 'bottom'
                },
                data: data6,
                type: 'line'
              }
            ]
          }
          const data7 = []
          const data8 = []
          for (const i of this.data.histograms[1].yaxis) {
            data7.push(i.value)
            data8.push(i.proportion)
          }
          const rechargeOption = {
            xAxis: {
              type: 'category',
              data: this.data.histograms[1].xaxis
            },
            yAxis: [
              {
                name: '金额（元）',
                type: 'value'
              },
              {
                name: '百分比（%）',
                type: 'value',
                max: 100,
                min: 0
              }
            ],
            series: [
              {
                label: {
                  show: true,
                  position: 'top'
                },
                data: data7,
                type: 'bar'
              },
              {
                label: {
                  show: true,
                  position: 'top'
                },
                data: data8,
                type: 'line'
              }
            ]
          }
          scheduleChart.setOption(scheduleOption)
          payChart.setOption(payOption)
          totalChart.setOption(totalOption)
          rechargeChart.setOption(rechargeOption)
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 0 calc(10 / 375 * 100vw);
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow:0px 2px 10px 0px rgba(72,73,77,0.2);
  text-align: left;
}
.van-list {
  margin-top: calc((90 / 375 * 100vw) + 50px);
  border: 1px solid #ff9900;
}
.van-cell:not(:last-child)::after {
  border-color: #ff9900;
}
.date-list {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: calc(40 / 375 * 100vw);
}
.date-list .i {
  width: 19%;
  text-align: center;
  border: 1px solid #f0f0f0;
  color: #999999;
  font-size: calc(14 / 375 * 100vw);
  line-height: calc(28 / 375 * 100vw);
  border-radius: calc(2 / 375 * 100vw);
}
.date-list .i.selected {
  color: #ff9900;
  border-color: #ff9900;
}
.date-arr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(40 / 375 * 100vw);
}
.date-arr .i {
  display: flex;
  align-items: center;
  color: #ff9900;
  font-size: calc(14 / 375 * 100vw);
}
.date-arr .center {
  width: calc(30 / 375 * 100vw);
  height: 1px;
  background-color: #ff9900;
}
.date-arr .i .van-icon {
  font-size: calc(20 / 375 * 100vw);
  font-weight: blod;
}
.times {
  margin-top: calc((90 / 375 * 100vw) + 50px);
  padding: 0 calc(10 / 375 * 100vw);
}
.item {
  border: 1px solid rgba(188, 188, 188, 1);
  border-radius: calc(4 / 375 * 100vw);
  margin: calc(10 / 375 * 100vw) 0;
}
.item .title {
  padding: 0 calc(10 / 375 * 100vw);
  display: flex;
  align-items: center;
  height: calc(40 / 375 * 100vw);
  border-bottom: 1px solid rgba(188, 188, 188, 1);
  font-size: calc(16 / 375 * 100vw);
  font-weight: bold;
}
.item .value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(10 / 375 * 100vw);
  font-size: calc(14 / 375 * 100vw);
}
.item .value span {
  font-size: calc(36 / 375 * 100vw);
  font-weight: bold;
}
.item .value .i {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.item .value .i .c {
  width: calc(10 / 375 * 100vw);
  height: calc(10 / 375 * 100vw);
  background-color: #ff6600;
  margin-right: calc(10 / 375 * 100vw);
}
.item .value .i .icon {
  width: calc(25 / 375 * 100vw);
}
.item .value .i .c.zeng {
  background-color: #ff0000;
}
.item .value .i.zeng {
  color: #ff0000;
}
.item .value .i .c.jiang {
  background-color: #008000;
}
.item .value .i.jiang {
  color: #008000;
}
.schedule {
  width: 100%;
}
.schedule .echartsClass {
  width: 100%;
  height: calc(250 / 375 * 100vw);
  margin: 0 auto;
}
.pay {
  width: 100%;
}
.pay .echartsClass {
  width: 100%;
  height: calc(250 / 375 * 100vw);
  margin: 0 auto;
}
.total {
  width: 100%;
}
.total .echartsClass {
  width: 100%;
  height: calc(250 / 375 * 100vw);
  margin: 0 auto;
}
.item .value .i .name {
  display: flex;
  align-items: center;
}
.item .value .i .num {
  width: calc(30 / 375 * 100vw);
  height: calc(30 / 375 * 100vw);
  border-radius: calc(4 / 375 * 100vw);
  background-color: #ff0000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: calc(20 / 375 * 100vw);
}
</style>
