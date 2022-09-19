<template>
  <div class="menus">
    <el-card>
      <!-- 添加新菜单 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addBtn" class="floatRight" style="margin:10px 0" icon="el-icon-edit">添加</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="tableData" row-key="id" :tree-props="{children: 'children'}" default-expand-all :header-cell-style="{'border-bottom':'2px solid #e8e8e8','background-color':'#fafafa'}" style="width: 100%">
        <el-table-column label="标题" :width="300">
          <template slot-scope="scope">
            <i :class="scope.row.icon" class="el-table-row-icon"></i>
            <i>{{scope.row.title}}</i>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="权限点代码">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加权限组 对话框 -->
    <el-dialog title="创建菜单" :visible.sync="addMenuVisible" :before-close="resetAddForm" width=" 50%" center>
      <el-form ref="addMenuForm" :model="addMenuForm" :rules="addRules" label-width="100px" style="width: 400px; margin-left:120px;">
        <el-form-item label="权限组名称">
          <el-radio-group v-model="settingType" @change="typeStatusChange">
            <el-radio label="menu" :disabled="typeStatus">菜单</el-radio>
            <el-radio label="points" :disabled="typeStatus">权限点</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限组名称">
          <el-select v-model="addMenuForm.pid" @change="getNewSelected">
            <el-option label="主导航" :value="0">主导航</el-option>
            <el-option :label="item.title" :value="item.id" v-for="item in newOptData" :key="item.id" :disabled="(settingType==='points') && !!(item.childs)" :class="'moveIn' + item.layer"></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单 状态 -->
        <div v-if="showMenuBlock">
          <el-form-item label="权限代码" prop="code">
            <el-input v-model="addMenuForm.code"></el-input>
          </el-form-item>
          <el-form-item label="权限标题" prop="title">
            <el-input v-model="addMenuForm.title"></el-input>
          </el-form-item>
        </div>
        <!-- 权限点 状态 -->
        <div v-if="showPointsBlock">
          <el-form-item label="权限代码" prop="code">
            <el-input v-model="addMenuForm.code"></el-input>
          </el-form-item>
          <el-form-item label="权限标题" prop="title">
            <el-input v-model="addMenuForm.title"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetAddForm">取 消</el-button>
        <el-button type="primary" @click="cofAddMenu">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑权限组 对话框 -->
    <el-dialog title="编辑菜单" :visible.sync="editMenuVisible" :before-close="resetEditForm" width=" 50%" center>
      <el-form ref="editMenuForm" :model="editMenuForm" :rules="editRules" label-width="100px" style="width: 400px; margin-left:120px;">
        <el-form-item label="权限组名称">
          <el-radio-group v-model="settingType">
            <el-radio label="menu" :disabled="typeStatus">菜单</el-radio>
            <el-radio label="points" :disabled="typeStatus">权限点</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限组名称">
          <el-select v-model="editMenuForm.pid" @change="getNewSelected">
            <el-option label="主导航" :value="0">主导航</el-option>
            <el-option :label="item.title" :value="item.id" v-for="item in newOptData" :key="item.id" :disabled="(settingType==='points') && !!(item.childs)" :class="'moveIn' + item.layer"></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单 状态 -->
        <div v-if="showMenuBlock">
          <el-form-item label="权限代码" prop="code">
            <el-input v-model="editMenuForm.code"></el-input>
          </el-form-item>
          <el-form-item label="权限标题" prop="title">
            <el-input v-model="editMenuForm.title"></el-input>
          </el-form-item>
        </div>
        <!-- 权限点 状态 -->
        <div v-if="showPointsBlock">
          <el-form-item label="权限代码" prop="code">
            <el-input v-model="editMenuForm.code"></el-input>
          </el-form-item>
          <el-form-item label="权限标题" prop="title">
            <el-input v-model="editMenuForm.title"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetEditForm">取 消</el-button>
        <el-button type="primary" @click="cofEditMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenus, addMenus, deleteMenus, getMenusById, editMenus } from '@/api/menu.js'
