<template>
    <el-card shadow="hover">
        <div class="title">{{ title }}</div>
        <div class="value">{{ value }}</div>
        <div class="chart">
            <slot name="default"></slot>
        </div>
        <div class="line"></div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </el-card>

</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'true'
    },
    value: {
    }
})


</script>

<style lang="scss" scoped>
.el-card{
    .title{
        font-size: 12px;
        color:#777;
        letter-spacing: 1px;
    }
    .value{
        font-size: 24px;
        font-weight: 600;
        margin-top: 10px;
    }
    .chart{
        height: 50px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content:center;
        gap: 6px;
    }
    .line{
       margin-top: 18px;
        border-top:1px solid #ddd;
    }
    .footer{
        margin-top: 10px;
    }
}


</style>