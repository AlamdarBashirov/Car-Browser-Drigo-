import styles from './HomeCarCard.module.scss'
import React from 'react'

const HomeCarCard = ({ car }) => {

    return (
        <div className={styles.car_card}>
            <div className={styles.car_card_container}>
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
        </div>
    )
}

export default HomeCarCard