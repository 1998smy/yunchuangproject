<template>
  <div class="register">
    <!-- 注册对话框 -->
    <el-dialog title="用户注册" center top="10vh" @close="closedForm" :visible.sync="setUserVisible" width="50%">
      <el-form ref="setUserForm" :model="setUserForm" :rules="setUserRules" label-width="60px">
        <el-form-item label="头像">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" name="image" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-row>
            <el-col :span="24">
              <el-input v-model="setUserForm.username">
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-row>
            <el-col :span="24">
              <el-input v-model="setUserForm.email">
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-row>
            <el-col :span="24">
              <el-input v-model="setUserForm.phone">
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-row>
            <el-col :span="24">
              <el-input v-model="setUserForm.password">
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="图形码" prop="imagecode">
          <el-row>
            <el-col :span="17">
              <el-input v-model="setUserForm.imagecode">
              </el-input>
            </el-col>
            <el-col :span="7">
              <div class="setUser-code">
                <img src="../images/login_code.png" alt="">
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="setUserForm.code"></el-input>
            </el-col>
            <el-col :span="7">
              <el-button class="code-btn">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="setUserVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 注册对话框
      setUserVisible: false,
      // 注册用户 数据
      setUserForm: {
        imageUrl: '',
        username: '',
        email: '',
        imagecode: ''
      },
      imageUrl: '',
      setUserRules: {
        username: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { pattern: '/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/', message: '请输入正确的手机', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // 生成本地的预览
      this.imageUrl = URL.createObjectURL(file.raw)
      // 准备提交的数据
      this.regForm.avatar = res.data.file_path
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 表单重置
    closedForm() {
      this.$refs.setUserForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  /deep/.el-dialog__header {
    height: 55px;
    background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
    .el-dialog__title {
      color: #fff;
    }
  }

  .el-input {
    height: 40px;

    /deep/.el-input__inner {
      height: 100%;
    }
  }
  .setUser-code {
    margin-left: 20px;
    padding: 4px 0;
    width: 156px;
    height: 40px;
    img {
      width: 148px;
      height: 32px;
    }
  }
  .code-btn {
    width: calc(100% - 20px);
    height: 40px;
    margin-left: 20px;
  }
  /deep/.el-dialog__footer {
    padding-bottom: 40px;
    padding-top: 0;
  }

  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader /deep/.el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>