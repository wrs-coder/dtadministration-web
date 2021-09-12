<template>
  <el-container>
    <el-header>
      <TopNavBar/>
    </el-header>
    <el-container>
      <el-aside width="160px">
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
.el-header {
  padding: 0;
}

.el-main {
  height: 100%;
}

</style>
