from flask import Flask, render_template, Response,jsonify,request,session

#FlaskForm--> it is required to receive input from the user
# Whether uploading a video file  to our object detection model

from flask_wtf import FlaskForm


from wtforms import FileField, SubmitField,StringField,DecimalRangeField,IntegerRangeField
from werkzeug.utils import secure_filename
from wtforms.validators import InputRequired,NumberRange
import os


# Required to run the YOLOv8 model
import cv2

# YOLO_Video is the python file which contains the code for our object detection model
#Video Detection is the Function which performs Object Detection on Input Video
from objectdetection.detect import detect_object
from qrscanner.qrscanner import detect_qr 
app = Flask(__name__)

app.config['SECRET_KEY'] = 'muhammadmoin'
app.config['UPLOAD_FOLDER'] = 'static/files'


def generate_frames_web(path_x):
    yolo_output = detect_object(path_x)
    for detection_ in yolo_output:
        ref,buffer=cv2.imencode('.jpg',detection_)

        frame=buffer.tobytes()
        yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame +b'\r\n')

def generate_qr_frames(path_x):
    qr_output = detect_qr(path_x)
    for detection_ in qr_output:
        ref,buffer=cv2.imencode('.jpg',detection_)

        frame=buffer.tobytes()
        yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame +b'\r\n')

#Routes
@app.route('/', methods=['GET','POST'])
@app.route('/home', methods=['GET','POST'])
def home():
    session.clear()
    return render_template('index.html')

@app.route('/qrscanner')
def qrscanner():
    return Response(generate_qr_frames(path_x=0), mimetype='multipart/x-mixed-replace; boundary=frame')

# Rendering the Webcam Rage
@app.route("/detect", methods=['GET','POST'])
def detect():
    session.clear()
    return render_template('detect.html')

# To display the Output Video on Webcam page
@app.route('/webapp')
def webapp():
    return Response(generate_frames_web(path_x=0), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True)