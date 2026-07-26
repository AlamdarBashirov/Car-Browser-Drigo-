import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../app/home/Home'
import Layout from '../components/layout/Layout'
import CarDetail from '../app/details/carDetails/CarDetail'
import NotFound from '../app/notFound/notFound'
import { FavoritesProvider } from "../context/FavoritesContext";
import SignUpPage from '../app/auth/signup/SignUpPage'
import SignInPage from '../app/auth/signin/SignInPage'

const Router = () => {
    return (
        <BrowserRouter>
            <FavoritesProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUpPage />} />
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