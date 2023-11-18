import { Modal, Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useRef } from "react";

export const QRModal = ({ show, employee, handleClose }) => {
    const qrRef = useRef();

    const downloadQR = () => {
        const svg = qrRef.current.childNodes[0];
        const canvas = document.createElement("canvas");
        const svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src =
            "data:image/svg+xml;base64," +
            btoa(new XMLSerializer().serializeToString(svg));
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "QRCode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    ref={qrRef}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <QRCode
                        value={
                            employee
                                ? JSON.stringify({
                                      id: employee.id,
                                      password: employee.password,
                                  })
                                : ""
                        }
                    />
                </div>
                <p className="mt-2">
                    <b>Employee ID:</b> {employee ? employee.id : ""}
                    <br />
                    <b>Employee Name:</b> {employee ? employee.name : ""}
                </p>
                <Button variant="primary" onClick={downloadQR}>
                    Download QR Code
                </Button>
            </Modal.Body>
        </Modal>
    );
};
