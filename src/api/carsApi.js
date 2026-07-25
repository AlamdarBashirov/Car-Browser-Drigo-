import carsData from "../data/cars.json";
import delay from '../utils/delay';

let cars = [...carsData]

export const getCars = async (query = {}) => {
  await delay(800)
  const shouldFail = Math.random() < 0.2;

  if (shouldFail) {
    throw new Error("Failed to fetch cars");
  }

  return cars;
};


export const getCar = async (id) => {
  await delay(800)
  const car = cars.find(car => car.id == Number(id))

  if (!car) {
    throw new Error ("Car not found")
  }

  return car;
}