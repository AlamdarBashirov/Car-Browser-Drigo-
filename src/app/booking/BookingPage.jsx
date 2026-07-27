import React, { useEffect, useState } from 'react'
import styles from './BookingPage.module.scss'
import { useParams } from 'react-router-dom'

const BookingPage = () => {

    const {id} = useParams()

    const [validationError, setValidationError] = useState("")
    const [bookingData, setBookingData] = useState({
        startDate: "",
        endDate: "",
        name: "",
        email: ""
    })

    const [step, setStep] = useState(1)

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formatedToday = new Date().toISOString().split('T')[0];
    const start = new Date(bookingData.startDate)
    const end = new Date(bookingData.endDate)

    const minRentDay = 2
    const rentDay = (end - start) / (1000 * 60 * 60 * 24)

    const handleContinue = () => {
        setValidationError("")
        //for step one
        if (start < today) {
            setValidationError("The date before today cannot be selected")
            return;
        }
        if (start >= end) {
            setValidationError(`the end date must be at least ${minRentDay} day after the start date`)
            return;
        }
        if (rentDay < minRentDay) {
            setValidationError(`You must rent for a minimum of ${minRentDay} days.`)
            return;
        }
        setStep(step + 1)
    }

    const handleDriverContinue = () => {
        setValidationError("")
        //for step two
        if(!bookingData.name){
            setValidationError("The name cannot be empty.")
            return;
        }
        if(!bookingData.email){
            setValidationError("The email cannot be empty.")
            return;
        }
        if(!bookingData.email.includes("@") || !bookingData.email.includes(".")){
            setValidationError("The email is not in the correct format.")
            return;
        }

        setStep(step + 1)
    }

    return (
        <div>
            <div>
                {
                    step === 1 && (
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
                            {validationError && <span>{validationError}</span>}
                        </div>
                    )
                }
                {
                    step === 2 && (
                        <div>
                            <div>
                                <label htmlFor="driverName">Driver Name</label>
                                <input
                                    type="text"
                                    id='driverName'
                                    value={bookingData.name}
                                    onChange={(e) => setBookingData({
                                        ...bookingData,
                                        name: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <label htmlFor="driverEmail">Driver Email</label>
                                <input
                                    type="email"
                                    id='driverEmail'
                                    value={bookingData.email}
                                    onChange={(e) => setBookingData({
                                        ...bookingData,
                                        email: e.target.value
                                    })}
                                />
                            </div>

                            <button
                                disabled={!bookingData.name || !bookingData.email}
                                onClick={handleDriverContinue}
                            >
                                Continue
                            </button>

                            {validationError && <span>{validationError}</span>}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BookingPage