import React, { useState } from "react";
import { MapContainer, Marker, ImageOverlay } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import { marker } from "./marker";
export const LeafletCanvas = ({ activeLevel, defaultIcon }) => {
    const [markers, setMarkers] = useState([]);
    const [imageBounds, setImageBounds] = useState([
        [0, 0],
        [1, 1],
    ]);

    const handleImageLoad = ({ target: img }) => {
        setImageBounds([
            [0, 0],
            [img.naturalWidth / 36, img.naturalHeight / 9],
        ]);
    };
    const AddMarker = () => {
        useMapEvents({
            dblclick: (e) => {
                setMarkers([...markers, e.latlng]);
            },
        });
        return null;
    };

    return (
        <>
            <img
                src={activeLevel ? activeLevel.img_url : ""}
                onLoad={handleImageLoad}
                style={{ display: "none" }}
                alt=""
            />
            <MapContainer
                center={[70, 120]}
                zoom={2.5}
                style={{ height: "89vh", width: "100%" }}
            >
                <AddMarker />
                {markers.map((position, idx) => (
                    <Marker
                        key={`marker-${idx}`}
                        position={position}
                        icon={marker}
                    />
                ))}
                <ImageOverlay
                    url={activeLevel ? activeLevel.img_url : ""}
                    bounds={imageBounds}
                />
            </MapContainer>
        </>
    );
};
