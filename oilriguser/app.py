from flask import Flask, redirect, render_template, Response,jsonify,request,session, url_for

#FlaskForm--> it is required to receive input from the user
# Whether uploading a video file  to our object detection model

from flask_wtf import FlaskForm

from wtforms import FileField, SubmitField,StringField,DecimalRangeField,IntegerRangeField
from werkzeug.utils import secure_filename
from wtforms.validators import InputRequired,NumberRange
import os
from dotenv import load_dotenv

# Required to run the YOLOv8 model
import cv2

# Login Manager
import flask_login

# YOLO_Video is the python file which contains the code for our object detection model
#Video Detection is the Function which performs Object Detection on Input Video
from objectdetection.detect import ObjectDetector
from qrscanner.qrscanner import QRScanner
app = Flask(__name__)
#TODO: Change the secret key with environment variable
app.config['SECRET_KEY'] = 'secretkey'
load_dotenv()
request_authorization = 'Bearer '+os.environ.get('API_KEY')

#Initialize the QR Scanner and Object Detector
myqrscanner = QRScanner()
myobjectdetector = ObjectDetector()

#Setting up the Login Manager
login_manager = flask_login.LoginManager()
login_manager.init_app(app)
class User(flask_login.UserMixin):
    def __init__(self,id=None):
        self.id = id

@login_manager.user_loader
def load_user(id):
    return User(id)

#Routes
@app.route('/', methods=['GET','POST'])
@app.route('/home', methods=['GET','POST'])
def home():
    flask_login.logout_user()
    myqrscanner.reset_data()
    return render_template('index.html')

#Login Page
@app.route('/loginpage', methods=['GET','POST'])
def loginpage():
    flask_login.logout_user()
    myqrscanner.reset_data()
    return render_template('login.html',API_KEY=os.environ.get('API_KEY'))


#Middleware to move from loginpage to detect
@app.route('/login', methods=['GET','POST'])
def login():
    if myqrscanner.id is None:
        return redirect(url_for('loginpage'))

    user = User(myqrscanner.id)
    flask_login.login_user(user)
    return redirect(url_for('detect'))

# To display the QR Scanner
@app.route('/qrscanner')
def qrscanner():
    return Response(myqrscanner.generate_qr_frames(path_x=0), mimetype='multipart/x-mixed-replace; boundary=frame')

# Handle QR data Data from the QR Scanner
@app.route('/qrdata', methods=['POST', 'GET'])
def qrdata():
    if(str(request.authorization) != request_authorization):
        return jsonify({"status": "unauthorized"})
    
    if(request.method == 'POST'):
        myqrscanner.set_data(request.form)
        return jsonify({"status": "success"})
    else:
        return myqrscanner.get_data()

# Rendering the Webcam Rage
@app.route("/detect", methods=['GET'])
@flask_login.login_required
def detect():
    myobjectdetector.reset_data()
    return render_template('detect.html',username=myqrscanner.user_name, API_KEY=os.environ.get('API_KEY'))

# To display the Output Video on Webcam page
@app.route('/webapp')
def webapp():
    return Response(myobjectdetector.generate_object_detection_frame(path_x=0), mimetype='multipart/x-mixed-replace; boundary=frame')

# Handle detection data from the webcam
@app.route('/detectdata', methods=['POST', 'GET'])
def detectdata():
    if(str(request.authorization) != request_authorization):
        return jsonify({"status": "unauthorized"})

    if(request.method == 'POST'):
        myobjectdetector.set_data(request.form) 
        return jsonify({"status": "success"})
    else:
        return myobjectdetector.get_data()

#Assignments Page
@app.route('/assignment', methods=['GET'])
@flask_login.login_required
def assignment():
    # TODO: Uncomment the following code to enable assignment page
    # if(myobjectdetector.get_data() == True):
    #     return render_template('assignment.html')
    # else:
    #     return redirect(url_for('detect'))
    return render_template('assignment.html')

if __name__ == "__main__":
    app.run(debug=True)