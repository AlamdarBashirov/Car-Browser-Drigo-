import React, { useEffect } from 'react'
import styles from './BookingDetail.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { cancelBookingOptimistic, cancelBookingThunk, getBookingByIdThunk, rollbackCancelledBooking } from '../../../redux/reducers/bookingSlice'
import { getCarByIdThunk } from '../../../redux/reducers/carsSlice'
import { showToast } from '../../../redux/reducers/toastSlice'

const BookingDetail = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { selectedCar } = useSelector((state) => state.cars)
    const { selectedBooking, loading, error } = useSelector((state) => state.bookings)

    useEffect(() => {
        dispatch(getBookingByIdThunk(id))
    }, [id])
    useEffect(() => {
        if (selectedBooking) {
            dispatch(getCarByIdThunk(selectedBooking.carId))
        }
    }, [selectedBooking])

    const cancelBooking = async () => {
        const confirmed = window.confirm("Are you sure you want to cancel this booking?");

        if (!confirmed) return;

        if (selectedBooking) {
            dispatch(cancelBookingOptimistic(selectedBooking.id))
            try {
                await dispatch(cancelBookingThunk(selectedBooking.id)).unwrap()
                dispatch(showToast({
                    message: "Booking cancelled",
                    type: "success"
                }))
            } catch (err) {
                dispatch(rollbackCancelledBooking(selectedBooking.id))
                dispatch(showToast({
                    message: error,
                    type: "error"
                }))
            }
        }
        return selectedBooking
    }


    if (loading) {
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <section className={styles.bookingDetailsSection}>
                <div className={styles.detailsWrapper}>

                    <div className={styles.detailsCard}>
                        <h2 className={styles.cardTitle}>Booking Details</h2>

                        <div className={styles.detailItem}>
                            <span>Booking №</span>
                            <strong>{selectedBooking?.id}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Status</span>
                            <strong>{selectedBooking?.status}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Start Date</span>
                            <strong>{selectedBooking?.startDate}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>End Date</span>
                            <strong>{selectedBooking?.endDate}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Created At</span>
                            <strong>{selectedBooking?.createdAt}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Driver</span>
                            <strong>{selectedBooking?.driver.name}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Email</span>
                            <strong>{selectedBooking?.driver.email}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Rental Days</span>
                            <strong>{selectedBooking?.rentDay}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Service Fee</span>
                            <strong>{selectedBooking?.serviceFee} $</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Total Price</span>
                            <strong>{selectedBooking?.totalPrice} $</strong>
                        </div>
                    </div>

                    <div className={styles.detailsCard}>
                        <h2 className={styles.cardTitle}>Car Details</h2>

                        <div className={styles.detailItem}>
                            <span>Name</span>
                            <strong>{selectedCar?.name}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Seats</span>
                            <strong>{selectedCar?.seats}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Transmission</span>
                            <strong>{selectedCar?.transmission}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Type</span>
                            <strong>{selectedCar?.type}</strong>
                        </div>

                        <div className={styles.detailItem}>
                            <span>Price / Day</span>
                            <strong>{selectedCar?.pricePerDay} $</strong>
                        </div>
                    </div>

                </div>

                <button
                    className={styles.cancelButton}
                    onClick={cancelBooking}
                    disabled={selectedBooking?.status === "cancelled"}
                >
                    Cancel Booking
                </button>

                {error && <p className={styles.errorMessage}>{error}</p>}
            </section>
        </>
    )
}

export default BookingDetail