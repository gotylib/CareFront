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

interface Car {
  id: number;
  make: string;
  model: string;
  color: string;
  addTime: string;
  addUserName: string;
  nameOfPhoto: string;
  stockCount: number;
  isAvailable: boolean;
  photo?: Blob; // Добавляем поле для фотографии
}

interface GetCarsResponse {
  cars: Car[];
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
const auth2FA = async (params: Auth2FAParams): Promise<string> => {
  const response = await makeAxiosRequest<string>({
    method: 'get',
    url: 'api/Users/Auth2FA',
    params: {
      code: params.code,
      code2FA: params.guid,
      name: params.username,
    },
  });

  // Сохранение accessToken в localStorage
  localStorage.setItem('accessToken', response);

  return response;
};

/**
 * 
 * @returns {Promise<number>} - Ответ с количеством машин в корзине
 */
const getBasketCarCount = async () : Promise<number> => {
  const response = await makeAxiosRequest<number>({
    method: 'get',
    url: 'api/Cars/GetBasketCount',
    
  });
  return response;
}

/**
 * Получение фотографии машины
 * @param {string} photoName - Имя фотографии
 * @returns {Promise<Blob>} - Фотография в формате Blob
 */
const getCarPhoto = async (photoName: string): Promise<Blob> => {
  const response = await makeAxiosRequest<Blob>({
    method: 'post',
    url: `api/Cars/GetCarPhoto?name=${photoName}`,
    responseType: 'blob',
  });
  return response;
};

/**
 * Получение списка машин с фотографиями
 * @returns {Promise<GetCarsResponse>} - Ответ с массивом машин и фотографиями
 */
const getCars = async (): Promise<GetCarsResponse> => {
  const carsResponse = await makeAxiosRequest<Car[]>({
    method: 'get',
    url: 'api/Cars/Get',
  });

  const photoRequests = carsResponse.map(car => getCarPhoto(car.nameOfPhoto));
  const photos = await Promise.all(photoRequests);

  const carsWithPhotos = carsResponse.map((car, index) => ({
    ...car,
    photo: photos[index],
  }));

  return { cars: carsWithPhotos };
};


export { login, register, auth2FA , getBasketCarCount, getCars};
