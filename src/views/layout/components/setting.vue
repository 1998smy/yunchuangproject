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
      <el-table :data="settingList" @selection-change="handleSelectionChange" style="width: 100%" border>
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
            <el-button size="mini" type="primary" @click="handleEdit( scope.row)">编辑</el-button>
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
        <el-form-item label="权限分配">
          <el-tree :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[0]" :default-checked-keys="addSettingForm.permissions" :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSettingVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSettingVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getAllSetting } from '@/api/setting.js'
import { getMenus } from '@/api/menu.js'
let _this = []
export default {
  name: 'Setting',
  data() {
    return {
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
        // children: 'childs'
      }
    }
  },
  created() {
    _this = this
    this.getSettingList()
  },
  computed: {
    treeData() {
      function createNode(item) {
        // 复选框选择
        let checked = false
        let selected = false
        if (_this !== null && _this.addSettingForm.permissions.length > 0) {
          let per = _this.addSettingForm.permissions.find(function (value, index) {
            return value === item.id
          })
          selected = !!per
        }
        // 标记勾选
        if (selected) {
          let isPoint = item.childs === undefined && item.points === undefined
          let hasChilds = item.childs !== undefined && item.childs.length > 0
          let hasPoint = item.points !== undefined && item.points.length > 0
          if (isPoint) {
            checked = true
          } else if (hasPoint) {
            checked = false
          } else if (hasChilds) {
            checked = false
          } else {
            checked = true
          }
        }
        return {
          id: item.id === undefined ? 0 : item.id,
          title: item.title,
          children: [],
          selected: selected,
          checked: checked
        }
      }

      function parseNodes(nodes, parentNode) {
        for (let it of nodes) {
          let node = createNode(it)
          // 标记选中
          if (node.checked) {
            parentNode.selected = true
          }
          if (it.childs !== undefined && it.childs.length > 0) {
            parseNodes(it.childs, node)
          } else if (it.points !== undefined && it.points.length > 0) {
            parseNodes(it.points, node)
          }
          parentNode.children.push(node)
        }
      }
      let nodes = createNode({ title: '系统菜单和页面权限点', expand: true })
      parseNodes(this.settingTreeData, nodes)
      return [nodes]
    }
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
          this.settingTreeData = res.data
        }
      })
    },
    searchSetting() {
      this.getSettingList()
    },
    // 搜索表单重置
    reset() {
      this.$refs.searchInput.value = ''
    },
    // 新增权限组
    addSettingBtn() {
      this.getMenuList()

      this.addSettingVisible = true
    },
    // 新增表单重置
    addSettingReset() {},
    // 编辑权限
    handleEdit() {},
    // 删除权限
    handleDelete() {},
    handleSelectionChange() {},
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