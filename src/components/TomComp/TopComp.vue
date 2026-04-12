<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <TotalSale />
    </el-col>
    <el-col :span="6">
      <TotalOrder />
    </el-col>
    <el-col :span="6">
      <TodayUser />
    </el-col>
    <el-col :span="6">
      <TotalUser />
    </el-col>
  </el-row>
</template>

<script setup>
import TotalSale from './TotalSale.vue'
import TotalOrder from './TotalOrder.vue'
import TodayUser from './TodayUser.vue'
import TotalUser from './TotalUser.vue'
</script>

<style lang="scss" scoped>
:deep(span) {
  font-size: 14px;
  color: #464545;
  &.css-1 {
    margin-left: 8px;
    font-weight: 550;
  }
  &.increase {
    margin-left: 10px;
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 5px;
    border-color: transparent transparent green transparent;
    border-style: solid;
    transform: translateY(-50%);
  }
}
</style>
