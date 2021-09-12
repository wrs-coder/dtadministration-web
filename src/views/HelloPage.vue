<template>
  <el-container>
    <el-header><h1>Hello! 欢迎使用</h1></el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :xs="2" :md="4" :lg="6">
          <div class="circleBox">
            <el-progress type="circle" :percentage="25"></el-progress>
          </div>
          <div class="circleBoxTitle">
            <span>入党积极分子占比</span>
          </div>
        </el-col>
        <el-col :xs="2" :md="4" :lg="6">
          <div class="circleBox">
            <el-progress type="circle" :percentage="25"></el-progress>
          </div>
          <div class="circleBoxTitle">
            <span>发展对象占比</span>
          </div>
        </el-col>
        <el-col :xs="2" :md="4" :lg="6">
          <div class="circleBox">
            <el-progress type="circle" :percentage="25"></el-progress>
          </div>
          <div class="circleBoxTitle">
            <span>预备党员占比</span>
          </div>
        </el-col>
        <el-col :xs="2" :md="4" :lg="6">
          <div class="circleBox">
            <el-progress type="circle" :percentage="25"></el-progress>
          </div>
          <div class="circleBoxTitle">
            <span>党员占比</span>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HelloPage'
}
</script>

<style scoped>
.circleBox {
  margin: 0 auto;
}

.circleBoxTitle {
  margin-top: 16px;
}
</style>
