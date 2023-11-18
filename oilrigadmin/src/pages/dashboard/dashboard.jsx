import React, { useEffect, useState } from "react";
import { Card, ListGroup, ProgressBar } from "react-bootstrap";
import { NavbarComponent } from "../../components/navbar";

function Dashboard() {
    const [analytics, setAnalytics] = useState({});
    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = () => {
        fetch(process.env.REACT_APP_BACKEND + "/analytics", {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAnalytics(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <NavbarComponent />
            {/* Controls */}
            <div className="px-5 pt-2">
                <h1>Dashboard</h1>
                <hr />

                <div className="row">
                    {/* Cards for number of employees */}
                    <div className="col-md-4">
                        <Card>
                            <Card.Header className="d-flex justify-content-center">
                                Number of Employees in Rigs
                            </Card.Header>
                            <Card.Body className="d-flex justify-content-center">
                                <Card.Title>
                                    {analytics ? analytics.count_logged_in : 0}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                    {/* Cards for number of assignments */}
                    <div className="col-md-4">
                        <Card>
                            <Card.Header className="d-flex justify-content-center">
                                Number of Assignments
                            </Card.Header>
                            <Card.Body className="d-flex justify-content-center">
                                <Card.Title>5</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
