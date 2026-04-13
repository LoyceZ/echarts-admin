<template>
    <CommonCard title="累计订单额" :value="reportData.orderToday">
    <template #default>
        <v-chart :option="option" />
    </template>
    <template #footer>
        <span>昨日销售额</span>
        <span class="css-1">{{reportData.orderLastday}}</span>
    </template>
 </CommonCard>
</template>


<script setup>
import { ref,watch } from 'vue';
import CommonCard from './CommonCard.vue';
import { AxisPointerComponent } from 'echarts/components';

const props = defineProps({
    reportData: {
        type: Object,
        required: true,
    }
})



const option = ref({})

const renderChart = (data) => {
    option.value = {
        tooltip: {
            trigger: 'item',
            formatter: '{c}',
        },
                      

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
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
        },
        series: [
            {

                type: 'line',
                data: data,
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
    }
};
    watch(props, () => {
    renderChart(props.reportData.orderTrend);
})


</script>

<style lang="scss" scoped>


</style>