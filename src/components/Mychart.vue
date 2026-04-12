<template>
  <v-chart class="chart" :option="option"></v-chart>
</template>

<script setup>
import { ref } from 'vue'

const option = ref({
  title: {
    text: 'ECharts 入门示例',
  },
  tooltip: {},
  legend: {
    data: ['销量'],
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子','帽子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20,25],
    },
  ],
})
</script>

<style scoped>
.chart {
  width: 600px;
  height: 600px;
}
</style>