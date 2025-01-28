<template>
    <aside class="filters">
            <h2>Фильтры</h2>
            <div class="filter">
                <label for="brand">Марка</label>
                <select id="brand">
                    <option value="">Выберите марку</option>
                    <option value="lada">Lada (ВАЗ)</option>
                    <option value="volkswagen">Volkswagen</option>
                    <option value="toyota">Toyota</option>
                </select>
            </div>
            <div class="filter">
                <label for="model">Модель</label>
                <select id="model">
                    <option value="">Выберите модель</option>
                    <option value="2115">2115</option>
                    <option value="tayron">Tayron</option>
                    <option value="camry">Camry</option>
                </select>
            </div>
            <div class="filter">
                <label for="year">Год выпуска</label>
                <input type="number" id="year" min="1990" max="2023" placeholder="Год">
            </div>
            <div class="filter">
                <label for="price">Цена, ₽</label>
                <input type="number" id="price" min="0" placeholder="Макс. цена">
            </div>
            <button class="apply-filters">Применить</button>
        </aside>
</template>

<script setup lang="ts">
</script>

<style scoped>

body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    color: #333;
}
/* Фильтры */
aside.filters {
    width: 250px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 80px; /* Отступ от верхнего края, чтобы не перекрывать шапку */
    align-self: flex-start; /* Чтобы фильтры не растягивались */
    height: fit-content; /* Высота по содержимому */
}

aside.filters h2 {
    margin-top: 0;
    font-size: 1.2rem;
    color: #007bff;
}

.filter {
    margin-bottom: 15px;
}

.filter label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.filter select,
.filter input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
}

.apply-filters {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.apply-filters:hover {
    background-color: #0056b3;
}

/* Список автомобилей */
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