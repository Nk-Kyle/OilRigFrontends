import React from "react";
import { Card, Carousel, ListGroup, Button } from "react-bootstrap";
import "./employeeCarousel.css";

const cardPerRow = 6;
export const EmployeeCarousel = ({ analytics }) => {
    const handleLogout = (user) => {
        console.log(user);
        fetch(process.env.REACT_APP_BACKEND + "/employees/logout/force", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: user.id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // window.location.reload();
            })
            .catch((err) => console.log(err));
    };
    return (
        <Carousel variant="dark">
            {/* Display employees as cards in carousel, max 6 in each */}
            {analytics &&
            analytics.employees &&
            analytics.employees.length > 0 ? (
                analytics.employees.map((user, index) => {
                    if (index % cardPerRow === 0) {
                        return (
                            <Carousel.Item key={index}>
                                <div className="row">
                                    {analytics.employees
                                        .slice(index, index + cardPerRow)
                                        .map((user, index) => {
                                            return (
                                                <div
                                                    className="col-md-2 flex-container"
                                                    key={index}
                                                >
                                                    <Card>
                                                        <Card.Img
                                                            variant="top"
                                                            src={user.photo_url}
                                                            style={{
                                                                height: "200px",
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                        />
                                                        <Card.Header className="justify-content-center text-center">
                                                            <b>
                                                                {user.name}
                                                                <span
                                                                    className="ms-2"
                                                                    style={{
                                                                        color: "green",
                                                                    }}
                                                                >
                                                                    ●
                                                                </span>
                                                            </b>
                                                            <br />
                                                            {
                                                                user.division
                                                            } - {user.work_type}
                                                        </Card.Header>

                                                        {user.task_details &&
                                                        user.task_details
                                                            .length > 0 ? (
                                                            <ListGroup>
                                                                {user.task_details.map(
                                                                    (
                                                                        task,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <ListGroup.Item
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {"(" +
                                                                                    task.id +
                                                                                    ")"}
                                                                                <br />
                                                                                {task.level_name +
                                                                                    " - " +
                                                                                    task.location_name}
                                                                            </ListGroup.Item>
                                                                        );
                                                                    }
                                                                )}
                                                            </ListGroup>
                                                        ) : (
                                                            <div> </div>
                                                        )}
                                                    </Card>
                                                    <Button
                                                        variant="outline-danger"
                                                        className="mt-2"
                                                        style={{
                                                            height: "40px",
                                                        }}
                                                        onClick={() => {
                                                            handleLogout(user);
                                                        }}
                                                    >
                                                        Force Logout
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                </div>
                            </Carousel.Item>
                        );
                    }
                    return null;
                })
            ) : (
                <Carousel.Item className="text-center">
                    No Employees Logged In
                </Carousel.Item>
            )}
        </Carousel>
    );
};
