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
      <el-form ref="loginForm" :model="loginForm" :rules="loginFromRules" class="login-form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-row>
            <el-col :span="24">
              <el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="loginForm.username">
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
        <!-- <el-form-item prop="code">
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

        </el-form-item> -->
        <!-- 多选框 -->
        <el-form-item prop="checked">
          <el-row>
            <el-col :span="24">
              <el-checkbox v-model="loginForm.checked" name="checked">
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
import { setToken, getToken } from '@/utils/token.js'
import Register from '@/views/login/components/register.vue'
import shajs from 'sha.js'
import { login } from '@/api/login'
export default {
  name: 'Login',
  components: { Register },
  data() {
    return {
      // 登录请求需要的请求数据
      loginForm: {
        username: '',
        password: '',
        // 多选框 状态
        checked: []
      },
      // 登录验证规则
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          // { min: 11, max: 11, trigger: 'blur', message: '请输入11位的手机号' },
          // { pattern: /0?(13|14|15|17|18)[0-9]{9}/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12个字符', trigger: 'blur' }
        ],
        checked: [{ type: 'array', required: true, message: '请阅读并勾选', trigger: 'change,blur' }]
      }
    }
  },
  // beforeCreate() {
  //   // token 的非空判断
  //   if (!getToken()) {
  //     this.$message.error('必须登录才可以访问首页')
  //     this.$router.push('/login')
  //   }
  // },
  methods: {
    // 注册用户事件
    setUser() {
      this.$refs.setDig.setUserVisible = true
    },
    // 登录事件
    login() {
      this.$refs.loginForm.validate(validate => {
        if (validate) {
          login({
            username: this.loginForm.username,
            password: shajs('sha256').update(this.loginForm.password).digest('hex')
          }).then(res => {
            if (res.status === 200) {
              this.$message.success('登录成功')
              console.log('res', res)
              console.log('token', res.data.token)
              setToken(res.data.token)
            }
          })
          this.$router.push('/layout')
        } else {
          return false
        }
      })
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