import cars from "../data/cars.json";

export const getCars = () => {
  return new Promise((resolve, reject) => {
    const delay = 800 + Math.random() * 400;

    setTimeout(() => {
      const shouldFail = Math.random() < 0.2; // 20% error

      if (shouldFail) {
        reject(new Error("Failed to fetch cars."));
      } else {
        resolve(cars);
      }
    }, delay);
  });
};