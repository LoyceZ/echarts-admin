<template>
  <v-chart :option="option" style="width:100%;height:100%;"></v-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap.js'
import { getMapData } from '../../api/index.js'


const option = ref({})

const renderChart = (scatterData, effectScatterData) => {
  option.value = {
    bmap: {
      key: 'dyJb3SBgAQzx3JubUxAOUpHhnkZpniEF',
      center: [108.954355, 34.346721],
      zoom: 5,
      roam: true,
    
      mapStyleV2: {
        styleId: 'af94cae150519f388929a8d3f8457d31',
       
      }
    },
    title: {
      text: 'LoyceLee',
      left: 'center',
    },
    tooltip: {},
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: scatterData,
        name: '外卖订单量',
        encode: { value: 2 },
        symbolSize(value) {
          return value[2] / 10
        },
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: effectScatterData,
        name: 'Top 10',
        encode: { value: 2 },
        symbolSize(value) {
          return value[2] / 10
        },
        rippleEffect: {
          brushType: 'stroke',
          color: 'purple',
        },
        itemStyle: {
          color: '#5270D4',
        },
      },
    ],
  }
}

function converData(obj) {
  const res = []
  const { city, geodata } = obj
  city.forEach((element) => {
    const geo = geodata[element.name]
    if (geo) {
      res.push({
        name: element.name,
        value: [...geo, element.value],
      })
    }
  })
  return res
}

onMounted(async () => {
  const res = await getMapData()
  const scatterData = converData(res)
  const effectScatterData = scatterData
    .sort((a, b) => b.value[2] - a.value[2])
    .slice(0, 10)

  renderChart(scatterData, effectScatterData)
})
</script>