import bookingsData from '../data/bookings.json'
import delay from '../utils/delay'
import { hasOverlap } from '../utils/overlap'
import { loadData, saveData } from '../utils/storage'

//get bookings 
// create bookings 
// cancel bookings


// for create bookings
// does not ready: random failure,
//  validation, past date, 
// end date > start date
// minimum rental length
// driver info (userSummary)
//cache invalidate
//optimistic update


let bookings = loadData("bookings", [...bookingsData])

export const getBookings = async (userId) => {
    await delay(800)
    const allBookings = loadData("bookings")
    const bookingsOfUser = allBookings.filter(booking => booking.userId == userId)
    console.log(allBookings);
    return bookingsOfUser

}

export const createBooking = async (userId, carId, startDate, endDate, driver) => {
    await delay(800)
    bookings = loadData("bookings", [...bookingsData]);
    const newBooking = {
        id: `b${bookings.length + 1}`,
        userId: userId,
        carId: carId,
        startDate: startDate,
        endDate: endDate,
        driver: driver
    }

    const allBookingsOfCar = bookings.filter(booking => booking.carId === carId)
    console.log("allbookings of car", allBookingsOfCar);


    const hasConflict = allBookingsOfCar.some(booking =>
        hasOverlap(startDate, endDate, booking.startDate, booking.endDate)
    )


    if (hasConflict){
        throw new Error ("The selected dates are unavailable.")
    }

    bookings.push(newBooking)
    saveData("bookings", bookings)

    return newBooking
}

export const cancelBooking = async (id) => {

    await delay(800)
    bookings = loadData("bookings", [...bookingsData]);

    const booking = bookings.find(booking => booking.id === id)
    const currentBookingIndex = bookings.findIndex(booking => booking.id === id)
    if (!booking){
        throw new Error("booking not found")
    }
    if (currentBookingIndex !==-1){
        bookings.splice(currentBookingIndex, 1)
    }


    saveData("bookings", bookings)

    return booking
}