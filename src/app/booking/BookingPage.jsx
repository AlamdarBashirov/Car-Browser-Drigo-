import React, { useState } from 'react'
import styles from './BookingPage.module.scss'

const BookingPage = () => {

    const [error, setError] = useState("")
    const [bookingData, setBookingData] = useState({
        startDate: "",
        endDate: ""
    })

    const [step, setStep] = useState(1)

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formatedToday = new Date().toISOString().split('T')[0];
    const start = new Date(bookingData.startDate)
    const end = new Date(bookingData.endDate)

    const minRentDay = 2
    const rentDay = (end - start) /  (1000 * 60 * 60 * 24)

    const handleContinue = () => {
        setError("")
        if (start < today) {
            setError("The date before today cannot be selected")
            return;
        }
        if (start >= end) {
            setError("the end date must be at least 1 day after the start date")
            return;
        }
        if (rentDay < minRentDay) {
            setError(`You must rent for a minimum of ${minRentDay} days.`)
            return;
        }
        setStep(step + 1)
    }

    return (
        <div>
            <div>
                <div>
                    <div>
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id='startDate'
                            value={bookingData.startDate}
                            min={formatedToday}
                            onChange={(e) => setBookingData({
                                ...bookingData,
                                startDate: e.target.value
                            })}
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id='endDate'
                            value={bookingData.endDate}
                            onChange={(e) => setBookingData({
                                ...bookingData,
                                endDate: e.target.value
                            })}
                        />
                    </div>

                    <button
                        disabled={!bookingData.startDate || !bookingData.endDate}
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingPage