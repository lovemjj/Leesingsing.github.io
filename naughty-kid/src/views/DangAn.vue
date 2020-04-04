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
      </div>
      <el-button size="small" type="primary">查询</el-button>
    </div>
    <div class="list item">
      <div class="title">
        顾客列表
      </div>
      <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="num"
            label="顾客ID"
            width="110">
          </el-table-column>
          <el-table-column
            prop="name"
            label="顾客姓名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="old"
            label="年龄"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="caozuo"
            label="操作"
            width="60">
            <div @click="changeUserInfo = true">修改</div>
          </el-table-column>
        </el-table>
    </div>
    <div class="info item">
      <div class="title">
        顾客档案
      </div>
      <el-tabs v-model="infoName" type="card" @tab-click="infoClick">
        <el-tab-pane label="基本信息" name="base">
          <div class="info-title">
            基本信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                顾客姓名:
              </div>
              <div class="info-item-value">
                赵蓬蓬
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                顾客ID:
              </div>
              <div class="info-item-value">
                202002020002
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                性别:
              </div>
              <div class="info-item-value">
                女
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                年龄:
              </div>
              <div class="info-item-value">
                4岁
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                出生年月日:
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                联系电话:
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item all">
              <div class="info-item-name">
                首次建档机构/门店:
              </div>
              <div class="info-item-value">
                熊孩子小儿推拿（锦绣东苑店）
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档人:
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档时间:
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                基本信息最后更新人:
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新时间:
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
          </div>
          <div class="info-title">
            最近一次陪同人员信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                顾客姓名:
              </div>
              <div class="info-item-value">
                赵蓬蓬
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                顾客ID:
              </div>
              <div class="info-item-value">
                202002020002
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                性别:
              </div>
              <div class="info-item-value">
                女
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                年龄:
              </div>
              <div class="info-item-value">
                4岁
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                出生年月日:
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                联系电话:
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item all">
              <div class="info-item-name">
                首次建档机构/门店:
              </div>
              <div class="info-item-value">
                熊孩子小儿推拿（锦绣东苑店）
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档人:
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档时间:
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                基本信息最后更新人:
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新时间:
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
          </div>
          <div class="info-title">
            消费信息
          </div>
          <div class="info-list">
            <div class="info-item">
              <div class="info-item-name">
                顾客姓名:
              </div>
              <div class="info-item-value">
                赵蓬蓬
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                顾客ID:
              </div>
              <div class="info-item-value">
                202002020002
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                性别:
              </div>
              <div class="info-item-value">
                女
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                年龄:
              </div>
              <div class="info-item-value">
                4岁
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                出生年月日:
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                联系电话:
              </div>
              <div class="info-item-value">
                2016-03-12
              </div>
            </div>
            <div class="info-item all">
              <div class="info-item-name">
                首次建档机构/门店:
              </div>
              <div class="info-item-value">
                熊孩子小儿推拿（锦绣东苑店）
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档人:
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                首次建档时间:
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                基本信息最后更新人:
              </div>
              <div class="info-item-value">
                张医生
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-name">
                最后更新时间:
              </div>
              <div class="info-item-value">
                2020-01-01 12:33
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务信息" name="serve">
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
    <el-dialog title="修改顾客信息" width="800px" :visible.sync="changeUserInfo">
      <div class="change-user-info">
        <div class="change-user-info-item">
          <div class="title">
            基本信息
          </div>
          <el-form :model="baseInfo" label-width="120px" size="small">
            <el-form-item label="顾客姓名:">
              <el-input v-model="baseInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="顾客ID:">
              201902030003
            </el-form-item>
            <el-form-item label="性别:">
              <el-radio v-model="baseInfo.gender" label="man">男</el-radio>
              <el-radio v-model="baseInfo.gender" label="woman">女</el-radio>
            </el-form-item>
            <el-form-item label="出生年月日:">
              <el-date-picker
                v-model="baseInfo.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="年龄（岁）:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input></el-input>
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
          <el-form :model="baseInfo" label-width="120px" size="small">
            <el-form-item label="陪同人员类型:">
              <el-radio v-model="baseInfo.gender" label="father">爸爸</el-radio>
              <el-radio v-model="baseInfo.gender" label="mather">妈妈</el-radio>
              <el-radio v-model="baseInfo.gender" label="grandfather">爷爷</el-radio>
              <el-radio v-model="baseInfo.gender" label="grandmother">奶奶</el-radio>
              <el-radio v-model="baseInfo.gender" label="maternalgrandfather">外公</el-radio>
              <el-radio v-model="baseInfo.gender" label="maternalgrandmother">外婆</el-radio>
              <el-radio v-model="baseInfo.gender" label="other">其他</el-radio>
            </el-form-item>
            <el-form-item label="其他类型说明:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="陪同人员姓名:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="陪同人员手机号:">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="changeUserInfo = false">保存修改</el-button>
        <el-button size="small" type="primary" @click="changeUserInfo = false">取消</el-button>
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
              咨询接待
            </div>
            <div class="dislog-jiedai-title-info">
              <div class="dislog-jiedai-name">
                序号：
              </div>
              <div class="dislog-jiedai-value">
                未生成
              </div>
              <div class="dislog-jiedai-name">
                儿童健康管理师：
              </div>
              <div class="dislog-jiedai-value">
                张医生
              </div>
              <div class="dislog-jiedai-name">
                录入时间：
              </div>
              <div class="dislog-jiedai-value">
                2020-01-15 15:44
              </div>
            </div>
          </div>
          <div class="dislog-jiedai-step">
            <el-steps :active="active" align-center finish-status="success">
              <el-step title="咨询接待"></el-step>
              <el-step title="开单计费"></el-step>
              <el-step title="收费执行"></el-step>
            </el-steps>
          </div>
          <div class="dislog-jiedai-info">
            <div class="dislog-jiedai-info-title">
              调理咨询单
            </div>
            <el-form :inline="true" :model="form" class="demo-form-inline" size="mini">
              <el-form-item label="咨询日期:">
                <el-date-picker v-model="form.date" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="咨询方式:">
                <el-select v-model="form.type" placeholder="咨询方式">
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预约日期:">
                <el-date-picker v-model="form.date" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="调理日期:">
                <el-date-picker v-model="form.date" type="date">
                </el-date-picker>
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>调理人信息</div>
                <div class="line"></div>
              </div>
              <el-form-item label="调理人姓名:">
                <el-select v-model="form.type" filterable allow-create>
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄（岁）:" class="short">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="出生年月:">
                <el-date-picker v-model="form.date" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="顾客档案编号:">
                <el-input v-model="form.age" disabled></el-input>
              </el-form-item>
              <el-form-item label="性别:">
                <el-radio-group v-model="form.gender">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否初审:">
                <el-radio-group v-model="form.gender">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="已调理次数:" class="short">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="当前疗程已调理次数:" class="short">
                <el-input v-model="form.age"></el-input>
                /
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="调理人手机号:">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>会员卡信息</div>
                <div class="line"></div>
              </div>
              <el-form-item label="会员卡卡号:">
                <el-select v-model="form.type" filterable>
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="持卡人姓名:">
                <el-input v-model="form.age" disabled></el-input>
              </el-form-item>
              <el-form-item label="持卡人电话:">
                <el-input v-model="form.age" disabled></el-input>
              </el-form-item>
              <span class="chongzhi">会员卡充值>></span>
              <el-form-item label="会员卡级别:">
                <el-input v-model="form.age" disabled></el-input>
              </el-form-item>
              <el-form-item label="卡内充值余额:">
                <el-input v-model="form.age" disabled></el-input>
              </el-form-item>
              <el-form-item label="卡内赠送余额:">
                <el-input v-model="form.age" disabled></el-input>
              </el-form-item>
              <el-form-item label="会员卡折扣:">
                <el-input v-model="form.age" disabled></el-input>
              </el-form-item>
              <el-form-item label="赠送项目剩余情况:">
                小儿推拿（5次）；成人推拿（3次）
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>本次陪同人员信息</div>
                <div class="line"></div>
              </div>
              <el-form-item label="陪同人员类型:" class="whole">
                <el-radio-group v-model="form.gender">
                  <el-radio label="爸爸"></el-radio>
                  <el-radio label="妈妈"></el-radio>
                  <el-radio label="爷爷"></el-radio>
                  <el-radio label="奶奶"></el-radio>
                  <el-radio label="外公"></el-radio>
                  <el-radio label="外婆"></el-radio>
                  <el-radio label="其他">
                    <div class="else">其他</div>
                    <el-input v-model="form.age"></el-input>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="陪同人姓名:">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="陪同人手机号:">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <div class="dislog-jiedai-info-biaoti">
                <div class="line"></div>
                <div>本次咨询症状</div>
                <div class="line"></div>
              </div>
              <el-form-item label="本次调理前症状自我描述（家长陪同可补充）:" class="whole">
                <el-select v-model="form.label" multiple>
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="其他症状说明:" class="whole">
                <el-input type="textarea" :rows="2" v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="上传附件（如舌苔照）:" class="whole">
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="咨询接待人:">
                <el-select v-model="form.type" filterable>
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="dislog-jiedai-info-title">
              熊孩子中医体质辩证调理方案
            </div>
            <el-form :inline="true" :model="form" class="demo-form-inline" size="mini">
              <el-form-item label="调理总时长（分钟）:">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="调理总费用（￥）:">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <div class="else">
                (会员卡可用余额:5600+780)
              </div>
              <el-form-item label="专家团体体质辩证意见:" class="whole">
                <el-select v-model="form.label" multiple>
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
              <div class="whole">
                <el-form-item label="专家团体设定调理方案:" class="whole">
                  <el-select v-model="form.label" multiple>
                    <el-option label="到店咨询" value="0"></el-option>
                    <el-option label="电话咨询" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="预计调理次数:" class="short">
                  <el-input v-model="form.age"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="本次调理项目意见:" class="whole">
                <el-select v-model="form.label" multiple>
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="指派技师:">
                <el-select v-model="form.type" filterable>
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="诊断开方人:">
                <el-select v-model="form.type" filterable>
                  <el-option label="到店咨询" value="0"></el-option>
                  <el-option label="电话咨询" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="dislog-jiedai-info-title">
              收费情况
            </div>
            <div class="dislog-jiedai-info-pay">
              <div class="dislog-jiedai-info-attention">
                <div class="icon">
                  <img src="../assets/app/attention.svg" alt="">
                </div>
                本系统不做收费，仅做费用登记。确认收费前请确保顾客已经通过收费系统完成付费。
              </div>
              <div class="dislog-jiedai-info-item">
                确认收费人:张医生
              </div>
              <div class="dislog-jiedai-info-item">
                <div class="i">本次可用的赠送服务次数:6次</div>
                <div class="i">本次是否使用赠送服务:<el-checkbox v-model="form.used">使用</el-checkbox>
                </div>
              </div>
              <div class="dislog-jiedai-info-item">
                实际需确认收费费用:<div class="dislog-jiedai-info-money">￥400.00</div>
              </div>
            </div>
          </div>
        </div>
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
      tableData: [
        {
          num: '001',
          name: '张三',
          gender: '男',
          old: '10'
        }, {
          num: '001',
          name: '张三',
          gender: '男',
          old: '10'
        }, {
          num: '001',
          name: '张三',
          gender: '男',
          old: '10'
        }, {
          num: '001',
          name: '张三',
          gender: '男',
          old: '10'
        }, {
          num: '001',
          name: '张三',
          gender: '男',
          old: '10'
        }
      ],
      infoName: 'base',
      serveTableData: [
        {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }, {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }, {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }, {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }, {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }, {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }, {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }, {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }, {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }, {
          num: '123',
          in_time: '2020-02-02 02:22:20',
          name: '王小虎',
          id: '201809090001',
          yisheng: '张医生',
          zhengzhuang: '拉肚子、呕吐',
          tizhi: '气虚体质',
          fangan: '小儿推拿',
          xiangmu: '补肾经……',
          jishi: '刘丽',
          money: '400',
          toll: '是',
          zhuangtai: '执行中'
        }
      ],
      changeUserInfo: false,
      baseInfo: {},
      popInfo: false,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      active: 1,
      form: {
        date: '',
        type: '',
        gender: '男',
        label: []
      }
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
