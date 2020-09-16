<template>
  <div class="dangan">
    <div class="search">
      <div class="value">
        <div class="name">机构门店：</div>
        <el-select v-model="branch_id" filterable default-first-option size="small">
          <el-option v-for="item in $store.state.branches" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <div class="name second">顾客姓名：</div>
        <el-input v-model="name" size="small" suffix-icon="el-icon-search" clearable></el-input>
      </div>
      <el-button size="small" type="primary" @click="getCustomers(1)">查询</el-button>
    </div>
    <div class="list item">
      <div class="title">
        顾客列表
      </div>
      <el-table
        ref="customers"
        :data="customers"
        border
        style="width: 100%"
        highlight-current-row
        @current-change="getInfo">
        <el-table-column
          prop="id"
          label="顾客ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="顾客姓名">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别">
          <template slot-scope="scope">
            <div>{{scope.row.gender === 1 ? '男' : '女'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="caozuo"
          label="操作"
          width="60">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="getChangeCustomer(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="customersTotal"
        :current-page="customersPage"
        @current-change="getCustomers">
      </el-pagination>
    </div>
    <div class="info item" v-if="customer.id">
      <div class="title">
        顾客档案
      </div>
      <el-tabs v-model="type" type="card">
        <el-tab-pane label="基本信息" name="base">
          <div class="info-title">
            基本信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                顾客姓名：
              </div>
              <div class="info-item-value">
                {{customer.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                顾客ID：
              </div>
              <div class="info-item-value">
                {{customer.id}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                性别；
              </div>
              <div class="info-item-value">
                {{customer.gender === 1 ? '男' : '女'}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                年龄：
              </div>
              <div class="info-item-value">
                {{customer.age}}岁
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                出生年月日：
              </div>
              <div class="info-item-value">
                {{customer.birthday}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                联系电话：
              </div>
              <div class="info-item-value">
                {{customer.contact}}
              </div>
            </div>
            <div class="info-item all">
              <div class="info-item-name">
                首次建档机构/门店：
              </div>
              <div class="info-item-value">
                {{customer.createdWhere.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档人：
              </div>
              <div class="info-item-value">
                {{customer.createdBy.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档时间：
              </div>
              <div class="info-item-value">
                {{customer.createdAt}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                基本信息最后更新人：
              </div>
              <div class="info-item-value">
                {{customer.updatedBy.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新时间：
              </div>
              <div class="info-item-value">
                {{customer.updatedAt}}
              </div>
            </div>
          </div>
          <div class="info-title">
            最近一次陪同人员信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                陪同人员类型：
              </div>
              <div class="info-item-value">
                {{customer.partnerType.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                其他类型说明：
              </div>
              <div class="info-item-value">
                {{customer.partnerType.otherPartner}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                陪同人员姓名：
              </div>
              <div class="info-item-value">
                {{customer.partnerName}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                陪同人员手机号：
              </div>
              <div class="info-item-value">
                {{customer.partnerContact}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新人：
              </div>
              <div class="info-item-value">
                {{customer.partnerUpdateBy.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新时间：
              </div>
              <div class="info-item-value">
                {{customer.partnerUpdatedAt}}
              </div>
            </div>
          </div>
          <div class="info-title">
            消费信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                本店消费次数：
              </div>
              <div class="info-item-value">
                {{customer.consumptionCount}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                合计消费次数：
              </div>
              <div class="info-item-value">
                {{customer.totalConsumptionCount}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                本店消费金额：
              </div>
              <div class="info-item-value">
                {{customer.consumptionSum}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                合计消费金额：
              </div>
              <div class="info-item-value">
                {{customer.totalConsumptionSum}}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务信息" name="serve">
          <el-table
            :data="massages"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="createdAt"
              label="录入时间">
            </el-table-column>
            <el-table-column
              label="机构/门店">
            </el-table-column>
            <el-table-column
              label="健康管理师">
              <template slot-scope="scope">
                <div>{{scope.row.diagnosedBy.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="症状">
              <template slot-scope="scope">
                <div v-for="item in scope.row.symptoms" :key="item.id">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="体质辨证">
              <template slot-scope="scope">
                <div v-for="item in scope.row.constitutions" :key="item.id">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="调理方案">
              <template slot-scope="scope">
                <div v-for="item in scope.row.schemes" :key="item.id">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="调理项目">
              <template slot-scope="scope">
                <div v-for="item in scope.row.items" :key="item.id">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="技师">
              <template slot-scope="scope">
                <div>{{scope.row.assigned.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="合计费用">
            </el-table-column>
            <el-table-column
              label="当前状态">
              <template slot-scope="scope">
                <div>{{scope.row.status === 0 ? '咨询接待' : scope.row.status === 1 ? '开单计费' : scope.row.status === 2 ? '收费执行' : scope.row.status === 3 ? '执行中' : scope.row.status === 4 ? '已执行' : scope.row.status === 5 ? '家长已确认' : ''}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="getMassageInfo(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="customersTotal"
            :current-page="customersPage"
            @current-change="getMassages">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="修改顾客信息" width="850px" :visible.sync="changeInfoPop">
      <div class="change-user-info">
        <div class="change-user-info-item">
          <div class="title">
            基本信息
          </div>
          <el-form :model="info" label-width="120px" size="small">
            <el-form-item label="顾客姓名:">
              <el-input v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="顾客ID:">
              {{info.id}}
            </el-form-item>
            <el-form-item label="性别:">
              <el-radio v-model="info.gender" :label="1">男</el-radio>
              <el-radio v-model="info.gender" :label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="出生年月日:">
              <el-date-picker
                v-model="info.birthday"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input v-model="info.contact"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="change-user-info-line">
          <div></div>
        </div>
        <div class="change-user-info-item">
          <div class="title">
            最近一次陪同人员信息
          </div>
          <el-form :model="info" label-width="120px" size="small">
            <el-form-item label="陪同人员类型:">
              <el-radio-group v-model="info.partnerType.number">
                <el-radio :label="item.number" v-for="(item, index) in partnerTypes" :key="index">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="其他类型说明:">
              <el-input v-model="info.otherPartner"></el-input>
            </el-form-item>
            <el-form-item label="陪同人员姓名:">
              <el-input v-model="info.partnerName"></el-input>
            </el-form-item>
            <el-form-item label="陪同人员手机号:">
              <el-input v-model="info.partnerContact"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="changeCustomer">保存修改</el-button>
        <el-button size="small" type="primary" @click="changeInfoPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog class="dislog-jiedai" :fullscreen="true" :visible.sync="popInfo" width="90%">
      <div class="dislog-jiedai-main">
        <div class="dislog-jiedai-left">
          <el-tree :data="data" :props="defaultProps" ></el-tree>
        </div>
        <div class="dislog-jiedai-right">
          <div class="dislog-jiedai-title">
            <div>
              {{massageInfo.status === 0 ? '咨询接待' : massageInfo.status === 1 ? '开单计费' : massageInfo.status === 2 ? '收费执行' : massageInfo.status === 3 ? '执行中' : massageInfo.status === 4 ? '已执行' : massageInfo.status === 5 ? '家长已确认' : ''}}
            </div>
            <div class="dislog-jiedai-title-info">
              <div class="dislog-jiedai-name">
                序号：
              </div>
              <div class="dislog-jiedai-value">
                {{massageInfo.id}}
              </div>
              <div class="dislog-jiedai-name">
                儿童健康管理师：
              </div>
              <div class="dislog-jiedai-value">
                {{massageInfo.diagnosedBy.name}}
              </div>
              <div class="dislog-jiedai-name">
                录入时间：
              </div>
              <div class="dislog-jiedai-value">
                {{massageInfo.createdAt}}
              </div>
            </div>
          </div>
          <div class="dislog-jiedai-step">
            <el-steps :active="massageInfo.status + 1" align-center finish-status="success">
              <el-step title="咨询接待"></el-step>
              <el-step title="开单计费"></el-step>
              <el-step title="收费执行"></el-step>
              <el-step title="执行中"></el-step>
              <el-step title="已执行"></el-step>
              <el-step title="家长确认"></el-step>
            </el-steps>
          </div>
          <div class="dislog-jiedai-info">
            <div class="dislog-jiedai-info-title">
              调理咨询单
            </div>
            <el-form :inline="true" :model="massageInfo" class="demo-form-inline" size="mini" disabled>
              <el-form-item label="咨询日期:">
                <el-date-picker v-model="massageInfo.consultedAt" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="咨询方式:">
                <el-select v-model="massageInfo.consultMethod" placeholder="咨询方式">
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约日期:">
                <el-date-picker v-model="massageInfo.appointmentDate" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="调理日期:">
                <el-date-picker v-model="massageInfo.treatmentDate" type="date">
                </el-date-picker>
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>调理人信息</div>
                <div class="line"></div>
              </div>
              <el-form-item label="调理人姓名:">
                <el-input v-model="massageInfo.customer.name"></el-input>
              </el-form-item>
              <el-form-item label="出生年月:">
                <el-date-picker v-model="massageInfo.customer.birthday" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="顾客档案编号:">
                <el-input v-model="massageInfo.customer.id"></el-input>
              </el-form-item>
              <el-form-item label="性别:">
                <el-radio-group v-model="massageInfo.customer.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否初审:">
                <el-radio-group v-model="massageInfo.customer.firstVisit">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="当前疗程已调理次数:" class="short">
                <el-input v-model="massageInfo.customer.course[0]"></el-input>
                /
                <el-input v-model="massageInfo.customer.course[1]"></el-input>
              </el-form-item>
              <el-form-item label="调理人手机号:">
                <el-input v-model="massageInfo.customer.contact"></el-input>
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>会员卡信息</div>
                <div class="line"></div>
              </div>
              <el-form-item label="会员卡卡号:">
                <el-input v-model="massageInfo.membershipCard.number"></el-input>
              </el-form-item>
              <el-form-item label="持卡人姓名:">
                <el-input v-model="massageInfo.membershipCard.name"></el-input>
              </el-form-item>
              <el-form-item label="持卡人电话:">
                <el-input v-model="massageInfo.membershipCard.contact"></el-input>
              </el-form-item>
              <!-- <span class="chongzhi">会员卡充值>></span> -->
              <el-form-item label="会员卡级别:">
                <el-select v-model="massageInfo.membershipCard.level">
                  <el-option
                    :label="item.name"
                    :value="item.number"
                    v-for="item in levels" :key="item.number">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="卡内充值余额:">
                <el-input v-model="massageInfo.membershipCard.balance"></el-input>
              </el-form-item>
              <el-form-item label="卡内赠送余额:">
                <el-input v-model="massageInfo.membershipCard.bonuse"></el-input>
              </el-form-item>
              <el-form-item label="会员卡折扣:">
                <el-input v-model="massageInfo.membershipCard.discount"></el-input>
              </el-form-item>
              <!-- <el-form-item label="赠送项目剩余情况:">
                小儿推拿（5次）；成人推拿（3次）
              </el-form-item> -->
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>本次陪同人员信息</div>
                <div class="line"></div>
              </div>
              <el-form-item label="陪同人员类型:" class="whole">
                <el-radio-group v-model="massageInfo.partnerType.number">
                  <el-radio :label="item.number" v-for="(item, index) in partnerTypes" :key="index">{{item.name}}</el-radio>
                <!-- <el-radio label="7">
                  <div class="else">其他</div>
                  <el-input v-model="orderForm.age"></el-input>
                </el-radio> -->
              </el-radio-group>
              </el-form-item>
              <el-form-item label="陪同人姓名:">
                <el-input v-model="massageInfo.partnerName"></el-input>
              </el-form-item>
              <el-form-item label="陪同人手机号:">
                <el-input v-model="massageInfo.partnerContact"></el-input>
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>本次咨询症状</div>
                <div class="line"></div>
              </div>
              <el-form-item label="本次调理前症状自我描述（家长陪同可补充）:" class="whole">
                <el-select v-model="massageInfo.symptoms" multiple default-first-option value-key="number">
                  <el-option :label="item.name" :value="{number: item.number}" v-for="(item, index) in symptoms" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="其他症状说明:" class="whole">
                <el-input type="textarea" :rows="2" v-model="massageInfo.symptomsDescription"></el-input>
              </el-form-item>
              <el-form-item label="上传附件（如舌苔照）:" class="whole">
                <div class="avatar-uploader">
                  <img :src="item" class="avatar" v-for="(item, index) in massageInfo.appendixes" :key="index">
                </div>
              </el-form-item>
              <el-form-item label="咨询接待人:">
                <el-input v-model="massageInfo.createdBy.name"></el-input>
              </el-form-item>
            </el-form>
            <div class="dislog-jiedai-info-title" v-if="massageInfo.status >= 0">
              熊孩子中医体质辩证调理方案
            </div>
            <el-form :inline="true" :model="info" class="demo-form-inline" size="mini" disabled v-if="massageInfo.status >= 0">
              <el-form-item label="调理总时长（分钟）:">
                <el-input v-model="massageInfo.duration"></el-input>
              </el-form-item>
              <el-form-item label="调理总费用（￥）:">
                <el-input v-model="massageInfo.price"></el-input>
              </el-form-item>
              <div class="else" v-if="massageInfo.membershipCard.balance || massageInfo.membershipCard.bonus">
                (会员卡可用余额:{{massageInfo.membershipCard.balance || 0}}+{{massageInfo.membershipCard.bonus || 0}})
              </div>
              <el-form-item label="专家团体体质辩证意见:" class="whole">
                <el-select v-model="massageInfo.constitutions" multiple default-first-option value-key="number">
                  <el-option :label="item.name" :value="{number: item.number}" v-for="(item, index) in constitutions" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <div class="whole">
                <el-form-item label="专家团体设定调理方案:" class="whole">
                  <el-select v-model="massageInfo.schemes" multiple default-first-option value-key="id">
                    <el-option :label="item.name" :value="{id: item.id}" v-for="(item, index) in schemes" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="预计调理次数:" class="short">
                  <el-input v-model="massageInfo.customer.course[1]"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="本次调理项目意见:" class="whole">
                <el-select v-model="massageInfo.items" multiple default-first-option value-key="id">
                  <el-option :label="item.name" :value="{id: item.id}" v-for="(item, index) in items" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="指派技师:">
                <el-input v-model="massageInfo.assigned.name"></el-input>
              </el-form-item>
              <el-form-item label="诊断开方人:">
                <el-input v-model="massageInfo.diagnosedBy.name"></el-input>
              </el-form-item>
            </el-form>
            <div class="dislog-jiedai-info-title" v-if="massageInfo.status >= 1">
              收费情况
            </div>
            <div class="dislog-jiedai-info-pay" v-if="massageInfo.status >= 1">
              <div class="dislog-jiedai-info-attention">
                <div class="icon">
                  <img src="../assets/app/attention.svg" alt="">
                </div>
                本系统不做收费，仅做费用登记。确认收费前请确保顾客已经通过收费系统完成付费。
              </div>
              <div class="dislog-jiedai-info-item">
                确认收费人：{{massageInfo.chargedBy.name}}
              </div>
              <div class="dislog-jiedai-info-item">
                <div class="i">本次可用的赠送服务次数：{{massageInfo.availableBonusServicesCount}}次</div>
                <div class="i">本次是否使用赠送服务：<el-checkbox v-model="massageInfo.useBonusService" disabled>使用</el-checkbox>
                </div>
              </div>
              <div class="dislog-jiedai-info-item">
                实际需确认收费费用：<div class="dislog-jiedai-info-money">￥{{massageInfo.useBonusService ? massageInfo.priceAfterBonus : massageInfo.price}}</div>
              </div>
            </div>
            <div class="dislog-jiedai-info-title" v-if="massageInfo.status >= 3">
              执行情况
            </div>
            <div class="dislog-jiedai-info-pay" v-if="massageInfo.status >= 3">
              <div class="dislog-jiedai-info-item">
                实际执行技师：张医生
              </div>
              <div class="dislog-jiedai-info-item">
                开始执行时间：2020-02-02
              </div>
              <div class="dislog-jiedai-info-item">
                执行完成时间：2020-02-02
              </div>
              <div class="dislog-jiedai-info-item">
                家长确认时间（拍照上传时间）：2020-02-02
              </div>
              <div class="dislog-jiedai-info-item">
                家长确认签字（纸质调理单）：
                <div class="avatar-uploader">
                  <img v-if="massageInfo.signature" :src="massageInfo.signature" class="avatar">
                </div>
              </div>
            </div>
            <div class="dislog-jiedai-info-title" v-if="massageInfo.status >= 4">
              客户满意度
            </div>
            <div class="dislog-jiedai-info-pay" v-if="massageInfo.status >= 4">
              <div class="dislog-jiedai-info-item">
                服务态度：<el-rate v-model="massageInfo.satisfaction[0]"></el-rate>
              </div>
              <div class="dislog-jiedai-info-item">
                服务流程规范：<el-rate v-model="massageInfo.satisfaction[1]"></el-rate>
              </div>
              <div class="dislog-jiedai-info-item">
                服务时间标准：<el-rate v-model="massageInfo.satisfaction[2]"></el-rate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      branch_id: '',
      name: '',
      customers: [],
      customersPage: 0,
      customersTotal: 0,
      partnerTypes: [],
      changeInfoPop: false,
      info: {
        partnerType: {}
      },
      popInfo: false,
      type: 'base',
      customer: {
        createdWhere: {},
        createdBy: {},
        updatedBy: {},
        partnerType: {},
        partnerUpdateBy: {}
      },
      massages: [],
      massagesPage: 0,
      massagesTotal: 0,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      massageInfo: {
        consultedAt: '',
        consultMethod: '',
        appointmentDate: '',
        treatmentDate: '',
        customer: {
          name: '',
          birthday: '',
          id: '',
          gender: 1,
          firstVisit: true,
          course: [0, 0]
        },
        membershipCard: {},
        partnerType: {},
        partnerName: '',
        partnerContact: '',
        symptoms: [],
        appendixes: [],
        createdBy: {},
        items: [],
        schemes: [],
        assigned: {},
        diagnosedBy: {},
        amount: '',
        useBonusService: false,
        pay: [],
        satisfaction: [],
        signature: '',
        chargedBy: {}
      },
      levels: [
        {
          number: 1,
          name: '铜卡会员'
        },
        {
          number: 2,
          name: '银卡会员'
        },
        {
          number: 3,
          name: '金卡会员'
        }
      ],
      symptoms: [],
      constitutions: [],
      schemes: [],
      items: [],
      info_id: ''
    }
  },
  mounted () {
    this.branch_id = this.$store.state.branch_id
    this.getCustomers(1)
    this.getPartnerTypes()
    this.getSymptoms()
    this.getConstitutions()
    this.getSchemes()
    this.getItems()
  },
  methods: {
    getCustomers (e) {
      const t = this
      t.customersPage = e
      let url = '/api/customer'
      if (t.branch_id) {
        url = `/api/branch/${t.branch_id}/customer`
      }
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url,
        params: {
          page: t.customersPage - 1,
          size: 10,
          like: t.name
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.customers = res.data.data.records
          t.customersTotal = res.data.data.total
          if (t.customers.length > 0) {
            let arr = t.customers.filter((ele) => {
              return ele.id === t.customer.id
            })
            if (arr.length > 0) {
              t.$refs['customers'].setCurrentRow(arr[0])
            } else {
              t.$refs['customers'].setCurrentRow(t.customers[0])
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
    getChangeCustomer (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/branch/${t.branch_id}/customer/${e.id}`
      }).then((res) => {
        if (res.data.code === 200) {
          t.info = res.data.data
          t.changeInfoPop = true
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    changeCustomer () {
      const t = this
      let arr = t.partnerTypes.filter((ele) => {
        return ele.number === t.info.partnerType.number
      })
      axios({
        method: 'put',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/customer/${t.info.id}`,
        data: {
          name: t.info.name,
          birthday: t.info.birthday,
          gender: t.info.gender,
          partnerName: t.info.partnerName,
          contact: t.info.contact,
          partnerContact: t.info.partnerContact,
          otherPartner: t.info.otherPartner,
          partnerType: arr[0]
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          t.getCustomers(1)
          t.changeInfoPop = false
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
    getInfo (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/branch/${t.branch_id}/customer/${e.id}`
      }).then((res) => {
        if (res.data.code === 200) {
          t.customer = res.data.data
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
      this.info_id = e.id
      this.getMassages(1)
    },
    getMassages (e) {
      const t = this
      t.massagesPage = e
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/customer/${t.info_id}/massage-order`,
        params: {
          page: t.massagesPage - 1,
          size: 10
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.massages = res.data.data.records
          t.massagesTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getMassageInfo (e) {
      this.massageInfo = e
      this.popInfo = true
    },
    getSymptoms () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/4/item'
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
    getConstitutions () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/5/item'
      }).then((res) => {
        if (res.data.code === 200) {
          t.constitutions = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getSchemes () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/massage-scheme'
      }).then((res) => {
        if (res.data.code === 200) {
          t.schemes = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getItems () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/massage-item'
      }).then((res) => {
        if (res.data.code === 200) {
          t.items = res.data.data.records
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
.search .value .name {
  white-space: nowrap;
}
.search .value .second {
  padding-left: 50px;
}
.search .value .el-select {
  width: 300px;
  min-width: 300px;
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
.el-pagination {
  text-align: right;
  padding-top: 10px;
}
.change-user-info {
  display: flex;
}
.change-user-info .title {
  font-size: 14px;
  color: #333333;
  font-weight: bold;
}
.change-user-info-item {
  width: 50%;
}
.change-user-info-line {
  padding: 0 20px;
}
.change-user-info-line div {
  width: 1px;
  background-color: #999999;
  height: 100%;
}
.change-user-info .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
</style>
