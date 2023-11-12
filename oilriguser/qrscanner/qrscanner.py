import cv2
import requests

def detect_qr(path):
    #use path=0 for webcam
    cap = cv2.VideoCapture(path, cv2.CAP_DSHOW)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 720)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480) 

    qrDetector = cv2.QRCodeDetector()

    fe_url = "http://localhost:5000/qrread"

    while True:
        _, img = cap.read()
        data, one, _ = qrDetector.detectAndDecode(img)
        if data:
            # POST request to backend
            requests.post(fe_url, data={"data": data})
            break

        yield img

    cap.release()
    cv2.destroyAllWindows()

