import React from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
function Order(){
    return(
        <div>
            <h1>Order Page</h1>
            <div className="col">
                <Link to="/">
                    <Button variant="light">Home</Button>{' '}
                </Link>
            </div>


        </div>
    )
}

export default Order