<template>
  <div class="index">
    <div class="search">
      <div class="value">
        <div class="name">咨询接待日期：</div>
        <el-radio-group v-model="date" size="small">
          <el-radio-button :label="index" v-for="(item, index) in dates" :key="index">{{item.name}}</el-radio-button>
        </el-radio-group>
        <el-date-picker :readonly="dateDisabled" value-format="yyyy-MM-dd" v-model="dates[date].label" type="daterange" size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <div class="name">机构门店：</div>
        <el-select v-model="branch_id" placeholder="请选择" size="small">
          <el-option v-for="item in $store.state.branches" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-button size="small" type="primary" @click="getWorkbench">查询</el-button>
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
          <div class="num"><span>{{data.massageStatistic.count}}</span>人</div>
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
          <div class="num"><span>{{data.consumptionStatistic.count}}</span>人</div>
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
          <div class="num"><span>{{data.rechargeStatistic.count}}</span>人</div>
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
      <div class="item schedule">
        <div class="title">
          服务进度统计
        </div>
        <div class="value">
          <div id="scheduleId" class="echartsClass"></div>
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
import { Loading } from 'element-ui'
import moment from 'moment'
import echarts from 'echarts'
export default {
  components: {

  },
  data () {
    return {
      date: 0,
      dates: [
        {
          label: [moment().startOf('day').format('YYYY-MM-DD'), moment().endOf('day').format('YYYY-MM-DD')],
          name: '本日'
        },
        {
          label: [moment().startOf('week').format('YYYY-MM-DD'), moment().endOf('week').format('YYYY-MM-DD')],
          name: '本周'
        },
        {
          label: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
          name: '本月'
        },
        {
          label: [moment().startOf('year').format('YYYY-MM-DD'), moment().endOf('year').format('YYYY-MM-DD')],
          name: '本年'
        },
        {
          label: ['', ''],
          name: '自定义'
        }
      ],
      dateDisabled: true,
      branch_id: '',
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
  watch: {
    date (val) {
      if (val === 4) {
        this.dateDisabled = false
      } else {
        this.dateDisabled = true
      }
    }
  },
  mounted () {
    this.branch_id = this.$store.state.branch_id
    this.getWorkbench()
  },
  methods: {
    getWorkbench () {
      const t = this
      Loading.service()
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/workbench',
        params: {
          after: t.dates[t.date].label[0],
          before: t.dates[t.date].label[1],
          branchId: t.branch_id
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.data = res.data.data
          let scheduleChart = echarts.init(document.getElementById('scheduleId'))
          let payChart = echarts.init(document.getElementById('payId'))
          let totalChart = echarts.init(document.getElementById('totalId'))
          let rechargeChart = echarts.init(document.getElementById('rechargeId'))
          let data0 = []
          let data1 = []
          let data2 = []
          let data3 = []
          let data4 = []
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

          let scheduleOption = {
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
                label: {
                  formatter: '  {b|{b}:}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                },
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

          let payOption = {
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
          let data5 = []
          let data6 = []
          for (const i of this.data.histograms[0].yaxis) {
            data5.push(i.value)
            data6.push(i.proportion)
          }
          let totalOption = {
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
          let data7 = []
          let data8 = []
          for (const i of this.data.histograms[1].yaxis) {
            data7.push(i.value)
            data8.push(i.proportion)
          }
          let rechargeOption = {
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
        Loading.service().close()
      })
    }
  }
}
</script>
<style scoped>
.index {
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 45px);
  background-color: rgba(234, 234, 234, 0.8);
  padding: 10px;
}
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
}
.search .value {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
.search .value .el-radio-group {
  margin-right: 20px;
}
.search .value .el-range-editor {
  margin-right: 100px;
}
.search .value .el-select {
  width: 300px;
}
.times {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 0;
}
.item {
  width: calc(20% - 10px);
  background-color: #ffffff;
  border: 1px solid rgba(188, 188, 188, 1);
  border-radius: 4px;
  margin: 5px 0;
}
.item .title {
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid rgba(188, 188, 188, 1);
  font-size: 16px;
  font-weight: bold;
}
.item .value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-size: 14px;
}
.item .value span {
  font-size: 36px;
  font-weight: bold;
}
.item .value .i {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.item .value .i .c {
  width: 10px;
  height: 10px;
  background-color: #ff6600;
  margin-right: 10px;
}
.item .value .i .icon {
  width: 25px;
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
  width: calc(60% - 7px);
}
.schedule .echartsClass {
  width: 901px;
  height: 400px;
  margin: 0 auto;
}
.pay {
  width: calc(40% - 7px);
}
.pay .echartsClass {
  width: 583px;
  height: 400px;
  margin: 0 auto;
}
.total {
  width: calc(50% - 7px);
}
.total .echartsClass {
  width: 742px;
  height: 400px;
  margin: 0 auto;
}
.item .value .i .name {
  display: flex;
  align-items: center;
}
.item .value .i .num {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: #ff0000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 20px;
}
.item:last-child {
  margin-right: calc(642 / 1588 * 100%);
}
.xiaoxi-list {
  width: 600px;
  height: 300px;
}
</style>
