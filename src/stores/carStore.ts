import { defineStore } from 'pinia';
import { getCars, getCarsSelectors } from '@/services/api';

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

interface CarsState {
  cars: Car[];
  makes: string[];
  models: string[];
  colors: string[];
  selectedMake: string;
  selectedModel: string;
  selectedColor: string;
}

export const useCarStore = defineStore('car', {
  state: (): CarsState => ({
    cars: [],
    makes: [],
    models: [],
    colors: [],
    selectedMake: '',
    selectedModel: '',
    selectedColor: '',
  }),
  actions: {
    async fetchCars() {
      try {
        const response = await getCars({
          make: this.selectedMake,
          model: this.selectedModel,
          color: this.selectedColor,
        });
        this.cars = response.cars;
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },
    async fetchSelectors() {
      try {
        const selectors = await getCarsSelectors();
        this.makes = selectors.make;
        this.models = selectors.model;
        this.colors = selectors.color;
      } catch (error) {
        console.error('Error fetching car selectors:', error);
      }
    },
    applyFilters() {
      this.fetchCars();
    },
    resetFilters() {
      this.selectedMake = '';
      this.selectedModel = '';
      this.selectedColor = '';
      this.fetchCars();
    },
  },
});
