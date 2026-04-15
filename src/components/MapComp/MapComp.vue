<template>
  <div class="map-comp">
    <div class="left">
      <BMapScatter />
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template #header>
          <h2>订单同比增长</h2>
        </template>
        <template #default>
          <LiquidFill />
        </template>
      </el-card>
      <el-card shadow="hover">
        <template #header>
          <h2>关键词分析</h2>
        </template>
        <template #default>
          <WordCloud />
        </template>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import BMapScatter from './BMapScatter.vue'
import LiquidFill from './LiquidFill.vue'
import WordCloud from './WordCloud.vue'
</script>

<style lang="scss" scoped>
.map-comp {
  display: flex;
  margin-top: 20px;
  gap: 20px;
  overflow: hidden;



  .left {
    flex: 0 0 78%;
    height: 600px;
    position: relative;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-card {
      height: 282px;

      h2 {
        font-weight: bold;
      }
    }
  }
}


</style>
