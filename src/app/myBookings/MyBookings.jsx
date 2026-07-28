import React, { useEffect } from 'react'
import styles from './MyBookings.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingsOfUserThunk } from '../../redux/reducers/bookingSlice'
import { getCarByIdThunk, getCarsThunk } from '../../redux/reducers/carsSlice'
import { useNavigate } from 'react-router-dom'

const MyBookings = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { currentUser, loading, error } = useSelector((state) => state.auth)
    const { bookings, bookingError } = useSelector((state) => state.bookings)
    const bookingLoading = useSelector((state) => state.bookings.loading)
    const { cars, totalCount } = useSelector((state) => state.cars)

    const today = new Date().toISOString().split("T")[0]
    const upComingBookings = bookings.filter((item) => item.endDate >= today && item.status !== "cancelled")
    const pastBookings = bookings.filter((item) => item.endDate < today || item.status == "cancelled")

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getBookingsOfUserThunk(currentUser.id));
        }
    }, [currentUser]);

    useEffect(() => {
        dispatch(getCarsThunk({
            page: 1,
            limit: 9999
        }));
    }, [bookings]);


    if (bookingLoading) {
        return (
            <div className={styles.loadingContainer}>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className={styles.myBookingsPage}>

            <h2 className={styles.userName}>
                Welcome, {currentUser?.name}
            </h2>

            <div className={styles.bookingSection}>

                <h2 className={styles.sectionTitle}>
                    Upcoming Bookings
                </h2>

                {upComingBookings.length === 0 && <h4>You don't have upcoming bookings</h4>}

                <div className={styles.bookingList}>
                    {upComingBookings?.map((item) => {
                        const car = cars?.find((car) => car.id == item.carId);

                        return (
                            <div
                                key={item.id}
                                className={styles.bookingCard}
                                onClick={() => navigate(`/booking-detail/${item.id}`)}
                            >
                                <span>
                                    <strong>Booking:</strong> #{item.id}
                                </span>
                                <span>
                                    <strong>Start date:</strong> {item.startDate}
                                </span>
                                <span>
                                    <strong>End date:</strong> {item.endDate}
                                </span>
                                <span>
                                    <strong>Driver:</strong> {item.driver.name}
                                </span>
                                <span>
                                    <strong>Car:</strong> {car?.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>

            <div className={styles.bookingSection}>

                <h2 className={styles.sectionTitle}>
                    Past Bookings
                </h2>

                {pastBookings.length === 0 && <h4>You don't have past bookings</h4>}


                <div className={styles.bookingList}>
                    {pastBookings?.map((item) => {
                        const car = cars?.find((car) => car.id == item.carId);

                        return (
                            <div
                                key={item.id}
                                className={styles.bookingCard}
                                onClick={() => navigate(`/booking-detail/${item.id}`)}
                            >
                                <span>
                                    <strong>Booking:</strong> #{item.id}
                                </span>
                                <span>
                                    <strong>Start date:</strong> {item.startDate}
                                </span>
                                <span>
                                    <strong>End date:</strong> {item.endDate}
                                </span>
                                <span>
                                    <strong>Driver:</strong> {item.driver.name}
                                </span>
                                <span>
                                    <strong>Car:</strong> {car?.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>

        </div>
    )
}

export default MyBookings