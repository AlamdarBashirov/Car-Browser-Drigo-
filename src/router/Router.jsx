import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../app/home/Home'
import Layout from '../components/layout/Layout'
import CarDetail from '../app/details/carDetails/CarDetail'
import NotFound from '../app/notFound/notFound'
import { FavoritesProvider } from "../context/FavoritesContext";
import SignUpPage from '../app/auth/signup/SignUpPage'
import SignInPage from '../app/auth/signin/SignInPage'
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute'
import BookingPage from '../app/booking/BookingPage'
import MyBookings from '../app/myBookings/MyBookings'
import BookingDetail from '../app/details/bookingDetails/BookingDetail'

const Router = () => {
    return (
        <BrowserRouter>
            <FavoritesProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/my-bookings" element={<MyBookings />} />
                            <Route path="/booking/:id" element={<BookingPage />} />
                            <Route path="/booking-detail/:id" element={<BookingDetail />} />
                        </Route>
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/cars/:id" element={<CarDetail />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </FavoritesProvider>
        </BrowserRouter>
    )
}

export default Router