<template>
  <el-container>
    <el-header><h1>Hello! 欢迎使用</h1></el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :xs="2" :md="4" :lg="6">
          <div class="circleBox">
            <el-progress type="circle" :percentage="a"></el-progress>
          </div>
          <div class="circleBoxTitle">
            <span>入党积极分子占比</span>
          </div>
        </el-col>
        <el-col :xs="2" :md="4" :lg="6">
          <div class="circleBox">
            <el-progress type="circle" :percentage="b"></el-progress>
          </div>
          <div class="circleBoxTitle">
            <span>发展对象占比</span>
          </div>
        </el-col>
        <el-col :xs="2" :md="4" :lg="6">
          <div class="circleBox">
            <el-progress type="circle" :percentage="c"></el-progress>
          </div>
          <div class="circleBoxTitle">
            <span>预备党员占比</span>
          </div>
        </el-col>
        <el-col :xs="2" :md="4" :lg="6">
          <div class="circleBox">
            <el-progress type="circle" :percentage="d"></el-progress>
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
  name: 'HelloPage',
  mounted: function () {
    this.$http('post', '/api/queryPercent').then(response => {
      const a = Math.round(response[0].aCount / response[0].total * 100)
      const b = Math.round(response[0].bCount / response[0].total * 100)
      const c = Math.round(response[0].cCount / response[0].total * 100)
      const d = Math.round(response[0].dCount / response[0].total * 100)
      this.a = a
      this.b = b
      this.c = c
      this.d = d
    })
  },
  data () {
    return {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    }
  }
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
