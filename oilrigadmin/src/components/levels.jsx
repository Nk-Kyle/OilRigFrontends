import React, { useState, useEffect } from "react";
import { Accordion, ListGroup } from "react-bootstrap";

export const LevelAccordion = ({ levels, search, setActiveLevel }) => {
    const [activeKey, setActiveKey] = useState("");

    useEffect(() => {
        if (levels.length > 0) {
            setActiveKey(levels[0].name);
            setActiveLevel(levels[0]);
        }
    }, [levels, setActiveLevel]);

    const handleToggle = (key) => {
        setActiveKey(key);
        setActiveLevel(levels.find((level) => level.name === key));
    };

    return (
        <Accordion activeKey={activeKey}>
            {levels
                .filter((level) => level.name.toLowerCase().includes(search))
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
                                            console.log("Perform action here")
                                        }
                                        key={level.name + "-" + location.name}
                                    >
                                        {location.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
        </Accordion>
    );
};
