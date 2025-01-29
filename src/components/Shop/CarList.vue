<template>
  <div class="results">
    <div v-for="car in cars" :key="car.id" class="car-listing">
      <div class="car-image">
        <img :src="getImageUrl(car.photo)" :alt="car.make + ' ' + car.model" />
      </div>
      <div class="car-info">
        <h2>{{ car.make }} {{ car.model }}</h2>
        <p>{{ car.color }}</p>
        <p>
          <strong>{{ car.stockCount }} шт</strong>
        </p>
      </div>
      <button class="add-to-cart"><i class="fas fa-shopping-cart"></i></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCarStore } from "@/stores/carStore";

const carStore = useCarStore();
const cars = computed(() => carStore.cars);

const getImageUrl = (photo: Blob | undefined): string => {
  if (photo) {
    return URL.createObjectURL(photo);
  }
  return ""; // Возвращаем пустую строку, если фото не найдено
};

onMounted(() => {
  carStore.fetchCars();
});
</script>

<style scoped>
body {
  font-family: "Arial", sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  color: #333;
}
.results {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.car-listing {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.car-listing:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.car-image {
  width: 200px;
  height: 150px;
  overflow: hidden;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.car-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.car-image img:hover {
  transform: scale(1.1);
}

.car-info {
  flex: 1;
  padding: 20px;
}

.car-info h2 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #007bff;
}

.car-info p {
  margin: 5px 0;
  font-size: 0.9rem;
}

.car-info strong {
  color: #28a745;
  font-size: 1.2rem;
}

.add-to-cart {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.add-to-cart:hover {
  background-color: #218838;
}

.add-to-cart i {
  font-size: 20px;
}
</style>
