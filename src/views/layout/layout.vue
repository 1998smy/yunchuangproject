<template>
  <div class="layout">
    <el-container class="my-container">
      <el-header style="height:70px">
        <div class="left">
          <img src="./images/logo.png" alt="">
          <el-button @click="isCollapse = !isCollapse" class="iconBtn">
            <i class="el-icon-s-fold"></i>
          </el-button>
          <!-- 面包屑 -->
          <Breadcrumb></Breadcrumb>
        </div>
        <div class="right">
          <!-- 站内搜索 -->
          <div>
            <el-tooltip effect="dark" content="站内搜索" placement="bottom">
              <el-button class="search" icon="el-icon-search" @click="getSearch">
              </el-button>
            </el-tooltip>
            <transition name="el-fade-in-linear">
              <el-autocomplete ref="searchInput" v-model="searchVal" :fetch-suggestions="querySearchAsync" placeholder="站内搜索" @select="handleSelect" @blur="searchVisible=false" v-show="searchVisible"></el-autocomplete>
            </transition>
          </div>
          <!-- 全屏按钮 -->
          <el-tooltip effect="dark" content="全屏" placement="bottom">
            <el-button class="search fullscreen" icon="el-icon-rank">
            </el-button>
          </el-tooltip>
          <!-- 换肤 -->
          <el-tooltip effect="dark" content="换肤" placement="bottom">
            <div class="item">
              <el-button class="skinchange" icon="el-icon-arrow-down">
              </el-button>
            </div>
          </el-tooltip>
          <!-- 退出首页 -->
          <el-dropdown class="rolebar">
            <span class="el-dropdown-link">
              {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/layout">
                <el-dropdown-item>首页</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span @click="loginOut">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="aside-container">
        <el-aside :class="isCollapse ? 'yCollapse' : 'noCollpase'" width="200px">
          <el-menu class="el-menu-vertical-demo" :default-active="this.$route.path" :collapse="isCollapse" :router="true" :collapse-transition="false" @select="acticeMenu">
            <el-menu-item index="/layout/echarts">
              <i class="el-icon-pie-chart"></i>
              <span>数据概览</span>
            </el-menu-item>
            <el-menu-item index="/layout/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/enterprise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/setting">
              <i class="el-icon-setting"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/menus">
              <i class="el-icon-document"></i>
              <span slot="title">菜单列表</span>
            </el-menu-item>
          </el-menu>

        </el-aside>
        <el-container class="main-container" :class="isCollapse ? 'yCollapseMain' : 'noCollapseMain'" style="backgroundColor:#e7e8ed">
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import { getUserInfo } from '@/api/profile.js'
import { search } from '@/api/menu.js'
import { removeToken } from '@/utils/token.js'
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      // 搜索框数据
      restaurants: [],
      searchVal: '',
      timeout: null,
      searchVisible: false,
      // 菜单折叠功能
      isCollapse: false
    }
  },
  created() {
    // this.getUsrInfo()
    // console.log(this.$store.state.userInfo.roles.menus)
    console.log(this.$route.path)
  },
  mounted() {
    this.restaurants = search()
  },
  methods: {
    // 获取用户信息
    getUsrInfo() {
      getUserInfo()
        .then(res => {
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 搜索事件
    getSearch() {
      this.searchVisible = true
      this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
    },
    // 返回输入建议的方法 (官网方法)
    querySearchAsync(queryString, callback) {
      var restaurants = this.restaurants
      var result = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        callback(result)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    // 点击选中建议项时触发
    handleSelect(item) {
      this.searchVal = ''
      this.$message.success('选取了' + item.value)
      this.searchVisible = false
    },
    // 退出登录
    loginOut() {
      this.$confirm('此操作将退出该页面, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          removeToken()
          // 删除用户信息
          this.$store.commit('SETUSERNAME', '')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    },
    // 侧边栏
    acticeMenu(index) {
      console.log(index)
      this.activeIndex = index
    }
  },
  computed: {
    ...mapState({
      userName: state => state.userName
    })
    // getUserInfo() {
    //   return this.$store.state.userInfo
    // }
  },
  components: { Breadcrumb }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;

  .my-container {
    height: 100%;

    .el-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background: linear-gradient(225deg, rgba(1, 198, 250, 1), rgba(20, 147, 250, 1));
      color: #fff;

      .left {
        display: flex;
        align-items: center;
        justify-content: left;

        .iconBtn {
          padding: 2px;
          background-color: transparent;
          border: 0;
          color: #fff;
        }
        i {
          margin: 0 10px 0 20px;
          font-size: 22px;
        }
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: right;
        .search {
          padding: 5px;
          background-color: transparent;
          border: none;
          font-size: 18px;
          color: #fff;
        }
        .el-autocomplete {
          // position: fixed;
          // top: 21px;
          // left: 1521px;
        }
        .fullscreen {
          margin: 0;
          font-size: 24px;
        }

        .item {
          margin-left: 5px;
          margin-right: 10px;
          padding: 4px;
          width: 36px;
          border: 1px solid #e6e6e6;
          border-radius: 3px;
        }
        .skinchange {
          padding: 6px;
          width: 25px;
          height: 25px;
          border: 0;
          background-color: rgba(64, 158, 250, 1);
          color: #fff;
        }
        .rolebar {
          color: #fff;

          i {
            margin-left: 10px;
          }
        }
      }
    }

    .aside-container {
      position: absolute;
      top: 70px;
      width: 100%;

      .el-aside {
        position: fixed;
        top: 70px;
        left: 0;
        background-color: #fff;
        overflow: hidden;

        .el-menu {
          box-sizing: border-box;
          border: 0;
          .el-menu-item {
            font-size: 15px;
            width: 200px;
            i {
              margin-right: 10px;
            }
          }
        }
      }
    }

    .main-container {
      position: absolute;
      top: 0;
      max-width: calc(100% - 60px);
      height: calc(100vh - 70px);
    }
  }
  .yCollapse {
    width: 60px;
  }
  .noCollpase {
    width: 200px;
  }
  .yCollapseMain {
    left: 60px;
    width: calc(100% - 60px);
  }
  .noCollapseMain {
    left: 200px;
    width: calc(100% - 200px);
  }
}
</style>