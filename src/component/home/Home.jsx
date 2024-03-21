import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TableforAllUsers from "../TableforAllUsers";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Product from "../product/Product";

function Home(){
    const [count, setCount] = useState(0);
    const [users, setUsers] = useState(null);
    const [userNameVal, setUsername] = useState("");
    const [passwordVal, setPassword] = useState("");
    const [emailVal, setEmail] = useState("");
    const [edit, setEdit] = useState(null);

    useEffect(()=>{
        getUsers();
    },[])



    function increase() {
        setCount(count + 1);

    }

    function decrease() {
        setCount(count - 1);
    }

    function getUsers() {
        axios.get("http://localhost:8080/users")
            .then(function (res) {
                setUsers(res.data);

            })
            .catch(function (e) {
                console.log(e);
            });
    }

    function handleUserName(event) {
        setUsername(event.target.value);
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function submitDetails(event) {
        event.preventDefault();

        const data = {
            userName: userNameVal,
            email: emailVal,
            password: passwordVal
        }

        axios.post("http://localhost:8080/save", data)
            .then(function (res) {
                console.log(res);
                getUsers();
            })
            .catch(function (error) {
                Swal.fire({
                    title: "Submission error!",
                    text: "Duplicate input,Sorry",
                    icon: "question"
                });
            });

    }

    function UpdateDetails(event) {
        event.preventDefault();
        const updatedData = {
            userName: userNameVal,
            email: emailVal,
            password: passwordVal
        }
        console.log(updatedData);
        axios.put("http://localhost:8080/update/" + edit.id, updatedData)
            .then(function (res) {
                getUsers();
                setEdit(null);
                Swal.fire("Update Successful");
                console.log(res);
            })
            .catch(function (er) {
                alert(er);
            })
    }

    return(
        <div>
            <h1>First React application</h1>
            <div className="row">
                <div className="col">
                    <Link to="/order">
                        <Button  variant="light">Order page</Button>{' '}
                    </Link>
                </div>
                <div className="col">
                    <Link to="/product">
                        <Button  variant="light">Product page</Button>{' '}
                    </Link>
                </div>
            </div>
            <h1>Counter : {count}</h1>
            <button type="button" onClick={increase}>Increase</button>
            <button type="button" onClick={decrease}>Decrease</button>

            <div>
                <Button className="button" variant="warning" onClick={getUsers}>Show Users</Button>{' '}
            </div>

            {/*{users && users.map((us) => (*/}
            {/*    <div key={us.id}>*/}
            {/*        {us.userName} - {us.email} - {us.id} - {us.password}*/}
            {/*        */}
            {/*    </div>*/}
            {/*))*/}
            {/*}*/}

            {!edit &&
                <div className="container" className="form1">
                    <h2>Register User</h2>
                    <form onSubmit={submitDetails}>
                        <div>
                            <Form.Label htmlFor="inputPassword5">User Name</Form.Label>
                            <Form.Control onChange={handleUserName} type="text" id="username" required/>
                        </div>
                        <div>
                            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
                            <Form.Control onChange={handleEmail} type="email" id="email" required/>
                        </div>
                        <div>
                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control onChange={handlePassword} type="password" id="password" required/>
                        </div>
                        <div>
                            <Button type="submit" className="button2" variant="warning">Submit </Button>{' '}
                        </div>

                    </form>

                </div>
            }
            <br/>

            {edit &&
                <div className="container" className="form1">
                    <h2>Update User</h2>
                    <form onSubmit={UpdateDetails}>
                        <div>
                            <Form.Label htmlFor="inputPassword5">User Name</Form.Label>
                            <Form.Control value={userNameVal} onChange={handleUserName} type="text"
                                          id="username"
                                          required/>
                        </div>
                        <div>
                            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
                            <Form.Control value={emailVal} onChange={handleEmail} type="email" id="email"
                                          required/>
                        </div>
                        <div>
                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control value={passwordVal} onChange={handlePassword} type="password"
                                          id="password"
                                          required/>
                        </div>
                        <div>
                            <Button type="submit" className="button2" variant="warning">Update</Button>{' '}
                        </div>

                    </form>

                </div>
            }
            <TableforAllUsers tableData={users}
                              handleEdit={(exportedUser) => {
                                  if (exportedUser != null) {
                                      setEdit(exportedUser);
                                      setUsername(exportedUser.userName);
                                      setEmail(exportedUser.email);
                                  } else {
                                      setEdit(null);
                                  }


                              }} deleteFunction={(selectedUser) => {
                axios.delete("http://localhost:8080/delete/" + selectedUser.id)
                    .then(function () {
                        Swal.fire("Deleted !");
                        getUsers();
                    })
                    .catch(function (er) {
                        alert(er);
                    })
            }}/>


        </div>
    )
}

export default Home