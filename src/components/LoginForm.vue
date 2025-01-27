<template>
  <div>
    <h4>Login Form</h4>
    <input v-model="username" placeholder="Name" />
    <input v-model="password" type="password" placeholder="Password" />
    <div class="button-container">
      <button @click="login">Sign In</button>
    </div>
    <p>Don't you have an account yet? <a class="verification-link" href="#" @click="toggleForm">Sign up</a></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import api from '../services/api';

export default defineComponent({
  name: 'LoginForm',
  setup(props, { emit }) {
    const username = ref<string>('');
    const password = ref<string>('');

    const login = async () => {
      try {
        const response = await api.login({
          username: username.value,
          password: password.value,
        });
        emit('showAuth2FA', { response, username: username.value });
      } catch (error) {
        console.error('Ошибка входа:', error);
        throw new Error('Login failed. Please try again.');
      }
    };

    const toggleForm = () => {
      emit('toggleForm');
    };

    return {
      username,
      password,
      login,
      toggleForm,
    };
  },
});
</script>
  

  