from flask import Flask, redirect, render_template, Response,jsonify,request,session, url_for

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
from objectdetection.detect import generate_object_detection_frame
from qrscanner.qrscanner import QRScanner
app = Flask(__name__)
#TODO: Change the secret key with environment variable
app.config['SECRET_KEY'] = 'secretkey'
myqrscanner = QRScanner()


#Routes
@app.route('/', methods=['GET','POST'])
@app.route('/home', methods=['GET','POST'])
def home():
    myqrscanner.reset_data()
    return render_template('index.html')

# To display the QR Scanner
@app.route('/qrscanner')
def qrscanner():
    return Response(myqrscanner.generate_qr_frames(path_x=0), mimetype='multipart/x-mixed-replace; boundary=frame')

# Handle QR data Data from the QR Scanner
@app.route('/qrdata', methods=['POST', 'GET'])
def qrdata():
    if(request.method == 'POST'):
        myqrscanner.set_data(request.form)
        return jsonify({"status": "success"})
    else:
        return myqrscanner.get_data()

# Rendering the Webcam Rage
@app.route("/detect/<username>", methods=['GET','POST'])
def detect(username):
    return render_template('detect.html',username=username)

# To display the Output Video on Webcam page
@app.route('/webapp')
def webapp():
    return Response(generate_object_detection_frame(path_x=0), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True)