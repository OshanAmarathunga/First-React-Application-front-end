import './App.css';
import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";
import Table from 'react-bootstrap/Table';
import TableforAllUsers from "./component/TableforAllUsers";
import Product from "./component/product/Product";
import {BrowserRouter, Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Order from "./component/product/Order";
import Home from "./component/home/Home";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/Product" element={<Product/>}></Route>
                    <Route path="/Order" element={<Order/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;
