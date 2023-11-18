
import json
import os
from dotenv import load_dotenv
import cv2
import requests

class QRScanner:

    def __init__(self):
        self.id = None
        self.division = None
        self.user_name = None
        self.url = None
        self.user_type = None
        self.is_logged_in = None
        
        load_dotenv()
        self.api_key = 'Bearer ' + os.environ.get('API_KEY')
    
    def reset_data(self):
        self.id = None
        self.user_name = None
        self.user_type = None
        self.division = None
        self.url = None
        self.is_logged_in = None
    
    def get_data(self):
        return{
            "id": self.id,
            "division": self.division,
            "username": self.user_name,
            "photo_url": self.url,
            "usertype": self.user_type,
            "is_logged_in": self.is_logged_in
        }

    def set_data(self, data):
        _id = data.get("id")
        _division = data.get("division")
        _name = data.get("name")
        _url = data.get("photo_url")
        _type = data.get("work_type")
        _is_logged_in = data.get("is_logged_in")

        if _id:
            self.id = _id
        if _division:
            self.division = _division
        if _name:
            self.user_name = _name
        if _url:
            self.url = _url
        if _type:
            self.user_type = _type
        if _is_logged_in is not None:
            self.is_logged_in = _is_logged_in


    def detect_qr(self, path):
        #use path=0 for webcam
        cap = cv2.VideoCapture(path, cv2.CAP_DSHOW)
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 720)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480) 

        qrDetector = cv2.QRCodeDetector()

        fe_url = "http://localhost:5000/qrdata"
        be_url = "https://oil-rig-api.vercel.app/employees/info"

        while True:
            _, img = cap.read()
            try:
                data, one, _ = qrDetector.detectAndDecode(img)
                if data:
                    response = requests.post(be_url, json=json.loads(data)).json()
                    # get user data
                    response_code = response.get("status")
                    if(response_code != 200):
                        continue
                    #Process User Data
                    user_data = response.get("data")
                    print(user_data)
                    # notify html

                    requests.post(fe_url, headers={'Authorization': self.api_key}, data=user_data)
                    cv2.destroyAllWindows()
                    cap.release()
                    return img

                yield img
            except Exception as e:
                print(e)
                pass
        

    def generate_qr_frames(self, path_x):
        qr_output = self.detect_qr(path_x)
        for detection_ in qr_output:
            ref,buffer=cv2.imencode('.jpg',detection_)

            frame=buffer.tobytes()
            yield (b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + frame +b'\r\n')
