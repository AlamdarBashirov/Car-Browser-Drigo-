import React, { useEffect, useState } from "react";
import styles from "./BookingPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarByIdThunk } from "../../redux/reducers/carsSlice";
import { createBookingThunk } from "../../redux/reducers/bookingSlice";
import { getCurrentUserThunk } from "../../redux/reducers/AuthSlice";

const BookingPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedCar } = useSelector((state) => state.cars);
    const { currentUser } = useSelector((state) => state.auth);

    const [validationError, setValidationError] = useState("");
    const [success, setSuccess] = useState("");

    const [bookingData, setBookingData] = useState({
        startDate: "",
        endDate: "",
        driver: {
            name: "",
            email: "",
        },
        carId: id,
    });

    const [step, setStep] = useState(1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formattedToday = new Date().toISOString().split("T")[0];

    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);

    const minRentDay = 2;
    const rentDay = (end - start) / (1000 * 60 * 60 * 24);

    const serviceFee = 20;

    const totalPrice = selectedCar
        ? rentDay * selectedCar.pricePerDay + serviceFee
        : 0;

    const handleContinue = () => {
        setValidationError("");

        if (start < today) {
            setValidationError("The date before today cannot be selected");
            return;
        }

        if (start >= end) {
            setValidationError(
                `The end date must be at least ${minRentDay} day after the start date`
            );
            return;
        }

        if (rentDay < minRentDay) {
            setValidationError(
                `You must rent for a minimum of ${minRentDay} days.`
            );
            return;
        }

        setStep(2);
    };

    const handleDriverContinue = () => {
        setValidationError("");

        if (!bookingData.driver.name) {
            setValidationError("The name cannot be empty.");
            return;
        }

        if (!bookingData.driver.email) {
            setValidationError("The email cannot be empty.");
            return;
        }

        if (
            !bookingData.driver.email.includes("@") ||
            !bookingData.driver.email.includes(".")
        ) {
            setValidationError("The email is not in the correct format.");
            return;
        }

        setStep(3);
    };

    const confirmBooking = async () => {
        try {
            await dispatch(
                createBookingThunk({
                    ...bookingData,
                    userId: currentUser?.id,
                    totalPrice,
                    status: "active",
                    createdAt: formattedToday,
                    serviceFee,
                    rentDay,
                })
            ).unwrap();

            setSuccess("Booking created successfully");

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            setValidationError(err.message);
        }
    };

    useEffect(() => {
        dispatch(getCarByIdThunk(id));
        dispatch(getCurrentUserThunk());
    }, [dispatch, id]);

    return (
        <div className={styles.bookingPage}>
            {step === 1 && (
                <div>
                    <div>
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            min={formattedToday}
                            value={bookingData.startDate}
                            onChange={(e) =>
                                setBookingData({
                                    ...bookingData,
                                    startDate: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="endDate">End Date</label>
                        <input
                            id="endDate"
                            type="date"
                            value={bookingData.endDate}
                            onChange={(e) =>
                                setBookingData({
                                    ...bookingData,
                                    endDate: e.target.value,
                                })
                            }
                        />
                    </div>

                    <button
                        disabled={
                            !bookingData.startDate || !bookingData.endDate
                        }
                        onClick={handleContinue}
                    >
                        Continue
                    </button>

                    {validationError && <span>{validationError}</span>}
                </div>
            )}

            {step === 2 && (
                <div>
                    <div>
                        <label htmlFor="driverName">Driver Name</label>
                        <input
                            id="driverName"
                            type="text"
                            value={bookingData.driver.name}
                            onChange={(e) =>
                                setBookingData({
                                    ...bookingData,
                                    driver: {
                                        ...bookingData.driver,
                                        name: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="driverEmail">Driver Email</label>
                        <input
                            id="driverEmail"
                            type="email"
                            value={bookingData.driver.email}
                            onChange={(e) =>
                                setBookingData({
                                    ...bookingData,
                                    driver: {
                                        ...bookingData.driver,
                                        email: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>

                    <button
                        disabled={
                            !bookingData.driver.name ||
                            !bookingData.driver.email
                        }
                        onClick={handleDriverContinue}
                    >
                        Continue
                    </button>

                    {validationError && <span>{validationError}</span>}
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Booking Details</h2>

                    <div>
                        <p>Car name: {selectedCar?.name}</p>
                        <p>Transmission: {selectedCar?.transmission}</p>
                        <p>Type: {selectedCar?.type}</p>
                        <p>Seats: {selectedCar?.seats}</p>
                        <p>Price per day: ${selectedCar?.pricePerDay}</p>

                        <p>Driver name: {bookingData.driver.name}</p>
                        <p>Driver email: {bookingData.driver.email}</p>

                        <p>Start date: {bookingData.startDate}</p>
                        <p>End date: {bookingData.endDate}</p>

                        <p>Rental days: {rentDay}</p>
                        <p>Service fee: ${serviceFee}</p>
                        <p>Total price: ${totalPrice}</p>
                    </div>

                    <button onClick={confirmBooking}>
                        Confirm Booking
                    </button>

                    {success && <span>{success}</span>}
                    {validationError && <span>{validationError}</span>}
                </div>
            )}
        </div>
    );
};

export default BookingPage;