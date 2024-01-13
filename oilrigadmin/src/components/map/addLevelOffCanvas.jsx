import React, { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";

export const AddLevelOffCanvas = ({ show, handleClose, fetchLevels }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [levelName, setLevelName] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setShowError(false);
    }, [imageUrl, levelName]);

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

    const handleSubmit = () => {
        // Check if both fields are filled

        // Send the request to the backend
        fetch(process.env.REACT_APP_BACKEND + "/manage/levels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: levelName,
                img_url: imageUrl,
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
        });
    };

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add Level</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Level Name"
                        onChange={(e) => setLevelName(e.target.value)}
                    />
                    <input
                        type="url"
                        className="form-control mt-2"
                        placeholder="https://drive.google.com/file/d/1Ok3pbMZhRWth9gaxeh4go8xSDhZF_Srw/view?usp=drive_link"
                        onChange={(e) => updateImageUrl(e.target.value)}
                    />
                    <Button
                        variant="primary"
                        className="mt-2"
                        onClick={handleSubmit}
                        disabled={!imageUrl || !levelName}
                    >
                        Add Level
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
                            <p className="text-danger">
                                Level Name Already Exists
                            </p>
                        )}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};
