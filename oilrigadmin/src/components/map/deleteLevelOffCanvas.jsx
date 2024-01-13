import React, { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { ConfirmationModal } from "../confirmationModal";

export const DeleteLevelOffCanvas = ({
    show,
    handleClose,
    fetchLevels,
    levels,
}) => {
    const [imageUrl, setImageUrl] = useState("");
    const [levelName, setLevelName] = useState("");
    const [currentId, setCurrentId] = useState("");
    const [showError, setShowError] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        setShowError(false);
    }, [imageUrl, levelName]);

    useEffect(() => {
        if (levels.length > 0) {
            setLevelName(levels[0].name);
            setImageUrl(levels[0].img_url);
            setCurrentId(levels[0].id);
        }
    }, [levels]);

    const checkUrl = (url) => {
        // Regular expression for Google Drive file URLs
        const pattern =
            /^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/view\?usp=drive_link$/;
        // Check if the URL matches the pattern
        return pattern.test(url);
    };

    const updateImageUrl = (url) => {
        // Check if the URL is valid
        const isValid = checkUrl(url);
        // If the URL is valid, update the image URL
        if (isValid) {
            const fileId = extractFileId(url);
            setImageUrl("https://lh3.google.com/u/0/d/" + fileId);
        } else {
            setImageUrl("");
        }
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

    const handleConfirm = () => {
        // Send the request to the backend
        fetch(process.env.REACT_APP_BACKEND + "/manage/levels", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: currentId,
            }),
        }).then((res) => {
            // Check if the response is valid
            if (res.ok) {
                // Reset the fields
                setLevelName("");
                setImageUrl("");
                // Close the offcanvas
                fetchLevels();
                handleClose();
            } else {
                // Show an error message
                setShowError(true);
            }
            setShowConfirmation(false);
        });
    };

    const handleSubmit = () => {
        setShowConfirmation(true);
    };

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Edit Level</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <select
                        className="form-select"
                        onChange={(e) => {
                            setCurrentId(e.target.value);
                            setLevelName(
                                levels.find(
                                    (level) => level.id === e.target.value
                                ).name
                            );
                            setImageUrl(
                                levels.find(
                                    (level) => level.id === e.target.value
                                ).img_url
                            );
                        }}
                    >
                        {levels.map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Level Name"
                        value={levelName}
                        onChange={(e) => setLevelName(e.target.value)}
                        disabled={true}
                    />
                    <input
                        type="url"
                        className="form-control mt-2"
                        placeholder="https://example.com/image.png"
                        value={imageUrl}
                        onChange={(e) => updateImageUrl(e.target.value)}
                        disabled={true}
                    />
                    <Button
                        variant="primary"
                        className="mt-2"
                        onClick={handleSubmit}
                        disabled={!imageUrl || !levelName}
                    >
                        Delete Level
                    </Button>

                    {imageUrl && (
                        <div className="mt-2">
                            <p>Preview:</p>
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="preview-image"
                                style={{ width: "100%" }}
                            />
                        </div>
                    )}

                    <div className="text-center">
                        {showError && (
                            <p className="text-danger">Error deleting level</p>
                        )}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <ConfirmationModal
                show={showConfirmation}
                handleClose={() => setShowConfirmation(false)}
                handleConfirm={handleConfirm}
                title="Delete Level"
                body="Are you sure you want to delete this level?"
            />
        </div>
    );
};
