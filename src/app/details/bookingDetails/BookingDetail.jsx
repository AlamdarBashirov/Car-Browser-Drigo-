import React, { useEffect } from 'react'
import styles from './BookingDetail.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBookingByIdThunk } from '../../../redux/reducers/bookingSlice'
import { getCarByIdThunk } from '../../../redux/reducers/carsSlice'

const BookingDetail = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { selectedCar } = useSelector((state) => state.cars)
    const { selectedBooking } = useSelector((state) => state.bookings)

    useEffect(() => {
        dispatch(getBookingByIdThunk(id))
    }, [id])
    useEffect(() => {
        if (selectedBooking) {
            dispatch(getCarByIdThunk(selectedBooking.carId))
        }
    }, [selectedBooking])

    console.log(selectedBooking);
    console.log(selectedCar);


    return (
        <>
            <div>
                <h3>Booking №: {selectedBooking?.id}</h3>
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
            <button>
                Cancel Booking
            </button>
        </>
    )
}

export default BookingDetail