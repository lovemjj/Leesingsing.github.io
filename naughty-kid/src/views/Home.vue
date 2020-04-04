<template>
  <div class="index">
    <div class="search">
      <div class="value">
        <div class="name">咨询接待日期：</div>
        <el-radio-group v-model="date" size="small">
          <el-radio-button label="本日"></el-radio-button>
          <el-radio-button label="本周"></el-radio-button>
          <el-radio-button label="本月"></el-radio-button>
          <el-radio-button label="本年"></el-radio-button>
          <el-radio-button label="自定义"></el-radio-button>
        </el-radio-group>
        <el-date-picker :disabled="dateDisabled" v-model="dates" type="daterange" size="small" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        <div class="name">机构门店：</div>
        <el-select v-model="shop" placeholder="请选择" size="small">
          <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button size="small" type="primary">查询</el-button>
    </div>
    <div class="times">
      <div class="item" v-for="(item, index) in 5" :key="index">
        <div class="title">
          顾客数量统计
        </div>
        <div class="value">
          <div class="num">
            <span>
              256
            </span>
            人
          </div>
          <div class="type">
            <div class="i">
              <div class="c"></div>
              同比
            </div>
            <div class="i">
              <div class="c"></div>
              环比
            </div>
          </div>
          <div class="percent">
            <div class="i zeng">
              8.5%
              <div class="icon">
                <img src="../assets/app/zeng.svg" alt="">
              </div>
            </div>
            <div class="i jiang">
              4.5%
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
      <div class="item">
        <div class="title">
          会员卡充值统计
        </div>
        <div class="value">
          <div class="i">
            <div class="name">
              <div class="num">
                1
              </div>
              <div>刘女士</div>
            </div>
            <div class="money">4566元</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">
          会员卡充值统计
        </div>
        <div class="value">
          <div class="i">
            <div class="name">
              <div class="num">
                1
              </div>
              <div>刘女士</div>
            </div>
            <div class="money">4566元</div>
          </div>
        </div>
      </div>
      <div class="item last">
        <div class="title">
          会员卡充值统计
        </div>
        <div class="value">
          <div class="i">
            <div class="name">
              <div class="num">
                1
              </div>
              <div>刘女士</div>
            </div>
            <div class="money">4566元</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import echarts from 'echarts'
export default {
  name: 'home',
  components: {

  },
  data () {
    return {
      date: '',
      dates: [],
      dateDisabled: true,
      shop: '',
      shops: [
        {
          value: 0,
          name: '熊孩子小儿推拿（锦绣东苑店）'
        },
        {
          value: 1,
          name: '熊孩子小儿推拿（新北万达店）'
        }
      ]
    }
  },
  watch: {
    date (val) {
      this.dateDisabled = true
      if (val === '本日') {
        this.dates = [moment().startOf('day').format(), moment().endOf('day').format()]
      }
      if (val === '本周') {
        this.dates = [moment().startOf('week').format(), moment().endOf('week').format()]
      }
      if (val === '本月') {
        this.dates = [moment().startOf('month').format(), moment().endOf('month').format()]
      }
      if (val === '本年') {
        this.dates = [moment().startOf('year').format(), moment().endOf('year').format()]
      }
      if (val === '自定义') {
        this.dates = []
        this.dateDisabled = false
      }
    }
  },
  mounted () {
    this.date = '本周'
    let scheduleChart = echarts.init(document.getElementById('scheduleId'))
    let payChart = echarts.init(document.getElementById('payId'))
    let totalChart = echarts.init(document.getElementById('totalId'))
    let rechargeChart = echarts.init(document.getElementById('rechargeId'))
    let scheduleOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'auto',
        data: ['已完成', '未完成', '执行中', '执行完成', '收费待执行', '已开单', '咨询接待', '已终止']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: [0, '30%'],

          label: {
            position: 'inner'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 17, name: '已完成' },
            { value: 42, name: '未完成' },
            { value: 13, name: '已终止' }
          ]
        },
        {
          name: '访问来源',
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
          data: [
            { value: 17, name: '已完成' },
            { value: 5, name: '执行中' },
            { value: 8, name: '执行完成' },
            { value: 8, name: '收费待执行' },
            { value: 11, name: '已开单' },
            { value: 10, name: '咨询接待' },
            { value: 13, name: '已终止' }
          ]
        }
      ]
    }
    let payOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['会员卡', '现金', '支付宝', '微信', '信用卡']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '会员卡' },
            { value: 310, name: '现金' },
            { value: 234, name: '支付宝' },
            { value: 135, name: '微信' },
            { value: 1548, name: '信用卡' }
          ],
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
    let totalOption = {
      xAxis: {
        type: 'category',
        data: ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05', '2020-01-06', '2020-01-07']
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
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        },
        {
          label: {
            show: true,
            position: 'bottom'
          },
          data: [60, 100, 90, 80, 70, 40, 50],
          type: 'line'
        }
      ]
    }
    let rechargeOption = {
      xAxis: {
        type: 'category',
        data: ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05', '2020-01-06', '2020-01-07']
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
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        },
        {
          label: {
            show: true,
            position: 'top'
          },
          data: [60, 100, 90, 80, 70, 40, 50],
          type: 'line'
        }
      ]
    }
    scheduleChart.setOption(scheduleOption)
    payChart.setOption(payOption)
    totalChart.setOption(totalOption)
    rechargeChart.setOption(rechargeOption)
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
.item .value .i.zeng {
  color: #ff0000;
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
.last {
  margin-right: calc(642 / 1588 * 100%);
}
.xiaoxi-list {
  width: 600px;
  height: 300px;
}
</style>
