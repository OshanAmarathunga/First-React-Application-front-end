import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import './Product.css';
import Table from "react-bootstrap/Table";
import axios from "axios";
import Swal from "sweetalert2";

function Product() {
    const navigate = useNavigate();
    const [productNameV,setProductName]=useState("");
    const [priceV,setPrice]=useState("");
    const [qtyV,setQty]=useState("");
    const [categoryIdVal,setCategoryId]=useState("");
    const [products,setProducts]=useState(null);
    const [categoriesObj,setCategories]=useState("");

    useEffect(()=>{
        loadProductTable();

    },[]);
    useEffect(()=>{
        loadCategories();
    },[]);

    function addProduct(event){
        event.preventDefault();

        const postData={
            name:productNameV,
            price:priceV,
            quantity:qtyV,
            categoryId:categoryIdVal

        }
        axios.post("http://localhost:8080/product",postData)
            .then(()=>{
                loadProductTable();
                setProductName("")
                setPrice("")
                setQty("")
                Swal.fire({
                    title: "Added",
                    text: "Product added!",
                    icon: "success"
                });
            })
            .catch((error)=>{
                console.log(error);
                Swal.fire({
                    title: "Error!",
                    text: "Sorry Cannot Submit Data!",
                    icon: "error"
                });
            });
    }

    function loadProductTable(){
        axios.get("http://localhost:8080/products")
            .then((res)=>{
               setProducts(res.data);

            })
            .catch((error)=>{
                alert("product table error "+error);
                console.log(error);
            });
    }
    function loadCategories(){
        axios.get("http://localhost:8080/categories")
            .then((response)=>{
                setCategories(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }


    return (
        <div>
            <div className="row" id="homeButtom">
                <div className="col"></div>
                <div className="col">
                    <Link to="/">
                        <Button variant="light">Home</Button>{' '}
                    </Link>
                </div>
            </div>
            <div className="container" id="productManage">

                <h2>ADD PRODUCT</h2>
                <form onSubmit={addProduct} className="addProductForm">
                    <div className="row">
                        <div className="col">
                            <Form.Label htmlFor="inputPassword5">Product Name</Form.Label>
                            <Form.Control value={productNameV} onChange={(event) => {
                                setProductName(event.target.value)
                            }} type="text" id="productName" required/>
                        </div>
                        <div className="col">
                            <Form.Label htmlFor="inputPassword5">Price</Form.Label>
                            <Form.Control value={priceV} onChange={(event2) => {
                                setPrice(event2.target.value)
                            }} type="text" id="price" required/>
                        </div>
                        <div className="col">
                            <Form.Label htmlFor="inputPassword5">QTY</Form.Label>
                            <Form.Control value={qtyV} onChange={(event3) => {
                                setQty(event3.target.value)
                            }} type="text" id="qty" required/>
                        </div>
                        <div className="col">
                            <Form.Label htmlFor="inputPassword5">Category</Form.Label>

                                <select onChange={(event4) => {setCategoryId(event4.target.value);}}>
                                    <option value="">Select a Category</option>
                                    {
                                        categoriesObj && categoriesObj.map((eachCategory) => (
                                        <option key={eachCategory.id} value={eachCategory.id}>{eachCategory.name}</option>
                                    ))}
                                </select>

                        </div>
                    </div>
                    <div className="btnAdd">
                        <Button type="submit" id="idBtnADD" variant="warning">ADD</Button>{' '}
                    </div>

                </form>
            </div>


            <div className="container" id="productSummaryTable">
                <Table striped bordered hover>
                <thead>
                <tr>

                    <th>Item Code</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Category</th>
                </tr>
                </thead>
                    <tbody>
                    {
                        products && products.map((eachProduct) => (
                            <tr key={eachProduct.id}>
                                <td>{eachProduct.id}</td>
                                <td>{eachProduct.productName}</td>
                                <td>{eachProduct.price}</td>
                                <td>{eachProduct.qty}</td>
                                <td>{eachProduct.category?.name}</td>

                            </tr>
                        ))


                    }


                    </tbody>
                </Table>
            </div>


        </div>
    )
}

export default Product