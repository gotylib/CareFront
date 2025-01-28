import { makeAxiosRequest } from './makeAxiosRequest';

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
}

/**
 * Вход пользователя
 * @param {LoginParams} params - Параметры входа
 * @returns {Promise<string>} - GUID пользователя
 */
const login = async (params: LoginParams): Promise<string> => {
  const response = await makeAxiosRequest<{ guid: string }>({
    method: 'post',
    url: 'api/Users/Login',
    data: {
      name: params.username,
      password: params.password,
    },
  });
  return response.guid;
};

/**
 * Регистрация пользователя
 * @param {RegisterParams} params - Параметры регистрации
 * @returns {Promise<Blob>} - QR-код в формате Blob
 */
const register = async (params: RegisterParams): Promise<Blob> => {
  const response = await makeAxiosRequest<Blob>({
    method: 'post',
    url: 'api/Users/Register',
    data: params,
    responseType: 'blob',
  });
  return response;
};

/**
 * Двухфакторная аутентификация
 * @param {Auth2FAParams} params - Параметры двухфакторной аутентификации
 * @returns {Promise<Auth2FAResponse>} - Ответ с токенами доступа и обновления
 */
const auth2FA = async (params: Auth2FAParams): Promise<Auth2FAResponse> => {
  const response = await makeAxiosRequest<Auth2FAResponse>({
    method: 'get',
    url: 'api/Users/Auth2FA',
    params: {
      code: params.code,
      code2FA: params.guid,
      name: params.username,
    },
  });

  // Сохранение accessToken в localStorage
  localStorage.setItem('accessToken', response.accessToken);

  return response;
};

export { login, register, auth2FA };
