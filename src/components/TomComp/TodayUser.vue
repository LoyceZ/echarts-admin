<template>
    <CommonCard title="今日用户交易数" :value="reportData.userToday">
        <template #default>
            <v-chart :option="option" />
        </template>
        <template #footer>
            <span>退货率</span>
            <span class="css-1">{{reportData.returnRate}}%</span>
        </template>
    </CommonCard>
</template>


<script setup>

import CommonCard from './CommonCard.vue';
import { ref, watch } from 'vue';

const props = defineProps({
    reportData: {
        type: Object,
        required: true,
    }
})
const option = ref({})
const renderChart = (data) => {
    option.value = {
        xAxis: {
            type: 'category',
            show: false,
            data: [
                '00:00',
                '03:00',
                '06:00',
                '09:00',
                '12:00',
                '15:00',
                '18:00',
                '21:00',
                '23:00',
            ]
        },
        yAxis: {

            show: false,
        },
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        tooltip: {},
        series: {
            name: '实时交易量',
            type: 'bar',
            data: data,
            barWidth: '60%',
        }
    }
}
watch(props, () => {
    renderChart(props.reportData.orderUserTrend);
})

</script>

<style lang="scss" scoped>


</style>