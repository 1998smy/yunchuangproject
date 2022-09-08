<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.app-breadcrumb {
  /deep/.el-breadcrumb__inner {
    color: #fff;
  }
  /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #fff;
  }
}
</style>