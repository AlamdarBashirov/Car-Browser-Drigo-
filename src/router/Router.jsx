import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../app/home/Home'
import Layout from '../components/layout/Layout'
import CarDetail from '../app/details/carDetails/CarDetail'
import NotFound from '../app/notFound/notFound'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/cars/:id' element={<CarDetail />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router