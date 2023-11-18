import React, { useState, useEffect } from "react";
import { NavbarComponent } from "../../components/navbar";
import { Row, Col, Button } from "react-bootstrap";
import { AddAssignmentOffCanvas } from "../../components/assignment/addAssignment";
import { AssignmentTable } from "../../components/assignment/assignmentTable";
function AssignmentPage() {
    const [showAddAssignment, setShowAddAssignment] = useState(false);
    const [assignments, setAssignments] = useState([]);

    const fetchAssignments = () => {
        fetch(process.env.REACT_APP_BACKEND + "/assignments", {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAssignments(data.data);
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
                <h1>Assignments</h1>
                <hr />
                <Row className="my-4">
                    <Col>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setShowAddAssignment(true);
                            }}
                        >
                            Add Assignment
                        </Button>
                    </Col>
                </Row>
                <AssignmentTable assignments={assignments} />
            </div>
            {/* Table */}
            <AddAssignmentOffCanvas
                show={showAddAssignment}
                handleClose={() => {
                    setShowAddAssignment(false);
                    fetchAssignments();
                }}
            />
        </div>
    );
}

export default AssignmentPage;
