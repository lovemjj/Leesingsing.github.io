<template>
  <div class="tuina">
    <div class="nav-left">
      <div class="title">
        推拿
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="selected = 0">
        <div class="icon">
          <img src="../assets/app/jiedai.svg" alt="">
        </div>
        <div class="name">推拿接待</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="selected = 1">
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
            未生成
          </div>
          <div class="name">
            儿童健康管理师:
          </div>
          <div class="value">
            张医生
          </div>
          <div class="name">
            录入时间:
          </div>
          <div class="value">
            2020-01-15 15:44
          </div>
        </div>
      </div>
      <div class="step-main">
        <div class="step">
          <el-steps :active="active" align-center finish-status="success">
            <el-step title="咨询接待"></el-step>
            <el-step title="开单计费"></el-step>
            <el-step title="收费执行"></el-step>
          </el-steps>
        </div>
        <div class="info">
          <div class="info-title">
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
            <div class="info-biaoti">
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
            <div class="info-biaoti">
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
            <span>会员卡充值>></span>
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
            <div class="info-biaoti">
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
            <div class="info-biaoti">
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
          <div class="info-title" v-if="active === 2 || active === 3">
            熊孩子中医体质辩证调理方案
          </div>
          <el-form :inline="true" :model="form" class="demo-form-inline" size="mini" v-if="active === 2 || active === 3">
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
          <div class="info-title" v-if="active === 3">
            收费情况
          </div>
          <div class="pay" v-if="active === 3">
            <div class="attention">
              <div class="icon">
                <img src="../assets/app/attention.svg" alt="">
              </div>
              本系统不做收费，仅做费用登记。确认收费前请确保顾客已经通过收费系统完成付费。
            </div>
            <div class="item">
              确认收费人:张医生
            </div>
            <div class="item">
              <div class="i">本次可用的赠送服务次数:6次</div>
              <div class="i">本次是否使用赠送服务:<el-checkbox v-model="form.used">使用</el-checkbox>
              </div>
            </div>
            <div class="item">
              实际需确认收费费用:<div class="money">￥400.00</div>
            </div>
          </div>
          <div class="btn">
            <el-button size="small" type="info" v-if="active === 1">保存预约</el-button>
            <el-button size="small" type="primary" v-if="active === 1" @click="active = 2">确认接待</el-button>
            <el-button size="small" type="primary" v-if="active === 1" @click="active = 3">确认接待并开方</el-button>
            <el-button size="small" type="primary" v-if="active === 2" @click="active = 3">确认开方</el-button>
            <el-button size="small" type="primary" v-if="active === 3" @click="shoufei = true">确认收费</el-button>
            <el-button size="small" type="danger">流程终止</el-button>
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
      <el-form :inline="true" :model="form" class="title demo-form-inline" size="mini">
        <el-form-item label="调理人:">
          <el-select v-model="form.type" filterable>
            <el-option label="到店咨询" value="0"></el-option>
            <el-option label="电话咨询" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="技师:">
          <el-select v-model="form.type" filterable>
            <el-option label="到店咨询" value="0"></el-option>
            <el-option label="电话咨询" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="咨询日期:">
          <el-date-picker v-model="form.date" type="daterange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="调理日期:">
          <el-date-picker v-model="form.date" type="daterange">
          </el-date-picker>
        </el-form-item>
        <el-checkbox v-model="form.checked">流程未终止</el-checkbox>
        <el-checkbox v-model="form.checked">流程终止</el-checkbox>
        <el-button size="small" type="primary">查询</el-button>
      </el-form>
      <div class="tabel">
        <el-radio-group v-model="radio">
          <el-radio :label="1">全部（999）</el-radio>
          <el-radio :label="2">咨询接待（999）</el-radio>
          <el-radio :label="3">已开方未收费（999）</el-radio>
          <el-radio :label="4">收费待执行（999）</el-radio>
          <el-radio :label="5">执行中（999）</el-radio>
          <el-radio :label="6">已执行（999）</el-radio>
          <el-radio :label="7">家长已确认（999）</el-radio>
        </el-radio-group>
        <el-table
          :data="tableData"
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
      </div>
    </div>
    <el-dialog width="600px" :visible.sync="shoufei" :show-close="false">
      <div slot="title" class="shou-fei-title">
        收费合计：<div class="money">¥400.00</div>
      </div>
      <div class="shou-fei-main">
        <div class="shou-fei-item">
          <div class="shou-fei-i">
            已录入费用：<div class="had-money">300</div>
          </div>
          <div class="shou-fei-i">
            还需录入费用：<div class="need-money">100</div>
          </div>
        </div>
        <div class="shou-fei-item" v-for="(item, index) in shoufeiList" :key="index">
          <div class="shou-fei-i">
            收费方式：
            <el-select size="small" v-model="item.pay" placeholder="请选择">
            </el-select>
          </div>
          <div class="shou-fei-i">
            费用：
            <el-input size="small" v-model="item.money"></el-input>
          </div>
          <div class="shou-fei-i">
            <i class="el-icon-circle-plus had-money"></i>
            <i class="el-icon-remove need-money" v-if="index !== 0"></i>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="shoufei = false">确认修改</el-button>
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
  name: 'tuina',
  data () {
    return {
      selected: 0,
      active: 1,
      form: {
        date: '',
        type: '',
        gender: '男',
        label: []
      },
      radio: 1,
      tableData: [],
      shoufei: false,
      shoufeiList: [
        {
          pay: '支付宝',
          money: 100
        },
        {
          pay: '微信',
          money: 200
        }
      ],
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
      }
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
  padding: 0 15px;
}
.short {
  white-space: nowrap;
}
.short .el-input {
  width: 50px;
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
.tabel {
  width: 100%;
  height: calc(100vh - 125px);
  background-color: #ffffff;
  padding: 0 30px;
}
.tabel .el-radio-group {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #999999;
  margin-bottom: 30px;
}
.tabel .el-pagination {
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
.tabel .el-table th, .el-table td {
  padding: 8px 0;
}
</style>
