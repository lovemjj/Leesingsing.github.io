<template>
  <div class="tuina xiaoxi">
    <div class="nav-left">
      <div class="title">
        消息管理
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="selected = 0">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">消息推送</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="selected = 1">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">历史消息</div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 0">
      <div class="tabel">
        <el-form :model="form" class="demo-form-inline" label-width="200px" size="small">
          <el-form-item label="推送的消息（200字内）:">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="接收人:">
            <el-select v-model="form.label" multiple>
              <el-option label="到店咨询" value="0"></el-option>
              <el-option label="电话咨询" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="info">清空</el-button>
            <el-button size="small" type="primary">发送</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 1">
      <div class="tabel">
        <div class="title">
          <div class="value">
            <div class="name">当前状态：</div>
            <el-select v-model="shop" filterable size="small">
              <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
            <div class="name" style="margin-left: 10px">申请日期：</div>
            <el-date-picker type="daterange" size="small">
            </el-date-picker>
            <div class="name" style="margin-left: 10px">物料名称：</div>
            <el-input size="small"></el-input>
          </div>
          <el-button size="small" type="primary">查询</el-button>
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
      form: {},
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
  },
  methods: {
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
.tuina .tuina-main .tabel {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 65px);
  overflow: auto;
  width: 100%;
  text-align: left;
}
.tuina .tuina-main .title {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  white-space: nowrap;
}
.tuina .tuina-main .title .value {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
.tuina .title .value .name {
  white-space: nowrap;
}
.tuina .tuina-main .items {
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
}
</style>
<style>
.xiaoxi .el-textarea, .xiaoxi .el-select {
  width: 600px;
}
.xiaoxi .title .el-date-editor, .xiaoxi .title .el-select, .xiaoxi .title .el-input {
  width: 200px;
}
</style>
