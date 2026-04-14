<template>
    <div class="third-comp">
        <div class="left">
            <el-card>
                <template #header>
                    <h2>关键词搜索</h2>
                </template>
                <template #default>
                    <div class="main">
                        <div class="charts">
                            <div class="left-chart">
                                <div class="title">用户数</div>
                                    <div class="number">{{userNum}}</div>
                                    <v-chart :option="userOption"></v-chart>
                            </div>
                            <div class="right-chart">
                                <div class="title">搜索量</div>
                                <div class="number">{{searchNum}}</div>
                                <v-chart :option="searchOption"></v-chart>
                            </div>
                        </div>
                        <div class="table">
                            <el-table :data="pageData">
                                <el-table-column label="排名" prop="rank"></el-table-column>
                                <el-table-column label="关键词" prop="keyWord"></el-table-column>
                                <el-table-column label="总搜索量" prop="totalSearch"></el-table-column>
                                <el-table-column label="搜索用户数" prop="totalUser"></el-table-column>
                            </el-table>
                            <el-pagination background 
                            layout="prev, pager, next" 
                            :total="tableData.length"
                            :page-size="6"
                            @current-change="handleCurrentChange"></el-pagination>
                        </div>
                    </div>
                </template>
            </el-card>
        </div>
        <div class="right">
            <el-card shadow="hover">
                <template #header>
                    <h2>分类销售排行</h2>
                    <el-radio-group v-model="type" @change="handleChange">
                        <el-radio-button label="品类" value="category"></el-radio-button>
                        <el-radio-button label="商品" value="product"></el-radio-button>
                    </el-radio-group>
                </template>
                <template #default>
                    <v-chart :option = "categoryOption"></v-chart>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue'

import { getKeywordsData,getCategoryData } from '../../src/api/index.js';
import { tr } from 'element-plus/es/locale/index.mjs';


const tableData = ref([]);
const page = ref(1);
const categoryData = ref([]);

const userOption = ref({});
const searchOption = ref({});
const categoryOption = ref({});

const type = ref('category');

const pageData = computed(() => {
    const start = (page.value - 1) * 6;
    const end = start + 6;
    return tableData.value.slice(start, end);
});

const userNum = computed(() => {
    return tableData.value.reduce((acc, cur) => acc + cur.totalUser, 0);
});
console.log(userNum.value);

const searchNum = computed(() => {
    return tableData.value.reduce((acc, cur) => acc + cur.totalSearch, 0);
});
console.log(searchNum.value);
const handleCurrentChange = (val) => {
    page.value = val;
};

const renderLineChart = (chartOption, data) => {
    chartOption.value = {
        xAxis: {
            type: 'category',
            show: false,
             boundaryGap: false,
            
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
        series: {
            type: 'line',
            data: data,
            areaStyle: {
                color:'skyblue'
            },
            itemStyle: {
                opacity: 0, 
            },
            smooth: true,
        }
    }
    
}

const renderCategoryChart = (data) => {
    const _data = data.map((item) => {
        return {
            ...item,
            name:`${item.title}`,
        }
    })
    const total = data.reduce((acc, cur) => acc + cur.value, 0)
    categoryOption.value = {
        title: [{
            text: '品类分布',
            textStyle: {
                fontSize: 14,
                color: '#666',
            },
        },
        {
            text: '累计订单量',
            subtext: total,
            textAlign: 'center',
            x: '39%',
            y: '43%',
            textStyle: {
                fontSize: 14,
                color: '#999',
            },
            subtextStyle: {
                fontSize: 28,
                color: '#333',
            },


        },
        ],
        tooltip: {
            trigger: 'item',
            
        },
        legend: {
            orient: 'vertical',
            left: '80%',
            top: 'top',
            textStyle: {
                color: '#888',
            },
        },
        series: {
                type: 'pie',
                name: '品类分布',
                data: _data,
                radius: ['45%', '60%'],
                center: ['40%', '50%'],
                label: {
                    position: 'outside',
                    formatter: '{b}\n{d}%',
                    
                    // formatter: (params) => {
                    //     if (params.data.value > 350) {
                    //         return `${params.data.title} {hot|(爆款)}`
                    //     }
                    //     return params.data.title 
                        
                    // },
                    // rich: {
                    //     hot: {
                    //         color: '#f56c6c',
                    //         fontWeight: '700'
                    //     }
                    // },
                  


                },
                itemStyle: {
                    borderWidth: 8,
                    borderColor: '#fff',
                },
            },
        }
}

const handleChange = () => {
    if (type.value === 'category') {
        renderCategoryChart(categoryData.value.data1)
    } else if (type.value === 'product') {
        renderCategoryChart(categoryData.value.data2)
    }
}

onMounted(async () => {
    tableData.value = await getKeywordsData();
    categoryData.value = await getCategoryData()
    console.log(tableData.value);


    const userData = tableData.value.map((item) => item.totalUser).slice(0, 10).sort((a, b) => a - b);
    const searchData = tableData.value.map((item) => item.totalSearch).slice(0, 10).sort((a, b) => a - b);

    // console.log(userData);


    renderLineChart(userOption, userData);
    renderLineChart(searchOption, searchData);

    renderCategoryChart(categoryData.value.data1)
});
</script>

<style lang="scss" scoped>
.third-comp {
    display: flex;
    margin-top:20px;
    gap:20px;
    .left{
        flex: 1;
        h2 {
        font-weight: 600;
    }
    .main{
        padding:20px;
        .charts{
            display: flex;
            gap: 20px;
            .left-chart, .right-chart{
                flex: 1;
                .title{
                    font-size: 14px;
                    color: #727171;
                }
                .number{
                    margin-top:10px;
                    font-size: 20px;
                    font-weight: 600;
                }
                .echarts{
                    height: 50px;
                }
            }
        }
        .table{
            .el-pagination{
                margin-top:16px;
                display: flex;
                justify-content: end;
            }
        }
    }
}
.right{
    flex:1;
    :deep(.el-card__header){
        position: relative;
        h2{
            font-weight: 600;
        }
        .el-radio-group{
            position: absolute;
            top: 10px;
            right: 20px;
    }
}
:deep(.el-card__body){
    height: 502px;
    box-sizing: border-box;
}
}
}
    


</style>