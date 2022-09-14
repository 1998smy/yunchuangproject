<template>
  <div class="setting">
    <el-card>
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="4">
          <el-input placeholder="搜索" ref="searchInput" v-model="settingQuery.title" clearable></el-input>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-search" class="searchUser" @click="searchSetting">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-col>
      </el-row>
      <!-- 添加新用户 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addSettingBtn" class="floatRight" style="margin:10px 0" icon="el-icon-edit">新增权限组</el-button>
        </el-col>
      </el-row>
      <!-- 消息提示 -->
      <el-alert :title="'共 '+ counts +' 条记录'" :closable="false" type="info" show-icon>
      </el-alert>
      <!-- 表格区域 -->
      <el-table :data="settingList" style="width: 100%" border>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="title" label="用户名">
        </el-table-column>
        <el-table-column prop="create_date" label="日期" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.create_date | parseTimeBystring("{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="settingQuery.page" :page-sizes="[1, 2, 5, 10]" :page-size="settingQuery.pagesize" layout=" sizes, prev, pager, next, jumper" :total="counts" background>
      </el-pagination>
    </el-card>
    <!-- 新增权限组 对话框 -->
    <el-dialog title="创建权限组" :visible.sync="addSettingVisible" :before-close="addSettingReset" width="50%" center>
      <el-form :model="addSettingForm" :rules="addSettingRules" ref="addSettingForm" label-width="135px" style="width: 400px; margin-left:120px;">
        <el-form-item label="用户名" prop="title">
          <el-input v-model="addSettingForm.title"></el-input>
        </el-form-item>
        <el-form-item label="权限分配" prop="permissions">
          <el-tree ref="treeData" :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[0]" :default-checked-keys="addSettingForm.permissions" :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSettingReset">取 消</el-button>
        <el-button type="primary" @click="cofAddSet">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑权限组 对话框 -->
    <el-dialog title="编辑权限组" :visible.sync="editSettingVisible" width="50%" center>
      <el-form :model="editSettingForm" :rules="editSettingRules" ref="editSettingForm" label-width="135px" style="width: 400px; margin-left:120px;">
        <el-form-item label="用户名" prop="title">
          <el-input v-model="editSettingForm.title"></el-input>
        </el-form-item>
        <el-form-item label="权限分配" prop="permissions">
          <el-tree ref="treeData" :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[0]" :default-checked-keys="editSettingForm.permissions" :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSettingVisible=false">取 消</el-button>
        <el-button type="primary" @click="cofEditSet">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllSetting, addSetting, searchSetById, editSet, deleteSet } from '@/api/setting.js'
