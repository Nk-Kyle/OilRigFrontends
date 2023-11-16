import React, { useState, useEffect } from "react";
import { Accordion, ListGroup, Button } from "react-bootstrap";
import { LevelCrossCutModal } from "./levelCrossCutModal";
import { LocationModal } from "./locationModal";

export const LevelAccordion = ({
    levels,
    search,
    setActiveLevel,
    fetchLevels,
}) => {
    const [activeKey, setActiveKey] = useState("");
    const [showCrossCutModal, setShowCrossCutModal] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(null);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        if (levels.length > 0) {
            setActiveKey(levels[0].name);
            setActiveLevel(levels[0]);
        }
    }, [levels, setActiveLevel]);

    const handleToggle = (key) => {
        setActiveKey(key);
        setCurrentLevel(levels.find((level) => level.name === key));
        setActiveLevel(levels.find((level) => level.name === key));
    };

    const handleLocationClick = (location) => {
        setCurrentLocation(location);
        setShowLocationModal(true);
    };

    return (
        <>
            <Accordion activeKey={activeKey}>
                {levels
                    .filter((level) =>
                        level.name.toLowerCase().includes(search)
                    )
                    .map((level) => (
                        <Accordion.Item
                            eventKey={level.name}
                            onClick={() => handleToggle(level.name)}
                            key={level.name}
                        >
                            <Accordion.Header>{level.name}</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {level.locations.map((location) => (
                                        <ListGroup.Item
                                            action
                                            onClick={() =>
                                                handleLocationClick(location)
                                            }
                                            key={
                                                level.name + "-" + location.name
                                            }
                                        >
                                            {location.name}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <div className="d-grid">
                                    <Button
                                        variant="outline-primary"
                                        className="mt-2"
                                        onClick={() =>
                                            setShowCrossCutModal(true)
                                        }
                                    >
                                        Show on Cross Section
                                    </Button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
            </Accordion>
            <LevelCrossCutModal
                activeLevel={currentLevel}
                show={showCrossCutModal}
                handleClose={() => setShowCrossCutModal(false)}
            />
            <LocationModal
                show={showLocationModal}
                handleClose={() => setShowLocationModal(false)}
                location={currentLocation}
                level={currentLevel}
                fetchLevels={fetchLevels}
            />
        </>
    );
};
