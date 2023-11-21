import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import setting from "../../data/setting";

export const AddAssignmentOffCanvas = ({ show, handleClose }) => {
    const [assignmentId, setAssignmentId] = useState(0);
    const [priority, setPriority] = useState(100);
    const [levels, setLevels] = useState([]);
    const [level, setLevel] = useState(null); // {id: 1, name: "Level 1", locations: [{id: 1, name: "Location 1"}, {id: 2, name: "Location 2"}]}
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState(null); // {id: 1, name: "Location 1"}
    const [division, setDivision] = useState({
        name: "Development",
        work_types: [
            { name: "Operator Jumbodrill", prefix: "JB" },
            { name: "Operator Cablebolt", prefix: "CB" },
        ],
    });
    const [workTypeName, setWorkTypeName] = useState("Operator Jumbodrill"); // "Operator Jumbodrill"
    const [fileLink, setFileLink] = useState(""); // "https://drive.google.com/file/d/1Wlk21pBTg7lJQJy2MP9ho2dHRihDUset/view?usp=drive_link"
    const [description, setDescription] = useState("");
    const [validLink, setValidLink] = useState(false); // true or false
    const [valid, setValid] = useState(true);
    const [error, setError] = useState(""); // {message: "Error Message", code: 400

    const fetchLevels = () => {
        fetch(process.env.REACT_APP_BACKEND + "/manage/levels")
            .then((response) => response.json())
            .then((resp) => {
                setLevels(resp.data);
            });
    };

    const validateLink = (url) => {
        // Regular expression for Google Drive file URLs
        const pattern =
            /^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/view\?usp=drive_link$/;
        // Check if the URL matches the pattern
        setValidLink(pattern.test(url));
    };

    const getDownloadLink = () => {
        const url = fileLink;
        // If the URL is valid, get the id
        if (validLink) {
            const pattern = /\/d\/(.*)\/view/i;
            const match = url.match(pattern);
            const fileId = match[1];
            return "https://drive.google.com/uc?print=false&id=" + fileId;
        } else {
            return "";
        }
    };

    const addAssignment = (event) => {
        event.preventDefault();
        if (
            level &&
            location &&
            division &&
            workTypeName &&
            fileLink &&
            description
        ) {
            // Check if the URL matches the pattern
            if (!validLink) {
                setError("Invalid Gdrive URL");
                setValid(false);
                return;
            }

            setValid(true);
            const prefix = division.work_types.find(
                (work_type) => work_type.name === workTypeName
            ).prefix;
            const assignment_id =
                prefix +
                "-" +
                parseInt(assignmentId).toString().padStart(4, "0");
            // Send the request to the backend
            fetch(process.env.REACT_APP_BACKEND + "/assignments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    division: division.name,
                    work_type: workTypeName,
                    assignment_id: assignment_id,
                    level_id: level.id,
                    level_name: level.name,
                    location_id: location.id,
                    location_name: location.name,
                    pdf_link: fileLink,
                    creator: localStorage.getItem("username"),
                    priority: priority,
                    description: description,
                }),
            }).then((res) => {
                // Check if the response is valid
                if (res.ok) {
                    // Reset the fields
                    setLevel(levels[0]);
                    setLocation(levels[0].locations[0]);
                    setDivision(setting.division[0]);
                    setWorkTypeName(setting.division[0].work_types[0].name);
                    setFileLink("");
                    setDescription("");
                    setValidLink(false);
                    setAssignmentId(0);
                    setPriority(100);
                    setValid(true);
                    // Close the offcanvas
                    fetchLevels();
                    handleClose();
                } else {
                    // Show an error message
                    if (res.status === 409) {
                        setError("Assignment already exists");
                    } else {
                        setError("Error adding assignment");
                    }
                    setValid(false);
                }
            });
        } else {
            setError("Please fill all the fields above");
            setValid(false);
        }
    };

    useEffect(() => {
        fetchLevels();
    }, []);

    useEffect(() => {
        levels && levels.length > 0 && setLocations(levels[0].locations);
        setLevel(levels[0]);
        setLocation(
            levels[0] && levels[0].locations[0] ? levels[0].locations[0] : null
        );
    }, [levels]);

    useEffect(() => {
        setValid(true);
    }, [level, location, division, workTypeName, fileLink, description]);

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add Assignment</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form.Text className="text-muted">Assignment ID</Form.Text>
                    <Form.Control
                        required
                        value={assignmentId}
                        placeholder="Assignment ID"
                        type="number"
                        onChange={(e) => {
                            setAssignmentId(e.target.value);
                        }}
                    ></Form.Control>
                    <Form.Text className="text-muted">Level</Form.Text>
                    <Form.Select
                        required
                        aria-label="Select Level"
                        value={level ? level.id : 0}
                        onChange={(e) => {
                            setLevel(
                                levels.find(
                                    (level) => level.id === e.target.value
                                )
                            );
                            setLocations(
                                levels.find(
                                    (level) => level.id === e.target.value
                                ).locations
                            );
                            setLocation(
                                levels.find(
                                    (level) => level.id === e.target.value
                                ).locations[0]
                            );
                        }}
                    >
                        {levels
                            ? levels.map((level) => (
                                  <option key={level.id} value={level.id}>
                                      {level.name}
                                  </option>
                              ))
                            : null}
                    </Form.Select>
                    <Form.Text className="text-muted">Location</Form.Text>
                    <Form.Select
                        required
                        aria-label="Select Level"
                        value={location ? location.id : 0}
                        onChange={(e) => {
                            setLocation(
                                locations.find(
                                    (location) => location.id === e.target.value
                                )
                            );
                        }}
                    >
                        {/* Check if locations null or empty */}
                        {locations && locations.length > 0 ? (
                            locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))
                        ) : (
                            <option value={0} disabled={true}>
                                No Location
                            </option>
                        )}
                    </Form.Select>
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
                                    {work_type.name} ({work_type.prefix})
                                </option>
                            ))
                        ) : (
                            <option value={0} disabled={true}>
                                No Work Type
                            </option>
                        )}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        Assignment PDF Link
                    </Form.Text>
                    <Form.Control
                        required
                        value={fileLink}
                        placeholder="Assignment PDF Link (Gdrive)"
                        onChange={(e) => {
                            setFileLink(e.target.value);
                            validateLink(e.target.value);
                        }}
                    ></Form.Control>
                    {/* View pdf in new page if valid*/}
                    {validLink && (
                        <div>
                            <div className="text-left mb-2">
                                <a
                                    href={getDownloadLink()}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View PDF
                                </a>
                            </div>
                        </div>
                    )}

                    <Form.Text className="text-muted">Priority</Form.Text>
                    <Form.Control
                        required
                        value={priority}
                        placeholder="Priority"
                        type="number"
                        onChange={(e) => {
                            setPriority(e.target.value);
                        }}
                    ></Form.Control>

                    <Form.Text className="text-muted">Description</Form.Text>
                    <Form.Control
                        required
                        value={description}
                        placeholder="Description"
                        as="textarea"
                        rows={3}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    ></Form.Control>
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
                        onClick={addAssignment}
                    >
                        Add Assignment
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};
