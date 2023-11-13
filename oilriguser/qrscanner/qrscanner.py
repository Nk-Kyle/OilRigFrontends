import cv2
import requests

class QRScanner:

    def __init__(self):
        self.user_name = None
        self.user_type = None
    
    def reset_data(self):
        self.user_name = None
        self.user_type = None
    
    def get_data(self):
        return{
            "username": self.user_name,
            "usertype": self.user_type
        }

    def set_data(self, data):
        print(data)
        _name = data.get("username")
        _type = data.get("usertype")

        if _name:
            self.user_name = _name
        if _type:
            self.user_type = _type


    def detect_qr(self, path):
        #use path=0 for webcam
        cap = cv2.VideoCapture(path, cv2.CAP_DSHOW)
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 720)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480) 

        qrDetector = cv2.QRCodeDetector()

        fe_url = "http://localhost:5000/qrdata"

        while True:
            _, img = cap.read()
            try:
                data, one, _ = qrDetector.detectAndDecode(img)
                if data:
                    # notify html
                    requests.post(fe_url, data={"username": data, "usertype": "kuli"})

                yield img
            except:
                pass

    def generate_qr_frames(self, path_x):
        qr_output = self.detect_qr(path_x)
        for detection_ in qr_output:
            ref,buffer=cv2.imencode('.jpg',detection_)

            frame=buffer.tobytes()
            yield (b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + frame +b'\r\n')
