import React from "react";

import { Modal, Button } from "react-bootstrap";

export const ConfirmationModal = ({
    show,
    handleClose,
    handleConfirm,
    title,
    body,
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
