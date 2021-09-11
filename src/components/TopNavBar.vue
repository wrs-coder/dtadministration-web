<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item><h1 class="title">党团管理系统</h1></el-menu-item>
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-menu-item index="2"><a href="https://www.cqupt.edu.cn/" target="_blank">重邮官网</a></el-menu-item>
    <span class="ExitButton">
     <el-button type="primary" size="small" @click="exit">退出</el-button>
  </span>
  </el-menu>
</template>

<script>
export default {
  name: 'TopNavBar',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    exit () {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 18px;
  color: #1989fa;
  font-weight: bolder;
}

.ExitButton {
  float: right;
  margin: 15px;
}
</style>
