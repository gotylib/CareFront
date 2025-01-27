<template>
    <div v-if="errorMessage" class="error-popup">
      <div class="error-content">
        <p>{{ errorMessage }}</p>
        <button @click="closeErrorPopup">×</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  
  export default defineComponent({
    name: 'ErrorPopup',
    setup() {
      const errorMessage = ref<string>('');
  
      const showError = (message: string) => {
        errorMessage.value = message;
        setTimeout(() => {
          errorMessage.value = '';
        }, 5000);
      };
  
      const closeErrorPopup = () => {
        errorMessage.value = '';
      };
  
      const originalConsoleError = console.error;
      console.error = (message: string) => {
        showError(message);
        originalConsoleError(message);
      };
  
      onMounted(() => {
        window.addEventListener('error', (event) => {
          showError(event.message);
          event.preventDefault();
        });
      });
  
      onUnmounted(() => {
        window.removeEventListener('error', (event) => {
          showError(event.message);
          event.preventDefault();
        });
        console.error = originalConsoleError;
      });
  
      return {
        errorMessage,
        closeErrorPopup,
      };
    },
  });
  </script>
  
  <style scoped>
  .error-popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .error-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .error-content button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  