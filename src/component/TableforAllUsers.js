import React, {useState} from "react";
import Table from 'react-bootstrap/Table';
import './table.css';
import Button from "react-bootstrap/Button";

export default function TableforAllUsers(prp) {

    return (
        <div className="tbl" class="container">
            <Table striped bordered hover>
                <thead>
                <tr>

                    <th>User Id</th>
                    <th>User Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {(prp.tableData) && (prp.tableData).map((us) => (
                    <tr key={us.id}>
                        <td>{us.id}</td>
                        <td>{us.userName}</td>
                        <td>{us.email}</td>
                        <td>

                            <Button variant="success" onClick={() => {
                                prp.handleEdit(us);

                            }}>Update</Button>{' '}
                        </td>
                        <td>

                            <Button variant="info" onClick={() => {
                                prp.handleEdit(null);
                            }}>Cancel</Button>{' '}
                        </td>
                        <td>

                            <Button variant="danger" onClick={() => {
                                prp.deleteFunction(us);

                            }}>Delete</Button>{' '}
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
        </div>
    )
}