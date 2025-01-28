<template>
     <div class="container">
        <Selectors />
        <CarList />
     </div>
</template>

<script setup lang="ts">
import CarList from './CarList.vue';
import Selectors from './Selectors.vue';

</script>

<style scoped>
.container {
    display: flex;
    gap: 20px;
    padding: 20px;
}
</style>

