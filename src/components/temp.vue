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
                <div class="title">搜索用户量</div>
                <div class="number">{{ userNum }}</div>
                <v-chart :option="userOption"></v-chart>
              </div>
              <div class="right-chart">
                <div class="title">搜索量</div>
                <div class="number">{{ searchNum }}</div>
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
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="6"
                :total="tableData.length"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="right">
      <el-card></el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

import { getKeywordsData } from '@/api/index.js'

const tableData = ref([])
const page = ref(1) // 当前页码
const userOption = ref({}) // 用户量图表配置
const searchOption = ref({}) // 搜索量图表配置

const pageData = computed(() => {
  // 根据当前页, 计算当前页要显示的数据
  const start = (page.value - 1) * 6
  const end = start + 6

  return tableData.value.slice(start, end)
})
// 总用户量
const userNum = computed(() => {
  return tableData.value.reduce((acc, cur) => acc + cur.totalUser, 0)
})
// 总搜索量
const searchNum = computed(() => {
  return tableData.value.reduce((acc, cur) => acc + cur.totalSearch, 0)
})

const handleCurrentChange = (value) => {
  page.value = value
}

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
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    series: {
      type: 'line',
      data: data,
      areaStyle: {
        color: 'skyblue',
      },
      itemStyle: {
        opacity: 0,
      },
      smooth: true,
    },
  }
}

onMounted(async () => {
  tableData.value = await getKeywordsData()
  // console.log(tableData.value)

  // 由于接口返回的数据格式不是我们希望, 因此需要对原始数据进行加工处理
  const userData = tableData.value
    .map((item) => item.totalUser)
    .slice(0, 10)
    .sort((a, b) => a - b)

  const searchData = tableData.value
    .map((item) => item.totalSearch)
    .slice(0, 10)
    .sort((a, b) => a - b)

    renderLineChart(userOption, userData);
    renderLineChart(searchOption, searchData);
})
</script>

<style lang="scss" scoped>
.third-comp {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  .left {
    flex: 1;
    h2 {
      font-weight: 600;
    }
    .main {
      padding: 20px;
      .charts {
        display: flex;
        gap: 20px;
        .left-chart,
        .right-chart {
          flex: 1;
          .title {
            font-size: 14px;
            color: #727171;
          }
          .number {
            margin-top: 10px;
            font-size: 20px;
            font-weight: 600;
          }
          // v-chart设置的默认样式
          .echarts {
            height: 50px;
          }
        }
      }
      .table {
        .el-pagination {
          margin-top: 16px;
          display: flex;
          justify-content: end;
        }
      }
    }
  }
  .right {
    flex: 1;
  }
}
</style>