export default {
  name: 'Menus',
  data() {
    return {
      tableData: [],
      // 新增权限组
      addMenuVisible: false,
      // 菜单/权限点的状态
      typeStatus: false,
      showMenuBlock: true,
      showPointsBlock: false,
      addMenuForm: {
        pid: 0,
        code: '',
        is_point: false,
        title: ''
      },
      addRules: {
        code: [{ required: true, message: '请输入权限代码', trigger: 'blur' }],
        title: [{ required: true, message: '请输入权限标题', trigger: 'blur' }]
      },
      settingType: 'menu',
      // 新增下拉选择器 数据
      optDataList: [],
      newOptData: [],
      // 编辑 权限组
      editMenuVisible: false,
      editMenuForm: {
        pid: 0,
        code: '',
        is_point: false,
        title: ''
      },
      editRules: {
        code: [{ required: true, message: '请输入权限代码', trigger: 'blur' }],
        title: [{ required: true, message: '请输入权限标题', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getMenusList()
  },
  mounted() {},
  methods: {
    // 获取菜单权限列表
    async getMenusList() {
      const res = await getMenus()
      if (res.status === 200) {
        // 遍历 res.data 得到新的 数组数据
        this.tableData = this.setNode(res.data)
        console.log(this.tableData)
      }
    },
    // 新增权限组数据 遍历转化
    setNode(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].icon = 'el-icon-document'
        if (arr[i].childs && arr[i].pid === null) {
          arr[i].children = this.setNode(arr[i].childs)
          arr[i].icon = 'el-icon-folder-opened'
        } else if (arr[i].childs && arr[i].pid !== null) {
          arr[i].children = this.setNode(arr[i].childs)
          for (let a = 0; a < arr[i].childs.length; a++) {
            arr[i].childs[a].icon = 'el-icon-view'
          }
        } else if (arr[i].points) {
          arr[i].children = this.setNode(arr[i].points)
        } else if (arr[i].is_point) {
          arr[i].icon = 'el-icon-view'
        } else {
          arr[i].icon = 'el-icon-document'
        }
      }
      return arr
    },
    // 新增权限组 下拉菜单数据 加layer 样式
    setOptData(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].childs) {
          arr[i].layer = 0
          this.newOptData.push(arr[i])
          this.setOptData(arr[i].childs)
        } else {
          arr[i].layer = 1
          this.newOptData.push(arr[i])
        }
      }
    },
    // 新增 按钮
    async addBtn() {
      const res = await getMenus()
      if (res.status === 200) {
        this.optDataList = res.data
      }
      // 下拉菜单数据 加layer 样式
      this.setOptData(this.optDataList)
      this.addMenuVisible = true
    },
    // 获取 下拉菜单选择的 id值
    getNewSelected(val) {
      if (this.typeStatus === false) {
        this.addMenuForm.pid = val
      } else {
        this.editMenuForm.pid = val
      }
    },
    // 菜单/权限点的状态变化
    typeStatusChange() {
      // 如果 状态为 菜单，不禁用
      if (this.settingType === 'menu') {
        // 展示 菜单状态 输入框
        this.showMenuBlock = true
        this.showPointsBlock = false
        // 如果 状态为 权限点，则禁用
      } else if (this.settingType === 'points') {
        // 展示 权限点状态 输入框
        this.showMenuBlock = false
        this.showPointsBlock = true
      }
    },
    // 重置表单
    resetAddForm() {
      this.addMenuVisible = false
      this.$refs.addMenuForm.resetFields()
      // 将下拉选择器数据清空，否则会一直累计
      this.optDataList = []
      this.newOptData = []
      this.addMenuForm.pid = 0
      this.settingType = 'menu'
    },
    // 添加 权限组 请求
    addRequest() {
      addMenus(this.addMenuForm)
        .then(res => {
          if (res.status === 200) {
            this.$message.success('添加权限组成功')
            this.addMenuVisible = false
            this.resetAddForm()
            this.getMenusList()
          } else {
            this.$message.error('添加权限组失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 确认 添加
    cofAddMenu() {
      this.$refs.addMenuForm.validate(valid => {
        if (valid) {
          if (this.settingType === 'menu') {
            this.addMenuForm.is_point = false
            // 发起 添加请求
            this.addRequest()
          } else if (this.settingType === 'points') {
            this.addMenuForm.is_point = true
            this.addRequest()
          }
        } else {
          this.$message.error('请填写必填项')
        }
      })
    },
    // 删除权限组
    handleDelete(info) {
      this.$confirm('是否永久删除该权限组?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteMenus(info.id)
            .then(res => {
              if (res.status === 200) {
                this.getMenusList()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              } else {
                this.$message.error('删除失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 通过 id 查询 权限组信息
    menuById(id) {
      getMenusById(id).then(res => {
        if (res.status === 200) {
          this.editMenuForm.id = res.data.id
          this.editMenuForm.pid = res.data.pid
          this.editMenuForm.code = res.data.code
          this.editMenuForm.is_point = res.data.is_point
          this.editMenuForm.title = res.data.title
          if (this.editMenuForm.pid === null) {
            this.editMenuForm.pid = 0
          }
          // 判断 状态是 菜单还是 权限点
          if (this.editMenuForm.is_point === true) {
            this.settingType = 'points'
            this.showPointsBlock = true
            this.showMenuBlock = false
          } else if (this.editMenuForm.is_point === false) {
            this.settingType = 'menu'
            this.showPointsBlock = false
            this.showMenuBlock = true
          }
          // 显示 对话框
          this.editMenuVisible = true
        }
      })
    },
    // 编辑按钮
    async handleEdit(info) {
      // 将 菜单/权限点 禁用
      this.typeStatus = true
      // 获取 下拉选择器的 数据
      const res = await getMenus()
      if (res.status === 200) {
        this.optDataList = res.data
      }
      this.setOptData(this.optDataList)
      // 获取 权限组 信息
      this.menuById(info.id)
    },
    // 重置 编辑表单
    resetEditForm() {
      this.optDataList = []
      this.newOptData = []
      this.editMenuVisible = false
    },
    // 确认 编辑
    cofEditMenu() {
      this.$refs.editMenuForm.validate(valid => {
        if (valid) {
          editMenus(this.editMenuForm.id, this.editMenuForm)
            .then(res => {
              if (res.status === 200) {
                this.getMenusList()
                this.resetEditForm()
                this.$message.success('修改成功')
              } else {
                this.$message.error('修改失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.menus {
  /deep/.el-dialog__header {
    padding: 5px;
    text-align: left;
    background-color: #409eff;
    .el-dialog__title {
      color: #fff;
      line-height: 40px;
      font-size: 15px;
      /deep/.el-dialog__close {
        color: #fff;
        line-height: 50px;
      }
    }
  }
}
.moveIn0 {
  text-indent: 14px;
}
.moveIn1 {
  text-indent: 28px;
}

/deep/.el-table__row--level-0,
/deep/.el-table__row--level-1 {
  .el-icon-arrow-right::before {
    content: '';
  }
}
/deep/.el-table [class*='el-table__row--level'] .el-table__expand-icon {
  width: 0;
  height: 0;
}

.el-table-row-icon {
  margin-right: 8px;
  font-size: 18px;
}

/deep/.el-table .el-table__cell:first-child div {
  text-align: left;
}
</style>