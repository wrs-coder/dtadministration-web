<template>
  <el-container>
    <el-header>
      <TopNavBar/>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <AsideNavBar/>
      </el-aside>
      <el-container>
        <el-main>
          <AppMain/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// 顶部导航栏
import TopNavBar from '../components/TopNavBar'
// 左边导航栏
import AsideNavBar from '../components/AsideNavBar'

export default {
  name: 'Home',
  components: {
    TopNavBar,
    AsideNavBar
  }
}
</script>

<style scoped>
.el-menu{
  border-bottom: solid 1px #e6e6e6;
}
.el-main{
  height: 100%;
}
</style>
