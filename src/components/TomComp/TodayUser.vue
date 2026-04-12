<template>
    <CommonCard title="今日用户交易数" :value="30">
        <template #default>
            <v-chart :option="option" />
        </template>
        <template #footer>
            <span>退货数</span>
            <span class="css-1">3.57%</span>
        </template>
    </CommonCard>
</template>


<script setup>
import CommonCard from './CommonCard.vue';
import { ref } from 'vue';
const option = ref({
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
        data: [5, 20, 36, 10, 10, 20, 15, 25, 30],
        barWidth: '60%',
    }
})

</script>

<style lang="scss" scoped>


</style>