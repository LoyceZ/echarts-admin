<template>
    <CommonCard title="累计销售额" :value="230000">
        <template #default>
        <div>
            <span>日同比</span>
            <span class="css-1">2.33%</span>
            <span class="increase"></span>
        </div>
        <div>
            <span>月同比</span>
            <span class="css-1">2.33%</span>
            <span class="increase"></span>
        </div>
        </template>
        <template #footer>
            <span>昨日销售额</span>
            <span class="css-1">$12,423</span>
        </template>
    </CommonCard>

</template>

<script setup>
import CommonCard from './CommonCard.vue';


</script>

<style scoped>

</style>