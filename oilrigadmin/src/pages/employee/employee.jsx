import React, { useState, useEffect } from "react";
import { NavbarComponent } from "../../components/navbar";
import { Row, Col, Button } from "react-bootstrap";
import { AddEmployeeOffCanvas } from "../../components/employee/addEmployee";
import { EmployeeTable } from "../../components/employee/employeeTable";

function EmployeePage() {
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [Employees, setEmployees] = useState([]);

    const fetchAssignments = () => {
        fetch(process.env.REACT_APP_BACKEND + "/employees", {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setEmployees(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div>
            <NavbarComponent />
            {/* Controls */}
            <div className="px-5 pt-2">
                <h1>Employees</h1>
                <hr />
                <Row className="my-4">
                    <Col>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setShowAddEmployee(true);
                            }}
                        >
                            Add Employee
                        </Button>
                    </Col>
                </Row>
                <EmployeeTable assignments={Employees} />
            </div>
            {/* Table */}
            <AddEmployeeOffCanvas
                show={showAddEmployee}
                handleClose={() => setShowAddEmployee(false)}
            />
        </div>
    );
}

export default EmployeePage;
