<template>
    <CommonCard title="累计用户数量" value="1942692616">
        <template #default>
            <v-chart :option="option" />
        </template>
        <template #footer>
            <div class="wrapper">
                <div>
                    <span>日同比</span>
                    <span class="css-1">12.35%</span>
                    <span class="increase"></span>
                </div>
            </div>
            <div>
                <span>月同比</span>
                <span class="css-1">23.35%</span>
                <span class="increase"></span>
            </div>
        </template>

    </CommonCard>



</template>

<script setup>
import CommonCard from './CommonCard.vue';
import { ref } from 'vue';
const option = ref({
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
        data: [130],
        itemStyle: {
            color: 'green',
        },
        barWidth: 10,
        stack: 'total',
    },
    {
        type: 'bar',
        data: [30],
        itemStyle: {
            color: 'lightgray',
        },
        barWidth: 10,
        stack: 'total',
        },
        {
            type: 'custom',
            data: [130],
            renderItem: (params, api) => {
                const [x, y] = api.coord([api.value(0), 0]);
                return {
                    type: 'group',
                    children: [
                        {
                            type: 'path',
                            shape: {
                                d: 'M 10 10 L 30 10 L 20 30 Z',
                                x: x - 5,
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
                                x: x - 5,
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
})


</script>

<style lang="scss" scoped>


</style>