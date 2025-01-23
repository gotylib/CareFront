<template>
    <div class="popup">
      <div class="popup-content">
        <div v-if="!guid && !showQRCode && !showAuth2FA">
          <h4 v-if="isRegister">Registrate Form</h4>
          <h4 v-else>Login Form</h4>
          <div v-if="isRegister">
            <input v-model="username" placeholder="Name" />
            <input v-model="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <input v-model="secretCode" type="password" placeholder="Secret Code" />
            <div class="button-container">
              <button @click="register">Sign Up</button>
            </div>
            <p>You are registered? <a class="verification-link" href="#" @click="toggleForm">Sign In</a></p>
          </div>
          <div v-else>
            <input v-model="username" placeholder="Name" />
            <input v-model="password" type="password" placeholder="Password" />
            <div class="button-container">
              <button @click="login">Sign In</button>
            </div>
            <p>Don't you have an account yet? <a class="verification-link" href="#" @click="toggleForm">Sign up</a></p>
          </div>
        </div>
  
        <div v-if="showQRCode">
          <QRCode :qrCode="qrCode" @goBack="goBack" />
        </div>
  
        <div v-if="showAuth2FA">
          <Authentication2FA
            :code2FA="code2FA"
            :guid="guid"
            :username="username"
            @goBack="goBack"
          />
        </div>
      </div>
    </div>
  
    <ErrorPopup />
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import Authentication2FA from 'e:/repos/CarFront/CarFront/src/components/Pages/Authentication2FA.vue';
  import QRCode from 'e:/repos/CarFront/CarFront/src/components/Pages/QRCode.vue';
  import ErrorPopup from 'e:/repos/CarFront/CarFront/src/components/Pages/ErrorPopup.vue';
  
  export default defineComponent({
    name: 'AuthComponent',
    components: {
      Authentication2FA,
      QRCode,
      ErrorPopup,
    },
    setup() {
      const isRegister = ref<boolean>(localStorage.getItem('isRegister') === 'true');
      const username = ref<string>('');
      const email = ref<string>('');
      const password = ref<string>('');
      const secretCode = ref<string>('');
      const qrCode = ref<string>('');
      const guid = ref<string>('');
      const code2FA = ref<string>('');
      const accessToken = ref<string>('');
      const refreshToken = ref<string>('');
      const showQRCode = ref<boolean>(false);
      const showAuth2FA = ref<boolean>(false);
  
      const toggleForm = () => {
        isRegister.value = !isRegister.value;
        localStorage.setItem('isRegister', isRegister.value.toString());
      };
  
      const register = async () => {
        try {
          const response = await axios.post<Blob>('https://localhost:30001/api/Users/Register', {
            username: username.value,
            email: email.value,
            password: password.value,
            secretCode: secretCode.value,
          }, {
            responseType: 'blob',
          });
  
          console.log('Response data:', response.data);
  
          const url = window.URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
          qrCode.value = url;
          showQRCode.value = true;
        } catch (error) {
          console.error('Ошибка регистрации:', error);
          throw new Error('Registration failed. Please try again.');
        }
      };
  
      const login = async () => {
        try {
          const response = await axios.post<{ guid: string }>('https://localhost:30001/api/Users/Login', {
            name: username.value,
            password: password.value,
          });
          guid.value = response.data.guid;
          showAuth2FA.value = true;
        } catch (error) {
          console.error('Ошибка входа:', error);
          throw new Error('Login failed. Please try again.');
        }
      };
  
      const goBack = () => {
        guid.value = '';
        showQRCode.value = false;
        showAuth2FA.value = false;
      };
  
      return {
        isRegister,
        username,
        email,
        password,
        secretCode,
        qrCode,
        guid,
        code2FA,
        accessToken,
        refreshToken,
        showQRCode,
        showAuth2FA,
        toggleForm,
        register,
        login,
        goBack,
      };
    },
    mounted() {
      const savedIsRegister = localStorage.getItem('isRegister');
      if (savedIsRegister !== null) {
        this.isRegister = savedIsRegister === 'true';
      }
    },
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
