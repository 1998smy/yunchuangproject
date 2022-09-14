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
      <el-table :data="tableData" border style="width: 100%" indent>
        <el-table-column prop="title" label="标题" width="180">
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
  </div>
</template>

<script>
import { getMenus } from '@/api/menu.js'
export default {
  name: 'Menus',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getMenusList()
  },
  methods: {
    // 获取菜单权限列表
    getMenusList() {
      getMenus().then(res => {
        if (res.status === 200) {
          console.log(res)
          this.tableData = res.data
        }
      })
    },
    addBtn() {}
  }
}
</script>

<style lang="less" scoped>
</style>