<template>
  <el-menu
    router
    :default-active="this.$route.path"
    class="el-menu-vertical-demo">
    <el-menu-item v-for="(item,i) in menuList" :key="i" :index="item.path">
      <i :class="item.icon"></i>
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
          path: '/HelloPage',
          icon: 'el-icon-s-home'
        },
        {
          name: '人员管理',
          path: '/People',
          icon: 'el-icon-s-custom'
        },
        {
          name: '活动管理',
          path: '/Activity',
          icon: 'el-icon-s-flag'
        },
        {
          name: '青年大学习',
          path: '/Study',
          icon: 'el-icon-reading'
        }]
    }
  }
}
</script>

<style scoped>

</style>
