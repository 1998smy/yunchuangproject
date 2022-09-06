<template>
  <div class="login">
    <!-- 登录框 -->
    <div class="login-box">
      <!-- 标题 -->
      <div class="login-title">
        <img src="./images/login_logo.png" alt="">
        <span>黑马面面</span>
        <span class="title-goly">|</span>
        <span>用户登录</span>
      </div>
      <!-- 表单输入框区域 -->
      <el-form ref="lodinForm" :model="loginForm" :rules="loginFromRules" class="login-form">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-row>
            <el-col :span="24">
              <el-input placeholder="请输入手机号" prefix-icon="el-icon-search" v-model="loginForm.phone">
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-row>
            <el-col :span="24">
              <el-input type="password" show-password placeholder="请输入密码" prefix-icon="el-icon-search" v-model="loginForm.password">
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-search" v-model="loginForm.code">
              </el-input>
            </el-col>
            <el-col :span="7">
              <div class="login-code">
                <img src="./images/login_code.png" alt="">
              </div>
            </el-col>
          </el-row>

        </el-form-item>
        <!-- 多选框 -->
        <el-form-item>
          <el-row>
            <el-col :span="24">
              <el-checkbox v-model="checked">
                我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a>
              </el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="login" style="width:100%;height: 40px;">登 录</el-button>
          </el-col>
        </el-row>
        <!-- 注册按钮 -->
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="setUser" style="width:100%;height: 40px;">注 册</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <img src="./images/login_banner_ele.png" alt="">
    <!-- 注册对话框 -->
    <Register ref="setDig"></Register>
  </div>
</template>

<script>
import register from '@/views/login/components/register.vue'
import Register from '@/views/login/components/register.vue'
export default {
  name: 'Login',
  components: { register, Register },
  data() {
    return {
      // 登录请求需要的请求数据
      loginForm: {
        phone: '',
        password: '',
        code: ''
      },
      // 多选框 状态
      checked: false,
      // 登录验证规则
      loginFromRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
          // { pattern: '/0?(13|14|15|17|18)[0-9]{9}/', message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12个字符', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 注册用户事件
    setUser() {
      console.log(this.$refs.setDig)
      this.$refs.setDig.setUserVisible = true
    },
    login() {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(225deg, rgba(1, 198, 250, 1), rgba(20, 147, 250, 1));

  .login-box {
    padding: 30px;
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;

    .login-title {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 25px;

      img {
        width: 28px;
        height: 23px;
      }

      span {
        margin-left: 15px;
        font-weight: 550;
        font-size: 21px;
      }

      .title-goly {
        color: #ddd;
      }
    }

    .login-form {
      .el-input {
        /deep/.el-input__inner {
          height: 45px;
        }
      }
      .login-code {
        padding: 8px;
        width: 120px;
        height: 45px;
        background-color: #fff;
        box-sizing: border-box;

        img {
          width: 104px;
          height: 29px;
        }
      }

      .el-checkbox {
        color: #606266;
        a {
          color: #0094ff;
        }
      }

      .el-form-item {
        margin-bottom: 25px;
      }

      .el-button {
        margin-bottom: 25px;
        font-size: 16px;
      }
    }
  }
}
</style>