<template>
  <div class="user">
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="4">
          <el-input placeholder="搜索" v-model="userQuery.username" clearable></el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-search" class="searchUser" @click="searchUser">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-col>
      </el-row>
      <!-- 添加新用户 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addUserBtn" class="addUser" icon="el-icon-edit">新增用户</el-button>
        </el-col>
      </el-row>
      <!-- 消息提示 -->
      <el-alert :title="'共 '+ counts +' 条记录'" :closable="false" type="info" show-icon>
      </el-alert>
      <!-- 表格区域 -->
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column prop="permission_group_title" label="权限组名称">
        </el-table-column>
        <el-table-column prop="role" label="角色">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit( scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="userQuery.page" :page-sizes="[1, 2, 5, 10]" :page-size="userQuery.pagesize" layout=" sizes, prev, pager, next, jumper" :total="counts" background>
      </el-pagination>
    </el-card>
    <!-- 新增用户对话框 -->
    <el-dialog title="创建用户" :visible.sync="addUserVisible" width="30%" center>
      <el-form ref="addUserForm" :model="addUserForm" :rules="addUserRules" label-width="85px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="addUserForm.role"></el-input>
        </el-form-item>
        <el-form-item label="权限组名称" prop="permission_group_id">
          <el-select v-model="addUserForm.permission_group_id" placeholder="请选择">
            <el-option :label="item.title" :value="item.id" v-for="item in setNamesList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input type="textarea" v-model="addUserForm.introduction" placeholder="Please Input"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="cofAddUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editUserVisible" width="30%" center>
      <el-form ref="editUserForm" :model="editUserForm" :rules="editUserRules" label-width="85px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="editUserForm.role"></el-input>
        </el-form-item>
        <el-form-item label="权限组名称">
          <el-select v-model="editUserForm.permission_group_id" placeholder="请选择">
            <el-option :label="item.title" :value="item.id" v-for="item in setNamesList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input type="textarea" v-model="editUserForm.introduction" placeholder="Please Input"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="cofEditUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, getSetName, getUserInfo, updateUserInfo, deleteUserInfo } from '@/api/user.js'
export default {
  name: 'user',
  data() {
    return {
      userQuery: {
        page: 1,
        pagesize: 10
      },
      userList: [],
      counts: 0,
      searchInput: '',
      addUserVisible: false,
      addUserForm: {},
      addUserRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6~12位字符', trigger: 'blur' }
        ]
      },
      setNamesList: [],
      editUserVisible: false,
      editUserForm: {
        username: '',
        email: '',
        role: '',
        permission_group_id: 0,
        phone: null,
        introduction: ''
      },
      editUserRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getAllUser()
  },
  methods: {
    // 获取用户列表
    getAllUser() {
      getUserList(this.userQuery)
        .then(res => {
          if (res.status === 200) {
            this.userList = res.data.list
            this.counts = res.data.counts
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取权限组名称
    getSetNames() {
      getSetName().then(res => {
        if (res.status === 200) {
          this.setNamesList = res.data
        }
      })
    },
    // 搜索事件
    searchUser() {
      this.getAllUser()
    },
    // 重置事件
    reset() {
      this.userQuery.username = ''
      this.getAllUser()
    },
    // 添加用户 事件
    addUserBtn() {
      this.getSetNames()
      this.addUserVisible = true
    },
    // 添加用户 取消
    resetForm() {
      this.addUserVisible = false
      this.$refs.addUserForm.resetFields()
    },
    // 确认添加 用户
    cofAddUser() {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          // 发送请求
          console.log('请求接口不行')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.addUserVisible = false
      this.$refs.addUserForm.resetFields()
    },
    // 编辑事件
    handleEdit(info) {
      getUserInfo(info.id).then(res => {
        if (res.status === 200) {
          this.editUserForm.username = res.data.username
          this.editUserForm.email = res.data.email
          this.editUserForm.role = res.data.role
          this.editUserForm.permission_group_id = res.data.permission_group_id
          this.editUserForm.phone = res.data.phone
          this.editUserForm.introduction = res.data.introduction
          this.editUserForm.id = res.data.id
          this.getSetNames()
          this.editUserVisible = true
        }
      })
    },
    // 确定编辑用户
    cofEditUser() {
      updateUserInfo(this.editUserForm.id, this.editUserForm).then(res => {
        if (res.status === 200) {
          this.editUserVisible = false
          this.$message.success('用户信息修改成功')
        } else {
          this.$message.error('用户信息修改失败')
        }
      })
    },
    // 删除用户
    handleDelete(info) {
      this.$confirm('此操作删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUserInfo(info.id).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSizeChange(newpagesize) {
      this.userQuery.pagesize = newpagesize
      this.getAllUser()
    },
    handleCurrentChange(newpage) {
      this.userQuery.page = newpage
      this.getAllUser()
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  height: 100%;

  .searchUser {
    margin-left: 10px;
  }
  .addUser {
    float: right;
    margin: 10px 0;
  }

  .el-alert {
    margin-bottom: 10px;
  }

  /deep/.cell {
    text-align: center;
  }
  .el-pagination {
    margin-top: 15px;
    text-align: center;
  }

  /deep/.el-dialog__header {
    padding: 5px;
    background-color: #409eff;
    .el-dialog__title {
      color: #fff;
      line-height: 40px;
    }
  }
}
</style>