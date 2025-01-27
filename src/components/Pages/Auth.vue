<template>
  <div class="popup">
    <div class="popup-content">
      <div v-if="!guid && !showQRCode && !showAuth2FA">
        <RegisterForm v-if="isRegister" @toggleForm="toggleForm" @showQRCode="showQRCodeHandler" />
        <LoginForm v-else @toggleForm="toggleForm" @showAuth2FA="showAuth2FAHandler" />
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
import Authentication2FA from '../Authentication2FA.vue';
import QRCode from '../QRCode.vue';
import ErrorPopup from '../ErrorPopup.vue';
import RegisterForm from '../RegisterForm.vue';
import LoginForm from '../LoginForm.vue';

export default defineComponent({
  name: 'AuthComponent',
  components: {
    Authentication2FA,
    QRCode,
    ErrorPopup,
    RegisterForm,
    LoginForm,
  },
  setup() {
    const isRegister = ref<boolean>(localStorage.getItem('isRegister') === 'true');
    const qrCode = ref<string>('');
    const guid = ref<string>('');
    const code2FA = ref<string>('');
    const username = ref<string>('');
    const showQRCode = ref<boolean>(false);
    const showAuth2FA = ref<boolean>(false);

    const toggleForm = () => {
      isRegister.value = !isRegister.value;
      localStorage.setItem('isRegister', isRegister.value.toString());
    };

    const showQRCodeHandler = (url: string) => {
      qrCode.value = url;
      showQRCode.value = true;
    };

    const showAuth2FAHandler = ({ response, username: usernameParam }: { response: string; username: string }) => {
      guid.value = response;
      username.value = usernameParam; // Corrected this line
      showAuth2FA.value = true;
    };

    const goBack = () => {
      guid.value = '';
      showQRCode.value = false;
      showAuth2FA.value = false;
    };

    return {
      isRegister,
      qrCode,
      guid,
      code2FA,
      username,
      showQRCode,
      showAuth2FA,
      toggleForm,
      showQRCodeHandler,
      showAuth2FAHandler,
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
  

<style >
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
