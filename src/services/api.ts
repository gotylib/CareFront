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

interface CarWithoutPhoto {
  id: number;
  make: string;
  model: string;
  color: string;
  addTime: string;
  addUserName: string;
  nameOfPhoto: string;
  stockCount: number;
  isAvailable: boolean;
}

interface GetCarWithoutPhotoResponse {
  cars: CarWithoutPhoto[];
}

interface GetCarsResponse {
  cars: Car[];
}

interface CarsSelectors {
  make: string[];
  model: string[];
  color: string[];
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
const getBasketCarCount = async (): Promise<number> => {
  const response = await makeAxiosRequest<number>({
    method: 'get',
    url: 'api/Cars/GetBasketCount',
  });
  return response;
};

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

const getCars = async (filters: { make?: string; model?: string; color?: string }): Promise<GetCarsResponse> => { 
  const filterConditions = []; 
 
  if (filters.make) filterConditions.push(`make eq '${filters.make}'`); 
  if (filters.model) filterConditions.push(`model eq '${filters.model}'`); 
  if (filters.color) filterConditions.push(`color eq '${filters.color}'`); 
 
  const queryParams = new URLSearchParams(); 
  if (filterConditions.length > 0) { 
    queryParams.append('$filter', filterConditions.join(' and ')); 
  } 
  
  const carsResponse = await makeAxiosRequest<Car[]>({ 
    method: 'get', 
    url: `api/Cars/GetForAll?${queryParams.toString()}`, 
  }); 
 
  const photoRequests = carsResponse.map(car => getCarPhoto(car.nameOfPhoto)); 
  const photos = await Promise.all(photoRequests); 
 
  const carsWithPhotos = carsResponse.map((car, index) => ({ 
    ...car, 
    photo: photos[index], 
  })); 
 
  return { cars: carsWithPhotos }; 
};



const getCarsWithoutPhoto = async (): Promise<CarWithoutPhoto[]> => {
  const carsResponse = await makeAxiosRequest<CarWithoutPhoto[]>({
    method: 'get',
    url: 'api/Cars/Get',
  });
  return carsResponse;
};

const getCarsSelectors = async (): Promise<CarsSelectors> => {
  const cars = await getCarsWithoutPhoto();

  const makes = [...new Set(cars.map(car => car.make))];
  const models = [...new Set(cars.map(car => car.model))];
  const colors = [...new Set(cars.map(car => car.color))];

  return {
    make: makes,
    model: models,
    color: colors,
  };
};

export { login, register, auth2FA, getBasketCarCount, getCars, getCarsSelectors };
