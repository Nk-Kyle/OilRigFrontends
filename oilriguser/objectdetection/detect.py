#cource: https://dipankarmedh1.medium.com/real-time-object-detection-with-yolo-and-webcam-enhancing-your-computer-vision-skills-861b97c78993

from ultralytics import YOLO
import cv2
import math 


def detect_object(path):
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

        # TODO: Call Backend for worksheet, then send worksheet to react frontend
        # if(detectedClasses == 0b111111):
        #     print("All objects detected")

        yield img
        # cv2.imshow('Webcam', img)
        # if cv2.waitKey(1) == ord('q'):
        #     break

    cap.release()
    cv2.destroyAllWindows()