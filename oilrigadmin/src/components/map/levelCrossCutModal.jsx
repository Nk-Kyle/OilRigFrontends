import React from "react";
import { MapContainer, Marker, ImageOverlay, Tooltip } from "react-leaflet";
import { Modal, Row, Col } from "react-bootstrap";
import { marker as icon } from "./marker";

export const LevelCrossCutModal = ({ activeLevel, show, handleClose }) => {
    const onClosing = () => {
        handleClose();
    };

    return (
        <Modal show={show} fullscreen={true} onHide={onClosing}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Choose Cross Section - {activeLevel ? activeLevel.name : ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-0">
                <Row className="justify-content-center">
                    <Col xs={9} md={9} lg={9}>
                        <MapContainer
                            center={[72, 131]}
                            zoom={2.5}
                            style={{ height: "80vh", width: "100%" }}
                        >
                            {activeLevel &&
                                activeLevel.locations.map((location, idx) => (
                                    <Marker
                                        key={`marker-${idx}`}
                                        position={[
                                            location.crosscut_lat,
                                            location.crosscut_lng,
                                        ]}
                                        icon={icon}
                                        eventHandlers={{
                                            mouseover: (e) => {
                                                e.target.openPopup();
                                            },
                                            mouseout: (e) => {
                                                e.target.closePopup();
                                            },
                                        }}
                                    >
                                        <Tooltip>{location.name}</Tooltip>
                                    </Marker>
                                ))}
                            <ImageOverlay
                                url="https://docs.google.com/uc?export=download&id=1Ok3pbMZhRWth9gaxeh4go8xSDhZF_Srw"
                                bounds={[
                                    [0, 0],
                                    [3308 / 36, 2338 / 9],
                                ]}
                            />
                        </MapContainer>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};
