import React, { useEffect } from 'react'
import styles from './MyBookings.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingsOfUserThunk } from '../../redux/reducers/bookingSlice'
import { getCarByIdThunk, getCarsThunk } from '../../redux/reducers/carsSlice'
import { useNavigate} from 'react-router-dom'

const MyBookings = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {currentUser, loading, error} = useSelector((state) => state.auth)
    const {bookings, bookingLoading, bookingError} = useSelector((state) => state.bookings)
    const {cars, totalCount} = useSelector((state) => state.cars)

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getBookingsOfUserThunk(currentUser.id));
        }
    }, [currentUser]);

    useEffect(() => {
        console.log("getCarsThunk dispatch");
        dispatch(getCarsThunk({page: 1,
            limit: 9999}));
    }, []);

    console.log(cars);
    console.log(totalCount);
    
  return (
    <div>
        <span>{currentUser?.name}</span>
        {
            bookings && bookings.map(item => {
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
  )
}

export default MyBookings