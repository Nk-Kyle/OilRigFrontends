import React, { useState, useEffect } from "react";
import { NavbarComponent } from "../../components/navbar";
import { LevelAccordion } from "../../components/map/levels";
import { AddLevelOffCanvas } from "../../components/map/addLevelOffCanvas";
import { EditLevelOffCanvas } from "../../components/map/editLevelOffCanvas";
import { DeleteLevelOffCanvas } from "../../components/map/deleteLevelOffCanvas";
import { LeafletCanvas } from "../../components/map/leafletCanvas";
import { Container, Row, Col, Button } from "react-bootstrap";

import "./style.css";

function MapPage() {
    const [levels, setLevels] = useState([]);
    const [search, setSearch] = useState("");
    const [activeLevel, setActiveLevel] = useState(null);
    const [addLevelShow, setAddLevelShow] = useState(false);
    const [editLevelShow, setEditLevelShow] = useState(false);
    const [deleteLevelShow, setDeleteLevelShow] = useState(false);

    useEffect(() => {
        fetchLevels(); // eslint-disable-next-line
    }, []);

    const fetchLevels = async () => {
        const res = await fetch(
            process.env.REACT_APP_BACKEND + "/manage/levels"
        );
        // Check if the response is valid
        if (res.ok) {
            const resJson = await res.json();
            setLevels(resJson.data);
        }
    };

    return (
        <div>
            <NavbarComponent />
            <Container fluid>
                <Row>
                    <Col sm={4} className="left-column">
                        <Row className="my-4 ">
                            <Col>
                                <Button
                                    variant="primary"
                                    onClick={() => setAddLevelShow(true)}
                                >
                                    Add Level
                                </Button>
                                <Button
                                    variant="primary"
                                    className="mx-2"
                                    onClick={() => setEditLevelShow(true)}
                                >
                                    Edit Level
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => setDeleteLevelShow(true)}
                                >
                                    Delete Level
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            {/* Search bar */}
                            <Col>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            {/* Boxed container of accordions */}
                            <Col>
                                <div className="accordion-container">
                                    <LevelAccordion
                                        levels={levels}
                                        search={search}
                                        setActiveLevel={setActiveLevel}
                                        fetchLevels={fetchLevels}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8} className="justify-content-center">
                        <Row className="my-4">
                            {/* Image of selected level */}
                            <Col className="d-flex justify-content-center align-items-center">
                                <LeafletCanvas
                                    activeLevel={activeLevel}
                                    fetchLevels={fetchLevels}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <AddLevelOffCanvas
                show={addLevelShow}
                handleClose={() => setAddLevelShow(false)}
                fetchLevels={fetchLevels}
            />
            <EditLevelOffCanvas
                show={editLevelShow}
                handleClose={() => setEditLevelShow(false)}
                fetchLevels={fetchLevels}
                levels={levels}
            />
            <DeleteLevelOffCanvas
                show={deleteLevelShow}
                handleClose={() => setDeleteLevelShow(false)}
                fetchLevels={fetchLevels}
                levels={levels}
            />
        </div>
    );
}

export default MapPage;
