<template>
  <div class="tuina xiaoxi">
    <div class="nav-left">
      <div class="title">
        基础字典
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="selected = 0">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">基础信息</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="selected = 1">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">调理方案字典</div>
      </div>
      <div class="item" :class="{selected: selected === 2}" @click="selected = 2">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">调理项目字典</div>
      </div>
      <div class="item" :class="{selected: selected === 3}" @click="selected = 3">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">方案项目字典</div>
      </div>
      <div class="item" :class="{selected: selected === 4}" @click="selected = 4">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">辅助诊断配置</div>
      </div>
      <div class="item" :class="{selected: selected === 5}" @click="selected = 5">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">物料字典</div>
      </div>
      <div class="item" :class="{selected: selected === 6}" @click="selected = 6">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">参数配置</div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 0">
      <div class="list">
        <div class="list-title">
          <el-button size="small">新增字典分类</el-button>
          <el-input v-model="dictionaryLike" @input="dictionaryInput" size="small" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table border :data="dictionaryData">
          <el-table-column
            label="字典分类编码"
            prop="number">
          </el-table-column>
          <el-table-column
            label="字典分类名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="dictionaryChange(scope.row.number)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <div class="search">
          当前字典分类：体质辩证
        </div>
        <div class="last">
          <div class="list-title">
            <el-button size="small">新增字典项</el-button>
            <el-input size="small" suffix-icon="el-icon-search"></el-input>
          </div>
          <el-table border :data="dictionaryItemData">
            <el-table-column
              label="字典项编码"
              prop="number"
              width="100">
            </el-table-column>
            <el-table-column
              label="排序号"
              prop="order"
              width="100">
            </el-table-column>
            <el-table-column
              label="字典项名称"
              prop="name"
              width="200">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="dictionaryItemChange(scope.row.number)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 1">
      <div class="tabel">
        <div class="list-title">
          <el-button size="small">新增调理方案</el-button>
          <el-input size="small" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table border>
          <el-table-column
            label="调理方案代码">
          </el-table-column>
          <el-table-column
            label="方案名称">
          </el-table-column>
          <el-table-column
            label="价格">
          </el-table-column>
          <el-table-column
            label="预估时长">
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 2">
      <div class="tabel">
        <div class="list-title">
          <el-button size="small">新增调理项目</el-button>
          <el-input size="small" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table border>
          <el-table-column
            label="调理项目代码">
          </el-table-column>
          <el-table-column
            label="项目名称">
          </el-table-column>
          <el-table-column
            label="预估时长（分）">
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 3">
      <div class="list">
        <div class="list-title">
          调理方案
        </div>
        <el-table border>
          <el-table-column
            label="调理方案代码">
          </el-table-column>
          <el-table-column
            label="方案名称">
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <div class="tabel">
          <div class="list-title">
            当前选中的调理方案：小儿推拿
            <el-input size="small" suffix-icon="el-icon-search"></el-input>
          </div>
          <el-table border>
            <el-table-column
              type="selection"
              width="35">
            </el-table-column>
            <el-table-column
              label="调理项目代码">
            </el-table-column>
            <el-table-column
              label="项目名称">
            </el-table-column>
            <el-table-column
              label="预估时长（分）">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 4">
      <div class="list">
        <div class="step">
          第1步：建立方案
        </div>
        <div class="list-title">
          <el-button size="small">新增</el-button>
          <el-input size="small" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table border>
          <el-table-column
            label="辅助诊断方案">
          </el-table-column>
        </el-table>
      </div>
      <div class="info">
        <div class="model">
          <div class="step">
            第2-1步：筛选调理人
          </div>
          <el-table border>
            <el-table-column
              label="项目">
            </el-table-column>
            <el-table-column
              label="说明">
            </el-table-column>
            <el-table-column
              label="具体值">
            </el-table-column>
          </el-table>
        </div>
        <div class="model">
          <div class="step">
            第2-2步：辅助判断体质辩证结果
          </div>
          <el-table border>
            <el-table-column
              label="项目">
            </el-table-column>
            <el-table-column
              label="说明">
            </el-table-column>
            <el-table-column
              label="具体值">
            </el-table-column>
          </el-table>
        </div>
        <div class="model">
          <div class="step">
            第2-3步：辅助判断调理方案
          </div>
          <el-table border>
            <el-table-column
              label="项目">
            </el-table-column>
            <el-table-column
              label="说明">
            </el-table-column>
            <el-table-column
              label="具体值">
            </el-table-column>
          </el-table>
        </div>
        <div class="model">
          <div class="step">
            第2-4步：辅助判断调理项目
          </div>
          <el-table border>
            <el-table-column
              label="项目">
            </el-table-column>
            <el-table-column
              label="说明">
            </el-table-column>
            <el-table-column
              label="具体值">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 5">
      <div class="search">
        <el-button size="small">新增调理项目</el-button>
        <el-input size="small" suffix-icon="el-icon-search"></el-input>
      </div>
      <div class="last">
        <el-table border>
          <el-table-column
            label="图片">
          </el-table-column>
          <el-table-column
            label="物料编号">
          </el-table-column>
          <el-table-column
            label="名称">
          </el-table-column>
          <el-table-column
            label="单位（最小可拆分单位）">
          </el-table-column>
          <el-table-column
            label="成本价（单价）">
          </el-table-column>
          <el-table-column
            label="零售价（单价）">
          </el-table-column>
          <el-table-column
            label="生产厂家">
          </el-table-column>
          <el-table-column
            label="供应商">
          </el-table-column>
          <el-table-column
            label="备注说明">
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 6">
      <div class="search">
        参数名/参数说明：
        <el-input size="small" suffix-icon="el-icon-search"></el-input>
      </div>
      <div class="last">
        <el-table border>
          <el-table-column
            label="参数编码">
          </el-table-column>
          <el-table-column
            label="参数名">
          </el-table-column>
          <el-table-column
            label="参数值">
          </el-table-column>
          <el-table-column
            label="参数说明">
          </el-table-column>
          <el-table-column
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'tuina',
  data () {
    return {
      selected: 0,
      form: {},
      shop: '',
      shops: [],
      applyTableData: [],
      dictionaryLike: '',
      dictionaryData: [],
      dictionaryItemLike: '',
      dictionaryItemData: []
    }
  },
  mounted () {
    this.dictionary()
  },
  methods: {
    dictionary () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary',
        params: {
          page: 0,
          size: 10,
          like: t.dictionaryLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.dictionaryData = res.data.data.records
        }
      })
    },
    dictionaryChange (id) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/' + id + '/item',
        params: {
          page: 0,
          size: 10,
          like: t.dictionaryLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.dictionaryItemData = res.data.data.records
        }
      })
    },
    dictionaryItemChange (id) {

    },
    dictionaryInput () {
      this.dictionary()
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
.tuina .tuina-main .tabel {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 65px);
  overflow: auto;
  width: 100%;
  text-align: left;
}
.tuina .tuina-main .search {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: 50px;
  overflow: auto;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.tuina .tuina-main .last {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 125px);
  overflow: auto;
  width: 100%;
  text-align: left;
  margin-top: 10px;
}
.tuina .tuina-main .list {
  width: calc(360/1378*100%);
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 65px);
  overflow: auto;
  text-align: left;
}
.tuina .tuina-main .step {
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 10px;
}
.tuina .tuina-main .list-title {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
  font-size: 18px;
}
.tuina .tuina-main .model {
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  text-align: left;
}
.tuina .tuina-main .model + .model {
  margin-top: 10px;
}
.tuina .tuina-main .model .step {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
}
.tuina .tuina-main .info {
  width: calc(1008/1378*100%);
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
.xiaoxi .list-title .el-input, .xiaoxi .search .el-input {
  width: 150px;
  margin-left: 10px;
}
</style>