import { getMenus } from '@/api/menu.js'
export default {
  name: 'Setting',
  data() {
    return {
      treeData: [],
      settingQuery: {
        page: 1,
        pagesize: 10
      },
      counts: 0,
      settingList: [],
      addSettingVisible: false,
      addSettingForm: {
        permissions: []
      },
      addSettingRules: {
        title: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      settingTreeData: [],
      defaultProps: {
        label: 'title'
      },
      editSettingVisible: false,
      editSettingForm: {
        permissions: []
      },
      editSettingRules: {
        title: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getSettingList()
  },
  computed: {
    // treeData() {
    //   function createNode(item) {
    //     // 复选框选择
    //     let checked = false
    //     let selected = false
    //     if (_this !== null && _this.addSettingForm.permissions.length > 0) {
    //       let per = _this.addSettingForm.permissions.find(function (value, index) {
    //         return value === item.id
    //       })
    //       selected = !!per
    //     }
    //     // 标记勾选
    //     if (selected) {
    //       let isPoint = item.childs === undefined && item.points === undefined
    //       let hasChilds = item.childs !== undefined && item.childs.length > 0
    //       let hasPoint = item.points !== undefined && item.points.length > 0
    //       if (isPoint) {
    //         checked = true
    //       } else if (hasPoint) {
    //         checked = false
    //       } else if (hasChilds) {
    //         checked = false
    //       } else {
    //         checked = true
    //       }
    //     }
    //     return {
    //       id: item.id === undefined ? 0 : item.id,
    //       title: item.title,
    //       children: [],
    //       selected: selected,
    //       checked: checked
    //     }
    //   }
    //   function parseNodes(nodes, parentNode) {
    //     for (let it of nodes) {
    //       let node = createNode(it)
    //       // 标记选中
    //       if (node.checked) {
    //         parentNode.selected = true
    //       }
    //       if (it.childs !== undefined && it.childs.length > 0) {
    //         parseNodes(it.childs, node)
    //       } else if (it.points !== undefined && it.points.length > 0) {
    //         parseNodes(it.points, node)
    //       }
    //       parentNode.children.push(node)
    //     }
    //   }
    //   let nodes = createNode({ title: '系统菜单和页面权限点', expand: true })
    //   parseNodes(this.settingTreeData, nodes)
    //   return [nodes]
    // }
  },
  methods: {
    // 获取权限数据列表
    getSettingList() {
      getAllSetting(this.settingQuery).then(res => {
        if (res.status === 200) {
          this.counts = res.data.counts
          this.settingList = res.data.list
        }
      })
    },
    // 获取权限组数据
    getMenuList() {
      getMenus().then(res => {
        if (res.status === 200) {
          // 遍历 res.data 得到新的 数组数据
          let nodes = this.setNode({ id: 0, title: '系统菜单和页面权限点', selected: false, checked: false, expand: true })
          nodes.children = this.setNode(res.data)
          // console.log(res.data)
          // for (let it of res.data) {
          //   let node = this.setData(it)
          //   nodes.children.push(node)
          //   if (it.childs !== undefined && it.childs.length > 0) {
          //     for (let child of it.childs) {
          //       let childNode = this.setData(child)
          //       node.children.push(childNode)
          //       if (child.points !== undefined && child.points.length) {
          //         for (let point of child.points) {
          //           let pointNode = this.setData(point)
          //           childNode.children.push(pointNode)
          //         }
          //       }
          //     }
          //   }
          // }
          this.treeData = [nodes]
        }
      })
    },
    // 搜索 按钮
    searchSetting() {
      this.getSettingList()
    },
    // 搜索表单重置
    reset() {
      this.$refs.searchInput.value = ''
    },
    // 新增权限组数据 遍历转化
    setNode(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].selected = false
        arr[i].checked = false
        if (arr[i].childs) {
          arr[i].children = this.setNode(arr[i].childs)
        } else if (arr[i].points) {
          arr[i].children = this.setNode(arr[i].points)
        }
      }
      return arr
    },
    // 新增权限组 按钮
    addSettingBtn() {
      this.getMenuList()
      this.addSettingVisible = true
    },
    // 新增表单重置
    addSettingReset() {
      this.addSettingVisible = false
      this.$refs.addSettingForm.resetFields()
    },
    // 确定新增权限组
    cofAddSet() {
      this.$refs.addSettingForm.validate(valid => {
        if (valid) {
          this.addSettingForm.permissions = this.$refs.treeData.getCheckedKeys()
          addSetting(this.addSettingForm)
            .then(res => {
              if (res.status === 200) {
                this.getSettingList()
                // 重置表单
                this.addSettingReset()
                this.$message.success('添加权限组成功')
              } else {
                this.$message.error('添加权限组失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    // 编辑权限
    handleEdit(info) {
      searchSetById(info.id)
        .then(res => {
          if (res.status === 200) {
            this.editSettingForm = res.data
            this.getMenuList()
            this.editSettingVisible = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 确认 编辑
    cofEditSet() {
      this.$refs.editSettingForm.validate(valid => {
        if (valid) {
          editSet(this.editSettingForm.id, this.editSettingForm).then(res => {
            if (res.status === 200) {
              this.getSettingList()
              this.editSettingVisible = false
              this.$message.success('修改权限组成功')
            } else {
              this.$message.error('修改权限组失败')
            }
          })
        }
      })
    },
    // 删除权限
    handleDelete(info) {
      this.$confirm('是否永久删除该权限组?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteSet(info.id)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getSettingList()
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
    handleSizeChange(newpagesize) {
      this.settingQuery.pagesize = newpagesize
      this.getSettingList()
    },
    handleCurrentChange(newpage) {
      this.settingQuery.page = newpage
      this.getSettingList()
    }
  }
}
</script>

<style lang="less" scoped>
.setting {
  .searchUser {
    margin-left: 10px;
  }

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
</style>