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

export const getBookingById = async (bookingId) => {
    await delay(800)
    const booking = bookings.find(item => item.id == bookingId)
    return booking
}

export const createBooking = async (bookingData) => {
    await delay(800)
    bookings = loadData("bookings", [...bookingsData]);
    
    const allBookingsOfCar = bookings.filter(booking => booking.carId === bookingData.carId && booking.status !== "cancelled")
    console.log("allbookings of car", allBookingsOfCar);
    
    const hasConflict = allBookingsOfCar.some(booking =>
        hasOverlap(bookingData.startDate, bookingData.endDate, booking.startDate, booking.endDate)
    )
    
    if (hasConflict){
        throw new Error ("The selected dates are unavailable.")
    }
    
    const newBooking = {
        id: `b${bookings.length + 1}`,
        ...bookingData
    }
    bookings.push(newBooking)
    saveData("bookings", bookings)

    return newBooking
}

export const cancelBooking = async (id) => {

        await delay(500)

        if (Math.random() < 0.99) {
            throw new Error("Failed to cancel booking");
        }

        bookings = loadData("bookings", [...bookingsData]);

        const booking = bookings.find(booking => booking.id == id)

        if (!booking) {
            throw new Error("Booking not found");
        }
    
        if (booking.status === "cancelled") {
            throw new Error("Booking is already cancelled");
        }

        booking.status = "cancelled"

        saveData("bookings", bookings)

        return booking
    }

export default {getBookings, cancelBooking, createBooking, getBookingById}