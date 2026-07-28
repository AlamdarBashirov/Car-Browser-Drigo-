import carsData from "../data/cars.json";
import delay from '../utils/delay';
import { loadData } from "../utils/storage";

let cars = [...carsData]

export const getCars = async (query = {}) => {
  await delay(800)
  query = {
    search: "",
    transmission: "All",
    types: [],
    favoritesOnly: false,
    availableOnly: false,
    sort: "default",
    priceMin: "",
    priceMax: "",
    page: 1,
    limit: cars.length,
    ...query,
  };
  const shouldFail = Math.random() < 0.2;

  if (shouldFail) {
    throw new Error("Failed to fetch cars");
  }

  let filteredCars = [...cars]

  const favorites = loadData("favoriteCars") || []

  if (query.search !== "") {
    filteredCars = filteredCars.filter(car => car.name.toLowerCase().includes(query.search.toLowerCase()))
  }
  if (query.transmission !== "All") {
    filteredCars = filteredCars.filter(car => car.transmission === query.transmission)
  }
  if (query.types?.length !== 0) {
    filteredCars = filteredCars.filter(car => query.types.includes(car.type))
  }
  if (query.favoritesOnly !== false) {
    filteredCars = filteredCars.filter(car => favorites.includes(car.id))
  }
  if (query.availableOnly !== false) {
    filteredCars = filteredCars.filter(car => car.available === true)
  }
  if (query.sort !== "default") {
    filteredCars = filteredCars.sort((a, b) => query.sort === "high-low" ? b.pricePerDay - a.pricePerDay : a.pricePerDay - b.pricePerDay)
  }
  if (query.priceMin !== "") {
    filteredCars = filteredCars.filter(car => car.pricePerDay >= query.priceMin)
  }
  if (query.priceMax !== "") {
    filteredCars = filteredCars.filter(car => car.pricePerDay <= query.priceMax)
  }

  const totalCount = filteredCars.length
  const page = query.page ?? 1;
  const limit = query.limit ?? filteredCars.length;

  const startIndex = (page - 1) * limit;

  const paginatedCars = filteredCars.slice(
    startIndex,
    startIndex + limit
  );

  return {
    cars: paginatedCars,
    totalCount
  };
};


export const getCar = async (id) => {
  await delay(800)
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch car");
  }
  const car = cars.find(car => car.id == id)

  if (!car) {
    throw new Error("Car not found")
  }

  return car;
}

export default { getCars, getCar }