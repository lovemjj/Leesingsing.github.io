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
      <div class="item" :class="{selected: selected === 1}" @click="select(1)" v-if="$store.state.authorities.indexOf('员工管理') > -1">
        <div class="icon">
          <img src="../assets/app/yuangong.svg" alt="">
        </div>
        <div class="name">员工管理</div>
      </div>
      <div class="item" :class="{selected: selected === 2}" @click="select(2)" v-if="$store.state.authorities.indexOf('组织机构') > -1">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">机构门店管理</div>
      </div>
      <div class="item" :class="{selected: selected === 3}" @click="select(3)" v-if="$store.state.authorities.indexOf('岗位管理') > -1">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">岗位管理</div>
      </div>
      <div class="item" :class="{selected: selected === 4}" @click="select(4)" v-if="$store.state.authorities.indexOf('组织机构') > -1">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">组织结构管理</div>
      </div>
      <div class="item" :class="{selected: selected === 5}" @click="select(5)" v-if="$store.state.authorities.indexOf('组织机构') > -1">
        <div class="icon">
          <img src="../assets/app/jichu.svg" alt="">
        </div>
        <div class="name">员工机构管理</div>
      </div>
      <div class="item" :class="{selected: selected === 6}" @click="select(6)" v-if="$store.state.authorities.indexOf('组织机构') > -1">
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
        <el-form :rules="branchRules" ref="branchRef" :model="branchForm" class="demo-form-inline" label-width="150px" size="small" style="width: 60%">
          <el-form-item label="机构门店编号:">
            <div>{{branchForm.number}}</div>
          </el-form-item>
          <el-form-item label="机构门店名称:" prop="name">
            <el-input v-model="branchForm.name"></el-input>
          </el-form-item>
          <el-form-item label="机构门店照片:">
            <div class="avatar-uploader">
              <input type="file" @change="uploadImg" ref="img"/>
              <img v-if="branchForm.photo" :src="branchForm.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-form-item>
          <el-form-item label="机构门店负责人:">
            <el-select v-model="branchForm.administrator" value-key="id">
              <el-option v-for="item in employees" :key="item.id" :label="item.name" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人联系电话:">
            <el-input v-model="branchForm.administrator.contact" disabled></el-input>
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
          <el-input size="small" v-model="employeeLike" @input="employee(1)" suffix-icon="el-icon-search"></el-input>
          <div class="name">归属机构或门店：</div>
          <el-select v-model="brancheSelectedId" clearable size="small" @change="employee(1)">
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
            :total="employeeTotal"
            :current-page="employeePage"
            @current-change="employee">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 2" key="2">
      <div class="search">
        <div class="value">
          <el-button size="small" @click="branchAdd">添加机构</el-button>
          <div class="name">查找机构：</div>
          <el-input size="small" v-model="branchLike" @input="branch(1)" suffix-icon="el-icon-search"></el-input>
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
            :total="branchTotal"
            :current-page="branchPage"
            @current-change="branch">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 3" key="3">
      <div class="search">
        <div class="value">
          <el-button size="small" @click="roleAdd">添加岗位</el-button>
          <div class="name">查找岗位：</div>
          <el-input size="small" v-model="roleLike" @input="role(1)" suffix-icon="el-icon-search"></el-input>
        </div>
      </div>
      <div class="list">
        <div class="items">
          <el-table
          ref="role"
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
          <el-pagination
            background
            layout="prev, pager, next"
            :total="roleTotal"
            :current-page="rolePage"
            @current-change="role">
          </el-pagination>
        </div>
      </div>
      <div class="info">
        <el-tree
          :data="authorities"
          ref="tree"
          show-checkbox
          node-key="label"
          default-expand-all
          @check="authoritiesChange">
        </el-tree>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 4">
      <div class="search">
        <div class="value">
          组织结构管理
        </div>
      </div>
      <div class="tabel">
        <div class="items">
          <el-tree
            :data="branchTree"
            :props="branchTreeProps"
            node-key="id"
            default-expand-all
            draggable
            @node-drop="handleDrop">
          </el-tree>
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 5" key="5">
      <div class="search">
        <div class="value">
          员工机构管理
        </div>
      </div>
      <div class="list">
        <div class="title">
          <div>员工列表</div>
          <el-input size="small" v-model="employeeLike" @input="employee(1)" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="items">
          <el-table
            ref="employee-branch"
            :data="employees"
            border
            highlight-current-row
            @current-change="employeeBranchClick">
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
            :total="employeeTotal"
            @current-change="employee">
          </el-pagination>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <div>员工所属机构</div>
          <el-input size="small" v-model="branchLike" @input="branch(1)" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="items">
          <el-table
            ref="branch-employee"
            :data="branches"
            border
            @select="branchEmployeeSelected">
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
        </div>
      </div>
    </div>
    <div class="tuina-main" v-if="selected === 6" key="6">
      <div class="search">
        <div class="value">
          <div class="name">设置当前机构的员工权限：</div>
          <el-select v-model="brancheSelectedId" size="small" @change="employee(1)">
            <el-option v-for="item in branches" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="list">
        <div class="title">
          <div>员工列表</div>
          <el-input size="small" v-model="employeeLike" @input="employee(1)" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="items">
          <el-table
            ref="employee-role"
            :data="employees"
            border
            highlight-current-row
            @current-change="employeeRoleClick">
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
            :total="employeeTotal"
            @current-change="employee">
          </el-pagination>
        </div>
      </div>
      <div class="info">
        <div class="title">
          <div>岗位列表</div>
          <el-input size="small" v-model="roleLike" @input="role(1)" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="items">
          <el-table
            ref="role-employee"
            :data="roles"
            border
            @select="roleEmployeeSelected">
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
        <el-form-item label="归属机构或门店:" prop="branchId" v-if="!employeeForm.id">
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
            <img v-if="branchForm.photo" :src="branchForm.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-form-item>
        <el-form-item label="机构门店负责人:">
          <el-select v-model="branchForm.administrator" value-key="id" filterable>
            <el-option v-for="item in employees" :key="item.id" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人联系电话:">
          <el-input v-model="branchForm.administrator.contact" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="branchForm.location"></el-input>
        </el-form-item>
        <el-form-item label="机构门店其他说明:">
          <el-input type="textarea" v-model="branchForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" type="primary" @click="AddBranch">保存</el-button>
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
        <el-button size="small" type="primary" @click="AddRole">保存</el-button>
        <el-button size="small" type="primary" @click="rolePop = false">取消</el-button>
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
      branchForm: {
        number: '',
        name: '',
        photo: '',
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
        gender: '1',
        birthday: '',
        contact: '',
        disabled: false,
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
      roleId: '',
      authorities: [],
      employeeBranchId: '',
      employeeBranches: [],
      employeeRoleId: '',
      employeeRoles: [],
      branchTree: [],
      branchTreeProps: {
        children: 'children',
        label: 'name'
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
        this.employee(1)
      }
      if (index === 1) {
        this.branch(1)
        this.employee(1)
      }
      if (index === 2) {
        this.branch(1)
        this.employee(1)
      }
      if (index === 3) {
        this.role(1)
        this.getAuthorities()
      }
      if (index === 4) {
        this.getBranchTree()
      }
      if (index === 5) {
        this.employee(1)
      }
      if (index === 6) {
        this.brancheSelectedId = this.$store.state.branch_id
        this.employee(1)
        this.branch(1)
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
      let url = '/api/branch'
      if (t.branchType === 'change') {
        method = 'put'
        url = '/api/branch/' + t.branchForm.id
      }
      axios({
        method,
        headers: {
          authorization: t.$store.state.authorization
        },
        url,
        data: t.branchForm
      }).then((res) => {
        if (res.data.code === 200) {
          t.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          if (t.selected === 0) {
            t.sessionBranch()
          } else {
            t.branch(1)
            t.branchPop = false
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
    uploadImg () {
      const t = this
      var file = this.$refs.img
      var reader = new FileReader()
      reader.readAsDataURL(file.files[0])
      reader.onload = function (e) {
        t.branchForm.photo = this.result
      }
    },
    branch (e) {
      const t = this
      t.branchPage = e
      let size = 10
      let page = t.branchPage - 1
      if (t.selected === 1 || t.selected === 5) {
        page = ''
        size = ''
      }
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch',
        params: {
          page,
          size,
          like: t.branchLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.branches = res.data.data.records
          t.branchTotal = res.data.data.total
          if (t.selected === 5 && t.employeeBranches.length > 0) {
            setTimeout(() => {
              for (const i of t.employeeBranches) {
                let arr = t.branches.filter((ele) => {
                  return ele.id === i.id
                })
                if (arr.length > 0) {
                  t.$refs['branch-employee'].toggleRowSelection(arr[0])
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
    employee (e) {
      const t = this
      t.employeePage = e
      let url = '/api/employee'
      if ((t.selected === 6 && t.brancheSelectedId) || (t.selected === 1 && t.brancheSelectedId)) {
        url = '/api/branch/' + t.brancheSelectedId + '/employee'
      }
      let page = t.employeePage - 1
      let size = 10
      if (t.selected === 0 || t.selected === 2) {
        page = ''
        size = ''
      }
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url,
        params: {
          page,
          size,
          like: t.employeeLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.employees = res.data.data.records
          t.employeeTotal = res.data.data.total
          if (t.selected === 5) {
            let arr = t.employees.filter((ele) => {
              return ele.id === t.employeeBranchId
            })
            if (arr.length > 0) {
              this.$refs['employee-branch'].setCurrentRow(arr[0])
            } else {
              this.$refs['employee-branch'].setCurrentRow(t.employees[0])
            }
          }
          if (t.selected === 6) {
            let arr = t.employees.filter((ele) => {
              return ele.id === t.employeeRoleId
            })
            if (arr.length > 0) {
              this.$refs['employee-role'].setCurrentRow(arr[0])
            } else {
              this.$refs['employee-role'].setCurrentRow(t.employees[0])
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
    employeeAdd () {
      this.employeeForm = {
        number: '',
        name: '',
        gender: 1,
        birthday: '',
        contact: '',
        disabled: false,
        branchId: ''
      }
      this.employeeType = 'add'
      this.employeePop = true
    },
    employeeChange (item) {
      this.employeeForm = {
        id: item.id,
        number: item.number,
        name: item.name,
        gender: item.gender,
        birthday: item.birthday,
        contact: item.contact,
        disabled: item.disabled
      }
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
              t.employee(1)
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
          t.employee(1)
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
          t.employee(1)
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
        photo: '',
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
          t.branch(1)
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    role (e) {
      const t = this
      t.rolePage = e
      let page = t.rolePage - 1
      let size = 10
      if (t.selected === 6) {
        page = ''
        size = ''
      }
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/role',
        params: {
          page,
          size,
          like: t.roleLike
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.roles = res.data.data.records
          t.roleTotal = res.data.data.total
          if (t.selected === 3) {
            let arr = t.roles.filter((ele) => {
              return ele.id === t.roleId
            })
            if (arr.length > 0) {
              this.$refs['role'].setCurrentRow(arr[0])
            } else {
              this.$refs['role'].setCurrentRow(t.roles[0])
            }
          }
          if (t.selected === 6 && t.employeeRoles.length > 0) {
            setTimeout(() => {
              for (const i of t.employeeRoles) {
                let arr = t.roles.filter((ele) => {
                  return ele.id === i.id
                })
                if (arr.length > 0) {
                  t.$refs['role-employee'].toggleRowSelection(arr[0])
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
    roleAdd () {
      this.roleForm = {
        number: '',
        name: '',
        description: ''
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
              t.role(1)
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
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/role/' + t.roleId,
        data: {
          authorities: t.$refs.tree.getCheckedKeys(true)
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          t.role(1)
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    roleClick (e) {
      this.roleId = e.id
      this.$refs.tree.setCheckedKeys(e.authorities)
    },
    employeeBranchClick (e) {
      this.employeeBranches = e.branches
      this.employeeBranchId = e.id
      this.branch(1)
    },
    employeeRoleClick (e) {
      this.employeeRoles = e.roles
      this.employeeRoleId = e.id
      this.role(1)
    },
    branchEmployeeSelected (branches) {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/employee/' + t.employeeBranchId,
        data: {
          branches
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          t.employee(1)
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    roleEmployeeSelected (roles) {
      const t = this
      axios({
        method: 'patch',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch/' + t.brancheSelectedId + '/employee/' + t.employeeRoleId,
        data: {
          roles
        }
      }).then((res) => {
        if (res.data.code === 200) {
          t.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          t.employee(1)
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    handleDrop () {
      let data = {
        title: '熊孩子集团',
        children: [],
        groups: []
      }
      for (const ele of this.branchTree[0].children) {
        if (ele.name === '分店') {
          data.groups.push({
            title: '分店',
            children: ele.children
          })
        } else if (ele.name === '加盟店') {
          data.groups.push({
            title: '加盟店',
            children: ele.children
          })
        } else if (ele.name === '库房') {
          data.groups.push({
            title: '库房',
            children: ele.children
          })
        } else {
          data.children.push(ele)
        }
      }
      const t = this
      axios({
        method: 'post',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch-tree',
        data
      }).then((res) => {
        if (res.data.code === 200) {

        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    getBranchTree () {
      const t = this
      axios({
        method: 'get',
        headers: {
          authorization: t.$store.state.authorization
        },
        url: '/api/branch-tree'
      }).then((res) => {
        if (res.data.code === 200) {
          let name0 = '熊孩子集团'
          let children0 = []
          if (res.data.data.tree.title) {
            name0 = res.data.data.tree.title
          }
          if (res.data.data.tree.children) {
            for (const e of res.data.data.tree.children) {
              children0.push(e)
            }
          }
          if (res.data.data.tree.groups) {
            for (const e of res.data.data.tree.groups) {
              children0.push({
                name: e.title,
                children: e.children
              })
            }
          }
          t.branchTree = [
            {
              name: name0,
              children: children0
            },
            {
              name: '未分组机构',
              children: res.data.data.orphans
            }
          ]
        } else {
          t.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
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
