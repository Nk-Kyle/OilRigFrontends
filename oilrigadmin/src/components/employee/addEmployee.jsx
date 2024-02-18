import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import setting from "../../data/setting";
import { generatePassword } from "../../utils/password";

export const AddEmployeeOffCanvas = ({ show, handleClose }) => {
    const [employeeId, setEmployeeId] = useState(""); // "12345678"
    const [employeeName, setEmployeeName] = useState(""); // "John Doe"
    const [employeePic, setEmployeePic] = useState(""); // "https://picsum.photos/200/300"
    const [division, setDivision] = useState({
        name: "Development",
        work_types: [
            { name: "Operator Jumbodrill", prefix: "JB" },
            { name: "Operator Cablebolt", prefix: "CB" },
        ],
    });
    const [workTypeName, setWorkTypeName] = useState("Operator Jumbodrill"); // "Operator Jumbodrill"
    const [valid, setValid] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setValid(true);
    }, [employeeId, employeeName, division, workTypeName, employeePic]);

    const checkUrl = (url) => {
        // Regular expression for Google Drive file URLs
        const pattern =
            /^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/view\?usp=drive_link$/;
        // Check if the URL matches the pattern
        return pattern.test(url);
    };

    const extractFileId = (url) => {
        // Regular expression for extracting the file ID from the URL
        // https://drive.google.com/file/d/1Wlk21pBTg7lJQJy2MP9ho2dHRihDUset/view?usp=drive_link
        // Get the id between /d/ and /view
        const pattern = /\/d\/(.*)\/view/i;
        // Check if the URL matches the pattern
        const match = url.match(pattern);
        // Return the file ID

        return match[1];
    };

    const updateEmployeePic = (url) => {
        // Check if the URL is valid
        const isValid = checkUrl(url);
        // If the URL is valid, update the image URL
        if (isValid) {
            const fileId = extractFileId(url);
            setEmployeePic("https://lh3.google.com/u/0/d/" + fileId);
        } else {
            setEmployeePic("");
        }
    };

    const addEmployee = (event) => {
        event.preventDefault();
        if (
            division &&
            workTypeName &&
            employeeId &&
            employeeName &&
            employeePic
        ) {
            // Check if the URL matches the pattern

            setValid(true);
            // Send the request to the backend
            fetch(process.env.REACT_APP_BACKEND + "/employees/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: employeeId,
                    name: employeeName,
                    password: generatePassword(),
                    division: division.name,
                    work_type: workTypeName,
                    photo_url: employeePic,
                    creator: "admin",
                }),
            }).then((res) => {
                // Check if the response is valid
                if (res.ok) {
                    // Reset the fields
                    setDivision(setting.division[0]);
                    setWorkTypeName(setting.division[0].work_types[0].name);
                    // Close the offcanvas
                    handleClose();
                } else {
                    // Show an error message
                    setError("Error adding employee");
                    setValid(false);
                }
            });
        } else {
            setError("Please fill all the fields above");
            setValid(false);
        }
    };

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add Employee</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form.Text className="text-muted">
                        Employee ID (Unique)
                    </Form.Text>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Employee ID"
                        value={employeeId}
                        onChange={(e) => {
                            setEmployeeId(e.target.value);
                        }}
                    />
                    <Form.Text className="text-muted">Employee Name</Form.Text>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Employee Name"
                        value={employeeName}
                        onChange={(e) => {
                            setEmployeeName(e.target.value);
                        }}
                    />
                    <Form.Text className="text-muted">
                        Employee Picture URL
                    </Form.Text>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Employee Picture URL"
                        value={employeePic}
                        onChange={(e) => {
                            updateEmployeePic(e.target.value);
                        }}
                    />
                    <Form.Text className="text-muted">Division</Form.Text>
                    <Form.Select
                        required
                        aria-label="Select Division"
                        value={
                            division ? division.name : setting.division[0].name
                        }
                        onChange={(e) => {
                            setDivision(
                                setting.division.find(
                                    (division) =>
                                        division.name === e.target.value
                                )
                            );
                            setWorkTypeName(
                                setting.division.find(
                                    (division) =>
                                        division.name === e.target.value
                                ).work_types[0].name
                            );
                        }}
                    >
                        {setting.division.map((division) => (
                            <option key={division.name} value={division.name}>
                                {division.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Text className="text-muted">Work Type</Form.Text>
                    <Form.Select
                        required
                        value={workTypeName}
                        aria-label="Select Work Type"
                        onChange={(e) => {
                            setWorkTypeName(e.target.value);
                        }}
                    >
                        {/* Check if division null or empty */}
                        {division && division.work_types.length > 0 ? (
                            division.work_types.map((work_type) => (
                                <option
                                    key={work_type.name}
                                    value={work_type.name}
                                >
                                    {work_type.name}
                                </option>
                            ))
                        ) : (
                            <option value={0} disabled={true}>
                                No Work Type
                            </option>
                        )}
                    </Form.Select>
                    {/* Not  Valid*/}
                    <div className="text-center">
                        {!valid && (
                            <p className="text-danger">
                                {error ? error : "Please fill all the fields"}
                            </p>
                        )}
                    </div>
                    <Button
                        variant="primary"
                        className={valid ? "mt-2" : ""}
                        onClick={addEmployee}
                    >
                        Add Employee
                    </Button>
                    {employeePic && (
                        <div className="mt-2">
                            <p>Preview:</p>
                            <img
                                src={employeePic}
                                alt="Preview"
                                className="preview-image"
                                style={{ width: "100%" }}
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};
