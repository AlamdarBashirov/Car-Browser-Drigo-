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
    const { bookings,bookingError } = useSelector((state) => state.bookings)
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
        <div>
            <h1>Loading ...</h1>
        </div>
    }
    return (
        <div>
            <span>{currentUser?.name}</span>
            <div>
                <h1>Upcoming Bookings</h1>
                {
                    upComingBookings && upComingBookings.map(item => {
                        const car = cars?.find(car => car.id == item.carId)
                        console.log(car);

                        return (
                            <div key={item.id} onClick={() => navigate(`/booking-detail/${item.id}`)}>
                                <span>#{item.id}</span>
                                <span>Driver: {item.driver.name}</span>
                                <span>Car: {car?.name}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <h1>Past Bookings</h1>
                {
                    pastBookings && pastBookings.map(item => {
                        const car = cars?.find(car => car.id == item.carId)
                        console.log(car);

                        return (
                            <div key={item.id} onClick={() => navigate(`/booking-detail/${item.id}`)}>
                                <span>#{item.id}</span>
                                <span>Driver: {item.driver.name}</span>
                                <span>Car: {car?.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyBookings