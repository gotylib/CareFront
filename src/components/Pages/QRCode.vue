<template>
    <div class="qr-container">
      <div class="header">
        <button class="back-button" @click="goBack">
          <span class="material-icons">arrow_back</span>
        </button>
        <h3 class="auth-title">Отсканируйте QR код</h3>
      </div>
      <img class="qr-code-image" :src="qrCode" alt="QR Code" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  
  export default defineComponent({
    name: "QRCode",
    props: {
      qrCode: {
        type: String as PropType<string>,
        required: true
      }
    },
    setup(props, { emit }) {
      const goBack = () => {
        emit('goBack');
      };
  
      return {
        goBack
      };
    }
  });
  </script>
  
  <style scoped>
  .qr-container {
    text-align: center;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .back-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    margin-left: -25px;
    margin-top: 10px;
  }
  .back-button:hover {
    color: blue;
  }
  .qr-code-image {
    width: 150px; /* Задайте желаемую ширину */
    height: 150px; /* Задайте желаемую высоту */
  }
  </style>