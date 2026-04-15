<template>
    <v-chart :option="option"></v-chart>
</template>

<script setup>

import { ref, onMounted } from 'vue' 
import 'echarts-wordcloud'
import { getKeywordsData } from '../../api/index.js';

const option = ref({})

const renderChart = (data) => {
    option.value = {
        tooltip: {},
        series: {
            type: 'wordCloud',
            data: data,
            width: '100%',
            height: '100%',
            textStyle: {
                color() {
                    return `rgb(${[
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255),
                    ].join(',')})`
                }
            },
            emphasis: {
                focus: 'self',
                textStyle: {
                    textShadouwBlur: 5,
                    textShadowColor: '#333',
                }
            }
        }
    }
}

onMounted(async () => {
  const res = await getKeywordsData()
  // console.log(res)
  const data = res.map((item) => {
    return {
      name: item.keyWord,
      value: item.totalSearch,
    }
  })
  renderChart(data)
})

</script>

<style lang="scss" scoped>

</style>