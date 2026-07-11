import { useCallback, useEffect, useState } from "react";
import { getCars } from "../api/carsApi";

const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCars();
      setCars(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return {
    cars,
    loading,
    error,
    retry: fetchCars,
  };
};

export default useCars;