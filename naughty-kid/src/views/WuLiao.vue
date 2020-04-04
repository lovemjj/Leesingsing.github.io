<template>
  <div class="tuina">
    <div class="nav-left">
      <div class="title">
        物料
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="selected = 0">
        <div class="icon">
          <img src="../assets/app/kucun.svg" alt="">
        </div>
        <div class="name">库存管理</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="selected = 1">
        <div class="icon">
          <img src="../assets/app/zongkucun.svg" alt="">
        </div>
        <div class="name">总库存查询</div>
      </div>
      <div class="item" :class="{selected: selected === 2}" @click="selected = 2">
        <div class="icon">
          <img src="../assets/app/fenfa.svg" alt="">
        </div>
        <div class="name">调配分发记录</div>
      </div>
      <div class="item" :class="{selected: selected === 3}" @click="selected = 3">
        <div class="icon">
          <img src="../assets/app/wuliu.svg" alt="">
        </div>
        <div class="name">调配申请记录</div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 0">
      <div class="search">
        <div class="value">
          <div class="name">当前库房：</div>
          <el-select v-model="shop" filterable size="small">
            <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="list">
        <div class="title">
          <div>本店库存情况</div>
          <div class="value">
            <div class="name">当前库房：</div>
            <el-input size="small"></el-input>
            <el-button size="small" type="primary">查询</el-button>
          </div>
        </div>
        <div class="items">
          <div class="item" v-for="item in 5" :key="item">
             <div class="img">
               <img src="../assets/app/xiong.png" alt="">
             </div>
             <div class="item-info">
               <div class="names">
                 <div class="name">
                   <div>小儿退烧贴（单位:盒）</div>
                   <div>325436453254325</div>
                 </div>
                 <div class="name">
                   <div>现有库存：<span class="">90</span></div>
                   <div>冻结库存：<span>90</span></div>
                 </div>
                 <div class="name">
                   <div>待入库存：<span>90</span></div>
                   <div>可用库存：<span>90</span></div>
                 </div>
                 <div class="btns">
                   <div class="btn"><span>调增库存</span><span>退库</span></div>
                   <div class="btn"><span>调减库存</span><span>出库</span></div>
                 </div>
               </div>
               <div class="addresses">
                 <div class="adress">
                   存放位置信息：XXXXXXXXXXXXXXXXX
                 </div>
                 <div class="btn"><span>修改位置信息</span></div>
               </div>
             </div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="title">
          物料库存变化记录
        </div>
        <div class="items">
          <el-timeline>
            <el-timeline-item placement="top" v-for="item in 10" :key="item">
              <el-card>
                <div class="card-main">
                  <div>
                    <div class="status">调增库存：30</div>
                    <div>操作人：王店长</div>
                    <div>调整原因：自制产品增加库存</div>
                  </div>
                  <div>
                    2020-01-05 12:33
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 1">
      <div class="search">
        <div class="value">
          <div class="name">物料名称：</div>
          <el-select v-model="shop" filterable size="small">
            <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button size="small" type="primary">查询</el-button>
      </div>
      <div class="tabel">
        <div class="title">
          搜索结果
        </div>
        <div class="items">
          <div class="item" v-for="item in 5" :key="item">
             <div class="img">
               <img src="../assets/app/xiong.png" alt="">
             </div>
             <div class="item-info">
               <div class="names">
                 <div class="name">
                   <div>小儿退烧贴（单位：盒）</div>
                   <div>325436453254325</div>
                 </div>
                 <div class="name">
                   <div class="shop-name">熊孩子小儿推拿（锦绣东苑店）</div>
                 </div>
                 <div class="name">
                   <div>现有库存：<span class="">90</span></div>
                   <div>冻结库存：<span>90</span></div>
                 </div>
                 <div class="name">
                   <div>待入库存：<span>90</span></div>
                   <div>可用库存：<span>90</span></div>
                 </div>
                 <div class="btns">
                   <div class="btn"><span>库存调配申请</span></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 2">
      <div class="search">
        <div class="value">
          <div class="name">机构门店：</div>
          <el-select v-model="shop" filterable size="small">
            <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tabel">
        <div class="title">
          <div>调配分发记录</div>
          <div class="value">
            <div class="name">当前状态：</div>
            <el-select v-model="shop" filterable size="small">
              <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
            <div class="name">申请日期：</div>
            <el-date-picker type="daterange" size="small">
            </el-date-picker>
            <div class="name">物料名称：</div>
            <el-input size="small"></el-input>
            <el-button size="small" type="primary">查询</el-button>
          </div>
        </div>
        <div class="items">
          <el-table
            :data="applyTableData"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="物料名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="id"
              label="物料编码"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="apply_num"
              label="申请数量"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="out_num"
              label="对方出库数量"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="in_num"
              label="实际入库数量"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="people"
              label="申请人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="apply_time"
              label="申请时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="apply_shop"
              label="请调配机构/门店"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="label"
              label="备注说明"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="status"
              label="当前状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
              <div>取消调配</div>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 3">
      <div class="search">
        <div class="value">
          <div class="name">机构门店：</div>
          <el-select v-model="shop" filterable size="small">
            <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tabel">
        <div class="title">
          <div>调配申请记录</div>
          <div class="value">
            <div class="name">当前状态：</div>
            <el-select v-model="shop" filterable size="small">
              <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
            <div class="name">申请日期：</div>
            <el-date-picker type="daterange" size="small">
            </el-date-picker>
            <div class="name">物料名称：</div>
            <el-input size="small"></el-input>
            <el-button size="small" type="primary">查询</el-button>
          </div>
        </div>
        <div class="items">
          <el-table
            :data="applyTableData"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="物料名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="id"
              label="物料编码"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="apply_num"
              label="申请数量"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="out_num"
              label="对方出库数量"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="in_num"
              label="实际入库数量"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="people"
              label="申请人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="apply_time"
              label="申请时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="apply_shop"
              label="请调配机构/门店"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="label"
              label="备注说明"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="status"
              label="当前状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
              <div>取消调配</div>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tuina',
  data () {
    return {
      selected: 0,
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
      applyTableData: [
        {
          name: '小儿退烧贴（单位:盒）',
          id: '888111222',
          apply_num: '30',
          out_num: '20',
          in_num: '20',
          people: '哈哈',
          apply_time: '2020-02-02 08:11',
          apply_shop: '熊孩子小儿推拿（天宁店）',
          label: '',
          status: '等待对方出库'
        }
      ]
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
  height: calc(100vh - 125px);
  overflow: auto;
  width: calc(850/1578*100%);
}
.tuina .tuina-main .info {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 125px);
  overflow: auto;
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
}
.tuina .tuina-main .items {
  border-top: 1px solid #e0e0e0;
}
.tuina .tuina-main .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #999999;
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
</style>
<style>
.items .el-table .cell {
  font-size: 12px;
}
</style>
