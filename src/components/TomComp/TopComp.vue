<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <TotalSale :report-data="reportData" />
    </el-col>
    <el-col :span="6">
      <TotalOrder :report-data="reportData" />
    </el-col>
    <el-col :span="6">
      <TodayUser :report-data="reportData" />
    </el-col>
    <el-col :span="6">
      <TotalUser :report-data="reportData" />
    </el-col>
  </el-row>
</template>

<script setup>
import{ ref, onMounted } from 'vue';
import { getReportData } from '../../api/index.js';
import TotalSale from './TotalSale.vue'
import TotalOrder from './TotalOrder.vue'
import TodayUser from './TodayUser.vue'
import TotalUser from './TotalUser.vue'

const reportData = ref({});
onMounted(async () => {
  reportData.value = await getReportData();
})
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
  &.decrease {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 10px;
    border-width: 4px;
    border-color: red transparent transparent transparent;
    border-style: solid;
  }
}
</style>
