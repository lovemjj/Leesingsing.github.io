<template>
  <div class="tuina">
    <div class="nav-left">
      <div class="title">
        推拿
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="select(0)" v-if="$store.state.authorities.indexOf('推拿接待') > -1">
        <div class="icon">
          <img src="../assets/app/jiedai.svg" alt="">
        </div>
        <div class="name">推拿接待</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="select(1)" v-if="$store.state.authorities.indexOf('推拿管理') > -1">
        <div class="icon">
          <img src="../assets/app/guanli.svg" alt="">
        </div>
        <div class="name">推拿管理</div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 0">
      <div class="title">
        <div class="step">
          咨询接待
        </div>
        <div class="info">
          <div class="name">
            序号:
          </div>
          <div class="value">
            {{orderForm.id || '未生成'}}
          </div>
          <div class="name">
            儿童健康管理师:
          </div>
          <div class="value">
            {{info.diagnosedBy.name || '未生成'}}
          </div>
          <div class="name">
            录入时间:
          </div>
          <div class="value">
            {{orderForm.createdAt || time}}
          </div>
        </div>
      </div>
      <div class="step-main">
        <div class="step">
          <el-steps :active="orderForm.status + 2" align-center finish-status="success">
            <el-step title="咨询接待"></el-step>
            <el-step title="开单计费"></el-step>
            <el-step title="收费执行"></el-step>
          </el-steps>
        </div>
        <div class="info">
          <div class="info-title">
            调理咨询单
          </div>
          <el-form :inline="true" :model="orderForm" class="demo-form-inline" size="mini">
            <el-form-item label="咨询日期:" prop="consultedAt" required>
              <el-date-picker v-model="orderForm.consultedAt" type="date" value-format="yyyy-MM-dd" :disabled="orderForm.status > -1">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="咨询方式:">
              <el-select v-model="orderForm.consultMethod" placeholder="咨询方式" :disabled="orderForm.status > -1">
                <el-option label="到店咨询" value="0"></el-option>
                <el-option label="电话咨询" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预约日期:">
              <el-date-picker v-model="orderForm.appointmentDate" type="date" value-format="yyyy-MM-dd" :disabled="orderForm.status > -1">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="调理日期:">
              <el-date-picker v-model="orderForm.treatmentDate" type="date" value-format="yyyy-MM-dd" :disabled="orderForm.status > -1">
              </el-date-picker>
            </el-form-item>
            <div class="info-biaoti">
              <div class="line"></div>
              <div>调理人信息</div>
              <div class="line"></div>
            </div>
            <el-form-item label="调理人姓名:" required>
              <el-select v-model="orderForm.customer.name" filterable allow-create @change="getCustomerId" :disabled="orderForm.status > -1">
                <el-option :label="item.name" :value="item.name" v-for="(item, index) in customers" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生年月:">
              <el-date-picker v-model="orderForm.customer.birthday" type="date" value-format="yyyy-MM-dd" :disabled="orderForm.status > -1 || orderForm.customerDis">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="顾客档案编号:">
              <el-input v-model="orderForm.customer.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="性别:">
              <el-radio-group v-model="orderForm.customer.gender" :disabled="orderForm.status > -1 || orderForm.customerDis">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否初诊:">
              <el-radio-group v-model="orderForm.customer.firstVisit" :disabled="orderForm.status > -1 || orderForm.customerDis">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="当前疗程已调理次数:" class="short">
              <el-input v-model="orderForm.customer.course[0]" :disabled="orderForm.status > -1 || orderForm.customerDis"></el-input>
              /
              <el-input v-model="orderForm.customer.course[1]" :disabled="orderForm.status > -1 || orderForm.customerDis"></el-input>
            </el-form-item> -->
            <el-form-item label="调理人手机号:" :error="contactErr">
              <el-input v-model="orderForm.customer.contact" :disabled="orderForm.status > -1 || orderForm.customerDis" @blur="contactErr = ''" @input="contactInput"></el-input>
            </el-form-item>
            <div class="info-biaoti">
              <div class="line"></div>
              <div>会员卡信息</div>
              <div class="line"></div>
            </div>
            <el-form-item label="会员卡卡号:">
              <el-select v-model="orderForm.membershipCard" filterable value-key="id" :disabled="orderForm.status > -1">
                <el-option :label="item.number" :value="item" v-for="(item, index) in membershipCards" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="持卡人姓名:">
              <el-input v-model="orderForm.membershipCard.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="持卡人电话:">
              <el-input v-model="orderForm.membershipCard.contact" disabled></el-input>
            </el-form-item>
            <!-- <span>会员卡充值>></span> -->
            <el-form-item label="会员卡级别:">
              <el-select v-model="orderForm.membershipCard.level" disabled>
                <el-option
                  :label="item.name"
                  :value="item.number"
                  v-for="item in levels" :key="item.number">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卡内充值余额:">
              <el-input v-model="orderForm.membershipCard.balance" disabled></el-input>
            </el-form-item>
            <el-form-item label="卡内赠送余额:">
              <el-input v-model="orderForm.membershipCard.bonus" disabled></el-input>
            </el-form-item>
            <el-form-item label="会员卡折扣:">
              <el-input v-model="orderForm.membershipCard.discount" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="赠送项目剩余情况:" class="whole">
              <div v-for="(item, index) in orderForm.membershipCard.bonusService" :key="index">
                （{{item.times}}次）
              </div>
            </el-form-item> -->
            <div class="info-biaoti">
              <div class="line"></div>
              <div>本次陪同人员信息</div>
              <div class="line"></div>
            </div>
            <el-form-item label="陪同人员类型:">
              <el-radio-group v-model="orderForm.partnerType.number" :disabled="orderForm.status > -1">
                <el-radio :label="item.number" v-for="(item, index) in partnerTypes" :key="index">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="其他陪同人员:" v-if="orderForm.partnerType.number === 7">
              <el-input v-model="orderForm.otherPartner" :disabled="orderForm.status > -1"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="陪同人姓名:">
              <el-input v-model="orderForm.partnerName" :disabled="orderForm.status > -1"></el-input>
            </el-form-item>
            <el-form-item label="陪同人手机号:" :error="partnerContactErr">
              <el-input v-model="orderForm.partnerContact" :disabled="orderForm.status > -1" @blur="partnerContactErr = ''"></el-input>
            </el-form-item>
            <div class="info-biaoti">
              <div class="line"></div>
              <div>本次咨询症状</div>
              <div class="line"></div>
            </div>
            <el-form-item label="本次调理前症状自我描述（家长陪同可补充）:" class="whole" prop="symptoms" required>
              <el-select v-model="orderForm.symptoms" multiple value-key="number" :disabled="orderForm.status > -1">
                <el-option :label="item.name" :value="{number: item.number}" v-for="(item, index) in symptoms" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他症状说明:" class="whole">
              <el-input type="textarea" :rows="2" v-model="orderForm.symptomsDescription" :disabled="orderForm.status > -1"></el-input>
            </el-form-item>
            <el-form-item label="上传附件（如舌苔照）:" class="whole">
              <div style="display: flex;">
                <div class="avatar-uploader" v-for="(item, index) in orderForm.appendixes" :key="index">
                  <img :src="item" class="avatar">
                  <i class="el-icon-error del" @click="delImg(index)" v-if="orderForm.status === -1"></i>
                </div>
                <div class="avatar-uploader" v-if="orderForm.appendixes.length < 3 && orderForm.status === -1">
                  <input type="file" @change="uploadImgs('')" ref="img"/>
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="咨询接待人:">
              <el-select v-model="orderForm.createdBy" filterable value-key="id" :disabled="orderForm.status > -1">
                <el-option :label="item.name" :value="{ id: item.id }" v-for="(item, index) in createdBys" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="info-title" v-if="orderForm.status > -1">
            熊孩子中医体质辩证调理方案
          </div>
          <el-form :inline="true" :model="orderForm" class="demo-form-inline" size="mini" v-if="orderForm.status > -1">
            <el-form-item label="调理总时长（分钟）:">
                <el-input v-model="orderForm.duration" disabled></el-input>
              </el-form-item>
              <el-form-item label="调理总费用（￥）:">
                <el-input v-model="orderForm.price" disabled></el-input>
              </el-form-item>
            <div class="else" v-if="orderForm.membershipCard.balance || orderForm.membershipCard.bonus">
              (会员卡可用余额:{{orderForm.membershipCard.balance || 0}}+{{orderForm.membershipCard.bonus || 0}})
            </div>
            <el-form-item label="专家团体体质辩证意见:" class="whole" required>
              <el-select v-model="orderForm.constitutions" multiple value-key="number" :disabled="orderForm.status > 0">
                <el-option :label="item.name" :value="{number: item.number}" v-for="(item, index) in constitutions" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <div class="whole">
              <el-form-item label="专家团体设定调理方案:" class="whole" required>
                <el-select v-model="orderForm.schemes" multiple value-key="id" :disabled="orderForm.status > 0">
                  <el-option :label="item.name" :value="{id: item.id}" v-for="(item, index) in schemes" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预计调理次数:" class="short" required>
                <el-input v-model="orderForm.customer.course[1]" :disabled="orderForm.status > 0"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="本次调理项目意见:" class="whole" required>
              <el-select v-model="orderForm.items" multiple value-key="id" :disabled="orderForm.status > 0">
                <el-option :label="item.name" :value="{id: item.id}" v-for="(item, index) in items" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="指派技师:">
              <el-select v-model="orderForm.assigned" filterable value-key="id" :disabled="orderForm.status > 0">
                <el-option :label="item.name" :value="{ id: item.id }" v-for="(item, index) in massageds" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="诊断开方人:">
              <el-select v-model="orderForm.diagnosedBy" filterable value-key="id" :disabled="orderForm.status > 0">
                <el-option :label="item.name" :value="{ id: item.id }" v-for="(item, index) in createdBys" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="info-title" v-if="orderForm.status > 0">
            收费情况
          </div>
          <div class="pay" v-if="orderForm.status > 0">
            <div class="attention">
              <div class="icon">
                <img src="../assets/app/attention.svg" alt="">
              </div>
              本系统不做收费，仅做费用登记。确认收费前请确保顾客已经通过收费系统完成付费。
            </div>
            <div class="item">
              确认收费人：{{orderForm.chargedBy.name}}
            </div>
            <div class="item">
              <div class="i">本次可用的赠送服务次数：{{orderForm.availableBonusServicesCount}}次</div>
              <div class="i">本次是否使用赠送服务：<el-checkbox v-model="orderForm.useBonusService" :disabled="orderForm.status > 1">使用</el-checkbox>
              </div>
            </div>
            <div class="item">
              实际需确认收费费用：<div class="money">￥{{orderForm.useBonusService ? orderForm.priceAfterBonus : orderForm.price}}</div>
            </div>
          </div>
          <div class="btn">
            <!-- <el-button size="small" type="info" v-if="orderForm.status === -1&&method !== 'post'" @click="postOrder('post')">保存预约</el-button> -->
            <el-button size="small" type="primary" v-if="orderForm.status === -1 " @click="postOrder('')">确认接待</el-button>
            <el-button size="small" type="primary" v-if="orderForm.status === 0" @click="patchOrder(orderForm)">确认开方</el-button>
            <el-button size="small" type="primary" v-if="orderForm.status === 1" @click="getPay(orderForm)">确认收费</el-button>
          </div>
        </div>
      </div>
      <div class="note">
        <div class="note-title">
          辅助调理方案
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 1">
      <el-form :inline="true" :model="orderFilterForm" class="title demo-form-inline" size="mini">
        <el-form-item label="调理人:">
          <el-input v-model="orderFilterForm.customer"></el-input>
        </el-form-item>
        <el-form-item label="技师:">
          <el-select v-model="orderFilterForm.massagedBy" filterable>
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in massageds" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="咨询日期:">
          <el-date-picker v-model="orderFilterForm.consultedAt" type="daterange" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="调理日期:">
          <el-date-picker v-model="orderFilterForm.treatmentDate" type="daterange" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-radio v-model="orderFilterForm.disabled" :label="false">流程未终止</el-radio>
        <el-radio v-model="orderFilterForm.disabled" :label="true">流程终止</el-radio>
        <el-button size="small" type="primary" @click="getOrders">查询</el-button>
      </el-form>
      <div class="table">
        <el-radio-group v-model="orderFilterForm.status">
          <el-radio :label="item.label" v-for="(item, index) in numbers" :key="index">{{item.name}}</el-radio>
        </el-radio-group>
        <el-table
          :data="massageOrders"
          border
          v-loading="massageOrdersLoading"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="录入时间">
          </el-table-column>
          <el-table-column
            label="调理人姓名">
            <template slot-scope="scope">
              <div>{{scope.row.customer.name}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="调理人编号">
            <template slot-scope="scope">
              <div>{{scope.row.customer.id}}</div>
            </template>
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
            label="是否收费">
            <template slot-scope="scope">
              <div>{{scope.row.status >= 2  ? '是' : '否' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="当前状态">
            <template slot-scope="scope">
              <div>{{scope.row.status === 0 ? '咨询接待' : scope.row.status === 1 ? '已开方未收费' : scope.row.status === 2 ? '收费执行' : scope.row.status === 3 ? '执行中' : scope.row.status === 4 ? '已执行' : scope.row.status === 5 ? '家长已确认' : ''}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="getInfo(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="massageOrderTotal"
          @current-change="getOrders">
        </el-pagination>
      </div>
    </div>
    <el-dialog width="600px" :visible.sync="popPay" :show-close="false">
      <div slot="title" class="shou-fei-title">
        收费合计：<div class="money">¥{{pay.price}}</div>
      </div>
      <div class="shou-fei-main">
        <div class="shou-fei-item">
          <div class="shou-fei-i">
            已录入费用：<div class="had-money">¥{{pay.price - pay.needPrice}}</div>
          </div>
          <div class="shou-fei-i">
            还需录入费用：<div class="need-money">¥{{pay.needPrice}}</div>
          </div>
        </div>
        <div class="shou-fei-item" v-for="(item, index) in pay.pay" :key="index">
          <div class="shou-fei-i">
            收费方式：
            <el-select size="small" v-model="item.type" placeholder="请选择">
              <el-option label="微信" value="wechat"></el-option>
              <el-option label="现金" value="cash"></el-option>
              <el-option label="会员卡" value="membershipCard"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </div>
          <div class="shou-fei-i">
            费用：
            <el-input size="small" v-model="item.amount" @input="payChange"></el-input>
          </div>
          <div class="shou-fei-i">
            <i class="el-icon-circle-plus had-money" v-if="index === (pay.pay.length - 1)" @click="pushPay()"></i>
            <i class="el-icon-remove need-money" v-if="pay.pay.length !== 1"  @click="delPay(index)"></i>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="patchOrder(pay)">确认收费</el-button>
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
              {{info.status === 0 ? '咨询接待' : info.status === 1 ? '开单计费' : info.status === 2 ? '收费执行' : info.status === 3 ? '执行中' : info.status === 4 ? '已执行' : info.status === 5 ? '家长已确认' : ''}}
            </div>
            <div class="dislog-jiedai-title-info">
              <div class="dislog-jiedai-name">
                序号：
              </div>
              <div class="dislog-jiedai-value">
                {{info.id}}
              </div>
              <div class="dislog-jiedai-name">
                儿童健康管理师：
              </div>
              <div class="dislog-jiedai-value">
                {{info.diagnosedBy.name || '未生成'}}
              </div>
              <div class="dislog-jiedai-name">
                录入时间：
              </div>
              <div class="dislog-jiedai-value">
                {{info.createdAt}}
              </div>
            </div>
          </div>
          <div class="dislog-jiedai-step">
            <el-steps :active="info.status + 1" align-center finish-status="success">
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
            <el-form :inline="true" :model="info" class="demo-form-inline" size="mini" disabled>
              <el-form-item label="咨询日期:">
                <el-date-picker v-model="info.consultedAt" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="咨询方式:">
                <el-select v-model="info.consultMethod" placeholder="咨询方式">
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约日期:">
                <el-date-picker v-model="info.appointmentDate" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="调理日期:">
                <el-date-picker v-model="info.treatmentDate" type="date">
                </el-date-picker>
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>调理人信息</div>
                <div class="line"></div>
              </div>
              <el-form-item label="调理人姓名:">
                <el-input v-model="info.customer.name"></el-input>
              </el-form-item>
              <el-form-item label="出生年月:">
                <el-date-picker v-model="info.customer.birthday" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="顾客档案编号:">
                <el-input v-model="info.customer.id"></el-input>
              </el-form-item>
              <el-form-item label="性别:">
                <el-radio-group v-model="info.customer.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否初审:">
                <el-radio-group v-model="info.customer.firstVisit">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- <el-form-item label="当前疗程已调理次数:" class="short">
                <el-input v-model="info.customer.course[0]"></el-input>
                /
                <el-input v-model="info.customer.course[1]"></el-input>
              </el-form-item> -->
              <el-form-item label="调理人手机号:">
                <el-input v-model="info.customer.contact"></el-input>
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>会员卡信息</div>
                <div class="line"></div>
              </div>
              <el-form-item label="会员卡卡号:">
                <el-input v-model="info.membershipCard.number"></el-input>
              </el-form-item>
              <el-form-item label="持卡人姓名:">
                <el-input v-model="info.membershipCard.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="持卡人电话:">
                <el-input v-model="info.membershipCard.contact" disabled></el-input>
              </el-form-item>
              <!-- <span class="chongzhi">会员卡充值>></span> -->
              <el-form-item label="会员卡级别:">
                <el-select v-model="info.membershipCard.level" disabled>
                  <el-option
                    :label="item.name"
                    :value="item.number"
                    v-for="item in levels" :key="item.number">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="卡内充值余额:">
                <el-input v-model="info.membershipCard.balance" disabled></el-input>
              </el-form-item>
              <el-form-item label="卡内赠送余额:">
                <el-input v-model="info.membershipCard.bonuse" disabled></el-input>
              </el-form-item>
              <el-form-item label="会员卡折扣:">
                <el-input v-model="info.membershipCard.discount" disabled></el-input>
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
                <el-radio-group v-model="info.partnerType.number">
                  <el-radio :label="item.number" v-for="(item, index) in partnerTypes" :key="index">{{item.name}}</el-radio>
                <!-- <el-radio label="7">
                  <div class="else">其他</div>
                  <el-input v-model="orderForm.age"></el-input>
                </el-radio> -->
              </el-radio-group>
              </el-form-item>
              <el-form-item label="陪同人姓名:">
                <el-input v-model="info.partnerName"></el-input>
              </el-form-item>
              <el-form-item label="陪同人手机号:">
                <el-input v-model="info.partnerContact"></el-input>
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>本次咨询症状</div>
                <div class="line"></div>
              </div>
              <el-form-item label="本次调理前症状自我描述（家长陪同可补充）:" class="whole">
                <el-select v-model="info.symptoms" multiple value-key="number">
                  <el-option :label="item.name" :value="{number: item.number}" v-for="(item, index) in symptoms" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="其他症状说明:" class="whole">
                <el-input type="textarea" :rows="2" v-model="info.symptomsDescription"></el-input>
              </el-form-item>
              <el-form-item label="上传附件（如舌苔照）:" class="whole">
                <div style="display: flex;">
                  <div class="avatar-uploader" v-for="(item, index) in info.appendixes" :key="index">
                    <img :src="item" class="avatar">
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="咨询接待人:">
                <el-input v-model="info.createdBy.name"></el-input>
              </el-form-item>
            </el-form>
            <div class="dislog-jiedai-info-title" v-if="info.status > -1">
              熊孩子中医体质辩证调理方案
            </div>
            <el-form :inline="true" :model="info" class="demo-form-inline" size="mini" :disabled="info.status > 0" v-if="info.status > -1">
              <el-form-item label="调理总时长（分钟）:">
                <el-input v-model="info.duration" disabled></el-input>
              </el-form-item>
              <el-form-item label="调理总费用（￥）:">
                <el-input v-model="info.price" disabled></el-input>
              </el-form-item>
              <div class="else" v-if="info.membershipCard.balance || info.membershipCard.bonus">
                (会员卡可用余额:{{info.membershipCard.balance || 0}}+{{info.membershipCard.bonus || 0}})
              </div>
              <el-form-item required label="专家团体体质辩证意见:" class="whole">
                <el-select v-model="info.constitutions" multiple value-key="number">
                  <el-option :label="item.name" :value="{number: item.number}" v-for="(item, index) in constitutions" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <div class="whole">
                <el-form-item required label="专家团体设定调理方案:" class="whole">
                  <el-select v-model="info.schemes" multiple value-key="id">
                    <el-option :label="item.name" :value="{id: item.id}" v-for="(item, index) in schemes" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item required label="预计调理次数:" class="short">
                  <el-input v-model="info.customer.course[1]"></el-input>
                </el-form-item>
              </div>
              <el-form-item required label="本次调理项目意见:" class="whole">
                <el-select v-model="info.items" multiple value-key="id">
                  <el-option :label="item.name" :value="{id: item.id}" v-for="(item, index) in items" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="指派技师:">
                <el-select v-model="info.assigned" filterable value-key="id" :disabled="orderForm.status > 0">
                  <el-option :label="item.name" :value="{ id: item.id }" v-for="(item, index) in massageds" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="诊断开方人:">
                <el-select v-model="info.diagnosedBy" filterable value-key="id" :disabled="orderForm.status > 0">
                  <el-option :label="item.name" :value="{ id: item.id }" v-for="(item, index) in createdBys" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="dislog-jiedai-info-title" v-if="info.status > 0">
              收费情况
            </div>
            <div class="dislog-jiedai-info-pay" v-if="info.status > 0">
              <div class="dislog-jiedai-info-attention">
                <div class="icon">
                  <img src="../assets/app/attention.svg" alt="">
                </div>
                本系统不做收费，仅做费用登记。确认收费前请确保顾客已经通过收费系统完成付费。
              </div>
              <div class="dislog-jiedai-info-item" v-if="info.status > 1">
                确认收费人：{{info.chargedBy.name}}
              </div>
              <div class="dislog-jiedai-info-item">
                <div class="i">本次可用的赠送服务次数：{{info.availableBonusServicesCount}}次</div>
                <div class="i">本次是否使用赠送服务：<el-checkbox v-model="info.useBonusService" :disabled="info.status > 1">使用</el-checkbox>
                </div>
              </div>
              <div class="dislog-jiedai-info-item">
                实际需确认收费费用：<div class="dislog-jiedai-info-money">￥{{info.useBonusService ? info.priceAfterBonus : info.price}}</div>
              </div>
              <div class="dislog-jiedai-info-item" v-if="info.status > 1">
                收费方式：<div v-for="(item, index) in info.pay" :key="index">{{item.amount}}（{{item.type === 'wechat' ? '微信' : item.type === 'cash' ? '现金' : item.type === 'membershipCard' ? '会员卡' : '支付宝'}}）;</div>
              </div>
            </div>
            <div class="dislog-jiedai-info-title" v-if="info.status > 3">
              执行情况
            </div>
            <div class="dislog-jiedai-info-pay" v-if="info.status > 3">
              <div class="dislog-jiedai-info-item" v-if="info.status > 3">
                实际执行技师：{{info.massagedBy.name}}
              </div>
              <div class="dislog-jiedai-info-item" v-if="info.status > 3">
                开始执行时间：{{info.massagedStartAt}}
              </div>
              <div class="dislog-jiedai-info-item" v-if="info.status > 3">
                执行完成时间：{{info.massagedCompletedAt}}
              </div>
              <div class="dislog-jiedai-info-item" v-if="info.status > 4">
                家长确认时间（拍照上传时间）：{{info.confirmedAt}}
              </div>
              <div class="dislog-jiedai-info-item">
                家长确认签字（纸质调理单）：
                <div class="avatar-uploader" v-if="info.status === 4">
                  <input type="file" @change="uploadSignature" ref="img"/>
                  <img :src="info.signature">
                  <i v-if="info.signature === ''" class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <div class="avatar-uploader" v-else>
                  <img v-if="info.signature" :src="info.signature" class="avatar">
                </div>
              </div>
            </div>
            <div class="dislog-jiedai-info-title" v-if="info.status > 3">
              客户满意度
            </div>
            <div class="dislog-jiedai-info-pay" v-if="info.status > 3">
              <div class="dislog-jiedai-info-item">
                服务态度：<el-rate v-model="info.satisfaction[0]" :disabled="info.status > 4"></el-rate>
              </div>
              <div class="dislog-jiedai-info-item">
                服务流程规范：<el-rate v-model="info.satisfaction[1]" :disabled="info.status > 4"></el-rate>
              </div>
              <div class="dislog-jiedai-info-item">
                服务时间标准：<el-rate v-model="info.satisfaction[2]" :disabled="info.status > 4"></el-rate>
              </div>
            </div>
            <div class="btn">
              <el-button size="small" type="primary" v-if="info.status === 0" @click="patchOrder(info)">确认开方</el-button>
              <el-button size="small" type="primary" v-if="info.status === 1" @click="getPay(info)">确认收费</el-button>
              <el-button size="small" type="primary" v-if="info.status === 2" @click="patchOrder(info)">开始执行</el-button>
              <el-button size="small" type="danger" v-if="info.status === 2 && info.assigned !== ''" @click="putOrder(info)">转为公共服务单</el-button>
              <el-button size="small" type="success" v-if="info.status === 3" @click="patchOrder(info)">执行完成</el-button>
              <el-button size="small" type="danger" v-if="info.status === 3">终止执行</el-button>
              <el-button size="small" type="success" v-if="info.status === 4" @click="patchOrder(info)">家长确认完成</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import { Loading } from 'element-ui'
export default {
  data () {
    return {
      method: '',
      selectes: [],
      selected: -1,
      active: 1,
      numbers: [],
      customers: [],
      membershipCards: [],
      partnerTypes: [],
      symptoms: [],
      constitutions: [],
      schemes: [],
      items: [],
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
      massageds: [],
      createdBys: [],
      orderFilterForm: {
        status: '',
        customer: '',
        massagedBy: '',
        consultedAt: [],
        treatmentDate: [],
        disabled: false
      },
      orderForm: {
        id: '',
        status: -1,
        createdAt: '',
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
        customerDis: false,
        membershipCard: {},
        partnerType: {},
        partnerName: '',
        partnerContact: '',
        symptoms: [],
        appendixes: [],
        createdBy: {},
        constitutions: [],
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
      contactErr: '',
      partnerContactErr: '',
      number: '未生成',
      time: '',
      radio: 1,
      massageOrders: [],
      massageOrdersLoading: false,
      massageOrderTotal: 0,
      popPay: false,
      pay: {
        id: '',
        useBonusService: false,
        price: 0,
        needPrice: 0,
        pay: [
          {
            type: '',
            amount: ''
          }
        ]
      },
      popInfo: false,
      info: {
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
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
    this.getCustomers()
    this.getMembershipCards()
    this.getCreatedBys()
    this.getEmployees()
    this.getPartnerTypes()
    this.getSymptoms()
    this.getConstitutions()
    this.getSchemes()
    this.getItems()
    this.select(0)
  },
  methods: {
    contactInput () {
      this.$forceUpdate()
    },
    select (i) {
      this.selected = i
      if (i === 0) {
        this.orderForm.createdAt = moment().format('YYYY-MM-DD HH:mm')
      }
      if (i === 1) {
        this.getOrders()
        this.getNumber()
      }
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
    },
    getCustomers () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/customer',
        params: {
          like: t.orderForm.customer.name
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.customers = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getCustomerId (e) {
      const t = this
      let arr = t.customers.filter((ele) => {
        return ele.name === e
      })
      if (arr.length > 0) {
        t.orderForm.customer.birthday = arr[0].birthday
        t.orderForm.customer.id = arr[0].id
        t.orderForm.customer.gender = arr[0].gender
        t.orderForm.customer.firstVisit = false
        t.orderForm.customer.contact = arr[0].contact
        t.orderForm.customerDis = true
      } else {
        axios({
          method: 'get',
          headers: {
            authorization: t.$store.state.authorization
          },
          url: '/api/customer-id'
        }).then((res) => {
          if (res.data.code === 200) {
            t.orderForm.customer.id = res.data.data
          } else {
            t.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            })
          }
        })
        t.orderForm.customer.birthday = ''
        t.orderForm.customer.gender = 1
        t.orderForm.customer.firstVisit = true
        t.orderForm.customer.contact = ''
        t.orderForm.customerDis = false
      }
    },
    getMembershipCards () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/membership-card',
        params: {
          number: t.orderForm.membershipCard.number
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
    getCreatedBys () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch/' + t.$store.state.branch_id + '/employee'
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
    postOrder (e) {
      const t = this
      if (!t.orderForm.consultedAt) {
        t.$message({
          showClose: true,
          message: '请选择咨询日期',
          type: 'error'
        })
        return
      }
      if (!t.orderForm.customer.name) {
        t.$message({
          showClose: true,
          message: '请选择调理人',
          type: 'error'
        })
        return
      }
      if (t.orderForm.customer.contact && t.orderForm.customer.contact.length !== 11) {
        t.$message({
          showClose: true,
          message: '调理人手机号格式不对',
          type: 'error'
        })
        return
      }
      if (t.orderForm.partnerContact && t.orderForm.partnerContact.length !== 11) {
        t.$message({
          showClose: true,
          message: '陪同人手机号格式不对',
          type: 'error'
        })
        return
      }
      if (t.orderForm.symptoms.length === 0) {
        t.$message({
          showClose: true,
          message: '请选择本次调理前症状',
          type: 'error'
        })
        return
      }
      t.method = e
      let method = 'post'
      if (t.method === 'post') {
        method = 'patch'
      }
      Loading.service()
      axios({
        method,
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/massage-order',
        data: {
          membershipCard: t.orderForm.membershipCard.id ? ({ id: t.orderForm.membershipCard.id }) : '',
          customer: t.orderForm.customer,
          partnerContact: t.orderForm.partnerContact,
          symptomsDescription: t.orderForm.symptomsDescription,
          appointmentDate: t.orderForm.appointmentDate,
          createdBy: t.orderForm.createdBy,
          partnerName: t.orderForm.partnerName,
          partnerType: t.orderForm.partnerType,
          consultMethod: t.orderForm.consultMethod,
          treatmentDate: t.orderForm.treatmentDate,
          symptoms: t.orderForm.symptoms,
          consultedAt: t.orderForm.consultedAt,
          appendixes: t.orderForm.appendixes,
          createdAt: t.orderForm.createdAt,
          status: 0
        }
      }).then((res) => {
        if (res.data.code === 200) {
          localStorage.removeItem('order')
          if (e === '') {
            t.orderForm = res.data.data
          }
          t.getOrders()
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
        Loading.service().close()
      })
    },
    putOrder (e) {
      const t = this
      Loading.service()
      axios({
        method: 'put',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/massage-order/' + e.id,
        data: {
          assigned: {
            id: 0
          }
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.popInfo = false
          t.popPay = false
          t.getOrders()
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
        Loading.service().close()
      })
    },
    patchOrder (e) {
      const t = this
      let data = {}
      if (e.status === 0) {
        if (e.constitutions.length < 1) {
          this.$message({
            showClose: true,
            message: '至少选择一次专家团体体质辩证意见',
            type: 'error'
          })
          return
        }
        if (e.schemes.length < 1) {
          this.$message({
            showClose: true,
            message: '至少选择一次专家团体设定调理方案',
            type: 'error'
          })
          return
        }
        if (e.items.length < 1) {
          this.$message({
            showClose: true,
            message: '至少选择一次本次调理项目意见',
            type: 'error'
          })
          return
        }
        data.membershipCard = e.membershipCard.id ? ({ id: e.membershipCard.id }) : ''
        data.id = e.id
        data.assigned = e.assigned
        data.diagnosedBy = e.diagnosedBy
        data.items = e.items
        data.schemes = e.schemes
        data.constitutions = e.constitutions
        data.customer = {
          course: e.customer.course
        }
      }
      if (e.status === 1) {
        let price = e.useBonusService ? e.priceAfterBonus : e.price
        if (price !== 0) {
          if (e.needPrice > 0) {
            t.$message({
              showClose: true,
              message: '还需录入还需录入费用：¥' + e.needPrice,
              type: 'error'
            })
            return
          }
          for (const item of e.pay) {
            if (item.type === '') {
              t.$message({
                showClose: true,
                message: '请选择支付方式',
                type: 'error'
              })
              return
            }
            if (item.amount === '') {
              t.$message({
                showClose: true,
                message: '请输入支付金额',
                type: 'error'
              })
              return
            }
          }
          data.pay = e.pay
        }
        data.useBonusService = e.useBonusService
      }
      if (e.status === 2) {
        data.massagedBy = {
          id: t.$store.state.id
        }
      }
      if (e.status === 4) {
        if (e.signature.length === 0) {
          this.$message({
            showClose: true,
            message: '请上传家长/陪同人员签名（上传理疗单）',
            type: 'error'
          })
          return
        }
        data.signature = e.signature
        data.satisfaction = e.satisfaction
      }

      data.status = e.status + 1
      Loading.service()
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/massage-order/' + e.id,
        data
      }).then((res) => {
        if (res.data.code === 200) {
          if (!t.popInfo) {
            t.orderForm = res.data.data
          } else {
            t.info = res.data.data
          }
          t.popInfo = false
          t.popPay = false
          t.getOrders()
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
        Loading.service().close()
      })
    },
    getInfo (e) {
      const t = this
      Loading.service()
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/massage-order/${e.id}`
      }).then((res) => {
        if (res.data.code === 200) {
          t.info = res.data.data
          t.popInfo = true
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
        Loading.service().close()
      })
    },
    getNumber () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/massage-order/status'
      }).then((res) => {
        if (res.data.code === 200) {
          t.numbers = []
          res.data.data.forEach((ele, index) => {
            let item = {
              label: index,
              name: '全部（' + ele + '）'
            }
            if (index === 0) {
              item.name = '咨询接待（' + ele + '）'
            }
            if (index === 1) {
              item.name = '已开方未收费（' + ele + '）'
            }
            if (index === 2) {
              item.name = '收费待执行（' + ele + '）'
            }
            if (index === 3) {
              item.name = '执行中（' + ele + '）'
            }
            if (index === 4) {
              item.name = '已执行（' + ele + '）'
            }
            if (index === 5) {
              item.name = '家长已确认（' + ele + '）'
            }
            if (index === 6) {
              item.label = ''
            }
            t.numbers.push(item)
          })
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getEmployees () {
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
          t.massageds = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getOrders (e) {
      const t = this
      t.massageOrdersLoading = true
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/massage-order',
        params: {
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10,
          status: t.orderFilterForm.status,
          customer: t.orderFilterForm.customer,
          massagedBy: t.orderFilterForm.customer,
          consultedAtBefore: t.orderFilterForm.consultedAt ? t.orderFilterForm.consultedAt[0] || '' : '',
          consultedAtAfter: t.orderFilterForm.consultedAt ? t.orderFilterForm.consultedAt[1] || '' : '',
          treatmentDateBefore: t.orderFilterForm.treatmentDate ? t.orderFilterForm.treatmentDate[0] || '' : '',
          treatmentDateAfter: t.orderFilterForm.treatmentDate ? t.orderFilterForm.treatmentDate[1] || '' : '',
          disabled: t.orderFilterForm.disabled
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.massageOrders = res.data.data.records
          t.massageOrderTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
        t.massageOrdersLoading = false
      })
    },
    uploadSignature () {
      const t = this
      var file = this.$refs.img
      var reader = new FileReader()
      reader.readAsDataURL(file.files[0])
      reader.onload = function (e) {
        t.info.signature = this.result
      }
    },
    uploadImgs (index) {
      const t = this
      var file = this.$refs.img
      var reader = new FileReader()
      reader.readAsDataURL(file.files[0])
      reader.onload = function (e) {
        if (index !== '') {
          t.orderForm.appendixes[index] = this.result
        } else {
          t.orderForm.appendixes.push(this.result)
        }
      }
    },
    delImg (index) {
      this.orderForm.appendixes = this.orderForm.appendixes.filter((ele, i) => {
        return index !== i
      })
    },
    pushPay () {
      this.pay.pay.push(
        {
          type: '',
          amount: ''
        }
      )
    },
    delPay (index) {
      this.pay.pay = this.pay.pay.filter((ele, i) => {
        return index !== i
      })
      this.payChange()
    },
    payChange () {
      this.pay.needPrice = this.pay.price
      this.pay.pay.forEach((ele) => {
        if (this.pay.needPrice >= parseFloat(ele.amount || 0)) {
          this.pay.needPrice = this.pay.needPrice - parseFloat(ele.amount || 0)
        } else {
          this.pay.needPrice = 0
        }
      })
    },
    getPay (e) {
      this.popPay = true
      this.pay.price = e.useBonusService ? e.priceAfterBonus : e.price
      this.pay.needPrice = e.useBonusService ? e.priceAfterBonus : e.price
      this.pay.priceAfterBonus = e.priceAfterBonus
      this.pay.pay = [
        {
          type: '',
          amount: ''
        }
      ]
      this.pay.useBonusService = e.useBonusService
      this.pay.status = 1
      this.pay.id = e.id
    },
    saveOrder (e) {
      localStorage.setItem('order', JSON.stringify(e))
      this.$message({
        showClose: true,
        message: '保存成功',
        type: 'success'
      })
    },
    tocontinue (e) {
      const t = this
      t.$store.state.show = true
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api//massage-order/${e.id}`,
        data: {
          disabled: false
        }
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          e.disabled = false
        } else {
          t.$notify({ message: res.data.message, type: 'warning' })
        }
      })
    },
    termination (e) {
      const t = this
      t.$store.state.show = true
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api//massage-order/${e.id}`,
        data: {
          disabled: true
        }
      }).then((res) => {
        t.$store.state.show = false
        if (res.data.code === 200) {
          e.disabled = true
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
.tuina {
  display: flex;
  width: 100%;
  height: calc(100vh - 45px);
  background-color: rgba(234, 234, 234, 0.8);
}
.tuina .nav-left {
  width: calc(200/1598*100%);
  background-color: #ffffff;
  height: calc(100vh - 45px);
}
.tuina .nav-left .title {
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
  font-weight: bold;
  color: #ff9900;
  border-bottom: 1px solid rgba(188, 188, 188, 1);
  height: 50px;
}
.tuina .nav-left .item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
  border-right: 3px solid #ffffff;
  height: 50px;
}
.tuina .nav-left .item.selected {
  border-color: #ff9900;
  color: #ff9900;
}
.tuina .nav-left .item .icon {
  width: 20px;
  margin-right: 10px;
}
.tuina .tuina-main {
  width: calc(1398/1598*100%);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.tuina .tuina-main .title {
  width: 100%;
  background-color: #ffffff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 0 10px;
  margin-bottom: 10px;
}
.tuina .tuina-main .title .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
.tuina .tuina-main .title .el-date-editor--daterange.el-input__inner {
  width: 220px;
}
.tuina .tuina-main .title .el-checkbox {
  margin-right: 0;
}
.tuina .tuina-main .title .info {
  display: flex;
  align-items: center;
}
.tuina .tuina-main .title .info .name {
  color: #bcbcbc;
  margin-left: 10px;
}
.tuina .tuina-main .step-main {
  width: calc(1120 / 1378 * 100%);
  margin-right: 10px;
}
.tuina .tuina-main .step-main .step {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-bottom: 10px;
  width: 100%;
}
.tuina .tuina-main .step-main .step .el-steps {
  width: 70%;
}
.tuina .tuina-main .step-main .info {
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  height: calc(100vh - 205px);
  overflow: auto;
}
.tuina .tuina-main .step-main .info-title {
  font-size: 18px;
  border-left: 3px solid #ff9900;
  height: 25px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 18px;
}
.tuina .tuina-main .step-main .info-biaoti {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #ff9900;
  margin-bottom: 18px;
}
.tuina .tuina-main .step-main .info-biaoti .line {
  width: 90px;
  height: 1px;
  background-color: #ff9900;
  margin: 0 10px;
}
.tuina .tuina-main .note {
  width: calc(248 / 1378 * 100%);
  background-color: #ffffff;
  min-height: calc(100vh - 125px);
}
.tuina .tuina-main .note .note-title {
  font-weight: bold;
  color: #595959;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
span {
  text-decoration: underline;
  color: #0000ff;
  font-size: 14px;
}
.else {
  display: inline-block;
  padding-right: 10px;
  font-size: 14px;
}
.btn {
  padding: 20px;
  text-align: right;
}
.el-form {
  padding: 0 10px;
}
.short {
  white-space: nowrap;
}
.short .el-input {
  width: 80px;
}
.whole {
  width: 100%;
  display: flex;
}
.el-select {
  width: 100%;
}
.el-input {
  width: 100%;
}
.pay {
  font-size: 14px;
}
.pay .attention {
  display: flex;
  width: 100%;
  background-color: rgba(254, 154, 0, 0.25);
  padding: 10px 20px;
  border-radius: 10px;
  box-sizing: border-box;
}
.pay .attention .icon {
  width: 20px;
  padding-right: 10px;
}
.pay .item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  padding-top: 18px;
  box-sizing: border-box;
}
.pay .item .i + .i {
  margin-left: 50px;
}
.pay .money {
  font-size: 18px;
  color: #ff9900;
  font-weight: bolder;
}
.table {
  width: 100%;
  height: calc(100vh - 125px);
  background-color: #ffffff;
  padding: 0 30px 10px 30px;
  box-sizing: border-box;
  overflow: auto;
}
.table .el-radio-group {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #999999;
  margin-bottom: 30px;
}
.table .el-pagination {
  text-align: right;
  padding-top: 10px;
}
.shou-fei-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.shou-fei-title .money {
  color: #ff9900;
  font-weight: bolder;
}
.shou-fei-item {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
.shou-fei-i {
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 14px;
}
.shou-fei-i + .shou-fei-i {
  margin-left: 20px;
}
.shou-fei-i .had-money {
  color: green;
}
.shou-fei-i .need-money {
  color: red;
}
.shou-fei-i i {
  font-size: 22px;
}
.shou-fei-i i + i {
  margin-left: 10px;
}
.pop-info {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
}
.pop-left {
  min-width: 235px;
  background-color: #ffffff;
}
.pop-right {
  margin: 0 10px;
  overflow: auto;
  width: 100%;
}
.tuina .pop-right .tuina-main {
  width: 100%;
  min-width: 1000px;
  padding: 0;
}
.tuina .pop-right .tuina-main .step-main {
  width: 100%;
  margin-right: 0;
}
.tuina .pop-right .tuina-main .step-main .info {
  height: 100%;
}
.pop-close {
  font-size: 30px;
}
</style>
<style>
.el-step__title {
  font-size: 14px;
}
.el-step__head.is-success {
  color: #ff9900;
  border-color: #ff9900;
}
.el-step__title.is-success {
  color: #ff9900;
}
.el-form-item.whole .el-form-item__content {
  width: 100%;
}
.el-form-item__label {
  white-space: nowrap;
  color: #333333;
}
.el-button--info {
  background-color: #009cff;
  border-color: #009cff;
}
.el-button--danger {
  background-color: #ff0000;
  border-color: #ff0000;
}
.table .el-table th, .el-table td {
  padding: 8px 0;
}
</style>
