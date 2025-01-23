<template>
    <div class="auth2fa-container">
      <div class="google-auth-header">
        <button class="back-button" @click="goBack">
          <span class="material-icons">arrow_back</span>
        </button>
        <h3 class="auth-title">Код подтверждения Google</h3>
      </div>
      <div class="input-container">
        <input
          v-for="(input, index) in inputs"
          :key="index"
          type="text"
          maxlength="1"
          @input="handleInput(index, $event)"
          @keydown="handleKeydown(index, $event)"
          :ref="`input${index}`"
        />
      </div>
      <a href="#" class="verification-link">Возникли проблемы с верификацией?</a>
    </div>
  </template>
  
  
  <script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import axios from 'axios';
import type { PropType } from 'vue';

export default defineComponent({
  name: "Auth2FA",
  props: {
    code2FA: {
      type: String as PropType<string>,
      required: true
    },
    guid: {
      type: String as PropType<string>,
      required: true
    },
    username: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, { emit }) {
    const inputs = ref(Array(6).fill(''));
    const accessToken = ref<string>('');
    const refreshToken = ref<string>('');
    const localCode2FA = ref<string>('');

    const auth2FA = async () => {
      try {
        const response = await axios.get<{ accessToken: string; refreshToken: string }>(
          `https://localhost:30001/api/Users/Auth2FA?code=${localCode2FA.value}&code2FA=${props.guid}&name=${props.username}`
        );
        accessToken.value = response.data.accessToken;
        refreshToken.value = response.data.refreshToken;
      } catch (error) {
        console.error('Ошибка двухфакторной аутентификации:', error);
        console.log(localCode2FA.value);
      }
    };

    const handleInput = (index: number, event: Event) => {
      const inputValue = (event.target as HTMLInputElement).value;
      inputs.value[index] = inputValue;
      localCode2FA.value = inputs.value.join('');

      if (inputValue && index < inputs.value.length - 1) {
        const nextInput = (event.target as HTMLInputElement).nextElementSibling as HTMLInputElement | null;
        nextInput?.focus();
      }

      if (localCode2FA.value.length === inputs.value.length) {
        auth2FA();
      }
    };

    const handleKeydown = (index: number, event: KeyboardEvent) => {
      if (event.key === 'Backspace' && index > 0 && !inputs.value[index]) {
        const prevInput = (event.target as HTMLInputElement).previousElementSibling as HTMLInputElement | null;
        prevInput?.focus();
      }
    };

    const goBack = () => {
      emit('goBack');
    };

    return {
      inputs,
      handleInput,
      handleKeydown,
      goBack
    };
  }
});
</script>

  
  <style scoped>
  .auth2fa-container {
    text-align: center;
  }
  .google-auth-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .google-icon {
    font-size: 30px;
    margin-left: 10px;
  }
  .input-container {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
  .input-container input {
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 5px;
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
  .verification-link:focus {
    outline: none; /* Убираем рамку при фокусе */
    border: none; /* Убираем рамку при фокусе */
    box-shadow: none; /* Убираем тень при фокусе */
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
  .auth-title {
  margin: 0; /* Убираем стандартные отступы */
  padding: 0; /* Убираем стандартные внутренние отступы */
  line-height: 1; /* Уменьшаем межстрочный интервал */
  margin-top: 1px;
}
  </style>
  