import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import './editOrder.css';
import Swal from "sweetalert2";

function EditOrder(){
    const {id}=useParams();
    const [order,setOrder]=useState(null);
    const [products,setProducts]=useState([]);
    const navigate=useNavigate();


    useEffect(()=>{
        axios.get(`http://localhost:8080/orders/${id}`)
            .then((res)=>{
                setOrder(res.data);
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });

        axios.get("http://localhost:8080/products")
            .then((resp)=>{
                setProducts(resp.data);
                console.log(resp.data);
            })
            .catch((err)=>{

            });

    },[])
    return(
        <div className="container">
            <h1>Add Product to Order #{id}</h1>

            {order &&
                <div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="datetime">
                            Order Date : {moment(order.orderDateTime).format('MMMM Do YYYY, h:mm:ss a')}
                        </div>
                        <div id="txtTotalPriceLabel">
                            Total Price : <span className="total-price">{order.totalPrice}</span> $
                        </div>

                        <div><Button variant="info" onClick={()=>{
                            Swal.fire({
                                title: "Do you want to complete the order?",
                                showCancelButton: true,
                                confirmButtonText: "Yes",
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    axios.put("http://localhost:8080/order/"+id)
                                        .then((resp)=>{
                                            Swal.fire("Order Completed!", "", "success");
                                            navigate("/order");
                                        })
                                        .catch((e)=>{
                                            alert(e);
                                        })

                                }
                            });
                        }}>Complete Order</Button>{' '}</div>

                    </div>
                    <div className="row my-5">
                        <div className="col-lg-6" id="orderProduct">
                            <div>EDIT ORDER</div>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.orderProducts && order.orderProducts.map((product)=> (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.price}</td>
                                        <td><Button variant="danger" onClick={()=>{
                                            axios.delete(`http://localhost:8080/orders/${id}/product/${product.id}`)
                                                .then((resp)=>{
                                                    setOrder(resp.data);
                                                })
                                                .catch((error)=>{
                                                    console.log(error);
                                                })
                                        }}>Remove</Button></td>
                                    </tr>
                                ))

                                }
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-lg-6">
                            <div>AVAILABLE PRODUCTS</div>
                            <div className="products">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Add</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {products && products.map((eachProduct) => (
                                        <tr key={eachProduct.id}>
                                            <td>{eachProduct.productName}</td>
                                            <td>{eachProduct.price}</td>
                                            <td><Button variant="warning" onClick={() => {
                                                const data = {
                                                    productId: eachProduct.id,
                                                    quantity: 1
                                                }
                                                axios.post(`http://localhost:8080/order/${id}/addProducts`, data)
                                                    .then((resp) => {
                                                        setOrder(resp.data);
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                    })
                                            }}>Add</Button></td>

                                        </tr>
                                    ))

                                    }


                                    </tbody>
                                </Table>
                            </div>

                        </div>
                    </div>
                </div>



            }


        </div>
    )
}

export default EditOrder