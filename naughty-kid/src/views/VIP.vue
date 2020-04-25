<template>
  <div class="dangan">
    <div class="search">
      <div class="value">
        <div class="name">机构门店：</div>
        <el-select v-model="branch_id" filterable size="small">
          <el-option v-for="item in $store.state.branches" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <div class="name second">顾客姓名：</div>
        <el-input size="small" v-model="name" suffix-icon="el-icon-search" clearable></el-input>
        <div class="name second">会员卡号：</div>
        <el-input size="small" v-model="number" suffix-icon="el-icon-search" clearable></el-input>
        <div class="name second">联系电话：</div>
        <el-input size="small" v-model="contact" suffix-icon="el-icon-search" clearable></el-input>
      </div>
      <div class="btns">
        <el-button size="small" type="primary" @click="getMembershipCards">查询</el-button>
        <el-button size="small" type="info" @click="addMembershipCard">办卡</el-button>
      </div>
    </div>
    <div class="list item">
      <div class="title">
        会员卡列表
      </div>
      <el-table
        ref="membershipCards"
        :data="membershipCards"
        border
        highlight-current-row
        @current-change="membershipCardsClick">
        <el-table-column
          prop="number"
          label="会员卡号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="持卡人姓名">
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="caozuo"
          label="操作"
          width="60">
           <template slot-scope="scope">
            <el-button @click="changeMembershipCard(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="membershipCardsTotal"
        @current-change="getMembershipCards">
      </el-pagination>
    </div>
    <div class="info item" v-if="info.id">
      <div class="title">
        会员卡信息
        <el-button size="small" type="primary" @click="addRecharge">会员卡充值</el-button>
      </div>
      <el-tabs v-model="selected" type="card" @tab-click="select">
        <el-tab-pane label="基本信息" name="0">
          <div class="info-title">
            持卡人信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                持卡人姓名：
              </div>
              <div class="info-item-value">
                {{info.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                会员卡号：
              </div>
              <div class="info-item-value">
                {{info.number}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                会员性别：
              </div>
              <div class="info-item-value">
                {{info.gender === 1 ? '男' : '女'}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                年龄：
              </div>
              <div class="info-item-value">
                {{info.age}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                出生年月日：
              </div>
              <div class="info-item-value">
                {{info.birthday}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                联系电话：
              </div>
              <div class="info-item-value">
                {{info.contact}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新人：
              </div>
              <div class="info-item-value">
                {{info.updatedBy.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新时间：
              </div>
              <div class="info-item-value">
                {{info.updatedAt}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新机构/门店：
              </div>
              <div class="info-item-value">
                {{info.updatedWhere.name}}
              </div>
            </div>
          </div>
          <div class="info-title">
            会员卡信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                首次办卡机构/门店：
              </div>
              <div class="info-item-value">
                {{info.createdWhere.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次操作人：
              </div>
              <div class="info-item-value">
                {{info.createdBy.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                卡内充值余额：
              </div>
              <div class="info-item-value">
                {{info.balance}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                卡内赠送余额：
              </div>
              <div class="info-item-value">
                {{info.bonus}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                会员卡级别：
              </div>
              <div class="info-item-value">
                {{info.level === 1 ? '铜卡会员' : info.level === 2 ? '银卡会员' : info.level === 3 ? '金卡会员' : ''}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                当前折扣：
              </div>
              <div class="info-item-value">
                {{info.discount}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新人：
              </div>
              <div class="info-item-value">
                {{info.consumedBy.name}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新时间：
              </div>
              <div class="info-item-value">
                {{info.consumedAt}}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新机构/门店：
              </div>
              <div class="info-item-value">
                {{info.consumedWhere.name}}
              </div>
            </div>
          </div>
          <div class="info-title">
            会员赠送服务信息
          </div>
          <el-table
            :data="info.bonusService"
            border
            style="width: 50%">
            <el-table-column
              prop="id"
              label="赠送类别">
            </el-table-column>
            <el-table-column
              label="调理方案">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.schemes" :key="index">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="调理项目">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.items" :key="index">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="timesRemained"
              label="剩余次数">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="余额变动信息" name="1">
          <el-table
            :data="balanceDetails"
            border
            style="width: 100%">
            <el-table-column
              prop="createdAt"
              label="更新时间">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="变动金额">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类别">
            </el-table-column>
            <el-table-column
              prop="method"
              label="变更方式">
            </el-table-column>
            <el-table-column
              prop="balanceAfter"
              label="变更后余额">
            </el-table-column>
            <el-table-column
              label="操作人">
              <template slot-scope="scope">
                {{scope.row.createdBy.name}}
              </template>
            </el-table-column>
            <el-table-column
              label="机构/门店">
              <template slot-scope="scope">
                {{scope.row.createdWhere.name}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <!-- <template slot-scope="scope">
                <el-button @click="view(scope.row)" type="text" size="small">查看服务详情</el-button>
              </template> -->
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="balanceDetailTotal"
            @current-change="getBalanceDetails">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="赠送服务变动明细" name="2">
          <el-table
            :data="serviceDetails"
            border
            style="width: 100%">
            <el-table-column
              prop="createdAt"
              label="更新时间">
            </el-table-column>
            <el-table-column
              prop="bonusType"
              label="赠送类别">
            </el-table-column>
            <el-table-column
              label="调理方案">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.schemes" :key="index">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="调理项目">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.items" :key="index">{{item.name}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="类别">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="变更次数">
            </el-table-column>
            <el-table-column
              prop="timesRemained"
              label="变更后剩余次数"
              width="120px">
            </el-table-column>
            <el-table-column
              label="操作人">
              <template slot-scope="scope">
                {{scope.row.createdBy.name}}
              </template>
            </el-table-column>
            <el-table-column
              label="机构/门店">
              <template slot-scope="scope">
                {{scope.row.createdWhere.name}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <!-- <template slot-scope="scope">
                <el-button @click="view(scope.row)" type="text" size="small">查看服务详情</el-button>
              </template> -->
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="serviceDetailTotal"
            @current-change="getServiceDetails">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog class="handle" title="会员卡办理" width="1100px" :visible.sync="membershipCardPop">
      <div class="dislog-jiedai-info-attention attention">
        <div class="icon">
          <img src="../assets/app/attention.svg" alt="">
        </div>
        本系统不做会员卡充值，仅做会员卡费用登记。确认充值前请确保顾客已经通过收费系统完成会员卡充值。
      </div>
      <el-form :inline="true" :rules="membershipCardRules" ref="membershipCardRef" :model="membershipCard" label-width="120px" size="small">
        <div class="info-title">
          会员卡信息
        </div>
        <el-form-item label="会员卡卡号:" prop="number">
          <el-input v-model="membershipCard.number"></el-input>
        </el-form-item>
        <el-form-item label="会员卡级别:" prop="level">
          <el-select v-model="membershipCard.level" placeholder="请选择">
            <el-option
              :label="item.name"
              :value="item.number"
              v-for="item in levels" :key="item.number">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 会员卡折扣:" prop="discount">
          <el-input v-model="membershipCard.discount"></el-input>
        </el-form-item>
        <el-form-item label="持卡人姓名:" prop="name">
          <el-input v-model="membershipCard.name"></el-input>
        </el-form-item>
        <el-form-item label="持卡人电话:" prop="contact">
          <el-input v-model="membershipCard.contact"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <div class="el-select">
            <el-radio v-model="membershipCard.gender" :label="1">男</el-radio>
            <el-radio v-model="membershipCard.gender" :label="2">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="出生年月日:" prop="birthday">
          <el-date-picker
            v-model="membershipCard.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <div class="info-title">
          本次充值信息
        </div>
        <el-form-item label="本次充值金额:" prop="balance">
          <el-input v-model="membershipCard.balance"></el-input>
        </el-form-item>
        <div class="info-title">
          本次充值赠送金额
        </div>
        <el-form-item label="本次赠送金额:">
          <el-input v-model="membershipCard.bonus"></el-input>
        </el-form-item>
        <el-form-item label="赠送金额有效期至:（不填写表示不限制有效期）" label-width="310px">
          <el-date-picker
            v-model="membershipCard.bonusExpiredAfter"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <div class="info-title">
          本次充值赠送服务项目
        </div>
        <div class="bonus-services" v-for="(item, index) in membershipCard.bonusService" :key="index">
          <div class="bonus-services-left">
            <div class="row">
              <el-form-item label="赠送调理方案:">
                <el-select v-model="item.schemes" value-key="id" multiple placeholder="请选择">
                  <el-option
                    v-for="item in massageSchemeData"
                    :key="item.id"
                    :label="item.name"
                    :value="{id: item.id}">
                  </el-option>
                </el-select>
                <!-- <el-checkbox v-model="item.phone">全部</el-checkbox> -->
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="赠送调理项目:">
                <el-select v-model="item.items" value-key="id" multiple placeholder="请选择">
                  <el-option
                    v-for="item in massageItemData"
                    :key="item.id"
                    :label="item.name"
                    :value="{id: item.id}">
                  </el-option>
                </el-select>
                <!-- <el-checkbox v-model="item.phone">全部</el-checkbox> -->
              </el-form-item>
            </div>
            <div>
              <el-form-item label="赠送服务有效期至:（不填写表示不限制有效期）" label-width="310px">
                <el-date-picker
                  v-model="item.expiredAfter"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="赠送服务次数:">
                <el-input v-model="item.times"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="bonus-services-del">
            <i class="el-icon-remove" @click="delBonusService(index)"></i>
          </div>
        </div>
        <div class="new-bonus-service">
          <el-button plain size="small" @click="addBonusService">点击添加赠送服务项目</el-button>
        </div>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="postMembershipCards">确认充值并办卡</el-button>
        <el-button size="small" type="primary" @click="membershipCardPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog class="handle" title="修改会员卡信息" width="600px" :visible.sync="changePop">
      <el-form :rules="changeRules" ref="changeRef" :model="change" label-width="120px" size="small">
        <div class="info-title">
          基本信息
        </div>
        <el-form-item label="持卡人姓名:" prop="name">
          <el-input v-model="change.name"></el-input>
        </el-form-item>
        <el-form-item label="会员卡卡号:" prop="number">
          <el-input v-model="change.number"></el-input>
        </el-form-item>
        <el-form-item label="会员性别:">
          <div class="el-select">
            <el-radio v-model="change.gender" :label="1">男</el-radio>
            <el-radio v-model="change.gender" :label="2">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="出生年月日:" prop="birthday">
          <el-date-picker
            v-model="change.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话:" prop="contact">
          <el-input v-model="change.contact"></el-input>
        </el-form-item>
        <el-form-item label=" 会员卡折扣:" prop="discount">
          <el-input v-model="change.discount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="putMembershipCards">保存修改</el-button>
        <el-button size="small" type="primary" @click="changePop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog class="handle" title="会员卡充值" width="1100px" :visible.sync="rechargePop">
      <div class="dislog-jiedai-info-attention attention">
        <div class="icon">
          <img src="../assets/app/attention.svg" alt="">
        </div>
        本系统不做会员卡充值，仅做会员卡费用登记。确认充值前请确保顾客已经通过收费系统完成会员卡充值。
      </div>
      <el-form :inline="true" :rules="rechargeRules" ref="rechargeRef" :model="recharge" label-width="120px" size="small">
        <div class="info-title">
          会员卡信息
        </div>
        <el-form-item label="会员卡卡号:" style="width: 40%">
          {{info.number}}
        </el-form-item>
        <el-form-item label="会员卡级别:" style="width: 40%">
          {{info.level === 1 ? '铜卡会员' : info.level === 2 ? '银卡会员' : info.level === 3 ? '金卡会员' : ''}}
        </el-form-item>
        <el-form-item label="持卡人姓名:" style="width: 40%">
          {{info.name}}
        </el-form-item>
        <el-form-item label="持卡人电话:" style="width: 40%">
          {{info.contact}}
        </el-form-item>
        <el-form-item label="卡内充值余额:" style="width: 40%">
          {{info.balance}}
        </el-form-item>
        <el-form-item label="卡内赠送余额:" style="width: 40%">
          {{info.bonus}}
        </el-form-item>
        <div class="info-title">
          本次充值信息
        </div>
        <el-form-item label="本次充值金额:" prop="amount">
          <el-input v-model="recharge.amount"></el-input>
        </el-form-item>
        <div class="info-title">
          本次充值赠送金额
        </div>
        <el-form-item label="本次赠送金额:">
          <el-input v-model="recharge.bonus"></el-input>
        </el-form-item>
        <el-form-item label="赠送金额有效期至:（不填写表示不限制有效期）" label-width="310px">
          <el-date-picker
            v-model="recharge.bonusExpiredAfter"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <div class="info-title">
          本次充值赠送服务项目
        </div>
        <div class="bonus-services" v-for="(item, index) in recharge.bonusService" :key="index">
          <div class="bonus-services-left">
            <div class="row">
              <el-form-item label="赠送调理方案:">
                <el-select v-model="item.schemes" value-key="id" multiple placeholder="请选择">
                  <el-option
                    v-for="item in massageSchemeData"
                    :key="item.id"
                    :label="item.name"
                    :value="{id: item.id}">
                  </el-option>
                </el-select>
                <!-- <el-checkbox v-model="item.phone">全部</el-checkbox> -->
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="赠送调理项目:">
                <el-select v-model="item.items" value-key="id" multiple placeholder="请选择">
                  <el-option
                    v-for="item in massageItemData"
                    :key="item.id"
                    :label="item.name"
                    :value="{id: item.id}">
                  </el-option>
                </el-select>
                <!-- <el-checkbox v-model="item.phone">全部</el-checkbox> -->
              </el-form-item>
            </div>
            <div>
              <el-form-item label="赠送服务有效期至:（不填写表示不限制有效期）" label-width="310px">
                <el-date-picker
                  v-model="item.expiredAfter"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="赠送服务次数:">
                <el-input v-model="item.times"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="bonus-services-del">
            <i class="el-icon-remove" @click="delRechargeBonusService(index)"></i>
          </div>
        </div>
        <div class="new-bonus-service">
          <el-button plain size="small" @click="addRechargeBonusService">点击添加赠送服务项目</el-button>
        </div>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="postRecharge">确认充值</el-button>
        <el-button size="small" type="primary" @click="rechargePop = false">取消</el-button>
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
      number: '',
      contact: '',
      membershipCards: [],
      membershipCardsTotal: 0,
      membershipCardsPage: 0,
      membershipCard: {
        number: '',
        level: '',
        discount: '',
        name: '',
        contact: '',
        gender: 1,
        birthday: '',
        balance: '',
        bonus: '',
        bonusExpiredAfter: '',
        bonusService: []
      },
      membershipCardRules: {
        number: [
          { required: true, message: '请输入会员卡卡号', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请选择会员卡级别', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入持卡人姓名', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '请输入持卡人电话', trigger: 'change' }
        ],
        balance: [
          { required: true, message: '请输入本次充值金额', trigger: 'change' }
        ]
      },
      membershipCardPop: false,
      membershipCardType: 'add',
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
      massageSchemeData: [],
      massageItemData: [],
      change: {
        number: '',
        level: '',
        discount: '',
        name: '',
        contact: '',
        gender: 1,
        birthday: ''
      },
      changeRules: {
        number: [
          { required: true, message: '请输入会员卡卡号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入持卡人姓名', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '请输入持卡人电话', trigger: 'change' }
        ]
      },
      changePop: false,
      recharge: {
        amount: '',
        bonus: '',
        bonusExpiredAfter: '',
        bonusService: []
      },
      rechargeRules: {
        amount: [
          { required: true, message: '请输入本次充值金额', trigger: 'change' }
        ]
      },
      rechargePop: false,
      selected: '0',
      info: {
        id: '',
        name: '',
        number: '',
        gender: '',
        age: '',
        birthday: '',
        contact: '',
        updatedBy: {
          name: ''
        },
        updatedAt: '',
        updatedWhere: {
          name: ''
        },
        createdWhere: {
          name: ''
        },
        createdBy: {
          name: ''
        },
        consumedBy: {
          name: ''
        },
        consumedAt: '',
        consumedWhere: {
          name: ''
        },
        balance: '',
        bonus: '',
        level: '',
        discount: '',
        bonusService: []
      },
      balanceDetails: [],
      balanceDetailTotal: 0,
      serviceDetails: [],
      serviceDetailTotal: 0
    }
  },
  mounted () {
    this.getMembershipCards()
    this.getMassageScheme()
    this.getMassageItem()
  },
  methods: {
    select (e) {

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
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10,
          name: t.name,
          contact: t.contact,
          number: t.number,
          branchId: t.branch_id
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.membershipCards = res.data.data.records
          t.membershipCardsTotal = res.data.data.total
          if (t.membershipCards.length > 0) {
            t.$refs['membershipCards'].setCurrentRow(t.membershipCards[0])
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
    addMembershipCard () {
      this.membershipCard = {
        number: '',
        level: '',
        discount: '',
        name: '',
        contact: '',
        gender: 1,
        birthday: '',
        balance: '',
        bonus: '',
        bonusExpiredAfter: '',
        bonusService: []
      }
      this.membershipCardPop = true
      this.membershipCardType = 'add'
    },
    addBonusService () {
      this.membershipCard.bonusService.push(
        {
          schemes: [],
          items: [],
          expiredAfter: '',
          times: ''
        }
      )
    },
    delBonusService (index) {
      this.membershipCard.bonusService = this.membershipCard.bonusService.filter((ele, i) => {
        return i !== index
      })
    },
    getMassageScheme () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/massage-scheme'
      }).then((res) => {
        if (res.data.code === 200) {
          t.massageSchemeData = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getMassageItem () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/massage-item'
      }).then((res) => {
        if (res.data.code === 200) {
          t.massageItemData = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    postMembershipCards () {
      const t = this
      t.$refs['membershipCardRef'].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: '/api/membership-card',
            data: t.membershipCard
          }).then((res) => {
            if (res.data.code === 200) {
              t.membershipCardPop = false
              t.getMembershipCards()
            } else {
              t.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    addRecharge () {
      this.recharge = {
        amount: '',
        bonus: '',
        bonusExpiredAfter: '',
        bonusService: []
      }
      this.rechargePop = true
    },
    addRechargeBonusService () {
      this.recharge.bonusService.push(
        {
          schemes: [],
          items: [],
          expiredAfter: '',
          times: ''
        }
      )
    },
    delRechargeBonusService (index) {
      this.recharge.bonusService = this.recharge.bonusService.filter((ele, i) => {
        return i !== index
      })
    },
    postRecharge () {
      const t = this
      t.$refs['rechargeRef'].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: '/api/membership-card/' + t.info.id + '/recharge',
            data: t.recharge
          }).then((res) => {
            if (res.data.code === 200) {
              t.rechargePop = false
              t.getMembershipCards()
            } else {
              t.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    changeMembershipCard (item) {
      this.change = {
        id: item.id,
        number: item.number,
        level: item.level,
        discount: item.discount,
        name: item.name,
        contact: item.contact,
        gender: item.gender,
        birthday: item.birthday
      }
      this.changePop = true
    },
    putMembershipCards () {
      const t = this
      t.$refs['changeRef'].validate((valid) => {
        if (valid) {
          axios({
            method: 'put',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: '/api/membership-card/' + t.change.id,
            data: t.change
          }).then((res) => {
            if (res.data.code === 200) {
              t.changePop = false
              t.getMembershipCards()
            } else {
              t.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    membershipCardsClick (e) {
      if (e) {
        this.info.id = e.id
        this.getInfo()
        this.getBalanceDetails()
        this.getServiceDetails()
      } else {
        this.info = {
          id: '',
          name: '',
          number: '',
          gender: '',
          age: '',
          birthday: '',
          contact: '',
          updatedBy: {
            name: ''
          },
          updatedAt: '',
          updatedWhere: {
            name: ''
          },
          createdWhere: {
            name: ''
          },
          createdBy: {
            name: ''
          },
          consumedBy: {
            name: ''
          },
          consumedAt: '',
          consumedWhere: {
            name: ''
          },
          balance: '',
          bonus: '',
          level: '',
          discount: '',
          bonusService: []
        }
      }
    },
    getInfo () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/membership-card/' + t.info.id
      }).then((res) => {
        if (res.data.code === 200) {
          t.info = res.data.data
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getBalanceDetails (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/membership-card/' + t.info.id + '/balance-detail',
        params: {
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.balanceDetails = res.data.data.records
          t.balanceDetailTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getServiceDetails (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/membership-card/' + t.info.id + '/service-detail',
        params: {
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.serviceDetails = res.data.data.records
          t.serviceDetailTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    view (e) {

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
.el-form--inline .row .el-select {
  width: 600px;
}
.el-input + .el-checkbox {
  margin-left: 20px;
}
.bonus-services {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  padding: 20px;
  margin-bottom: 20px;
}
.bonus-services-left {
  width: 100%;
  margin-right: 20px;
}
.bonus-services .bonus-services-del {
  font-size: 26px;
  color: #ff0000;
}
</style>
