import React, { useEffect, useState } from "react";
import styles from "./BookingPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarByIdThunk } from "../../redux/reducers/carsSlice";
import { createBookingThunk } from "../../redux/reducers/bookingSlice";
import { getCurrentUserThunk } from "../../redux/reducers/authSlice";
import { showToast } from "../../redux/reducers/toastSlice";

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

    const totalPrice = selectedCar ? rentDay * selectedCar.pricePerDay + serviceFee : 0;

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
                navigate("/my-bookings");
            }, 2000);
        } catch (err) {
            setValidationError(err.message);
            dispatch(showToast({
                message: validationError,
                type: "error"
            }))
        }
    };

    dispatch(showToast({
        message: success,
        type: "success"
    }))

    useEffect(() => {
        dispatch(getCarByIdThunk(id));
        dispatch(getCurrentUserThunk());
    }, [dispatch, id]);

    return (
        <div className={styles.bookingPage}>
            {step === 1 && (
                <div className={styles.stepCard}>
                    <h2 className={styles.stepTitle}>Choose Rental Dates</h2>

                    <div className={styles.inputGroup}>
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

                    <div className={styles.inputGroup}>
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
                        className={styles.actionButton}
                        disabled={!bookingData.startDate || !bookingData.endDate}
                        onClick={handleContinue}
                    >
                        Continue
                    </button>

                    {validationError && (
                        <span className={styles.errorMessage}>{validationError}</span>
                    )}
                </div>
            )}

            {step === 2 && (
                <div className={styles.stepCard}>
                    <h2 className={styles.stepTitle}>Driver Information</h2>

                    <div className={styles.inputGroup}>
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

                    <div className={styles.inputGroup}>
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
                        className={styles.actionButton}
                        disabled={
                            !bookingData.driver.name ||
                            !bookingData.driver.email
                        }
                        onClick={handleDriverContinue}
                    >
                        Continue
                    </button>

                    {validationError && (
                        <span className={styles.errorMessage}>{validationError}</span>
                    )}
                </div>
            )}

            {step === 3 && (
                <div className={styles.stepCard}>
                    <h2 className={styles.stepTitle}>Booking Summary</h2>

                    <div className={styles.summaryItem}>
                        <span>Car</span>
                        <strong>{selectedCar?.name}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Transmission</span>
                        <strong>{selectedCar?.transmission}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Type</span>
                        <strong>{selectedCar?.type}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Seats</span>
                        <strong>{selectedCar?.seats}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Price / Day</span>
                        <strong>${selectedCar?.pricePerDay}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Driver</span>
                        <strong>{bookingData.driver.name}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Email</span>
                        <strong>{bookingData.driver.email}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Start Date</span>
                        <strong>{bookingData.startDate}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>End Date</span>
                        <strong>{bookingData.endDate}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Rental Days</span>
                        <strong>{rentDay}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Service Fee</span>
                        <strong>${serviceFee}</strong>
                    </div>

                    <div className={styles.summaryItem}>
                        <span>Total Price</span>
                        <strong>${totalPrice}</strong>
                    </div>

                    <button
                        className={styles.actionButton}
                        onClick={confirmBooking}
                    >
                        Confirm Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingPage;