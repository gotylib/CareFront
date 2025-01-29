<template>
  <div>
    <h4>Registrate Form</h4>
    <input v-model="username" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <input v-model="secretCode" type="password" placeholder="Secret Code" />
    <div class="button-container">
      <button @click="register">Sign Up</button>
    </div>
    <p>
      You are registered?
      <a class="verification-link" href="#" @click="authStore.toggleForm">Sign In</a>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { register as apiRegister } from '@/services/api'; // Импортируем register как apiRegister
import { useAuthStore } from '@/stores/auth'; // Импортируем хранилище

// Используем хранилище
const authStore = useAuthStore();

// Реактивные переменные для хранения данных формы
const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const secretCode = ref<string>('');

// Функция для выполнения регистрации
const register = async () => {
  try {
    const response = await apiRegister({
      // Используем apiRegister
      username: username.value,
      email: email.value,
      password: password.value,
      secretCode: secretCode.value,
    });

    console.log('Response data:', response);

    // Создаем URL для изображения QR-кода
    const url = window.URL.createObjectURL(
      new Blob([response], { type: 'image/png' })
    );
    // Вызываем действие showQRCodeHandler из хранилища
    authStore.showQRCodeHandler(url);
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    throw new Error('Registration failed. Please try again.');
  }
};
</script>




<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 300px; /* Fixed width for the form container */
}

.popup-content h4 {
  margin-bottom: 20px;
}

.popup-content input {
  border: 1px solid #ccc;
  border-radius: 10px;
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

.popup-content input:hover {
  background-color: #f0f0f0;
}

.popup-content input:focus {
  outline: none;
  border: 1px solid #ccc;
}

.popup-content .button-container {
  display: flex;
  margin-top: 10px;
}

.popup-content button {
  background-color: #007bff;
  color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  flex-grow: 1;
  margin-right: 10px;
  font-size: 14px;
}

.popup-content button:last-child {
  margin-right: 0;
}

.popup-content button:hover {
  background-color: #0056b3;
}

.popup-content .button-container button {
  min-width: 100px;
}

.back-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-bottom: 20px;
}

.back-button:hover {
  color: blue;
}

.verification-link {
  font-size: 14px;
  color: gray; /* Изначальный цвет ссылки */
  text-decoration: none; /* Убираем подчёркивание */
  outline: none; /* Убираем рамку */
  border: none; /* Убираем рамку */
}
.verification-link:hover,
.verification-link:focus {
  color: #007bff; /* Цвет ссылки при наведении */
  text-decoration: none; /* Убираем подчёркивание при наведении */
  outline: none; /* Убираем рамку при наведении */
  border: none; /* Убираем рамку при наведении */
  box-shadow: none; /* Убираем тень */
}
</style>
