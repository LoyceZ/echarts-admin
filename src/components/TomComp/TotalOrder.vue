<template>
    <CommonCard title="累计订单数" :value="1234">
    <template #default>
        <v-chart :option="option" />
    </template>
    <template #footer>
        <span>昨日销售额</span>
        <span class="css-1">¥123,456.78</span>
    </template>
 </CommonCard>
</template>


<script setup>
import { ref } from 'vue';
import CommonCard from './CommonCard.vue';

const option = ref({
    xAxis: {
        type: 'category',
        show: false,
        boundaryGap: false,
    },
    yAxis: {
        type: 'value',
        show: false,
    },
    grid: {
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '0%',
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130,100],
            type: 'line',
            areaStyle: {
                color: 'purple',
            },
            itemstyle: {
                opacity: 0,
            },
            linestyle: {
                opacity: 0,
            },
            smooth: true
        }
    ]
});


</script>

<style lang="scss" scoped>


</style>