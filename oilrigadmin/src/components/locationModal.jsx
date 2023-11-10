import React, { useState, useEffect } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import { ConfirmationModal } from "./confirmationModal";

export const LocationModal = ({
    show,
    handleClose,
    location,
    level,
    fetchLevels,
}) => {
    const [locationName, setLocationName] = useState("");
    const [showError, setShowError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        setLocationName(location ? location.name : "");
    }, [location]);

    const handleUpdate = () => {
        // Update location
        const tempLocation = { ...location, name: locationName };
        fetch(
            process.env.REACT_APP_BACKEND +
                "/manage/levels/" +
                level.id +
                "/locations",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    location: tempLocation,
                }),
            }
        ).then((res) => {
            if (res.ok) {
                handleClose();
            } else {
                setShowError(true);
            }
        });
    };

    const handleDelete = () => {
        fetch(
            process.env.REACT_APP_BACKEND +
                "/manage/levels/" +
                level.id +
                "/locations",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    location: location,
                }),
            }
        ).then((res) => {
            if (res.ok) {
                fetchLevels();
                handleClose();
                setShowConfirm(false);
                handleClose();
            }
        });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {level ? level.name : ""} -{" "}
                        {location ? location.name : ""}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Text>
                        <strong>Location Name</strong>
                        <Form.Control
                            type="text"
                            placeholder="Enter location name"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                    </Form.Text>
                    {showError && (
                        <Form.Text className="text-danger">
                            Name already exists
                        </Form.Text>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    {/* Update and Delete Button */}
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => setShowConfirm(true)}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <ConfirmationModal
                show={showConfirm}
                handleClose={() => setShowConfirm(false)}
                handleConfirm={handleDelete}
                title="Delete Location"
                body="Are you sure you want to delete this location?
                Deleting this location will also delete all tasks associated with it."
            />
        </>
    );
};
