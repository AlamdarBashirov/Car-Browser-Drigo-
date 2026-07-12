import styles from './HomeCarCard.module.scss'
import React from 'react'
import { Link } from "react-router-dom";
import { useFavoritesContext } from "../../../context/FavoritesContext";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const HomeCarCard = ({ car }) => {

    const {
        toggleFavorite,
        isFavorite,
    } = useFavoritesContext();

    return (

        <Link to={`/cars/${car.id}`} className={styles.car_card}>
            <div className={styles.car_card_container}>
                <button
                    className={styles.favorite_btn}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        toggleFavorite(car.id);
                    }}
                >
                    {isFavorite(car.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
                <div className={styles.general_car_details}>
                    <h4>Car Details</h4>
                    <div className={styles.details_box}>
                        <p className={styles.detail_item}>Car: <span>{car.name}</span></p>
                        <p className={styles.detail_item}>Car type: <span>{car.type}</span></p>
                        <p className={styles.detail_item}>Transmission: <span>{car.transmission}</span></p>
                        <p className={styles.detail_item}>Seats: <span>{car.seats}</span></p>
                        <p className={styles.detail_item}>Price Per Day: <span>$ {car.pricePerDay}</span></p>
                    </div>
                </div>
                <div
                    className={`${styles.aviability} ${car.available ? styles.available : styles.unavailable}`}
                >
                    <span>{car.available ? "Available" : "Unavailable"}</span>
                </div>
            </div>
            <div className={styles.car_card_effect}>
            </div>
        </Link>
    )
}

export default HomeCarCard