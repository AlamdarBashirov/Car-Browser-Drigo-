import carsData from "../data/cars.json";
import delay from '../utils/delay';

export const getCars = async (query = {}) => {
  await delay(800)
  return new Promise((resolve, reject) => {
    const shouldFail = Math.random() < 0.2; // 20% error
    if (shouldFail) {
      reject(new Error("Failed to fetch cars"))
      return;
    }
    let cars = [...carsData]

    resolve(cars)
  });
};


