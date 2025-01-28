<template>
  <div class="popup">
    <div class="popup-content">
      <div v-if="!authStore.guid && !authStore.showQRCode && !authStore.showAuth2FA">
        <RegisterForm v-if="authStore.isRegister" @toggleForm="authStore.toggleForm" @showQRCode="authStore.showQRCodeHandler" />
        <LoginForm v-else @toggleForm="authStore.toggleForm" @showAuth2FA="authStore.showAuth2FAHandler" />
      </div>

      <div v-if="authStore.showQRCode">
        <QRCode :qrCode="authStore.qrCode" @goBack="authStore.goBack" />
      </div>

      <div v-if="authStore.showAuth2FA">
        <Authentication2FA
          :code2FA="authStore.code2FA"
          :guidProps="authStore.guid"
          :username="authStore.username"
          @goBack="authStore.goBack"
        />
      </div>
    </div>
  </div>

  <ErrorPopup />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Authentication2FA from '@/components/Auth/Authentication2FA.vue';
import QRCode from '@/components/Auth/QRCode.vue';
import ErrorPopup from '@/components/ErrorPopup.vue';
import RegisterForm from '@/components/Auth/RegisterForm.vue';
import LoginForm from '@/components/Auth/LoginForm.vue';
import { useAuthStore } from '@/stores/auth';

// Используем хранилище
const authStore = useAuthStore();

onMounted(() => {
  const savedIsRegister = localStorage.getItem('isRegister');
  if (savedIsRegister !== null) {
    authStore.isRegister = savedIsRegister === 'true';
  }
});
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
    background-color: white;
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
    color: blue;
    background-color: #f0f0f0;
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
