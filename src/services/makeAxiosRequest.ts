import apiClient from './axios';
import { isAxiosError } from 'axios'; // Импортируем как значение
import type { AxiosRequestConfig } from 'axios'; // Импортируем как тип
import { message } from 'antd'; // или любая другая библиотека для уведомлений

interface IApiResponse<T = any> {
  data: T;
  error?: {
    errorMessage: string;
  };
}

export const makeAxiosRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient<T>(config);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) { // Теперь isAxiosError используется как значение
      if (error.name === 'Network Error') {
        message.error('Проверьте ваше подключение к интернету');
      } else if (error.name !== 'CanceledError') {
        const errorData = error.response?.data as IApiResponse;
        if (errorData && errorData.error && errorData.error.errorMessage) {
          message.error(errorData.error.errorMessage);
        } else {
          message.error('Произошла непредвиденная ошибка');
        }
      }
    }

    throw error;
  }
};