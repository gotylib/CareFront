import apiClient from './axios';
import type { AxiosResponse } from 'axios';

interface RegisterParams {
  username: string;
  email: string;
  password: string;
  secretCode: string;
}

interface LoginParams {
  username: string;
  password: string;
}

interface Auth2FAParams {
  code: string;
  guid: string;
  username: string;
}

interface Auth2FAResponse {
  accessToken: string;
  refreshToken: string;
}

interface ApiService {
  register(params: RegisterParams): Promise<Blob>;
  login(params: LoginParams): Promise<string>;
  auth2FA(params: Auth2FAParams): Promise<Auth2FAResponse>;
}

const api: ApiService = {
  /**
   * Регистрация пользователя
   * @param {RegisterParams} params - Параметры регистрации
   * @returns {Promise<Blob>} - QR-код в формате Blob
   */
  async register(params: RegisterParams): Promise<Blob> {
    const response = await apiClient.post<Blob>('api/Users/Register', params, {
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Вход пользователя
   * @param {LoginParams} params - Параметры входа
   * @returns {Promise<string>} - GUID пользователя
   */
  async login(params: LoginParams): Promise<string> {
    const response = await apiClient.post<{ guid: string }>('api/Users/Login', {
      name: params.username,
      password: params.password,
    });
    return response.data.guid;
  },

  /**
   * Двухфакторная аутентификация
   * @param {Auth2FAParams} params - Параметры двухфакторной аутентификации
   * @returns {Promise<Auth2FAResponse>} - Токены доступа и обновления
   */
  async auth2FA(params: Auth2FAParams): Promise<Auth2FAResponse> {
    try {
      const response = await apiClient.get<Auth2FAResponse>('api/Users/Auth2FA', {
        params: {
          code: params.code,
          code2FA: params.guid,
          name: params.username,
        },
      });

      // Сохранение токенов в localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      return response.data;
    } catch (error) {
      console.error('Ошибка двухфакторной аутентификации:', error);
      throw new Error('Two-factor authentication failed. Please try again.');
    }
  },
};

export default api;