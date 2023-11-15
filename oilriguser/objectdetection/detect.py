#cource: https://dipankarmedh1.medium.com/real-time-object-detection-with-yolo-and-webcam-enhancing-your-computer-vision-skills-861b97c78993

from ultralytics import YOLO
import cv2
import math 
import requests

class ObjectDetector:

    def __init__(self):
        self.all_objects_detected = False

    def reset_data(self):
        self.all_objects_detected = False

    def get_data(self):
        return{
            "all_objects_detected": self.all_objects_detected
        }
    
    def set_data(self, data):
        _all_objects_detected = data.get("all_objects_detected")

        if _all_objects_detected:
            self.all_objects_detected = bool(_all_objects_detected)

    def detect_object(self,path):
    # start webcam
        cap = cv2.VideoCapture(path, cv2.CAP_DSHOW)
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720) 

        # model
        model = YOLO("objectdetection/best500v8.pt")

        # object classes
        classNames = ["ear-muff","helm", "mask", "safety-glasses","safety-shoes", "vest"]
        classColor = [(0, 0, 255), (0, 255, 0), (255, 0, 0), (0, 255, 255), (255, 255, 0), (255, 0, 255)]


        while True:
            success, img = cap.read()
            results = model(img, stream=True)

            fe_url = "http://localhost:5000/detectdata"

            # 6 bits for 6 classes
            detectedClasses = 0b000000 

            # coordinates
            for r in results:
                boxes = r.boxes

                for box in boxes:
                    # confidence
                    confidence = math.ceil((box.conf[0]*100))/100
                    # print("Confidence --->",confidence)

                    # class name
                    cls = int(box.cls[0])
                    # print("Class name -->", classNames[cls])

                    # detected classes using bitwise
                    detectedClasses |= 1 << cls

                    # bounding box
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2) # convert to int values

                    # put box in cam
                    cv2.rectangle(img, (x1, y1), (x2, y2), classColor[cls], 3)

                    # object details
                    org = [x1, y1]
                    font = cv2.FONT_HERSHEY_SIMPLEX
                    fontScale = 1
                    thickness = 2
                    objetName = classNames[cls] + " " + str(confidence)
                    objectColor = classColor[cls]

                    cv2.putText(img, objetName, org, font, fontScale, objectColor, thickness)

           
            if(detectedClasses == 0b000100):
                requests.post(fe_url, headers={'Authorization': self.api_key}, data={"all_objects_detected": True})
                break

            yield img

        cap.release()
        cv2.destroyAllWindows()

    def generate_object_detection_frame(self,path_x):
        yolo_output = self.detect_object(path_x)
        for detection_ in yolo_output:
            ref,buffer=cv2.imencode('.jpg',detection_)

            frame=buffer.tobytes()
            yield (b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + frame +b'\r\n')