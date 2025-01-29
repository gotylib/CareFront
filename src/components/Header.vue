<template>
        <header>
        <div class="logo">
            <i class="fas fa-car"></i>
            <h1>Автоподбор</h1>
        </div>
        <button class="cart-button">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count">{{ basketCarCounter }}</span>
        </button>
    </header>
</template>

<script setup lang="ts">
import { getBasketCarCount } from '@/services/api';
import { ref, onMounted } from 'vue'; 

const basketCarCounter = ref<number>(0);

const fetchBasketCarCount = async () =>{
    try {
        const count = await getBasketCarCount();
        basketCarCounter.value = count; 
    } catch (error) {
        console.error('Ошибка при получении количества машин в корзине:', error);
    }
}

onMounted(fetchBasketCarCount);
</script>

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    color: #333;
}

/* Шапка */
header {
    background-color: #007bff;
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

header .logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

header .logo i {
    font-size: 24px;
}

header h1 {
    margin: 0;
    font-size: 1.5rem;
}

.cart-button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s ease;
}

.cart-button:hover {
    background-color: #218838;
}

.cart-count {
    background-color: #ffc107;
    color: #333;
    padding: 2px 8px;
    border-radius: 50%;
    font-size: 14px;
}

/* Контейнер */
.container {
    display: flex;
    gap: 20px;
    padding: 20px;
}
</style>