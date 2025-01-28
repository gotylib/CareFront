import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Создаем кастомный экземпляр Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Включаем отправку куков
});

// Interceptor для запросов
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor для ответов
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Запрос на обновление токена
        const response = await apiClient.put<{
          token: string;
          expiration: string;
        }>(
          "/api/Users/RefreshToken",
          {},
          {
            headers: {
              accept: "*/*",
              "Content-Type":
                "application/json;odata.metadata=minimal;odata.streaming=true",
            },
            withCredentials: true,
          }
        );

        const { token } = response.data;

        // Сохраняем новый токен
        localStorage.setItem("accessToken", token);

        // Повторяем оригинальный запрос с новым токеном
        return apiClient.request(originalRequest);
      } catch (refreshError) {
        // Если не удалось обновить токен, перенаправляем на страницу логина
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
