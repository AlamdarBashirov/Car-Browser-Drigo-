import { useParams, Link } from "react-router-dom";
import styles from './CarDetail.module.scss'
import cars from "../../../data/cars.json";
import useCars from "../../../hooks/useCars";
import { useFavoritesContext } from "../../../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CarDetail = () => {
    const { id } = useParams();

    const {
        cars,
        loading,
        error,
        retry,
    } = useCars();

    const {
        toggleFavorite,
        isFavorite,
    } = useFavoritesContext();

    const car = cars.find((item) => item.id === Number(id));

    if (!car) {
        return (
            <>
                <h1>Car not found.</h1>
                <Link to="/">Go Home</Link>
            </>
        );
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return (
            <>
                <h2>{error}</h2>

                <button onClick={retry}>
                    Retry
                </button>
            </>
        );
    }

    return (
        <div className={styles.detail_page}>
    
            <div className={styles.page_container}>
    
                <div className={styles.header}>
    
                    <Link
                        to="/"
                        className={styles.back_btn}
                    >
                        ← Back
                    </Link>
    
                    <button
                        className={styles.favorite_btn}
                        onClick={() => toggleFavorite(car.id)}
                    >
                        {
                            isFavorite(car.id)
                                ? <FaHeart />
                                : <FaRegHeart />
                        }
                    </button>
    
                </div>
    
                <h1>{car.name}</h1>
    
                <div className={styles.details}>
    
                    <div>
                        <span>Type</span>
                        <p>{car.type}</p>
                    </div>
    
                    <div>
                        <span>Transmission</span>
                        <p>{car.transmission}</p>
                    </div>
    
                    <div>
                        <span>Seats</span>
                        <p>{car.seats}</p>
                    </div>
    
                    <div>
                        <span>Price / Day</span>
                        <p>${car.pricePerDay}</p>
                    </div>
    
                    <div>
                        <span>Status</span>
    
                        <p
                            className={
                                car.available
                                    ? styles.available
                                    : styles.unavailable
                            }
                        >
                            {
                                car.available
                                    ? "Available"
                                    : "Unavailable"
                            }
                        </p>
    
                    </div>
    
                </div>
    
            </div>
    
        </div>
    );
};

export default CarDetail;