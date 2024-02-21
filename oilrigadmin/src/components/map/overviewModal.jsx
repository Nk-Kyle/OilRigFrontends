import React, { useState, useEffect } from "react";
import { MapContainer, Marker, ImageOverlay } from "react-leaflet";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useMapEvents } from "react-leaflet";
import { marker as icon } from "./marker";

export const CrossCutModal = ({
    levelId,
    levelLatlng,
    LevelName,
    show,
    handleClose,
    fetchLevels,
}) => {
    const [dragging, setDragging] = useState(true);
    const [marker, setMarker] = useState(null);
    const [locationName, setLocationName] = useState("");
    const [enableButton, setEnableButton] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setShowError(false);
    }, [locationName]);

    const AddMarker = () => {
        useMapEvents({
            dblclick: (e) => {
                setEnableButton(true);
                setMarker(e.latlng);
                setDragging(false);
            },
            mousemove: (e) => {
                if (dragging) {
                    setMarker(e.latlng);
                }
            },
        });
        return null;
    };

    const onClosing = () => {
        handleClose();
        setEnableButton(false);
        setMarker(null);
        setDragging(true);
    };

    const handleSubmit = () => {
        // Send the request to the backend
        fetch(
            process.env.REACT_APP_BACKEND +
                "/manage/levels/" +
                levelId +
                "/locations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    location: {
                        name: locationName,
                        level_lat: levelLatlng.lat,
                        level_lng: levelLatlng.lng,
                        crosscut_lat: marker.lat,
                        crosscut_lng: marker.lng,
                    },
                }),
            }
        ).then((res) => {
            // Check if the response is valid
            if (res.ok) {
                // Close the modal
                onClosing();
                // Fetch the levels again
                fetchLevels();
            } else {
                setShowError(true);
            }
        });
    };

    return (
        <Modal show={show} fullscreen={true} onHide={onClosing}>
            <Modal.Header closeButton>
                <Modal.Title>Choose Cross Section - {LevelName}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-0">
                <Row className="justify-content-center">
                    <Col xs={9} md={9} lg={9}>
                        <MapContainer
                            center={[72, 131]}
                            zoom={2.5}
                            style={{ height: "80vh", width: "100%" }}
                            doubleClickZoom={false}
                        >
                            <AddMarker />
                            {marker && <Marker position={marker} icon={icon} />}
                            <ImageOverlay
                                url="https://lh3.google.com/u/0/d/1Ok3pbMZhRWth9gaxeh4go8xSDhZF_Srw"
                                bounds={[
                                    [0, 0],
                                    [3308 / 36, 2338 / 9],
                                ]}
                            />
                        </MapContainer>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="mt-4 d-grid" xs={9} md={9} lg={9}>
                        {/* <Form.Label>Location Name</Form.Label> */}
                        <Form.Control
                            type="text"
                            placeholder="Location Name"
                            style={{ borderColor: "black" }}
                            onChange={(e) => setLocationName(e.target.value)}
                        />
                        <Button
                            variant={showError ? "danger" : "primary"}
                            disabled={
                                !enableButton ||
                                !locationName ||
                                showError ||
                                dragging
                            }
                            className="mt-1"
                            onClick={handleSubmit}
                        >
                            {showError
                                ? "Location Already Exist"
                                : "Add Location"}
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};
