<template>
    <CommonCard title="累计用户数量" :value="reportData.totalUser">
        <template #default>
            <v-chart :option="option" />
        </template>
        <template #footer>
            <div class="wrapper">
                <div>
                    <span>日同比</span>
                    <span class="css-1">{{reportData.userGrowLastDay}}%</span>
                    <span 
                    :class="{
                        increase: reportData.userGrowLastDay > 0,
                        decrease: reportData.userGrowLastDay < 0
                    }
                    "></span>
                </div>
            </div>
            <div>
                <span>月同比</span>
                <span class="css-1">{{reportData.userGrowLastMonth}}%</span>
                <span 
                :class="{
                    increase: reportData.userGrowLastMonth > 0,
                    decrease: reportData.userGrowLastMonth < 0
                }">
                </span>
            </div>
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
const renderChart = (v1,v2) => {
    option.value = {
        xAxis: {
            type: 'value',
            show: false,


        },
        yAxis: {
            type: 'category',
            show: false,
        },
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },

        series: [{
            type: 'bar',
            data: [v1],
            itemStyle: {
                color: 'green',
            },
            barWidth: 10,
            stack: 'total',
        },
        {
            type: 'bar',
            data: [v2],
            itemStyle: {
                color: 'lightgray',
            },
            barWidth: 10,
            stack: 'total',
        },
        {
            type: 'custom',
            data: [v1],
            renderItem: (params, api) => {
                const endPoint = api.coord([api.value(0), 0]);
                return {
                    type: 'group',
                    children: [
                        {
                            type: 'path',
                            shape: {
                                d: 'M 10 10 L 30 10 L 20 30 Z',
                                x: endPoint[0] - 5,
                                y: 5,
                                width: 10,
                                height: 10,
                                layout: 'cover',
                            },
                            style: {
                                fill: 'green',
                            },
                        },
                        {
                            type: 'path',
                            shape: {
                                d: 'M 10 10 L 30 10 L 20 -10 Z',
                                x: endPoint[0] - 5,
                                y: 35,
                                width: 10,
                                height: 10,
                                layout: 'cover',
                            },
                            style: {
                                fill: 'green',
                            },
                        },
                    ],
                }
            },
        },
        ]
    }
}
watch(props, () => {
    renderChart(props.reportData.userGrowLastMonth,props.reportData.userToday)
});




</script>

<style lang="scss" scoped>


</style>