<template>

    <TopComp />
    <SecondComp />
    <ThirdComp />
    <MapComp />
  
</template>

<script setup>
import TopComp from './components/TomComp/TopComp.vue'
import SecondComp from './components/Second.vue';
import ThirdComp from './components/ThirdComp.vue';
import MapComp from './components/MapComp.vue';
</script>


<style>
@import 'reset-css';
#app {
  min-width: 1200px;
  padding: 20px;
  background-color: #eee;
}
</style>
