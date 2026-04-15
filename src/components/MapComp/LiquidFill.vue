<template>
    <v-chart :option="option"></v-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import 'echarts-liquidfill'

import { getReportData } from "../../api/index.js";

const option = ref({})

const renderChart = (data) => {
    option.value = {
        series: {
            type: 'liquidFill',
            data: [data],
            color: ['red'],
            radius: '80%',
            outline: {
                borderDistance: 2,
                itemStyle: {
                    borderWidth: 2,
                },
            },
            amplitude: '4%',
        }
    }
}

onMounted(async () => {
    const res = await getReportData()
    const data = (res.salesGrowLastDay / 100).toFixed(2)
    renderChart(data)
})

</script>

<style lang="scss" scoped>

</style>