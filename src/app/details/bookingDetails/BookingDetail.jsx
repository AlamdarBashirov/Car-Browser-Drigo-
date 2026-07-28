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
            <div>
                <h3>Booking №: {selectedBooking?.id} {selectedBooking?.status}</h3>
                <h3>Start date: {selectedBooking?.startDate}</h3>
                <h3>End date: {selectedBooking?.endDate}</h3>
                <h3>Created date{selectedBooking?.createdAt}</h3>
                <h3>Driver name: {selectedBooking?.driver.name}</h3>
                <h3>Driver Email: {selectedBooking?.driver.email}</h3>
                <h3>Rental days: {selectedBooking?.rentDay}</h3>
                <h3>Service fee: {selectedBooking?.serviceFee} $</h3>
                <h3>Price  per day: {selectedCar?.pricePerDay} $</h3>
                <h3>totalprice: {selectedBooking?.totalPrice} $</h3>
            </div>
            <div>
                <h1>car details</h1>
                <h3>Name: {selectedCar?.name}</h3>
                <h3>Seats: {selectedCar?.seats}</h3>
                <h3>Transmission: {selectedCar?.transmission}</h3>
                <h3>Type: {selectedCar?.type}</h3>
            </div>
            <button
                onClick={cancelBooking}
                disabled={selectedBooking?.status === "cancelled"}
            >
                Cancel Booking
            </button>
            {error && <span>{error}</span>}
        </>
    )
}

export default BookingDetail