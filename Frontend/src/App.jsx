import React, { useState } from 'react'
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom'
import Login from './Pages/Login'
// import{BrowserRouter,Routes,Route}
import Signup from './Pages/Signup';
import Template from './Pages/Template';

function App() {

useState
  return (
    <>
    <BrowserRouter>
    <Routes >
      <Route path='/' element={<Template />}>
      <Route index element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      </Route>
    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App