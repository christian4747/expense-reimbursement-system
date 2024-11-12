import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './Components/LoginRegister/Login';
import { Home } from './Components/Home/Home';
import { Register } from './Components/LoginRegister/Register';
import axios from 'axios';
import { store } from './globalData/store';
import { Users } from './Components/Users/Users';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="*" element={<Navigate to=""/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
