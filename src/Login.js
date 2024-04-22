import {useState} from "react";
import axios from "axios";
import {useAuth} from "./utils/AuthContext";
import {useNavigate} from "react-router-dom";

const LoginPage=()=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    const {login}=useAuth();
    const navigate=useNavigate();

    const handleLogin=(e)=>{
        e.preventDefault();

        const data={
            username:username,
            password:password
        }

        axios.post("http://localhost:8080/auth/login",data)
            .then((resp)=>{
                login(resp.data);
                navigate("/");
            })
            .catch((e)=>{
                alert(e);
            });
    }

    return(
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group mx-5" >
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>

                <div className="form-group mx-5 ">
                    <label htmlFor="password">Password</label>
                    <input type="text" className="form-control" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-primary mt-5">Login</button>
            </form>

        </div>
    )
}

export default LoginPage