<template>
  <div class="second-comp">
    <el-card shadow="hover">
      <template #header>
        <el-menu mode="horizontal" :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="1">销售额</el-menu-item>
          <el-menu-item index="2">访问量</el-menu-item>
        </el-menu>
        <div class="right">
          <el-radio-group v-model="radio">
            <el-radio-button label="今日" value="今日"></el-radio-button>
            <el-radio-button label="本周" value="本周"></el-radio-button>
            <el-radio-button label="本月" value="本月"></el-radio-button>
            <el-radio-button label="本年" value="本年"></el-radio-button>
          </el-radio-group>
          <el-date-picker
            type="daterange"
            v-model="dateRange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :shortcuts="shortcuts"
            unlink-panels
          ></el-date-picker>
        </div>
      </template>
      <template #default>
        <div class="container">
          <div class="left-chart">
            <v-chart :option="option"></v-chart>
          </div>
          <div class="right-list">
            <div class="title">排行榜</div>
            <div class="list-item" v-for="item in rankList">
              <span
                :class="{
                  highlight: item.no <= 3,
                }"
              >
                {{ item.no }}
              </span>
              <span>{{ item.title }}</span>
              <span>{{ item.sales }}</span>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getReportData, getSalesData } from '../../src/api/index.js'

const activeIndex = ref('1')
const radio = ref('今日')
const dateRange = ref('')
const option = ref({})
const salesData = ref('[]')
const rankList = ref('[]')

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

const renderChart = (v1,v2) => {
  option.value = {
    title: {
      text: '年度销售额',
      textStyle: {
        fontsize: 14,
      },
    },
    grid: {
      left: 40,
    },
    xAxis: {
      type: 'category',
      data: v2,
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dotted',
        },
      },
    },
    series: {
      type: 'bar',
      data: v1,
      barWidth: '40%',
      itemStyle: {
        color: 'skyblue',
      },
    },
    tooltip: {
      trigger: 'item',
    },
  }
}
const handleSelect = (index) => {
    const {
        saleFulleYear,
        saleFulleYearAxis,
        saleRank,
        visitFullYear,
        visitFullYeadAxis,
        visitRank,
    } = salesData.value
    console.log({ ...salesData.value });

    if (index === '1') {
        renderChart(saleFulleYear, saleFulleYearAxis)
        rankList.value = saleRank
    } else if (index === '2') {
        renderChart(visitFullYear, visitFullYeadAxis)
        rankList.value = visitRank
    }
}
onMounted(async () => {
    salesData.value = await getSalesData()
    const { saleFulleYear, saleFulleYearAxis, saleRank } = salesData.value

    renderChart(saleFulleYear, saleFulleYearAxis)
    rankList.value = saleRank
})
</script>

<style lang="scss" scoped>
.second-comp {
  position: relative;
  margin-top: 20px;
  :deep(.el-card__header) {
    padding: 0;
    border: none;
    .el-menu {
      padding-left: 50px;
    }
    .right {
      position: absolut e;
      top: 15px;
      right: 2px;
      font-size: 0;
      .el-radio-group {
        margin-right: 10px;
      }
    }
  }
  .container {
    display: flex;
    .left-chart {
      flex: 0 0 70%;
      height: 434px;
    }
    .right-list {
      flex: 1;
      .title{
        margin-top: 10px;
        font-size: 14px;
        font-weight: 600,
      }
      .list-item {
        display: flex;
        margin: 20px 0;
        align-items: center;
        gap: 20px;
        span {
          font-size: 14px;
          color: #464545;
          &:nth-child(1){
            width: 20px;
            height: 20px;
            border-radius: 10px;
            text-align: center;
            line-height: 20px;
          }
          &:nth-child(2){
            flex: 1;
          }
          &.highlight {
            background-color: #f56c6c;
            color: #fff;
          }
        }
    }
  }
}
}

</style>
