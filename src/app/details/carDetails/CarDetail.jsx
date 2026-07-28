import { useParams, Link, useNavigate } from "react-router-dom";
import styles from './CarDetail.module.scss'
import cars from "../../../data/cars.json";
import useCars from "../../../hooks/useCars";
import { useFavoritesContext } from "../../../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCarByIdThunk } from "../../../redux/reducers/carsSlice";
import { showToast } from "../../../redux/reducers/toastSlice";

const CarDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { selectedCar, loading, error } = useSelector((state) => state.cars)

    const retry = () => {
        dispatch(getCarByIdThunk(id))
    }

    const {
        toggleFavorite,
        isFavorite,
    } = useFavoritesContext();

    useEffect(() => {
        dispatch(getCarByIdThunk(id))
    }, [id])




    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        dispatch(showToast({
            message: error,
            type: "error"
        }))
        return (
            <>
                <h2>{error}</h2>

                <button onClick={retry}>
                    Retry
                </button>
            </>
        );
    }
    if (!selectedCar) {
        return (
            <>
                <h1>Car not found.</h1>
                <Link to="/">Go Home</Link>
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
                        onClick={() => toggleFavorite(selectedCar.id)}
                    >
                        {
                            isFavorite(selectedCar.id)
                                ? <FaHeart />
                                : <FaRegHeart />
                        }
                    </button>

                </div>

                <h1>{selectedCar.name}</h1>

                <div className={styles.details}>

                    <div>
                        <span>Type</span>
                        <p>{selectedCar.type}</p>
                    </div>

                    <div>
                        <span>Transmission</span>
                        <p>{selectedCar.transmission}</p>
                    </div>

                    <div>
                        <span>Seats</span>
                        <p>{selectedCar.seats}</p>
                    </div>

                    <div>
                        <span>Price / Day</span>
                        <p>${selectedCar.pricePerDay}</p>
                    </div>

                    <div>
                        <span>Status</span>

                        <p
                            className={
                                selectedCar.available
                                    ? styles.available
                                    : styles.unavailable
                            }
                        >
                            {
                                selectedCar.available
                                    ? "Available"
                                    : "Unavailable"
                            }
                        </p>

                    </div>

                    <div>
                        <span>Book this car</span>
                        <button
                            className={styles.bookNowBtn}
                            onClick={() => navigate(`/booking/${selectedCar.id}`)}
                            disabled={!selectedCar?.available}
                        > Book Now</button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default CarDetail;