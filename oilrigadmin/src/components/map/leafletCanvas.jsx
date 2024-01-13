import React, { useState } from "react";
import { CrossCutModal } from "./overviewModal";
import {
    MapContainer,
    Marker,
    ImageOverlay,
    Tooltip,
    useMapEvents,
} from "react-leaflet";
import { marker } from "./marker";
export const LeafletCanvas = ({ activeLevel, fetchLevels }) => {
    const [crosscutShow, setCrosscutShow] = useState(false);
    const [crosscutLatlng, setCrosscutLatlng] = useState({ lat: 0, lng: 0 });

    const imageBounds = useState([
        [0, 0],
        [3308 / 36, 2338 / 9],
    ]);

    const AddMarker = () => {
        useMapEvents({
            dblclick: (e) => {
                setCrosscutLatlng(e.latlng);
                setCrosscutShow(true);
            },
        });
        return null;
    };

    return (
        <>
            <img
                src={activeLevel ? activeLevel.img_url : ""}
                style={{ display: "none" }}
                alt=""
            />
            <MapContainer
                center={[70, 120]}
                zoom={2.5}
                style={{ height: "89vh", width: "100%" }}
            >
                <AddMarker />
                {activeLevel &&
                    activeLevel.locations.map((location, idx) => (
                        <Marker
                            key={`marker-${idx}`}
                            position={[location.level_lat, location.level_lng]}
                            icon={marker}
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
                    url={activeLevel ? activeLevel.img_url : ""}
                    bounds={imageBounds}
                />
            </MapContainer>
            <CrossCutModal
                show={crosscutShow}
                handleClose={() => setCrosscutShow(false)}
                levelId={activeLevel ? activeLevel.id : ""}
                levelLatlng={crosscutLatlng}
                LevelName={activeLevel ? activeLevel.name : ""}
                fetchLevels={fetchLevels}
            />
        </>
    );
};
