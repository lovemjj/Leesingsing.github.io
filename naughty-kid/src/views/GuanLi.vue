<template>
  <div class="tuina guanli">
    <div class="nav-left">
      <div class="title">
        员工机构管理
      </div>
      <div class="item" :class="{selected: selected === 0}" @click="select(0)">
        <div class="icon">
          <img src="../assets/app/mendian.svg" alt="">
        </div>
        <div class="name">我的机构/门店</div>
      </div>
      <div class="item" :class="{selected: selected === 1}" @click="select(1)">
        <div class="icon">
          <img src="../assets/app/yuangong.svg" alt="">
        </div>
        <div class="name">员工管理</div>
      </div>
      <div class="item" :class="{selected: selected === 2}" @click="select(2)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">机构门店管理</div>
      </div>
      <div class="item" :class="{selected: selected === 3}" @click="select(3)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">岗位管理</div>
      </div>
      <div class="item" :class="{selected: selected === 4}" @click="select(4)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">组织结构管理</div>
      </div>
      <div class="item" :class="{selected: selected === 5}" @click="select(5)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">员工机构管理</div>
      </div>
      <div class="item" :class="{selected: selected === 6}" @click="select(6)">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">员工岗位管理</div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 0" key="0">
      <div class="search">
        <div class="value">
          <el-button size="small" @click="putBranch">修改信息</el-button>
          <!-- <el-button size="small">保存信息</el-button> -->
        </div>
      </div>
      <div class="tabel">
        <el-form :rules="branchRules" ref="branchRef" :model="branchForm" class="demo-form-inline" label-width="150px" size="small">
          <el-form-item label="机构门店编号:">
            <div>{{branchForm.number}}</div>
          </el-form-item>
          <el-form-item label="机构门店名称:" prop="name">
            <el-input v-model="branchForm.name"></el-input>
          </el-form-item>
          <el-form-item label="机构门店照片:">
            <div class="avatar-uploader">
              <input type="file" @change="uploadImg" ref="img"/>
              <img v-if="branchForm.photoBinary" :src="branchForm.photoBinary" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-form-item>
          <el-form-item label="机构门店负责人:">
            <el-select v-model="branchForm.administrator" filterable>
              <el-option v-for="item in employees" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人联系电话:">
            <el-input v-model="branchForm.administrator.contact"></el-input>
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model="branchForm.location"></el-input>
          </el-form-item>
          <el-form-item label="机构门店其他说明:">
            <el-input type="textarea" v-model="branchForm.description"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 1" key="1">
      <div class="search">
        <div class="value">
          <el-button size="small" @click="employeeAdd">添加员工</el-button>
          <div class="name">查找员工：</div>
          <el-input size="small" v-model="employeeLike" @input="employee" suffix-icon="el-icon-search"></el-input>
          <div class="name">归属机构或门店：</div>
          <el-select v-model="brancheSelectedId" clearable size="small" @change="employee">
            <el-option v-for="item in branches" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tabel">
        <div class="items">
          <el-table
            :data="employees"
            border>
            <el-table-column
              prop="number"
              label="员工工号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="contact"
              label="手机号">
            </el-table-column>
            <el-table-column
              label="性别">
              <template slot-scope="scope">
                {{scope.row.gender === 1 ? '男' : '女'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="出生年月日">
            </el-table-column>
            <el-table-column
              label="归属机构或门店"
              width="200px">
              <template slot-scope="scope">
                <div v-for="item in scope.row.branches" :key="item.id">{{item.name}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="apply_time"
              label="备注说明"
              show-overflow-tooltip>
            </el-table-column> -->
            <el-table-column
              prop="disabled"
              label="状态">
              <template slot-scope="scope">
                {{scope.row.disabled ? '禁用' : '启用'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="employeeChange(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="disabledEmployee(scope.row.id, !scope.row.disabled)">{{!scope.row.disabled ? '禁用' : '启用'}}</el-button>
                <el-button type="text" size="small" @click="passwordEmployee(scope.row.id)">重置密码</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="employeeTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 2" key="2">
      <div class="search">
        <div class="value">
          <el-button size="small" @click="branchAdd">添加机构</el-button>
          <div class="name">查找机构：</div>
          <el-input size="small" v-model="branchLike" @input="branch" suffix-icon="el-icon-search"></el-input>
        </div>
      </div>
      <div class="tabel">
        <div class="items">
          <el-table
            :data="branches"
            border>
            <el-table-column
              prop="number"
              label="机构编号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="机构名称">
            </el-table-column>
            <el-table-column
              prop="description"
              label="备注说明">
            </el-table-column>
            <el-table-column
              prop="disabled"
              label="状态">
              <template slot-scope="scope">
                {{scope.row.disabled ? '禁用' : '启用'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="branchChange(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="disabledBranch(scope.row.id, !scope.row.disabled)">{{!scope.row.disabled ? '禁用' : '启用'}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="branchTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 3" key="3">
      <div class="search">
        <div class="value">
          <el-button size="small" @click="roleAdd">添加岗位</el-button>
          <div class="name">查找岗位：</div>
          <el-input size="small" v-model="roleLike" @input="role" suffix-icon="el-icon-search"></el-input>
        </div>
      </div>
      <div class="list">
        <div class="items">
          <el-table
            :data="roles"
            border
            highlight-current-row
            @current-change="roleClick">
            <el-table-column
              prop="number"
              label="岗位编号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="岗位名称">
            </el-table-column>
            <el-table-column
              prop="description"
              label="备注说明">
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="roleChange(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="info">
        <el-tree
          :data="authorities"
          ref="tree"
          show-checkbox
          node-key="label"
          :default-checked-keys="['会员卡']"
          default-expand-all
          @check-change="authoritiesChange">
        </el-tree>
      </div>
    </div>
    <!-- <div class="tuina-main" v-if="selected === 4">
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
    </div> -->
    <div class="tuina-main" v-if="selected === 5" key="5">
      <div class="search">
        <div class="value">
        </div>
      </div>
      <div class="list">
        <div class="title">
          <div>员工列表</div>
          <el-input size="small" v-model="employeeLike" @input="employee" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="items">
          <el-table
            :data="employees"
            border
            highlight-current-row
            @current-change="employeeClick">
            <el-table-column
              prop="number"
              label="员工工号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="employeeTotal">
          </el-pagination>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <div>员工所属机构</div>
          <el-input size="small" v-model="branchLike" @input="branch" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="items">
          <el-table
            :data="branches"
            border>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="number"
              label="机构编号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="机构名称">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="branchTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 6" key="6">
      <div class="search">
        <div class="value">
          <div class="name">设置当前机构的员工权限：</div>
          <el-select v-model="brancheSelectedId" clearable size="small" @change="employee">
            <el-option v-for="item in branches" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="list">
        <div class="title">
          <div>员工列表</div>
          <el-input size="small" v-model="employeeLike" @input="employee" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="items">
          <el-table
            :data="employees"
            border
            highlight-current-row
            @current-change="employeeClick">
            <el-table-column
              prop="number"
              label="员工工号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="employeeTotal">
          </el-pagination>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <div>岗位列表</div>
          <el-input size="small" v-model="roleLike" @input="role" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="items">
          <el-table
            :data="roles"
            border>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="number"
              label="岗位编号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="岗位名称">
            </el-table-column>
            <el-table-column
              prop="apply_num"
              label="备注说明">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog width="600px" :title="employeeType === 'add' ? '添加员工' : '修改员工'" :visible.sync="employeePop">
      <el-form :rules="employeeRules" ref="employeeRef" :model="employeeForm" label-width="140px" size="small">
        <el-form-item label="员工工号:" prop="number">
          <el-input v-model="employeeForm.number"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名:" prop="name">
          <el-input v-model="employeeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio v-model="employeeForm.gender" :label="1">男</el-radio>
          <el-radio v-model="employeeForm.gender" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="出生年月日:">
          <el-date-picker
            v-model="employeeForm.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="employeeForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="归属机构或门店:" prop="branchId">
          <el-select v-model="employeeForm.branchId" clearable>
            <el-option v-for="item in branches" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddEmployee">保存</el-button>
        <el-button size="small" type="primary" @click="employeePop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="800px" :title="branchType === 'add' ? '添加机构或门店' : '修改机构或门店'" :visible.sync="branchPop">
      <el-form :rules="branchRules" ref="branchRef" :model="branchForm" class="demo-form-inline" label-width="150px" size="small">
        <el-form-item label="机构门店编号:" prop="number">
          <el-input v-model="branchForm.number"></el-input>
        </el-form-item>
        <el-form-item label="机构门店名称:" prop="name">
          <el-input v-model="branchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机构门店照片:">
          <div class="avatar-uploader">
            <input type="file" @change="uploadImg" ref="img"/>
            <img v-if="branchForm.photoBinary" :src="branchForm.photoBinary" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-form-item>
        <el-form-item label="机构门店负责人:">
          <el-select v-model="branchForm.administrator" filterable>
            <el-option v-for="item in employees" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人联系电话:">
          <el-input v-model="branchForm.administrator.contact"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="branchForm.location"></el-input>
        </el-form-item>
        <el-form-item label="机构门店其他说明:">
          <el-input type="textarea" v-model="branchForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddEmployee">保存</el-button>
        <el-button size="small" type="primary" @click="branchPop = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="600px" :title="roleType === 'add' ? '添加岗位' : '修改岗位'" :visible.sync="rolePop">
      <el-form :rules="roleRules" ref="roleRef" :model="roleForm" class="demo-form-inline" label-width="120px" size="small">
        <el-form-item label="岗位编号:" prop="number">
          <el-input v-model="roleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称:" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="岗位说明:">
          <el-input type="textarea" v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddEmployee">保存</el-button>
        <el-button size="small" type="primary" @click="branchPop = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'guanli',
  data () {
    return {
      selected: 0,
      branchForm: {
        number: '',
        name: '',
        photoBinary: '',
        photoType: '',
        location: '',
        description: '',
        disabled: '',
        administrator: ''
      },
      branchRules: {
        number: [
          { required: true, message: '请输入机构门店编号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入机构门店名称', trigger: 'change' }
        ]
      },
      branches: [],
      branchTotal: 0,
      branchPage: 0,
      employeeLike: '',
      brancheSelectedId: '',
      employeeTotal: 0,
      employeePage: 0,
      employees: [],
      employeePop: false,
      employeeType: 'add',
      employeeForm: {
        number: '',
        name: '',
        gender: '',
        birthday: '',
        contact: '',
        branchId: ''
      },
      employeeRules: {
        number: [
          { required: true, message: '请输入员工工号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'change' }
        ],
        branchId: [
          { required: true, message: '请选择归属机构或门店', trigger: 'change' }
        ]
      },
      branchLike: '',
      branchPop: false,
      branchType: 'add',
      roleLike: '',
      roleTotal: 0,
      rolePage: 0,
      roles: [],
      rolePop: false,
      roleType: 'add',
      roleForm: {
        number: '',
        name: '',
        description: ''
      },
      roleRules: {
        number: [
          { required: true, message: '请输入岗位编号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入岗位名称', trigger: 'change' }
        ]
      },
      authorities: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
    this.select(0)
  },
  methods: {
    select (index) {
      this.selected = index
      if (index === 0) {
        this.sessionBranch()
        this.employee()
      }
      if (index === 1) {
        this.branch()
        this.employee()
      }
      if (index === 2) {
        this.branch()
        this.employee()
      }
      if (index === 3) {
        this.role()
        this.getAuthorities()
      }
      if (index === 5) {
        this.branch()
        this.employee()
      }
      if (index === 6) {
        this.branch()
        this.employee()
        this.role()
      }
    },
    sessionBranch () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/session/branch'
      }).then((res) => {
        if (res.data.code === 200) {
          t.branchForm = res.data.data
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    putBranch () {
      this.branchType = 'change'
      this.AddBranch()
    },
    AddBranch () {
      const t = this
      let method = 'post'
      if (t.branchType === 'change') {
        method = 'put'
      }
      axios({
        method,
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch',
        data: t.branchForm
      }).then((res) => {
        if (res.data.code === 200) {
          t.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
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
    uploadImg () {
      // const t = this
      var file = this.$refs.img
      var reader = new FileReader()
      reader.readAsDataURL(file.files[0])
      reader.onload = function (e) {
        // console.log(this.result)
      }
    },
    branch () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch',
        params: {
          page: t.branchPage,
          size: 10,
          like: t.branchLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.branches = res.data.data.records
          t.branchTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    employee () {
      const t = this
      let url = '/api/employee'
      if (t.brancheSelectedId) {
        url = '/api/branch/' + t.brancheSelectedId + '/employee'
      }
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url,
        params: {
          page: t.employeePage,
          size: 10,
          like: t.employeeLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.employees = res.data.data.records
          t.employeeTotal = res.data.data.total
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    employeeAdd () {
      this.employeeForm = {
        number: '',
        name: '',
        gender: '',
        birthday: '',
        contact: '',
        branchId: ''
      }
      this.employeeType = 'add'
      this.employeePop = true
    },
    employeeChange (item) {
      this.employeeForm = item
      this.employeeType = 'change'
      this.employeePop = true
    },
    AddEmployee () {
      const t = this
      t.$refs['employeeRef'].validate((valid) => {
        if (valid) {
          let method = 'post'
          let url = '/api/employee'
          if (t.employeeType === 'change') {
            method = 'put'
            url = '/api/employee/' + t.employeeForm.id
          }
          axios({
            method,
            headers: {
              authorization: t.$store.state.authorization
            },
            url,
            data: t.employeeForm
          }).then((res) => {
            if (res.data.code === 200) {
              t.employeePop = false
              t.employee()
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
    disabledEmployee (id, disabled) {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/employee/' + id,
        data: {
          disabled
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          t.employee()
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    passwordEmployee (id) {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/employee/' + id,
        data: {
          password: ''
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$message({
            showClose: true,
            message: '重置成功',
            type: 'success'
          })
          t.employee()
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    branchAdd () {
      this.branchForm = {
        number: '',
        name: '',
        photoBinary: '',
        photoType: '',
        location: '',
        description: '',
        disabled: '',
        administrator: ''
      }
      this.branchType = 'add'
      this.branchPop = true
    },
    branchChange (item) {
      this.branchForm = item
      this.branchType = 'change'
      this.branchPop = true
    },
    disabledBranch (id, disabled) {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch/' + id,
        data: {
          disabled
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          t.branch()
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    role () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/role',
        params: {
          page: t.rolePage,
          size: 10,
          like: t.roleLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.roles = res.data.data
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    roleAdd () {
      this.roleForm = {
        number: '',
        name: '',
        gender: '',
        birthday: '',
        contact: '',
        branchId: ''
      }
      this.roleType = 'add'
      this.rolePop = true
    },
    roleChange (item) {
      this.roleForm = item
      this.roleType = 'change'
      this.rolePop = true
    },
    AddRole () {
      const t = this
      t.$refs['roleRef'].validate((valid) => {
        if (valid) {
          let method = 'post'
          let url = '/api/role'
          if (t.roleType === 'change') {
            method = 'put'
            url = '/api/role/' + t.roleForm.id
          }
          axios({
            method,
            headers: {
              authorization: t.$store.state.authorization
            },
            url,
            data: t.roleForm
          }).then((res) => {
            if (res.data.code === 200) {
              t.rolePop = false
              t.role()
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
    getAuthorities () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/authorities'
      }).then((res) => {
        if (res.data.code === 200) {
          t.authorities = []
          for (const item of res.data.data) {
            let children = []
            if (item.children) {
              for (const i of item.children) {
                children.push({
                  label: i
                })
              }
            }
            t.authorities.push({
              label: item.name,
              children
            })
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
    authoritiesChange (e) {
      // console.log(this.$refs.tree.getCheckedNodes())
      // console.log(this.$refs.tree.getCheckedKeys())
    },
    roleClick () {

    },
    employeeClick () {

    }
    // handleDragStart (node, ev) {
    //   console.log('drag start', node)
    // },
    // handleDragEnter (draggingNode, dropNode, ev) {
    //   console.log('tree drag enter: ', dropNode.label)
    // },
    // handleDragLeave (draggingNode, dropNode, ev) {
    //   console.log('tree drag leave: ', dropNode.label)
    // },
    // handleDragOver (draggingNode, dropNode, ev) {
    //   console.log('tree drag over: ', dropNode.label)
    // },
    // handleDragEnd (draggingNode, dropNode, dropType, ev) {
    //   console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    // },
    // handleDrop (draggingNode, dropNode, dropType, ev) {
    //   console.log('tree drop: ', dropNode.label, dropType)
    // },
    // allowDrop (draggingNode, dropNode, type) {
    //   if (dropNode.data.label === '二级 3-1') {
    //     return type !== 'inner'
    //   } else {
    //     return true
    //   }
    // },
    // allowDrag (draggingNode) {
    //   return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    // }
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
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  white-space: nowrap;
}
.tuina .tuina-main .title .el-input {
  width: 200px;
  margin-left: 10px;
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
/* .guanli .el-form .el-date-editor,.guanli .el-form .el-select,.guanli .el-form .el-input,.guanli .el-form .el-upload-dragger,.guanli .el-form .el-textarea {
  width: 600px;
} */
.items .el-table .cell {
  font-size: 12px;
}
</style>
