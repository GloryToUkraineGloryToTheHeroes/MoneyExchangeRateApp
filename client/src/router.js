import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Privat } from './components/Header/Privat'

export const useRouter = () => {
    return(
        <Routes>
            <Route path='/privat' element={<Privat />} />
            <Route path='*' element={<Navigate to='/privat' />} />
        </Routes>
    )
}