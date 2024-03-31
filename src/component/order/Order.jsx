import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import './order.css';
import axios from "axios";
import moment from 'moment';
function Order(){
    const [orders,setOrders]=useState([]);
    useEffect( ()=>{
        axios.get("http://localhost:8080/order")
            .then((res)=>{
                console.log(res.data);
            setOrders(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    },[]);

    const navigate=useNavigate()

    function handleAddOrder(event){
        axios.post("http://localhost:8080/order",)
            .then((res)=>{
                navigate(`/Order/${res.data.id}/products`);
            })
            .catch((error)=>{
                alert(error);
            });
    }

    return(
        <div>
            <h1>Order Page</h1>
            <div className="col">
                <Link to="/">
                    <Button variant="light">Home</Button>{' '}
                </Link>


                <div className="container" id="orderSummaryTable">
                    <div className="text-end mb-3">
                        <Button variant="warning" onClick={handleAddOrder}>Place Order</Button>{' '}
                    </div>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Total Price</th>
                            <th>Order Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders && orders.map((eachOrder) => (
                            <tr key={eachOrder.id}>
                                <td>{eachOrder.id}</td>
                                <td>{eachOrder.totalPrice}</td>
                                <td>{moment(eachOrder.orderDateTime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td><Button variant="info" onClick={()=>{
                                    navigate(`/Order/${eachOrder.id}/products`);
                                }}>Edit</Button>{' '}</td>
                                {/*<td><Button variant="success">Edit</Button>{' '}</td>*/}
                                {/*<td><Button variant="info">Cancel</Button>{' '}</td>*/}
                                {/*<td><Button variant="danger">Delete</Button>{' '}</td>*/}
                            </tr>
                        ))

                        }
                        </tbody>
                    </Table>
                </div>


            </div>


        </div>
    )
}

export default Order