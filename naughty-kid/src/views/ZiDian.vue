<template>
  <div class="tuina xiaoxi">
    <div class="nav-left">
      <div class="title">
        基础字典
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="select(0)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">基础信息</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="select(1)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">调理方案字典</div>
      </div>
      <div class="item" :class="{selected: selected === 2}" @click="select(2)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">调理项目字典</div>
      </div>
      <div class="item" :class="{selected: selected === 3}" @click="select(3)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">方案项目字典</div>
      </div>
      <div class="item" :class="{selected: selected === 4}" @click="select(4)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">辅助诊断配置</div>
      </div>
      <div class="item" :class="{selected: selected === 5}" @click="select(5)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">物料字典</div>
      </div>
      <div class="item" :class="{selected: selected === 6}" @click="select(6)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">参数配置</div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 0" key="0">
      <div class="list">
        <div class="list-title">
          <el-button size="small" @click="dictionaryAdd">新增字典分类</el-button>
          <el-input v-model="dictionaryLike" @input="dictionaryInput" size="small" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table ref="dictionaryData" border :data="dictionaryData" highlight-current-row @current-change="dictionaryClick">
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
              <el-button @click="dictionaryChange(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="dictionaryDataTotal"
          @current-change="dictionary">
        </el-pagination>
      </div>
      <div class="info" v-if="dictionaryName">
        <div class="search">
          当前字典分类：{{dictionaryName}}
        </div>
        <div class="last">
          <div class="list-title">
            <el-button size="small" @click="dictionaryItemAdd">新增字典项</el-button>
            <el-input v-model="dictionaryItemLike" @input="dictionaryItemInput" size="small" suffix-icon="el-icon-search"></el-input>
          </div>
          <el-table ref="dictionaryItemData" border :data="dictionaryItemData">
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
                <el-button @click="dictionaryItemChange(scope.row)" type="text" size="small">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="dictionaryItemDataTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 1" key="1">
      <div class="tabel">
        <div class="list-title">
          <el-button size="small" @click="massageSchemeAdd">新增调理方案</el-button>
          <el-input v-model="massageSchemeLike" @input="massageScheme" size="small" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table border :data="massageSchemeData">
          <el-table-column
            label="调理方案代码"
            prop="number"
            width="120">
          </el-table-column>
          <el-table-column
            label="方案名称"
            prop="name"
            width="200">
          </el-table-column>
          <el-table-column
            label="价格"
            prop="price"
            width="120">
          </el-table-column>
          <el-table-column
            label="预估时长"
            prop="duration"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="massageSchemeChange(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="massageSchemeDataTotal">
        </el-pagination>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 2" key="2">
      <div class="tabel">
        <div class="list-title">
          <el-button size="small" @click="massageItemAdd">新增调理项目</el-button>
          <el-input v-model="massageItemLike" @input="massageItem" size="small" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table border  :data="massageItemData">
          <el-table-column
            label="调理项目代码"
            prop="number"
            width="120">
          </el-table-column>
          <el-table-column
            label="项目名称"
            prop="name"
            width="200">
          </el-table-column>
          <el-table-column
            label="预估时长（分）"
            prop="duration"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="massageItemChange(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="massageItemDataTotal">
        </el-pagination>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 3" key="3">
      <div class="list">
        <div class="list-title">
          调理方案
          <el-input v-model="massageSchemeLike" @input="massageScheme" size="small" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-table ref="massageSchemeData" border :data="massageSchemeData" highlight-current-row @current-change="massageSchemeClick">
          <el-table-column
            label="调理方案代码"
            prop="number">
          </el-table-column>
          <el-table-column
            label="方案名称"
            prop="name">
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="massageSchemeDataTotal">
        </el-pagination>
      </div>
      <div class="info">
        <div class="tabel">
          <div class="list-title">
            当前选中的调理方案：{{massageSchemeName}}
            <el-input v-model="massageItemLike" @input="massageItem" size="small" suffix-icon="el-icon-search"></el-input>
          </div>
          <el-table ref="massageItemData" border :data="massageItemData" @select="massageItemSelected" @select-all="massageItemSelected">
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              label="调理项目代码"
              prop="number">
            </el-table-column>
            <el-table-column
              label="项目名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="预估时长（分）"
              prop="duration">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="massageItemDataTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 4" key="4">
      <div class="list list1">
        <div class="step">
          第1步：建立方案
        </div>
        <div class="list-title">
          <el-button size="small" @click="auxiliarysAdd">新增</el-button>
          <el-input size="small" v-model="auxiliarysLike" suffix-icon="el-icon-search" @input="getAuxiliary"></el-input>
        </div>
        <el-table ref="auxiliaryRef" :data="auxiliarys" border highlight-current-row @current-change="auxiliaryClick">
          <el-table-column
            label="辅助诊断方案"
            prop="name">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="auxiliarysChange(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="auxiliarysTotal">
        </el-pagination>
      </div>
      <div class="info info1" v-if="auxiliarySelected.id">
        <div class="model">
          <div class="step">
            第2-1步：筛选调理人
          </div>
          <el-table :data="auxiliarys1" border>
            <el-table-column
              label="项目"
              prop="name"
              width="200px">
            </el-table-column>
            <el-table-column
              label="具体值">
              <template slot-scope="scope">
                <span class="auxiliary-value" v-for="(item, index) in scope.row.value" :key="index"><span class="dian">、</span>{{item.name}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="model">
          <div class="step">
            第2-2步：辅助判断体质辩证结果
          </div>
          <el-table :data="auxiliarys2" border>
            <el-table-column
              label="项目"
              prop="name"
              width="200px">
            </el-table-column>
            <el-table-column
              label="具体值">
              <template slot-scope="scope">
                <span class="auxiliary-value" v-for="(item, index) in scope.row.value" :key="index"><span class="dian">、</span>{{item.name}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="model">
          <div class="step">
            第2-3步：辅助判断调理方案
          </div>
          <el-table :data="auxiliarys3" border>
            <el-table-column
              label="项目"
              prop="name"
              width="200px">
            </el-table-column>
            <el-table-column
              label="具体值">
              <template slot-scope="scope">
                <span class="auxiliary-value" v-for="(item, index) in scope.row.value" :key="index"><span class="dian">、</span>{{item.name}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="model">
          <div class="step">
            第2-4步：辅助判断调理项目
          </div>
          <el-table :data="auxiliarys4" border>
            <el-table-column
              label="项目"
              prop="name"
              width="200px">
            </el-table-column>
            <el-table-column
              label="具体值">
              <template slot-scope="scope">
                <span class="auxiliary-value" v-for="(item, index) in scope.row.value" :key="index"><span class="dian">、</span>{{item.name}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 5" key="5">
      <div class="search">
        <el-button size="small" @click="materialAdd">新增物料</el-button>
        <el-input v-model="materialLike" @input="material" size="small" suffix-icon="el-icon-search"></el-input>
      </div>
      <div class="last">
        <el-table border :data="materialData">
          <el-table-column
            label="图片">
            <template slot-scope="scope">
              <el-image style="width: 50px; height: 50px;" :src="scope.row.photo"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="物料编号"
            prop="number">
          </el-table-column>
          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="单位（最小可拆分单位）"
            prop="unitName">
          </el-table-column>
          <el-table-column
            label="成本价（单价）"
            prop="costPrice">
          </el-table-column>
          <el-table-column
            label="零售价（单价）"
            prop="retailPrice">
          </el-table-column>
          <el-table-column
            label="生产厂家"
            prop="manufacturer">
          </el-table-column>
          <el-table-column
            label="供应商"
            prop="supplier">
          </el-table-column>
          <el-table-column
            label="备注说明"
            prop="description">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="materialChange(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="materialDataTotal">
        </el-pagination>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 6" key="6">
      <div class="search">
        参数名/参数说明：
        <el-input v-model="configLike" @input="config" size="small" suffix-icon="el-icon-search"></el-input>
      </div>
      <div class="last">
        <el-table border :data="configData">
          <el-table-column
            label="参数编码"
            prop="number">
          </el-table-column>
          <el-table-column
            label="参数名"
            prop="name">
          </el-table-column>
          <el-table-column
            label="参数值"
            prop="value">
          </el-table-column>
          <el-table-column
            label="参数说明"
            prop="description">
          </el-table-column>
          <el-table-column
            label="状态"
            prop="disabled">
            <template slot-scope="scope">
              {{scope.row.disabled ? '禁用' : '启用'}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="configChange(scope.row)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="configDataTotal">
        </el-pagination>
      </div>
    </div>
    <el-dialog width="600px" :title="dictionaryPopType === 'add' ? '新增字典分类' : '修改字典分类'" :visible.sync="dictionaryPop">
      <el-form :rules="dictionaryRules" ref="dictionaryRef" :model="dictionaryForm" label-width="120px" size="small">
        <el-form-item label="字典分类名称:" prop="name">
          <el-input v-model="dictionaryForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddDictionary">保存</el-button>
        <el-button size="small" type="primary" @click="dictionaryPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="600px" :title="dictionaryItemPopType === 'add' ? ('新增字典项（' + dictionaryName + '）') : ('修改字典项（' + dictionaryName + '）')" :visible.sync="dictionaryItemPop">
      <el-form :rules="dictionaryItemRules" ref="dictionaryItemRef" :model="dictionaryItemForm" label-width="120px" size="small">
        <el-form-item label="字典项编号:" prop="number">
          <el-input v-model="dictionaryItemForm.number"></el-input>
        </el-form-item>
        <el-form-item label="字典项名称:" prop="name">
          <el-input v-model="dictionaryItemForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序号:" prop="order">
          <el-input v-model="dictionaryItemForm.order"></el-input>
        </el-form-item>
        <el-form-item label="拼音助记符:">
          <el-input v-model="dictionaryItemForm.pinyinMnemonic"></el-input>
        </el-form-item>
        <el-form-item label="五笔助记符:">
          <el-input v-model="dictionaryItemForm.strokeMnemonic"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddDictionaryItem">保存</el-button>
        <el-button size="small" type="primary" @click="dictionaryItemPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="600px" :title="massageSchemePopType === 'add' ? '新增调理方案' : '修改调理方案'" :visible.sync="massageSchemePop">
      <el-form :rules="massageSchemeRules" ref="massageSchemeRef" :model="massageSchemeForm" label-width="140px" size="small">
        <el-form-item label="方案编号:" prop="number">
          <el-input v-model="massageSchemeForm.number"></el-input>
        </el-form-item>
        <el-form-item label="方案名称:" prop="name">
          <el-input v-model="massageSchemeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="方案价格:" prop="price">
          <el-input v-model="massageSchemeForm.price"></el-input>
        </el-form-item>
        <el-form-item label="预估时长（分钟）:">
          <el-input v-model="massageSchemeForm.duration"></el-input>
        </el-form-item>
        <el-form-item label="拼音助记符:">
          <el-input v-model="massageSchemeForm.pinyinMnemonic"></el-input>
        </el-form-item>
        <el-form-item label="五笔助记符:">
          <el-input v-model="massageSchemeForm.strokeMnemonic"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddMassageScheme">保存</el-button>
        <el-button size="small" type="primary" @click="massageSchemePop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="600px" :title="massageItemPopType === 'add' ? '新增调理项目' : '修改调理项目'" :visible.sync="massageItemPop">
      <el-form :rules="massageItemRules" ref="massageItemRef" :model="massageItemForm" label-width="140px" size="small">
        <el-form-item label="项目编号:" prop="number">
          <el-input v-model="massageItemForm.number"></el-input>
        </el-form-item>
        <el-form-item label="项目名称:" prop="name">
          <el-input v-model="massageItemForm.name"></el-input>
        </el-form-item>
        <el-form-item label="预估时长（分钟）:">
          <el-input v-model="massageItemForm.duration"></el-input>
        </el-form-item>
        <el-form-item label="拼音助记符:">
          <el-input v-model="massageItemForm.pinyinMnemonic"></el-input>
        </el-form-item>
        <el-form-item label="五笔助记符:">
          <el-input v-model="massageItemForm.strokeMnemonic"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddMassageItem">保存</el-button>
        <el-button size="small" type="primary" @click="massageItemPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="800px" :title="materialPopType === 'add' ? '新增物料' : '修改物料'" :visible.sync="materialPop">
      <el-form :rules="materialRules" ref="materialRef" :model="materialForm" label-width="190px" size="small">
        <el-form-item label="物料编码:" prop="number">
          <el-input v-model="materialForm.number"></el-input>
        </el-form-item>
        <el-form-item label="物料名称:" prop="name">
          <el-input v-model="materialForm.name"></el-input>
        </el-form-item>
        <el-form-item label="添加照片:" prop="photo">
          <div class="avatar-uploader">
            <input type="file" @change="uploadImg" ref="img"/>
            <img v-if="materialForm.photo" :src="materialForm.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-form-item>
        <el-form-item label="单位（最小可拆分单位）:" prop="unitName">
          <el-select v-model="materialForm.unitName" filterable size="small">
            <el-option v-for="item in materialUnits" :key="item.number" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成本价（单价）:" prop="costPrice">
          <el-input v-model="materialForm.costPrice"></el-input>
        </el-form-item>
        <el-form-item label="零售价（单价）:" prop="retailPrice">
          <el-input v-model="materialForm.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家:" prop="manufacturer">
          <el-input v-model="materialForm.manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="供应商:" prop="supplier">
          <el-input v-model="materialForm.supplier"></el-input>
        </el-form-item>
        <el-form-item label="备注说明:" prop="description">
          <el-input v-model="materialForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddMaterial">保存</el-button>
        <el-button size="small" type="primary" @click="materialPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="600px" title="修改参数值" :visible.sync="configPop">
      <el-form :model="configForm" label-width="120px" size="small">
        <el-form-item label="参数编码:" prop="number">
          <el-input v-model="configForm.number"></el-input>
        </el-form-item>
        <el-form-item label="参数名:" prop="name">
          <el-input v-model="configForm.name"></el-input>
        </el-form-item>
        <el-form-item label="参数值:" prop="value">
          <el-input v-model="configForm.value"></el-input>
        </el-form-item>
        <el-form-item label="参数说明:" prop="description">
          <el-input v-model="configForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddConfig">保存</el-button>
        <el-button size="small" type="primary" @click="configPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="600px" title="辅助诊断方案" :visible.sync="auxiliarysPop">
      <el-form :model="auxiliary" :rules="auxiliaryRules" ref="auxiliaryRefs" label-width="120px" size="small">
        <el-form-item label="方案名称:" prop="name">
          <el-input v-model="auxiliary.name"></el-input>
        </el-form-item>
        <el-form-item required label="年龄范围:" class="ages">
          <el-form-item class="age" prop="age0">
            <el-input type="number" v-model="auxiliary.age0"></el-input>
          </el-form-item>
          <div class="line">-</div>
          <el-form-item class="age" prop="age1">
            <el-input type="number" v-model="auxiliary.age1"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="症状:" prop="symptoms">
          <el-select v-model="auxiliary.symptoms" multiple value-key="number">
            <el-option :label="item.name" :value="{number: item.number}" v-for="(item, index) in symptoms" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="体质辩证:" prop="constitutions">
          <el-select v-model="auxiliary.constitutions" multiple value-key="number">
            <el-option :label="item.name" :value="{number: item.number}" v-for="(item, index) in constitutions" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调理方案:" prop="schemes">
          <el-select v-model="auxiliary.schemes" multiple value-key="id">
            <el-option :label="item.name" :value="{id: item.id}" v-for="(item, index) in schemes" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调理项目:" prop="items">
          <el-select v-model="auxiliary.items" multiple value-key="id">
            <el-option :label="item.name" :value="{id: item.id}" v-for="(item, index) in items" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="addAuxiliary">{{auxiliary.id ? '修改' : '保存'}}</el-button>
        <el-button size="small" type="primary" @click="auxiliarysPop = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      selected: 0,
      dictionaryLike: '',
      dictionaryData: [],
      dictionaryDataPage: 0,
      dictionaryDataTotal: 0,
      dictionaryName: '',
      dictionaryNumber: 0,
      dictionaryPop: false,
      dictionaryPopType: 'add',
      dictionaryForm: {
        number: '',
        name: ''
      },
      dictionaryRules: {
        name: [
          { required: true, message: '请输入字典分类名称', trigger: 'change' }
        ]
      },
      dictionaryItemLike: '',
      dictionaryItemData: [],
      dictionaryItemDataPage: 0,
      dictionaryItemDataTotal: 0,
      dictionaryItemPop: false,
      dictionaryItemPopType: 'add',
      dictionaryItemForm: {
        number: '',
        name: '',
        order: '',
        pinyinMnemonic: '',
        strokeMnemonic: ''
      },
      dictionaryItemRules: {
        number: [
          { required: true, message: '请输入字典项编号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入字典项名称', trigger: 'change' }
        ],
        order: [
          { required: true, message: '请输入排序号', trigger: 'change' }
        ]
      },
      massageSchemeLike: '',
      massageSchemeData: [],
      massageSchemeDataPage: 0,
      massageSchemeDataTotal: 0,
      massageSchemeName: '',
      massageSchemeId: '',
      massageItems: [],
      massageSchemePop: false,
      massageSchemePopType: 'add',
      massageSchemeForm: {
        number: '',
        name: '',
        price: '',
        duration: '',
        pinyinMnemonic: '',
        strokeMnemonic: ''
      },
      massageSchemeRules: {
        number: [
          { required: true, message: '请输入方案编号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入方案名称', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入方案价格', trigger: 'change' }
        ]
      },
      massageItemLike: '',
      massageItemData: [],
      massageItemDataPage: 0,
      massageItemDataTotal: 0,
      massageItemPop: false,
      massageItemPopType: 'add',
      massageItemForm: {
        number: '',
        name: '',
        duration: '',
        pinyinMnemonic: '',
        strokeMnemonic: ''
      },
      massageItemRules: {
        number: [
          { required: true, message: '请输入项目编号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入项目名称', trigger: 'change' }
        ]
      },
      materialLike: '',
      materialData: [],
      materialDataPage: 0,
      materialDataTotal: 0,
      materialPop: false,
      materialPopType: 'add',
      materialForm: {
        number: '',
        name: '',
        unitName: '',
        costPrice: '',
        retailPrice: '',
        manufacturer: '',
        supplier: '',
        description: '',
        photo: ''
      },
      materialUnits: [],
      materialRules: {
        number: [
          { required: true, message: '请输入物料编码', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入物料名称', trigger: 'change' }
        ],
        unitName: [
          { required: true, message: '请输入单位（最小可拆分单位）', trigger: 'change' }
        ],
        costPrice: [
          { required: true, message: '请输入成本价', trigger: 'change' }
        ],
        retailPrice: [
          { required: true, message: '请输入零售价', trigger: 'change' }
        ]
      },
      configLike: '',
      configData: [],
      configDataPage: 0,
      configDataTotal: 0,
      configPop: false,
      configForm: {
        number: '',
        name: '',
        value: '',
        description: '',
        disabled: ''
      },
      auxiliarysLike: '',
      auxiliarysPop: false,
      auxiliary: {
        name: '',
        items: [],
        schemes: [],
        constitutions: [],
        symptoms: [],
        age1: '',
        age0: ''
      },
      symptoms: [],
      constitutions: [],
      schemes: [],
      items: [],
      auxiliaryRules: {
        name: [
          { required: true, message: '请输入方案名称', trigger: 'change' }
        ],
        age0: [
          { required: true, message: '请输入最小年龄', trigger: 'change' }
        ],
        age1: [
          { required: true, message: '请输入最大年龄', trigger: 'change' }
        ],
        items: [
          { required: true, message: '请选择调理项目', trigger: 'change' }
        ],
        schemes: [
          { required: true, message: '请选择调理方案', trigger: 'change' }
        ],
        constitutions: [
          { required: true, message: '请选择体质辩证', trigger: 'change' }
        ],
        symptoms: [
          { required: true, message: '请选择症状', trigger: 'change' }
        ]
      },
      auxiliarys: [],
      auxiliarySelected: {},
      auxiliarys1: [],
      auxiliarys2: [],
      auxiliarys3: [],
      auxiliarys4: [],
      auxiliarysPage: 0,
      auxiliarysTotal: 0
    }
  },
  mounted () {
    this.select(0)
  },
  methods: {
    select (index) {
      this.selected = index
      if (index === 0) {
        this.dictionary()
      }
      if (index === 1) {
        this.massageScheme()
      }
      if (index === 2) {
        this.massageItem()
      }
      if (index === 3) {
        this.massageScheme()
      }
      if (index === 4) {
        this.getAuxiliary()
      }
      if (index === 5) {
        this.material()
      }
      if (index === 6) {
        this.config()
      }
    },
    dictionary (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary',
        params: {
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10,
          like: t.dictionaryLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.dictionaryData = res.data.data.records
          t.dictionaryDataTotal = res.data.data.total
          t.setCurrent(t.dictionaryData[0])
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    dictionaryItem (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/' + t.dictionaryNumber + '/item',
        params: {
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10,
          like: t.dictionaryItemLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.dictionaryItemData = res.data.data.records
          t.dictionaryItemDataTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    setCurrent (row) {
      this.$refs.dictionaryData.setCurrentRow(row)
    },
    dictionaryClick (row) {
      this.dictionaryName = row.name
      this.dictionaryNumber = row.number
      this.dictionaryItem()
    },
    dictionaryInput () {
      this.dictionary()
    },
    dictionaryItemInput () {
      this.dictionaryItem()
    },
    dictionaryAdd () {
      this.dictionaryForm = {
        number: '',
        name: ''
      }
      this.dictionaryPopType = 'add'
      this.dictionaryPop = true
    },
    dictionaryItemAdd () {
      this.dictionaryForm = {
        number: '',
        name: '',
        order: '',
        pinyinMnemonic: '',
        strokeMnemonic: ''
      }
      this.dictionaryItemPopType = 'add'
      this.dictionaryItemPop = true
    },
    dictionaryChange (item) {
      this.dictionaryForm = item
      this.dictionaryPopType = 'change'
      this.dictionaryPop = true
    },
    dictionaryItemChange (item) {
      this.dictionaryItemForm = item
      this.dictionaryItemPopType = 'change'
      this.dictionaryItemPop = true
    },
    AddDictionary () {
      const t = this
      t.$refs['dictionaryRef'].validate((valid) => {
        if (valid) {
          let method = 'post'
          let url = '/api/dictionary'
          if (t.dictionaryPopType === 'change') {
            method = 'put'
            url = '/api/dictionary/' + t.dictionaryForm.number
          }
          axios({
            method,
            headers: {
              authorization: t.$store.state.authorization
            },
            url,
            data: t.dictionaryForm
          }).then((res) => {
            if (res.data.code === 200) {
              t.dictionaryPop = false
              t.dictionary()
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
    AddDictionaryItem () {
      const t = this
      t.$refs['dictionaryItemRef'].validate((valid) => {
        if (valid) {
          let method = 'post'
          let url = '/api/dictionary/' + t.dictionaryNumber + '/item'
          if (t.dictionaryItemPopType === 'change') {
            method = 'put'
            url = '/api/dictionary/' + t.dictionaryNumber + '/item/' + t.dictionaryItemForm.number
          }
          axios({
            method,
            headers: {
              authorization: t.$store.state.authorization
            },
            url,
            data: t.dictionaryItemForm
          }).then((res) => {
            if (res.data.code === 200) {
              t.dictionaryItemPop = false
              t.dictionaryItem()
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
    massageScheme (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/massage-scheme',
        params: {
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10,
          like: t.massageSchemeLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.massageSchemeData = res.data.data.records
          t.massageSchemeDataTotal = res.data.data.total
          if (t.selected === 3) {
            let arr = t.massageSchemeData.filter((ele) => {
              return ele.id === t.massageSchemeId
            })
            if (arr.length > 0) {
              t.setCurrent2(arr[0])
            } else {
              t.setCurrent2(t.massageSchemeData[0])
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
    setCurrent2 (row) {
      this.$refs.massageSchemeData.setCurrentRow(row)
    },
    massageSchemeClick (row) {
      this.massageSchemeName = row.name
      this.massageSchemeId = row.id
      this.massageItems = row.items
      this.massageItem()
    },
    massageSchemeAdd () {
      this.massageSchemeForm = {
        number: '',
        name: '',
        price: '',
        duration: '',
        pinyinMnemonic: '',
        strokeMnemonic: ''
      }
      this.massageSchemePopType = 'add'
      this.massageSchemePop = true
    },
    massageSchemeChange (item) {
      this.massageSchemeForm = item
      this.massageSchemePopType = 'change'
      this.massageSchemePop = true
    },
    AddMassageScheme () {
      const t = this
      t.$refs['massageSchemeRef'].validate((valid) => {
        if (valid) {
          let method = 'post'
          let url = '/api/dictionary/massage-scheme'
          if (t.massageSchemePopType === 'change') {
            method = 'put'
            url = '/api/dictionary/massage-scheme/' + t.massageSchemeForm.id
          }
          axios({
            method,
            headers: {
              authorization: t.$store.state.authorization
            },
            url,
            data: t.massageSchemeForm
          }).then((res) => {
            if (res.data.code === 200) {
              t.massageSchemePop = false
              t.massageScheme()
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
    massageItem (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/massage-item',
        params: {
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10,
          like: t.massageItemLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.massageItemData = res.data.data.records
          t.massageItemDataTotal = res.data.data.total
          if (t.selected === 3) {
            setTimeout(() => {
              for (const i of t.massageItems) {
                let arr = t.massageItemData.filter((ele) => {
                  return ele.id === i.id
                })
                if (arr.length > 0) {
                  t.$refs.massageItemData.toggleRowSelection(arr[0])
                }
              }
            }, 100)
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
    massageItemAdd () {
      this.massageItemForm = {
        number: '',
        name: '',
        duration: '',
        pinyinMnemonic: '',
        strokeMnemonic: ''
      }
      this.massageItemPopType = 'add'
      this.massageItemPop = true
    },
    massageItemChange (item) {
      this.massageItemForm = item
      this.massageItemPopType = 'change'
      this.massageItemPop = true
    },
    massageItemSelected (items) {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/massage-scheme/' + t.massageSchemeId,
        data: {
          strokeMnemonic: '',
          items
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.massageScheme()
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    AddMassageItem () {
      const t = this
      t.$refs['massageItemRef'].validate((valid) => {
        if (valid) {
          let method = 'post'
          let url = '/api/dictionary/massage-item'
          if (t.massageItemPopType === 'change') {
            method = 'put'
            url = '/api/dictionary/massage-item/' + t.massageItemForm.id
          }
          axios({
            method,
            headers: {
              authorization: t.$store.state.authorization
            },
            url,
            data: t.massageItemForm
          }).then((res) => {
            if (res.data.code === 200) {
              t.massageItemPop = false
              t.massageItem()
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
    material (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/material',
        params: {
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10,
          like: t.materialLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.materialData = res.data.data.records
          t.materialDataTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    materialAdd () {
      this.materialForm = {
        number: '',
        name: '',
        unitName: '',
        costPrice: '',
        retailPrice: '',
        manufacturer: '',
        supplier: '',
        description: '',
        photo: ''
      }
      this.materialPopType = 'add'
      this.getMaterialUnit()
      this.materialPop = true
    },
    materialChange (item) {
      this.materialForm = item
      this.materialPopType = 'change'
      this.getMaterialUnit()
      this.materialPop = true
    },
    getMaterialUnit () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/6/item'
      }).then((res) => {
        if (res.data.code === 200) {
          t.materialUnits = res.data.data.records
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    AddMaterial () {
      const t = this
      t.$refs['materialRef'].validate((valid) => {
        if (valid) {
          let method = 'post'
          let url = '/api/dictionary/material'
          if (t.materialPopType === 'change') {
            method = 'put'
            url = '/api/dictionary/material/' + t.materialForm.id
          }
          axios({
            method,
            headers: {
              authorization: t.$store.state.authorization
            },
            url,
            data: t.materialForm
          }).then((res) => {
            if (res.data.code === 200) {
              t.materialPop = false
              t.material()
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
    config (e) {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/config',
        params: {
          page: (typeof e === 'number') ? (e - 1) : 0,
          size: 10,
          like: t.configLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.configData = res.data.data.records
          t.configDataTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    configChange (item) {
      this.configForm = item
      this.configPop = true
    },
    AddConfig () {
      const t = this
      axios({
        method: 'post',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/config',
        data: t.configForm
      }).then((res) => {
        if (res.data.code === 200) {
          t.configPop = false
          t.config()
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    uploadImg () {
      const t = this
      var file = this.$refs.img
      var reader = new FileReader()
      reader.readAsDataURL(file.files[0])
      reader.onload = function (e) {
        t.materialForm.photo = this.result
      }
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
    auxiliarysAdd () {
      this.auxiliary = {
        name: '',
        items: [],
        schemes: [],
        constitutions: [],
        symptoms: [],
        age1: '',
        age0: ''
      }
      this.getSymptoms()
      this.getConstitutions()
      this.getSchemes()
      this.getItems()
      this.auxiliarysPop = true
    },
    addAuxiliary () {
      const t = this
      t.$refs['auxiliaryRefs'].validate((valid) => {
        if (valid) {
          let method = 'post'
          let url = '/api/dictionary/auxiliary'
          if (t.auxiliary.id) {
            method = 'put'
            url = `/api/dictionary/auxiliary/${t.auxiliary.id}`
          }
          axios({
            method,
            headers: {
              authorization: t.$store.state.authorization
            },
            url,
            data: t.auxiliary
          }).then((res) => {
            if (res.data.code === 200) {
              t.getAuxiliary()
              t.auxiliarysPop = false
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
    auxiliarysChange (e) {
      this.auxiliary = Object.assign({}, e)
      this.getSymptoms()
      this.getConstitutions()
      this.getSchemes()
      this.getItems()
      this.auxiliarysPop = true
    },
    getAuxiliary () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/dictionary/auxiliary',
        params: {
          page: t.auxiliarysPage,
          size: 10,
          like: t.auxiliarysLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.auxiliarys = res.data.data.records
          t.auxiliarysTotal = res.data.data.total
          if (res.data.data.records.length > 0) {
            if (t.auxiliarySelected.id) {
              let arr = t.auxiliarys.filter((ele) => {
                return ele.id === t.auxiliarySelected.id
              })
              if (arr.length > 0) {
                t.$refs.auxiliaryRef.setCurrentRow(arr[0])
              } else {
                t.$refs.auxiliaryRef.setCurrentRow(t.auxiliarys[0])
              }
            } else {
              t.$refs.auxiliaryRef.setCurrentRow(t.auxiliarys[0])
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
    auxiliaryClick (e) {
      if (e) {
        this.auxiliarySelected = e
        this.auxiliarys1 = [
          {
            name: '年龄范围',
            value: [
              {
                name: e.age0
              },
              {
                name: e.age1
              }
            ]
          },
          {
            name: '症状',
            value: e.symptoms
          }
        ]
        this.auxiliarys2 = [
          {
            name: '体质辩证',
            value: e.constitutions
          }
        ]
        this.auxiliarys3 = [
          {
            name: '调理方案',
            value: e.schemes
          }
        ]
        this.auxiliarys4 = [
          {
            name: '调理项目',
            value: e.items
          }
        ]
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
  width: calc(560/1378*100%);
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100vh - 65px);
  overflow: auto;
  text-align: left;
}
.tuina .tuina-main .list1 {
  width: calc(260/1378*100%);
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
  width: calc(808/1378*100%);
}
.tuina .tuina-main .info1 {
  width: calc(1108/1378*100%);
  height: calc(100vh - 65px);
  overflow: auto;
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
.input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input .label {
  white-space: nowrap;
}
.input .label span {
  color: red;
}
</style>
<style>
.xiaoxi .el-textarea, .xiaoxi .el-select {
  width: 600px;
}
.el-dialog  .el-textarea, .xiaoxi .el-select {
  width: 100%;
}
.xiaoxi .title .el-date-editor, .xiaoxi .title .el-select, .xiaoxi .title .el-input {
  width: 200px;
}
.xiaoxi .list-title .el-input, .xiaoxi .search .el-input {
  width: 150px;
  margin-left: 10px;
}
.ages .el-form-item__content {
  display: flex;
}
.ages .line {
  margin: 0 10px;
}
.age.el-form-item {
  width: 100px;
}
.age.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
.auxiliary-value .dian {
  display: none;
}
.auxiliary-value + .auxiliary-value .dian {
  display: inline-block;
}
</style>
