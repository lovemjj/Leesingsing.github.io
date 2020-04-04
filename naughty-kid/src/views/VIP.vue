<template>
  <div class="dangan">
    <div class="search">
      <div class="value">
        <div class="name">机构门店：</div>
        <el-select v-model="shop" filterable size="small">
          <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        <div class="name second">顾客姓名：</div>
        <el-select v-model="name" filterable size="small">
          <el-option v-for="item in names" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        <div class="name second">会员卡号：</div>
        <el-select v-model="name" filterable size="small">
          <el-option v-for="item in names" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
        <div class="name second">联系电话：</div>
        <el-select v-model="name" filterable size="small">
          <el-option v-for="item in names" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="btns">
        <el-button size="small" type="primary">查询</el-button>
        <el-button size="small" type="info">办卡</el-button>
      </div>
    </div>
    <div class="list item">
      <div class="title">
        会员卡列表
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="num"
          label="会员卡号"
          width="110">
        </el-table-column>
        <el-table-column
          prop="name"
          label="持卡人姓名"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="caozuo"
          label="操作"
          width="60">
          <div>修改</div>
        </el-table-column>
      </el-table>
    </div>
    <div class="info item">
      <div class="title">
        会员卡信息
        <el-button size="small" type="primary">会员卡充值</el-button>
      </div>
      <el-tabs v-model="infoName" type="card" @tab-click="infoClick">
        <el-tab-pane label="基本信息" name="base">
          <div class="info-title">
            持卡人信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                顾客姓名：
              </div>
              <div class="info-item-value">
                赵蓬蓬
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                顾客ID：
              </div>
              <div class="info-item-value">
                202002020002
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                性别：
              </div>
              <div class="info-item-value">
                女
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                年龄：
              </div>
              <div class="info-item-value">
                4岁
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                出生年月日：
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                联系电话：
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item all">
              <div class="info-item-name">
                首次建档机构/门店：
              </div>
              <div class="info-item-value">
                熊孩子小儿推拿（锦绣东苑店）
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档人：
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档时间：
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                基本信息最后更新人：
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新时间：
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
          </div>
          <div class="info-title">
            会员卡信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                顾客姓名：
              </div>
              <div class="info-item-value">
                赵蓬蓬
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                顾客ID：
              </div>
              <div class="info-item-value">
                202002020002
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                性别：
              </div>
              <div class="info-item-value">
                女
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                年龄：
              </div>
              <div class="info-item-value">
                4岁
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                出生年月日：
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                联系电话：
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item all">
              <div class="info-item-name">
                首次建档机构/门店：
              </div>
              <div class="info-item-value">
                熊孩子小儿推拿（锦绣东苑店）
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档人：
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档时间：
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                基本信息最后更新人：
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新时间：
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
          </div>
          <div class="info-title">
            会员赠送服务信息
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 50%">
            <el-table-column
              prop="num"
              label="赠送类别"
              width="110">
            </el-table-column>
            <el-table-column
              prop="name"
              label="调理方案"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="调理项目"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="剩余次数">
              <div>修改</div>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="余额变动信息" name="money">
          <el-table
            :data="serveTableData"
            border
            style="width: 100%">
            <el-table-column
              prop="num"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="in_time"
              label="录入时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="name"
              label="调理人姓名"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="id"
              label="调理人编号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="yisheng"
              label="健康管理师"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="zhengzhuang"
              label="症状"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="tizhi"
              label="体质辨证"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="fangan"
              label="调理方案"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="xiangmu"
              label="调理项目"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="jishi"
              label="技师"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="money"
              label="合计费用"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="toll"
              label="是否收费"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="zhuangtai"
              label="当前状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="赠送服务变动明细" name="serve">
          <el-table
            :data="serveTableData"
            border
            style="width: 100%">
            <el-table-column
              prop="num"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="in_time"
              label="录入时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="name"
              label="调理人姓名"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="id"
              label="调理人编号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="yisheng"
              label="健康管理师"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="zhengzhuang"
              label="症状"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="tizhi"
              label="体质辨证"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="fangan"
              label="调理方案"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="xiangmu"
              label="调理项目"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="jishi"
              label="技师"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="money"
              label="合计费用"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="toll"
              label="是否收费"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="zhuangtai"
              label="当前状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="修改会员卡信息" width="400px" :visible.sync="changeVipInfo">
      <div class="info-title">
        基本信息
      </div>
      <el-form :model="VipInfo" label-width="100px" size="small">
        <el-form-item label="持卡人姓名:">
          <el-input v-model="VipInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="会员卡号:">
          <el-input v-model="VipInfo.id"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio v-model="VipInfo.gender" label="man">男</el-radio>
          <el-radio v-model="VipInfo.gender" label="woman">女</el-radio>
        </el-form-item>
        <el-form-item label="出生年月日:">
          <el-date-picker
            v-model="VipInfo.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="年龄（岁）:">
          <el-input v-model="VipInfo.old"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="VipInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label=" 会员卡折扣:">
          <el-input v-model="VipInfo.discount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="changeUserInfo = false">保存修改</el-button>
        <el-button size="small" type="primary" @click="changeUserInfo = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog class="handle" title="会员卡办理" width="1000px" :visible.sync="handleVip">
      <div class="dislog-jiedai-info-attention attention">
        <div class="icon">
          <img src="../assets/app/attention.svg" alt="">
        </div>
        本系统不做会员卡充值，仅做会员卡费用登记。确认充值前请确保顾客已经通过收费系统完成会员卡充值。
      </div>
      <el-form :inline="true" :model="VipInfo" label-width="100px" size="small">
        <div class="info-title">
          会员卡信息
        </div>
        <el-form-item label="会员卡卡号:">
          <el-input v-model="VipInfo.id"></el-input>
        </el-form-item>
        <el-form-item label="会员卡级别:">
          <el-select v-model="VipInfo.step" placeholder="请选择">
            <el-option
              label="一"
              value="1">
            </el-option>
            <el-option
              label="二"
              value="2">
            </el-option>
            <el-option
              label="三"
              value="3">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 会员卡折扣:">
          <el-input v-model="VipInfo.discount"></el-input>
        </el-form-item>
        <el-form-item label="持卡人姓名:">
          <el-input v-model="VipInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="持卡人电话:">
          <el-input v-model="VipInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <div class="el-select">
            <el-radio v-model="VipInfo.gender" label="man">男</el-radio>
            <el-radio v-model="VipInfo.gender" label="woman">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="出生年月日:">
          <el-date-picker
            v-model="VipInfo.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <div class="info-title">
          会员卡信息
        </div>
        <el-form-item label="本次充值金额:">
          <el-input v-model="VipInfo.phone"></el-input>
        </el-form-item>
        <div class="info-title">
          本次充值赠送金额
        </div>
        <el-form-item label="本次赠送金额:">
          <el-input v-model="VipInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="赠送金额有效期至:（不填写表示不限制有效期）" label-width="310px">
          <el-date-picker
            v-model="VipInfo.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <div class="info-title">
          本次充值赠送服务项目
        </div>
        <div class="row">
          <el-form-item label="赠送调理方案:">
            <el-input v-model="VipInfo.phone"></el-input>
            <el-checkbox v-model="VipInfo.phone">全部</el-checkbox>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="赠送调理项目:">
            <el-input v-model="VipInfo.phone"></el-input>
            <el-checkbox v-model="VipInfo.phone">全部</el-checkbox>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="赠送服务有效期至:（不填写表示不限制有效期）" label-width="310px">
            <el-date-picker
              v-model="VipInfo.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="赠送服务次数:">
            <el-input v-model="VipInfo.phone"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="changeUserInfo = false">保存修改</el-button>
        <el-button size="small" type="primary" @click="changeUserInfo = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
      ],
      name: '',
      names: [
        {
          value: 0,
          name: '张三'
        },
        {
          value: 1,
          name: '李四'
        }
      ],
      tableData: [],
      infoName: 'base',
      serveTableData: [],
      changeVipInfo: false,
      VipInfo: {
        name: '',
        id: '',
        gender: 'man',
        birthday: '',
        old: '',
        phone: '',
        discount: ''
      },
      handleVip: true
    }
  },
  mounted () {

  },
  methods: {
    infoClick () {

    }
  }
}
</script>
<style scoped>
.dangan {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 45px);
  background-color: rgba(234, 234, 234, 0.8);
  padding: 10px;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
}
.search .value {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
.search .value .second {
  padding-left: 50px;
}
.search .value .el-select {
  width: 200px;
}
.item {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 125px);
  overflow: auto;
}
.title {
  font-size: 18px;
  border-left: 3px solid #ff9900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.item.list {
  width: calc(420 / 1578 * 100%);
}
.item.info {
  width: calc(1148 / 1578 * 100%);
}
.info-title {
  font-size: 14px;
  border-left: 3px solid #ff9900;
  height: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-weight: bold;
}
.info-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 10px;
}
.info-item {
  width: 50%;
  display: flex;
  align-items: center;
  font-size: 13px;
  padding: 5px 0;
}
.info-item.all {
  width: 100%;
}
.info-item-name {
  width: 150px;
  text-align: right;
}
.el-button--info {
  background-color: #009cff;
  border-color: #009cff;
}
.el-pagination {
  text-align: right;
  padding-top: 10px;
}
.el-date-editor.el-input {
  width: 100%;
}
.attention {
  margin-bottom: 20px;
}
.el-form--inline .el-input {
  width: 200px;
}
.el-form--inline .el-select {
  width: 200px;
}
.el-form--inline .row .el-input {
  width: 600px;
}
.el-input + .el-checkbox {
  margin-left: 20px;
}
</style>
