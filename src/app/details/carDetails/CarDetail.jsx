import { useParams, Link } from "react-router-dom";
import cars from "../../../data/cars.json";

const CarDetail = () => {
  const { id } = useParams();

  const car = cars.find((item) => item.id === Number(id));

  if (!car) {
    return (
      <>
        <h1>Car not found.</h1>
        <Link to="/">Go Home</Link>
      </>
    );
  }

  return (
    <>
      <Link to="/">← Back</Link>

      <h1>{car.name}</h1>

      <p>Type: {car.type}</p>
      <p>Transmission: {car.transmission}</p>
      <p>Seats: {car.seats}</p>
      <p>Price: ${car.pricePerDay}</p>
      <p>
        Status: {car.available ? "Available" : "Unavailable"}
      </p>
    </>
  );
};

export default CarDetail;