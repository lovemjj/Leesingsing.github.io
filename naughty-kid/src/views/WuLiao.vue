<template>
  <div class="tuina">
    <div class="nav-left">
      <div class="title">
        物料
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="select(0)">
        <div class="icon">
          <img src="../assets/app/kucun.svg" alt="">
        </div>
        <div class="name">库存管理</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="select(1)">
        <div class="icon">
          <img src="../assets/app/zongkucun.svg" alt="">
        </div>
        <div class="name">总库存查询</div>
      </div>
      <div class="item" :class="{selected: selected === 2}" @click="select(2)">
        <div class="icon">
          <img src="../assets/app/fenfa.svg" alt="">
        </div>
        <div class="name">调配分发记录</div>
      </div>
      <div class="item" :class="{selected: selected === 3}" @click="select(3)">
        <div class="icon">
          <img src="../assets/app/wuliu.svg" alt="">
        </div>
        <div class="name">调配申请记录</div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 0" key="0">
      <div class="search">
        <div class="value">
          <div class="name">当前库房：</div>
          <el-select v-model="branch_id" filterable size="small" @change="getRepositorys(1)">
            <el-option v-for="item in $store.state.branches" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="list">
        <div class="title">
          <div>本店库存情况</div>
          <div class="value">
            <div class="name">物料搜索：</div>
            <el-input clearable v-model="repositoryLike" size="small" @input="getRepositorys(1)"></el-input>
            <el-button size="small" type="primary" @click="onPop('repositoryAddPop')">新增物料</el-button>
          </div>
        </div>
        <div class="items">
          <div :class="item.material.id === material_id ? 'selected item' : 'item'" v-for="(item, index) in repositorys" :key="index" @click="selectedRepository(item.material.id)">
             <div class="img">
               <el-image style="width: 50px; height: 50px;" :src="item.material.photo"></el-image>
             </div>
             <div class="item-info">
               <div class="names">
                 <div class="name">
                   <div>{{item.material.name}}（单位：{{item.material.unitName}}）</div>
                   <div>{{item.material.number}}</div>
                 </div>
                 <div class="name">
                   <div>现有库存：<span>{{item.total}}</span></div>
                   <div>冻结库存：<span style="color: #ff0000;">{{item.frozen}}</span></div>
                 </div>
                 <div class="name">
                   <div>待入库存：<span style="color: green;">{{item.pending}}</span></div>
                   <div>可用库存：<span style="color: green;">{{item.available}}</span></div>
                 </div>
                 <div class="btns">
                   <div class="btn"><span style="color: blue;" @click="onPop('amountAddPop', item)">调增库存</span><span @click="onPop('returnPop', item)">退库</span></div>
                   <div class="btn"><span style="color: #ff0000;" @click="onPop('amountCutPop', item)">调减库存</span><span style="color: #ff0000;" @click="onPop('shippingPop', item)">出库</span></div>
                 </div>
               </div>
               <div class="addresses">
                 <div class="adress">
                   存放位置信息：{{item.location}}
                 </div>
                 <div class="btn"><span style="color: blue;" @click="onPop('locationChangePop', item)">修改位置信息</span></div>
               </div>
             </div>
          </div>
          <div class="none" v-if="repositorys.length === 0">
            暂无数据
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="repositorysTotal"
          :current-page="repositorysPage"
          @current-change="getRepositorys">
        </el-pagination>
      </div>
      <div class="info">
        <div class="title">
          物料库存变化记录
        </div>
        <div class="items" v-infinite-scroll="detailScroll" :infinite-scroll-immediate="false">
          <el-timeline>
            <el-timeline-item placement="top" v-for="(item, index) in detail" :key="index">
              <el-card>
                <div class="card-main">
                  <div>
                    <div class="status">{{item.type === 0 ? '调增库存' : item.type === 1 ? '调减库存' : item.type === 2 ? '出库 ' : item.type === 3 ? '入库' : item.type === 4 ? '退库' : ''}}：{{item.amount}}</div>
                    <div>操作人：{{item.foreign.name}}</div>
                    <div>调整原因：{{item.reason}}</div>
                  </div>
                  <div>
                    {{item.createdAt}}
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 1" key="1">
      <div class="search">
        <div class="value">
          <div class="name">物料搜索：</div>
          <el-input clearable v-model="allRepositoryLike" size="small" @input="getAllRepositorys(1)"></el-input>
        </div>
      </div>
      <div class="tabel">
        <div class="title">
          搜索结果
        </div>
        <div class="items">
          <div class="item" v-for="(item, index) in allRepositorys" :key="index">
             <div class="img">
               <el-image style="width: 50px; height: 50px;" :src="item.material.photo"></el-image>
             </div>
             <div class="item-info">
               <div class="names">
                 <div class="name">
                   <div>{{item.material.name}}（单位：{{item.material.unitName}}）</div>
                   <div>{{item.material.number}}</div>
                 </div>
                 <div class="name">
                   <div class="shop-name">{{item.branch.name}}</div>
                 </div>
                 <div class="name">
                   <div>现有库存：<span>{{item.total}}</span></div>
                   <div>冻结库存：<span style="color: #ff0000;">{{item.frozen}}</span></div>
                 </div>
                 <div class="name">
                   <div>待入库存：<span style="color: green;">{{item.pending}}</span></div>
                   <div>可用库存：<span style="color: green;">{{item.available}}</span></div>
                 </div>
                 <div class="btns">
                   <div class="btn"><span @click="onPop('applicationPop', item)">库存调配申请</span></div>
                 </div>
               </div>
             </div>
          </div>
          <div class="none" v-if="allRepositorys.length === 0">
            暂无数据
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="allRepositorysTotal"
          :current-page="allRepositorysPage"
          @current-change="getAllRepositorys">
        </el-pagination>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 2" key="2">
      <div class="search">
        <div class="value">
          <div class="name">机构门店：</div>
          <el-select v-model="branch_id" filterable size="small" @change="getFroms(1)">
            <el-option v-for="item in $store.state.branches" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tabel">
        <div class="title">
          <div>调配分发记录</div>
          <div class="value">
            <div class="name">当前状态：</div>
            <el-select v-model="from.status" filterable clearable size="small">
              <el-option v-for="item in bStatus" :key="item.value" :label="item.name" :value="item.status">
              </el-option>
            </el-select>
            <div class="name">申请日期：</div>
            <el-date-picker v-model="from.time" type="daterange" value-format="yyyy-MM-dd" clearable size="small" @change="timeChange">
            </el-date-picker>
            <div class="name">物料名称：</div>
            <el-input v-model="from.material" clearable size="small"></el-input>
            <el-button size="small" type="primary" @click="getFroms(1)">查询</el-button>
          </div>
        </div>
        <div class="items">
          <el-table
            :data="froms"
            border
            style="width: 100%">
            <el-table-column
              label="物料名称">
              <template slot-scope="scope">
                {{scope.row.material.name}}（单位：{{scope.row.material.unitName}}）
              </template>
            </el-table-column>
            <el-table-column
              prop="material.number"
              label="物料编码">
            </el-table-column>
            <el-table-column
              prop="amount0"
              label="申请数量">
            </el-table-column>
            <el-table-column
              prop="amount1"
              label="实际出库">
            </el-table-column>
            <el-table-column
              prop="amount2"
              label="对方实际入库">
            </el-table-column>
            <el-table-column
              prop="to.name"
              label="请调配机构/门店">
            </el-table-column>
            <el-table-column
              prop="createdBy.name"
              label="申请人">
            </el-table-column>
            <el-table-column
              prop="createdAt"
              label="申请时间">
            </el-table-column>
            <el-table-column
              prop="reason"
              label="备注说明">
            </el-table-column>
            <el-table-column
              label="当前状态">
              <template slot-scope="scope">
                {{scope.row.status === -2 ? '已拒绝' : scope.row.status === -1 ? '对方已取消' : scope.row.status === 0 ? '还未出库' : scope.row.status === 1? '已确认出库' : scope.row.status === 2 ? '还没确认退库' : scope.row.status === 3 ? '已经确认退库或者不需要退库' : ''}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="onPop('affirmReturnPop', scope.row)" v-if="scope.row.status === 2">确认退库</el-button>
                <el-button type="text" size="small"  @click="onPop('affirmOutPop', scope.row)" v-if="scope.row.status === 0">确认出库</el-button>
                <el-button type="text" size="small" @click="onPop('cancelOutPop', scope.row)" v-if="scope.row.status === 0">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="fromsTotal"
          :current-page="fromsPage"
          @current-change="getFroms">
        </el-pagination>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 3" key="3">
      <div class="search">
        <div class="value">
          <div class="name">机构门店：</div>
          <el-select v-model="branch_id" filterable size="small" @change="getTos(1)">
            <el-option v-for="item in $store.state.branches" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tabel">
        <div class="title">
          <div>调配申请记录</div>
          <div class="value">
            <div class="name">当前状态：</div>
            <el-select v-model="to.status" filterable clearable size="small">
              <el-option v-for="item in aStatus" :key="item.value" :label="item.name" :value="item.status">
              </el-option>
            </el-select>
            <div class="name">申请日期：</div>
            <el-date-picker v-model="to.time" type="daterange" value-format="yyyy-MM-dd" clearable size="small" @change="timeChange">
            </el-date-picker>
            <div class="name">物料名称：</div>
            <el-input v-model="from.material" clearable size="small"></el-input>
            <el-button size="small" type="primary" @click="getTos(1)">查询</el-button>
          </div>
        </div>
        <div class="items">
          <el-table
            :data="tos"
            border
            style="width: 100%">
            <el-table-column
              label="物料名称">
              <template slot-scope="scope">
                {{scope.row.material.name}}（单位：{{scope.row.material.unitName}}）
              </template>
            </el-table-column>
            <el-table-column
              prop="material.number"
              label="物料编码">
            </el-table-column>
            <el-table-column
              prop="amount0"
              label="申请数量">
            </el-table-column>
            <el-table-column
              prop="amount1"
              label="对方出库数量">
            </el-table-column>
            <el-table-column
              prop="amount2"
              label="实际入库数量">
            </el-table-column>
            <el-table-column
              prop="createdBy.name"
              label="申请人">
            </el-table-column>
            <el-table-column
              prop="createdAt"
              label="申请时间">
            </el-table-column>
            <el-table-column
              prop="from.name"
              label="请调配机构/门店">
            </el-table-column>
            <el-table-column
              prop="reason"
              label="备注说明">
            </el-table-column>
            <el-table-column
              label="当前状态">
              <template slot-scope="scope">
                {{scope.row.status === -2 ? '对方已拒绝' : scope.row.status === -1 ? '已取消' : scope.row.status === 0 ? '等待对方出库' : scope.row.status === 1? '还未确认入库' : scope.row.status === 2 ? '已确认出库' : ''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="onPop('cancelInPop', scope.row)" v-if="scope.row.status === 0">取消调配</el-button>
                <el-button type="text" size="small" @click="onPop('affirmInPop', scope.row)" v-if="scope.row.status === 1">确认入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="tosTotal"
          :current-page="tosPage"
          @current-change="getTos">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="添加物料" width="900px" :visible.sync="repositoryAddPop">
      <div class="add-pop">
        <div class="left">
          <div class="item">
            <div class="name">物料名称：<el-input size="small" v-model="materialLike" suffix-icon="el-icon-search" clearable @input="getMaterials"></el-input></div>
          </div>
          <div class="title">
            搜索结果
          </div>
          <div class="list">
            <div :class="materialSelected.material.id === item.id ? 'selected item' : 'item'" v-for="(item, index) in materials" :key="index" @click="materialSelected.material = item">
              <el-image style="width: 50px; height: 50px;" :src="item.photo"></el-image>
              <div class="info">
                <div class="text">{{item.name}}（单位：{{item.unitName}}）</div>
                <div class="text">{{item.number}}</div>
              </div>
            </div>
            <div class="none">{{getMaterialsText}}</div>
          </div>
        </div>
        <div class="right">
          <el-form ref="repositoryAddPop" :model="materialSelected" label-width="140px" size="small">
            <el-form-item label="当前选中的物料:">
              {{materialSelected.material.name}}（单位：{{materialSelected.material.unitName}}）
            </el-form-item>
            <el-form-item label="添加物料入库数量:" prop="amount" :rules="[{ required: true, message: '请添加物料入库数量', trigger: 'blur' }]">
              <el-input size="small" v-model="materialSelected.amount" clearable></el-input>
            </el-form-item>
            <el-form-item label="存放位置说明:" prop="location" :rules="[{ required: true, message: '请输入存放位置说明', trigger: 'blur' }]">
              <el-input size="small" rows="4" type="textarea" v-model="materialSelected.location" clearable></el-input>
            </el-form-item>
            <el-form-item label="备注说明:">
              <el-input size="small" rows="4" type="textarea" v-model="materialSelected.reason" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="addRepository">确认添加</el-button>
        <el-button size="small" type="primary" @click="repositoryAddPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="'修改位置信息（'+materialSelected.material.name+materialSelected.material.number+'）'" width="600px" :visible.sync="locationChangePop">
      <div class="add-pop">
        <el-form ref="locationChangePop" :model="materialSelected" label-width="120px" size="small">
          <el-form-item label="存放位置说明:" prop="location" :rules="[{ required: true, message: '请输入存放位置说明', trigger: 'blur' }]">
            <el-input size="small" rows="4" type="textarea" v-model="materialSelected.location" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="changeLocation">保存</el-button>
        <el-button size="small" type="primary" @click="locationChangePop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="'调增库存（'+materialSelected.material.name+materialSelected.material.number+'）'" width="600px" :visible.sync="amountAddPop">
      <div class="add-pop">
        <el-form ref="amountAddPop" :model="materialSelected" label-width="200px" size="small">
          <el-form-item label="现有库存:">
            <el-input disabled v-model="materialSelected.available"></el-input>
          </el-form-item>
          <el-form-item label="调增库存（填写正整数）:" prop="amount" :rules="[{ required: true, message: '请输入调增库存', trigger: 'blur' }]">
            <el-input v-model="materialSelected.amount" clearable></el-input>
          </el-form-item>
          <el-form-item label="调增库存原因说明:" prop="reason" :rules="[{ required: true, message: '请输入调增库存原因说明', trigger: 'blur' }]">
            <el-input size="small" rows="4" type="textarea" v-model="materialSelected.reason" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="changeAmount(0)">保存</el-button>
        <el-button size="small" type="primary" @click="amountAddPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="'调减库存（'+materialSelected.material.name+materialSelected.material.number+'）'" width="600px" :visible.sync="amountCutPop">
      <div class="add-pop">
        <el-form ref="amountCutPop" :model="materialSelected" label-width="200px" size="small">
          <el-form-item label="现有库存:">
            <el-input disabled v-model="materialSelected.available"></el-input>
          </el-form-item>
          <el-form-item label="调减库存（填写正整数）:" prop="amount" :rules="[{ required: true, message: '请输入调减库存', trigger: 'blur' }]">
            <el-input v-model="materialSelected.amount" clearable></el-input>
          </el-form-item>
          <el-form-item label="调减库存原因说明:" prop="reason" :rules="[{ required: true, message: '请输入调减库存原因说明', trigger: 'blur' }]">
            <el-input size="small" rows="4" type="textarea" v-model="materialSelected.reason" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="changeAmount(1)">保存</el-button>
        <el-button size="small" type="primary" @click="amountCutPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="'退库（'+materialSelected.material.name+materialSelected.material.number+'）'" width="600px" :visible.sync="returnPop">
      <div class="add-pop">
        <el-form ref="returnPop" :model="materialSelected" label-width="200px" size="small">
          <el-form-item label="现有库存:">
            <el-input disabled v-model="materialSelected.available"></el-input>
          </el-form-item>
          <el-form-item label="退库数量（填写正整数）:" prop="amount" :rules="[{ required: true, message: '请输入退库数量', trigger: 'blur' }]">
            <el-input v-model="materialSelected.amount"></el-input>
          </el-form-item>
          <el-form-item label="退库来源:" required prop="source">
            <el-radio-group v-model="materialSelected.source">
              <el-radio :label="0">顾客</el-radio>
              <el-radio :label="1">库房/门店</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="顾客姓名:" prop="foreign0" v-if="materialSelected.source === 0" :rules="[{ required: true, message: '请选择', trigger: 'change' }]">
            <el-select v-model="materialSelected.foreign0" filterable>
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in customers" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择门店/机构:" prop="foreign1" v-else :rules="[{ required: true, message: '请选择', trigger: 'change' }]">
            <el-select v-model="materialSelected.foreign1" filterable>
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in branches" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退库原因说明:">
            <el-input size="small" rows="4" type="textarea" v-model="materialSelected.reason" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="changeMaterial(4)">保存</el-button>
        <el-button size="small" type="primary" @click="returnPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="'出库（'+materialSelected.material.name+materialSelected.material.number+'）'" width="600px" :visible.sync="shippingPop">
      <div class="add-pop">
        <el-form ref="shippingPop" :model="materialSelected" label-width="200px" size="small">
          <el-form-item label="现有库存:">
            <el-input disabled v-model="materialSelected.available"></el-input>
          </el-form-item>
          <el-form-item label="出库数量（填写正整数）:" prop="amount" :rules="[{ required: true, message: '请输入退库数量', trigger: 'blur' }]">
            <el-input v-model="materialSelected.amount"></el-input>
          </el-form-item>
          <el-form-item label="出库来源:" prop="source">
            <el-radio-group v-model="materialSelected.source">
              <el-radio :label="0">顾客</el-radio>
              <el-radio :label="1">库房/门店</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="顾客姓名:" prop="foreign0" v-if="materialSelected.source === 0" :rules="[{ required: true, message: '请选择', trigger: 'change' }]">
            <el-select v-model="materialSelected.foreign0" filterable>
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in customers" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择门店/机构:" prop="foreign1" v-else :rules="[{ required: true, message: '请选择', trigger: 'change' }]">
            <el-select v-model="materialSelected.foreign1" filterable>
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in branches" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出库原因说明:">
            <el-input size="small" rows="4" type="textarea" v-model="materialSelected.reason" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="changeMaterial(2)">保存</el-button>
        <el-button size="small" type="primary" @click="shippingPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="'库存调配申请（'+materialSelected.material.name+materialSelected.material.number+'）'" width="600px" :visible.sync="applicationPop">
      <div class="add-pop">
        <el-form ref="applicationPop" :model="materialSelected" label-width="200px" size="small">
          <el-form-item label="现有库存:">
            <el-input disabled v-model="materialSelected.available"></el-input>
          </el-form-item>
          <el-form-item label="数量（填写正整数）:" prop="amount" :rules="[{ required: true, message: '请输入退库数量', trigger: 'blur' }]">
            <el-input v-model="materialSelected.amount"></el-input>
          </el-form-item>
          <el-form-item label="出库方:">
            <el-select v-model="materialSelected.branch.id" filterable disabled>
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in branches" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入库方:" prop="to.id" :rules="[{ required: true, message: '请选择入库方', trigger: 'blur' }]">
            <el-select v-model="materialSelected.to.id" filterable>
              <el-option :label="item.name" :value="item.id" v-for="(item, index) in branches" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注信息:">
            <el-input size="small" rows="4" type="textarea" v-model="materialSelected.reason" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="application">申请</el-button>
        <el-button size="small" type="primary" @click="applicationPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="确认实际出库数量" width="400px" :visible.sync="affirmOutPop">
      <div class="add-pop">
        <el-form ref="affirmOutPop" :model="info" label-width="120px" size="small">
          <el-form-item label="预计数量:">
            <el-input disabled v-model="info.amount0"></el-input>
          </el-form-item>
          <el-form-item label="实际出库数量:" prop="amount" :rules="[{ required: true, message: '请输入实际出库数量', trigger: 'blur' }]">
            <el-input v-model="info.amount" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="affirmOut">确认</el-button>
        <el-button size="small" type="primary" @click="affirmOutPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="拒绝调配" width="400px" :visible.sync="cancelOutPop">
      <div class="add-pop">
        确认拒绝调配？
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="cancelOut">确认</el-button>
        <el-button size="small" type="primary" @click="cancelOutPop = false">我再考虑一下</el-button>
      </div>
    </el-dialog>
    <el-dialog title="确认实际退库数量" width="400px" :visible.sync="affirmReturnPop">
      <div class="add-pop">
        <el-form ref="affirmReturnPop" :model="info" label-width="120px" size="small">
          <el-form-item label="对方未入库数量:">
            <el-input disabled :value="info.amount1 - info.amount2"></el-input>
          </el-form-item>
          <el-form-item label="实际退库数量:" prop="amount" :rules="[{ required: true, message: '请输入实际出库数量', trigger: 'blur' }]">
            <el-input v-model="info.amount" clearable></el-input>
          </el-form-item>
          <div>退库完成将释放冻结的库存</div>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="affirmReturn">确认</el-button>
        <el-button size="small" type="primary" @click="affirmReturnPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="确认实际入库数量" width="400px" :visible.sync="affirmInPop">
      <div class="add-pop">
        <el-form ref="affirmInPop" :model="info" label-width="120px" size="small">
          <el-form-item label="预计数量:">
            <el-input disabled v-model="info.amount0"></el-input>
          </el-form-item>
          <el-form-item label="实际入库数量:" prop="amount" :rules="[{ required: true, message: '请输入实际入库数量', trigger: 'blur' }]">
            <el-input v-model="info.amount" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="affirmIn">确认</el-button>
        <el-button size="small" type="primary" @click="affirmInPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="拒绝调配" width="400px" :visible.sync="cancelInPop">
      <div class="add-pop">
        确认拒绝调配？
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="cancelIn">确认</el-button>
        <el-button size="small" type="primary" @click="cancelInPop = false">我再考虑一下</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import axios from 'axios'
export default {
  data () {
    return {
      selected: 0,
      branch_id: '',
      branches: [],
      customers: [],
      repositoryLike: '',
      allRepositoryLike: '',
      repositorys: [],
      allRepositorys: [],
      repositorysPage: 0,
      allRepositorysPage: 0,
      repositorysTotal: 0,
      allRepositorysTotal: 0,
      detail: [],
      detailPage: 0,
      detailTotal: 0,
      repositoryAddPop: false,
      materialLike: '',
      materials: [],
      materialSelected: {
        material: {},
        source: 1,
        branch: {},
        to: {}
      },
      material_id: '',
      locationChangePop: false,
      amountAddPop: false,
      amountCutPop: false,
      returnPop: false,
      shippingPop: false,
      applicationPop: false,
      affirmOutPop: false,
      cancelOutPop: false,
      affirmReturnPop: false,
      affirmInPop: false,
      cancelInPop: false,
      aStatus: [
        {
          status: -1,
          name: '已取消'
        },
        {
          status: 0,
          name: '等待对方出库'
        },
        {
          status: 1,
          name: '还未确认入库'
        },
        {
          status: 2,
          name: '已确认出库'
        }
      ],
      bStatus: [
        {
          status: -2,
          name: '拒绝'
        },
        {
          status: 0,
          name: '还未出库'
        },
        {
          status: 1,
          name: '已确认出库'
        },
        {
          status: 2,
          name: '还没确认退库'
        },
        {
          status: 3,
          name: '已经确认退库或者不需要退库'
        }
      ],
      to: {
        time: []
      },
      from: {
        time: []
      },
      froms: [],
      tos: [],
      fromsPage: 0,
      tosPage: 0,
      fromsTotal: 0,
      tosTotal: 0,
      info: {},
      getMaterialsText: ''
    }
  },
  mounted () {
    this.branch_id = this.$store.state.branch_id
    this.select(0)
  },
  methods: {
    select (e) {
      this.selected = e
      if (e === 0) {
        this.getRepositorys(1)
      }
      if (e === 1) {
        this.getAllRepositorys(1)
      }
      if (e === 2) {
        this.getFroms(1)
      }
      if (e === 3) {
        this.getTos(1)
      }
    },
    onPop (pro, e) {
      if (pro === 'repositoryAddPop') {
        this.materialLike = ''
        this.getMaterials()
      }
      if (pro === 'locationChangePop' || pro === 'amountAddPop' || pro === 'amountCutPop') {
        this.materialSelected = Object.assign({ to: {} }, e)
      }
      if (pro === 'returnPop' || pro === 'shippingPop') {
        this.materialSelected = Object.assign({ to: {}, source: 1 }, e)
        this.getBranches()
        this.getCustomers()
      }
      if (pro === 'applicationPop') {
        this.getBranches()
        this.materialSelected = Object.assign({ to: {} }, e)
      }
      if (pro === 'affirmOutPop' || pro === 'cancelOutPop' || pro === 'affirmReturnPop' || pro === 'affirmInPop' || pro === 'cancelInPop') {
        this.info = Object.assign({}, e)
      }
      this[pro] = true
    },
    getRepositorys (e) {
      const t = this
      t.repositorysPage = e
      Loading.service()
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/branch/${t.branch_id}/repository`,
        params: {
          material: t.repositoryLike,
          page: t.repositorysPage - 1,
          size: 10
        }
      }).then((res) => {
        Loading.service().close()
        if (res.data.code === 200) {
          t.repositorys = res.data.data.records
          t.repositorysTotal = res.data.data.total
          if (t.repositorys.length > 0) {
            t.selectedRepository(t.repositorys[0].material.id)
          } else {
            t.detail = []
            t.detailTotal = 0
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
    getAllRepositorys (e) {
      const t = this
      t.allRepositorysPage = e
      Loading.service()
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/repository`,
        params: {
          material: t.allRepositoryLike,
          page: t.allRepositorysPage - 1,
          size: 10
        }
      }).then((res) => {
        Loading.service().close()
        if (res.data.code === 200) {
          t.allRepositorys = res.data.data.records
          t.allRepositorysTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getDetail () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/branch/${t.branch_id}/repository/${t.material_id}/detail`,
        params: {
          page: t.detailPage,
          size: 10
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.detail = t.detail.concat(res.data.data.records)
          t.detailTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    selectedRepository (id) {
      this.material_id = id
      this.detailPage = 0
      this.detail = []
      this.getDetail()
    },
    detailScroll () {
      if (this.material_id && this.detailTotal > ((this.detailPage + 1) * 10)) {
        this.detailPage++
        this.getDetail()
      }
    },
    getMaterials () {
      const t = this
      t.getMaterialsText = '加载中...'
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/material',
        params: {
          like: t.materialLike
        }
      }).then((res) => {
        t.getMaterialsText = ''
        if (res.data.code === 200) {
          t.materials = res.data.data.records
          if (t.materials.length > 0) {
            t.materialSelected.material = t.materials[0]
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
    addRepository () {
      const t = this
      t.$refs['repositoryAddPop'].validate((valid) => {
        if (valid) {
          Loading.service()
          axios({
            method: 'post',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: `/api/branch/${t.branch_id}/repository`,
            data: {
              material: {
                id: t.materialSelected.material.id
              },
              location: t.materialSelected.location,
              amount: t.materialSelected.amount,
              reason: t.materialSelected.reason
            }
          }).then((res) => {
            Loading.service().close()
            if (res.data.code === 200) {
              t.getRepositorys(1)
              t.repositoryAddPop = false
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
    changeLocation () {
      const t = this
      t.$refs['locationChangePop'].validate((valid) => {
        if (valid) {
          Loading.service()
          axios({
            method: 'patch',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: `/api/branch/${t.branch_id}/repository/${t.materialSelected.material.id}`,
            data: {
              location: t.materialSelected.location
            }
          }).then((res) => {
            Loading.service().close()
            if (res.data.code === 200) {
              t.getRepositorys(1)
              t.locationChangePop = false
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
    changeAmount (e) {
      const t = this
      t.$refs[e === 0 ? 'amountAddPop' : 'amountCutPop'].validate((valid) => {
        if (valid) {
          Loading.service()
          axios({
            method: 'patch',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: `/api/branch/${t.branch_id}/repository/${t.materialSelected.material.id}`,
            data: {
              amount: t.materialSelected.amount,
              reason: t.materialSelected.reason,
              type: e
            }
          }).then((res) => {
            Loading.service().close()
            if (res.data.code === 200) {
              t.getRepositorys(1)
              t.amountAddPop = false
              t.amountCutPop = false
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
    getBranches () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch'
      }).then((res) => {
        if (res.data.code === 200) {
          t.branches = res.data.data.records
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
        url: `/api/branch/${t.branch_id}/customer`
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
    changeMaterial (e) {
      const t = this
      t.$refs[e === 4 ? 'returnPop' : 'shippingPop'].validate((valid) => {
        if (valid) {
          Loading.service()
          axios({
            method: 'patch',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: `/api/branch/${t.branch_id}/repository/${t.materialSelected.material.id}`,
            data: {
              amount: t.materialSelected.amount,
              reason: t.materialSelected.reason,
              source: t.materialSelected.source,
              foreign: t.materialSelected['foreign' + t.materialSelected.source],
              type: e
            }
          }).then((res) => {
            Loading.service().close()
            if (res.data.code === 200) {
              t.getRepositorys(1)
              t.returnPop = false
              t.shippingPop = false
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
    getFroms (e) {
      const t = this
      t.fromsPage = e
      Loading.service()
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/repository-application',
        params: {
          from: t.branch_id,
          page: t.fromsPage - 1,
          size: 10,
          material: t.from.material,
          after: t.from.time ? t.from.time[0] : null,
          before: t.from.time ? t.from.time[1] : null,
          status: t.from.status
        }
      }).then((res) => {
        Loading.service().close()
        if (res.data.code === 200) {
          t.froms = res.data.data.records
          t.fromsTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getTos (e) {
      const t = this
      t.tosPage = e
      Loading.service()
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/repository-application',
        params: {
          to: t.branch_id,
          page: t.tosPage - 1,
          size: 10,
          material: t.to.material,
          after: t.to.time ? t.to.time[0] : null,
          before: t.to.time ? t.to.time[1] : null,
          status: t.to.status
        }
      }).then((res) => {
        Loading.service().close()
        if (res.data.code === 200) {
          t.tos = res.data.data.records
          t.tosTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    application () {
      const t = this
      t.$refs['applicationPop'].validate((valid) => {
        if (valid) {
          Loading.service()
          axios({
            method: 'post',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: '/api/repository-application',
            data: {
              from: {
                id: t.materialSelected.branch.id
              },
              to: {
                id: t.materialSelected.to.id
              },
              material: {
                id: t.materialSelected.material.id
              },
              amount: t.materialSelected.amount,
              reason: t.materialSelected.reason
            }
          }).then((res) => {
            Loading.service().close()
            if (res.data.code === 200) {
              t.getAllRepositorys(1)
              t.applicationPop = false
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
    affirmOut () {
      const t = this
      t.$refs['affirmOutPop'].validate((valid) => {
        if (valid) {
          Loading.service()
          axios({
            method: 'patch',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: `/api/repository-application/${t.info.id}`,
            data: {
              status: 1,
              amount: t.info.amount
            }
          }).then((res) => {
            Loading.service().close()
            if (res.data.code === 200) {
              t.getFroms(1)
              t.affirmOutPop = false
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
    cancelOut () {
      const t = this
      Loading.service()
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/repository-application/${t.info.id}`,
        data: {
          status: -2
        }
      }).then((res) => {
        Loading.service().close()
        if (res.data.code === 200) {
          t.getFroms(1)
          t.cancelOutPop = false
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    affirmReturn () {
      const t = this
      t.$refs['affirmReturnPop'].validate((valid) => {
        if (valid) {
          Loading.service()
          axios({
            method: 'patch',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: `/api/repository-application/${t.info.id}`,
            data: {
              status: 3,
              amount: t.info.amount
            }
          }).then((res) => {
            Loading.service().close()
            if (res.data.code === 200) {
              t.getFroms(1)
              t.affirmReturnPop = false
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
    affirmIn () {
      const t = this
      t.$refs['affirmInPop'].validate((valid) => {
        if (valid) {
          Loading.service()
          axios({
            method: 'patch',
            headers: {
              authorization: t.$store.state.authorization
            },
            url: `/api/repository-application/${t.info.id}`,
            data: {
              status: 2,
              amount: t.info.amount
            }
          }).then((res) => {
            Loading.service().close()
            if (res.data.code === 200) {
              t.getTos(1)
              t.affirmInPop = false
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
    cancelIn () {
      const t = this
      Loading.service()
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: `/api/repository-application/${t.info.id}`,
        data: {
          status: -1
        }
      }).then((res) => {
        Loading.service().close()
        if (res.data.code === 200) {
          t.getTos(1)
          t.cancelInPop = false
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    timeChange (e) {
      this.$forceUpdate()
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
  justify-content: space-between;
}
.tuina .tuina-main .search {
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
.tuina .tuina-main .search .value {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
.tuina .tuina-main .search .value .name {
  white-space: nowrap;
}
.tuina .tuina-main .search .value .second {
  padding-left: 50px;
}
.tuina .tuina-main .search .value .el-select {
  width: 200px;
}
.tuina .tuina-main .list {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  width: calc(850/1578*100%);
}
.tuina .tuina-main .info {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  width: calc(718/1578*100%);
}
.tuina .tuina-main .tabel {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 125px);
  overflow: auto;
  width: 100%;
}
.tuina .tuina-main .title {
  font-size: 18px;
  border-left: 3px solid #ff9900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  height: 30px;
}
.tuina .tuina-main .items {
  border-top: 1px solid #e0e0e0;
  height: calc(100vh - 185px);
  overflow: auto;
}
.tuina .tuina-main .list .items {
  height: calc(100vh - 230px);
}
.tuina .tuina-main .tabel .items {
  height: calc(100vh - 230px);
}
.tuina .tuina-main .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px dashed #f0f0f0;
}
.tuina .tuina-main .item.selected {
  background-color: #fff5e6;
}
.tuina .tuina-main .item .img {
  min-width: 50px;
  width: 50px;
  margin-right: 10px;
}
.tuina .tuina-main .item-info {
  width: 100%;
  font-size: 14px;
  line-height: 28px;
}
.tuina .tuina-main .item-info .names {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
}
.tuina .tuina-main .tabel .item-info .name {
  width: 20%;
}
.tuina .tuina-main .item-info .names .shop-name {
  font-weight: bold;
}
.tuina .tuina-main .item-info .addresses {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
span {
  color: #ff9900;
}
span + span {
  margin-left: 10px;
}
.el-timeline {
  margin: 10px 0;
}
.card-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  text-align: left;
}
.card-main .status {
  font-weight: bold;
}
.items .el-table {
  margin-top: 10px;
}
.title .value {
  font-size: 14px;
  display: flex;
  align-items: center;
}
.title .value .name {
  white-space: nowrap;
  margin-left: 10px;
}
.title .value .el-input {
  margin-right: 10px;
}
.el-date-editor,.el-select {
  width: 100%;
}
.add-pop {
  display: flex;
  align-items: center;
}
.add-pop .left {
  width: 50%;
  padding: 0 10px;
  border-right: 1px solid #f0f0f0;
}
.add-pop .list {
  height: 200px;
  overflow: auto;
}
.add-pop .el-form {
  width: 100%;
}
.add-pop .item {
  display: flex;
  padding: 10px;
  width: 100%;
}
.add-pop .item.selected {
  background-color: #fff5e6;
}
.add-pop .item + .item {
  border-top: 1px dashed #f0f0f0;
}
.add-pop .item .name {
  white-space: nowrap;
  min-width: 30%;
}
.add-pop .item .text {
  line-height: 26px;
  padding-left: 10px;
}
.add-pop .title {
  font-size: 18px;
  border-left: 2px solid #ff9900;
  padding-left: 10px;
  color: #333333;
}
.add-pop .right {
  width: 50%;
  padding: 0 10px;
}
.none {
  text-align: center;
  line-height: 64px;
  color: #999999;
}
</style>
<style>
.items .el-table .cell {
  font-size: 12px;
}
</style>
