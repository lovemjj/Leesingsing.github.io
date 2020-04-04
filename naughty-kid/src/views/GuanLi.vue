<template>
  <div class="tuina guanli">
    <div class="nav-left">
      <div class="title">
        员工机构管理
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="selected = 0">
        <div class="icon">
          <img src="../assets/app/mendian.svg" alt="">
        </div>
        <div class="name">我的机构/门店</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="selected = 1">
        <div class="icon">
          <img src="../assets/app/yuangong.svg" alt="">
        </div>
        <div class="name">员工管理</div>
      </div>
      <div class="item" :class="{selected: selected === 2}" @click="selected = 2">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">机构门店管理</div>
      </div>
      <div class="item" :class="{selected: selected === 3}" @click="selected = 3">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">岗位管理</div>
      </div>
      <div class="item" :class="{selected: selected === 4}" @click="selected = 4">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">组织结构管理</div>
      </div>
      <div class="item" :class="{selected: selected === 5}" @click="selected = 5">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">员工机构管理</div>
      </div>
      <div class="item" :class="{selected: selected === 6}" @click="selected = 6">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">员工岗位管理</div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 0">
      <div class="search">
        <div class="value">
          <el-button size="small">修改信息</el-button>
          <el-button size="small">保存信息</el-button>
        </div>
      </div>
      <div class="tabel">
        <el-form :model="form" class="demo-form-inline" label-width="150px" size="small">
          <el-form-item label="机构门店编号:">
            <div>JG24534563463</div>
          </el-form-item>
          <el-form-item label="机构门店名称:">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="机构门店照片:">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="机构门店负责人:">
            <el-select v-model="shop" filterable size="small">
              <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人联系电话:">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="地址:">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="机构门店其他说明:">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 1">
      <div class="search">
        <div class="value">
          <el-button size="small">添加员工</el-button>
          <div class="name">查找员工：</div>
          <el-input size="small"></el-input>
          <div class="name">归属机构或门店：</div>
          <el-select v-model="shop" filterable size="small">
            <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tabel">
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
    <div class="tuina-main" v-if="selected === 2">
      <div class="search">
        <div class="value">
          <el-button size="small">添加机构</el-button>
          <div class="name">查找机构：</div>
          <el-input size="small"></el-input>
        </div>
      </div>
      <div class="tabel">
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
          <el-button size="small">添加岗位</el-button>
          <div class="name">查找岗位：</div>
          <el-input size="small"></el-input>
        </div>
      </div>
      <div class="list">
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
      <div class="info">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps">
        </el-tree>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 4">
      <div class="search">
        <div class="value">
          <div class="name">查找机构：</div>
          <el-input size="small"></el-input>
        </div>
      </div>
      <div class="list">
        <div class="title">
          <div>未分组机构</div>
        </div>
        <div class="items">
          <div class="i">
            熊孩子小儿推拿（天宁店）
          </div>
          <div class="i">
            熊孩子小儿推拿（锦绣东苑店）
          </div>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <div>已分组机构</div>
        </div>
        <div class="items">
          <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
          </el-tree>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 5">
      <div class="search">
        <div class="value">
        </div>
      </div>
      <div class="list">
        <div class="title">
          <div>员工列表</div>
          <el-input size="small"></el-input>
        </div>
        <div class="items">
          <el-table
            :data="applyTableData"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="员工工号">
            </el-table-column>
            <el-table-column
              prop="id"
              label="姓名"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <div>已分组机构</div>
          <el-input size="small"></el-input>
        </div>
        <div class="items">
          <el-table
            :data="applyTableData"
            border
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="岗位编号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="id"
              label="岗位名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="apply_num"
              label="备注说明"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 6">
      <div class="search">
        <div class="value">
          <div class="name">设置当前机构的员工权限：</div>
          <el-select v-model="shop" filterable size="small">
            <el-option v-for="item in shops" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="list">
        <div class="title">
          <div>员工列表</div>
          <el-input size="small"></el-input>
        </div>
        <div class="items">
          <el-table
            :data="applyTableData"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="员工工号">
            </el-table-column>
            <el-table-column
              prop="id"
              label="姓名"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <div>已分组机构</div>
          <el-input size="small"></el-input>
        </div>
        <div class="items">
          <el-table
            :data="applyTableData"
            border
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="岗位编号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="id"
              label="岗位名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="apply_num"
              label="备注说明"
              show-overflow-tooltip>
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
      ],
      form: {
        date: '',
        type: '',
        gender: '男',
        label: []
      },
      data: [{
        id: 1,
        label: '工作台',
        children: [{
          id: 1,
          label: '工作台'
        }]
      }, {
        id: 2,
        label: '推拿',
        children: [{
          id: 21,
          label: '推拿接待'
        }, {
          id: 22,
          label: '推拿管理'
        }]
      }, {
        id: 3,
        label: '顾客档案',
        children: [{
          id: 31,
          label: '顾客档案'
        }]
      }, {
        id: 4,
        label: '会员卡',
        children: [{
          id: 41,
          label: '会员卡'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleDragStart (node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
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
.tuina .tuina-main .list {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 125px);
  overflow: auto;
  width: calc(450/1578*100%);
}
.tuina .tuina-main .info {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 125px);
  overflow: auto;
  width: calc(1118/1578*100%);
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
  white-space: nowrap;
}
.tuina .tuina-main .title .el-input {
  width: 200px;
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
.value .name {
  white-space: nowrap;
  margin-left: 10px;
}
.title .value .el-input {
  margin-right: 10px;
}
.el-form {
  text-align: left;
}
.el-date-editor,.el-select {
  width: 100%;
}
.items .i {
  font-size: 13px;
  background-color: #ff9900;
  color: #333333;
  border-radius: 2px;
  border: 1px solid #333333;
  padding: 5px;
  text-align: left;
}
.items .i + .i {
  margin-top: 10px;
}
</style>
<style>
.guanli .el-form .el-date-editor,.guanli .el-form .el-select,.guanli .el-form .el-input,.guanli .el-form .el-upload-dragger,.guanli .el-form .el-textarea {
  width: 600px;
}
.items .el-table .cell {
  font-size: 12px;
}
</style>
