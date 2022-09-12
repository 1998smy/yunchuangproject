<template>
  <div class="companys">
    <el-card>
      <!-- 表单搜索区域 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col :span="5">
            <el-form-item label="标签名称：" prop="tags">
              <el-input v-model="formInline.tags" @change="search" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin:0 5px" prop="province">
            <el-form-item label="省：">
              <el-select v-model="formInline.province" filterable @change="handleProvince">
                <el-option :label="item" :value="item" v-for="(item,index) in cityData.provinces" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="margin:0 5px">
            <el-form-item label="市：" prop="city">
              <el-select v-model="formInline.city" @change="search" filterable>
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in cityData.city" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin:0 5px">
            <el-form-item label="企业简称：" prop="shortName">
              <el-input v-model="formInline.shortName" @change="search" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="状态：" prop="state">
              <el-select v-model="formInline.state" @change="search" placeholder="请选择" filterable>
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="margin:0 20px">
            <el-form-item label="操作：">
              <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 新增按钮 -->
        <el-row>
          <el-col>
            <el-button type="primary" icon="el-icon-edit" @click="addCompanyBtn" class="floatRight" style="margin:10px 0">新增企业</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 消息提示 -->
      <el-alert :title="'共 '+ counts +' 条记录'" :closable="false" type="info" show-icon>
      </el-alert>
      <!-- 表格区域 -->
      <el-table :data="companyList" style="width: 100%" border>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="number" label="企业编号">
        </el-table-column>
        <el-table-column prop="shortName" label="企业简称">
        </el-table-column>
        <el-table-column prop="tags" label="标签">
        </el-table-column>
        <el-table-column prop="username" label="创建者">
        </el-table-column>
        <el-table-column prop="addDate" label="创建日期">
        </el-table-column>
        <el-table-column prop="remarks" label="备注">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.state === 1 ? '启用' : '禁用' }}</span>
            <!-- <span>{{ scope.row.state}}</span> -->
            <!-- <span>{{ scope.row.isFamous}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="handleDisable(scope.row)">{{ scope.row.state === 1 ? '禁用' : '启用' }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[1, 5, 10, 15]" :page-size="formInline.pagesize" layout=" sizes, prev, pager, next, jumper" :total="counts" background>
      </el-pagination>
    </el-card>
    <!-- 新增对话框 -->
    <el-dialog title="编辑企业" :visible.sync="addCompVisible" :before-close="addCompReset" width="50%" center>
      <el-form ref="addCompForm" :model="addCompForm" :rules="addCompRules" label-width="135px">
        <el-form-item label="企业名称" prop="shortName">
          <el-input v-model="addCompForm.shortName"></el-input>
          <el-checkbox v-model="addCompForm.isFamous" @change="famousChange">是否为名企</el-checkbox>
        </el-form-item>
        <el-form-item label="所属公司" prop="company">
          <el-input v-model="addCompForm.company"></el-input>
          <span>
            <el-link>https://www.tianyancha.com</el-link>
            （在此可查询所属公司全称及简称）
          </span>
        </el-form-item>
        <el-form-item label="城市" :inline="true" prop="province">
          <el-select v-model="addCompForm.province" style="width: 150px;">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
          <el-select v-model="addCompForm.city" style="width: 150px;">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方向（企业标签）" prop="tags">
          <el-input v-model="addCompForm.tags"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="addCompForm.remarks" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCompReset">取 消</el-button>
        <el-button type="primary" @click="cofAddComp">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑企业" :visible.sync="editCompVisible" :before-close="editCompReset" width="50%" center>
      <el-form ref="editCompForm" :model="editCompForm" :rules="editCompRules" label-width="135px">
        <el-form-item label="企业名称" prop="shortName">
          <el-input v-model="editCompForm.shortName"></el-input>
          <el-checkbox v-model="editCompForm.isFamous" @change="famousChange">是否为名企</el-checkbox>
        </el-form-item>
        <el-form-item label="所属公司" prop="company">
          <el-input v-model="editCompForm.company"></el-input>
          <span>
            <el-link>https://www.tianyancha.com</el-link>
            （在此可查询所属公司全称及简称）
          </span>
        </el-form-item>
        <el-form-item label="城市" :inline="true" prop="province">
          <el-select v-model="editCompForm.province" style="width: 150px;">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
          <el-select v-model="editCompForm.city" style="width: 150px;">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方向（企业标签）" prop="tags">
          <el-input v-model="editCompForm.tags"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editCompForm.remarks" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCompReset">取 消</el-button>
        <el-button type="primary" @click="cofEditComp">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllCompanys, getCompList, updateComp, addCompany, updateState, deleteComp } from '@/api/companys.js'
import { provinces, citys } from '@/assets/js/city_data2017_element.js'
export default {
  name: 'Companys',
  data() {
    return {
      formInline: {
        page: 1,
        pagesize: 10
      },
      counts: 0,
      companyList: [],
      editCompVisible: false,
      editCompForm: {},
      editCompRules: {
        shortName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        province: [{ required: true, message: '请选择城市', trigger: 'change' }],
        tags: [{ required: true, message: '请输入标签', trigger: 'change' }]
      },
      addCompVisible: false,
      addCompForm: {},
      addCompRules: {
        shortName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        province: [{ required: true, message: '请选择城市', trigger: 'change' }],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        tags: [{ required: true, message: '请输入标签', trigger: 'blur' }]
      },
      cityData: {
        provinces: [],
        city: []
      }
    }
  },
  created() {
    this.getCompanysList()
    this.cityData.provinces = provinces()
  },
  methods: {
    // 获取企业信息列表
    getCompanysList() {
      getAllCompanys(this.formInline)
        .then(res => {
          if (res.status === 200) {
            this.counts = res.data.counts
            this.companyList = res.data.items
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 搜索
    search() {
      this.getCompanysList()
    },
    // 添加企业
    addCompanyBtn() {
      this.addCompVisible = true
    },
    // 重置添加表单
    addCompReset() {
      this.$refs.addCompForm.resetFields()
      this.addCompVisible = false
      this.$message.info('已取消新增企业')
    },
    // 确认添加
    cofAddComp() {
      this.$refs.addCompForm.validate(valid => {
        if (valid) {
          addCompany(this.addCompForm)
            .then(res => {
              if (res.status === 200) {
                this.addCompVisible = false
                this.getCompanysList()
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    // 编辑企业
    handleEdit(info) {
      console.log(info)
      this.editCompForm.id = info.id
      getCompList(info.id)
        .then(res => {
          if (res.status === 200) {
            this.editCompForm = res.data
            this.editCompForm.isFamous = res.data.isFamous === 1
            this.editCompVisible = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 修改 名企多选框
    famousChange(val) {
      this.editCompForm.isFamous = val
    },
    // 取消 修改
    editCompReset() {
      this.$refs.editCompForm.resetFields()
      this.editCompVisible = false
      this.$message.info('已取消修改企业信息')
    },
    // 确定修改企业
    cofEditComp() {
      this.$refs.editCompForm.validate(valid => {
        if (valid) {
          updateComp(this.editCompForm.id, this.editCompForm)
            .then(res => {
              if (res.status === 200) {
                this.editCompVisible = false
                this.getCompanysList()
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    // 禁用/启用
    handleDisable(info) {
      var status = ''
      if (info.state === 1) {
        info.state = 0
        status = '禁用'
      } else {
        info.state = 1
        status = '启用'
      }
      let data = {
        id: info.id,
        state: info.state
      }
      this.$confirm('已成功' + status + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          updateState(info.id, data).then(res => {
            if (res.status === 200) {
              console.log(res)
              this.$message.success('已成功' + status + '!')
            } else {
              this.$message.error(status + '失败!')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消' + status
          })
        })
    },
    // 删除企业
    handleDelete(info) {
      this.$confirm('是否删除该企业?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteComp(info.id)
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getCompanysList()
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
    handleSizeChange(newpagesize) {
      this.formInline.pagesize = newpagesize
      this.getCompanysList()
    },
    handleCurrentChange(newpage) {
      this.formInline.page = newpage
      this.getCompanysList()
    },
    // 从省选市
    handleProvince: function (e) {
      this.cityData.city = citys(e)
      this.formInline.city = this.cityData.city[0].label
    }
  }
}
</script>

<style lang="less" scoped>
.companys {
  height: 100%;
  .el-form {
    .el-row {
      display: flex;
      align-items: center;
    }
  }

  /deep/.el-dialog__header {
    padding: 5px 10px;
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

  .el-form {
    width: 100%;
  }
}
</style>