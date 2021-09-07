<template>
  <el-menu
    router
    :default-active="this.$route.path"
    class="el-menu-vertical-demo">
    <el-menu-item v-for="(item,i) in menuList" :key="i" :index="item.path">
      <span slot="title">{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AsideNavBar',
  data () {
    return {
      menuList: [
        {
          name: '首页',
          path: '/HelloPage'
        },
        {
          name: '入党积极分子管理',
          path: '/JJFZ'
        },
        {
          name: '预备党员管理',
          path: '/YBDY'
        },
        {
          name: '党员管理',
          path: '/DY'
        }]
    }
  }
}
</script>

<style scoped>

</style>
