//Create Leaflet map
var isLeafletAvailable = true;
try {
    let test = document.getElementById("map");
    console.log(test);
    if (test === null) {
        isLeafletAvailable = false;
    }
} catch (err) {
    isLeafletAvailable = false;
}

if (isLeafletAvailable) {
    var map = L.map("map", {
        center: [67, 130],
        zoom: 2.8,
    });

    var myIcon = L.icon({
        iconUrl: document.getElementById("leaflet-marker-icon").src,
        iconSize: [25, 41], // size of the icon
        shadowSize: [41, 41], // size of the shadow
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [14, 41], // the same for the shadow
        popupAnchor: [1, -34],
    });
}

function setLeafletImage(imageURL) {
    if (!isLeafletAvailable) {
        return;
    }
    //Set Map Image
    L.imageOverlay(
        imageURL,
        (bounds = [
            [0, 0],
            [3308 / 36, 2338 / 9],
        ])
    ).addTo(map);
}

function setLeafletMarker(levelNumber, isLevel) {
    if (!isLeafletAvailable) {
        return;
    }
    //Remove old marker
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    if (isLevel) {
        L.marker([tasks[levelNumber].level.lat, tasks[levelNumber].level.lng], {
            icon: myIcon,
        }).addTo(map);
    } else {
        L.marker(
            [tasks[levelNumber].crosscut.lat, tasks[levelNumber].crosscut.lng],
            { icon: myIcon }
        ).addTo(map);
    }
}

//VARIABLES
var tasks = [];
var levelImage = "";
var currentLevel = 0;
//Non-Leaflet Variables
var previousLevel = 0;
var taskFilled = [false, false, false];
//Leaflet Variables
var crossSectionImage;
var isLevelState = true;
if (isLeafletAvailable) {
    crossSectionImage = document.getElementById("overlay").src;
}

//Temp
const templevelurl = [
    "https://docs.google.com/uc?export=download&id=1QuuTeTHWGKxgheBxcCdDQAZDqXG8Vb0h",
    "https://docs.google.com/uc?export=download&id=1JxQChyNQ9bg2SW74VovOjMsvbpM_krmO",
    "https://docs.google.com/uc?export=download&id=1BnSThWoFew-j97N54WQPbc7T5H_3EiBR",
];

const temppoint = {
    crosscut_lat: 74.86788912917916,
    crosscut_lng: 47.109375,
    id: "c3464eb1c15f41d587e88a1dd6269cd5",
    level_lat: 80.70363543586616,
    level_lng: 46.23367021983815,
    name: "Test @2",
};

//Other Functions
function changeImage() {
    if (!isLeafletAvailable) {
        return;
    }
    //Pan to center
    map.panTo([67, 130]);
    if (isLevelState) {
        //Swap Image
        document.getElementById("overlay").src = levelImage;
        setLeafletImage(crossSectionImage);
    } else {
        //Swap Image
        document.getElementById("overlay").src = crossSectionImage;
        setLeafletImage(levelImage);
    }

    //Toggle State
    isLevelState = !isLevelState;

    //Swap Marker
    setLeafletMarker(currentLevel, isLevelState);
}

function loadTasks(inputtasks) {
    //Create Tasks
    for (i = 0; i < inputtasks.length; i++) {
        console.log(inputtasks[i]);
        //Create Div
        var myFormCheck = document.createElement("div");
        myFormCheck.classList.add("form-check");

        //Create Input
        var myInput = document.createElement("input");
        myInput.classList.add("form-check-input");
        myInput.type = "radio";
        myInput.name = "flexRadioDefault";
        myInput.id = "flexRadioDefault" + i;
        myInput.checked = i == 0;
        myInput.onclick = changeLevel.bind(this, i);

        //Create Label
        var myLabel = document.createElement("label");
        myLabel.htmlFor = "flexRadioDefault" + i;

        //Create Task Container
        var myTaskContainer = document.createElement("div");
        myTaskContainer.classList.add("task-container");
        myTaskContainer.id = "task-container" + i;
        if (!isLeafletAvailable) {
            myTaskContainer.style.border = "3px solid red";
        }

        //Create Task ID
        var myTaskID = document.createElement("div");
        myTaskID.classList.add("radio-button-2x-label");
        myTaskID.innerHTML = inputtasks[i].id;

        //Create Task Location
        var myTaskLocation = document.createElement("b");
        myTaskLocation.innerHTML = "Location: ";
        var myTaskLocationSpan = document.createElement("span");
        myTaskLocationSpan.innerHTML = inputtasks[i].location_name + " at " + inputtasks[i].level_name;

        //Create Task Description
        var myTaskDescription = document.createElement("b");
        myTaskDescription.innerHTML = "Description: ";
        var myTaskDescriptionP = document.createElement("p");
        myTaskDescriptionP.innerHTML = inputtasks[i].description;

        //Append
        myTaskContainer.appendChild(myTaskID);
        myTaskContainer.appendChild(myTaskLocation);
        myTaskContainer.appendChild(myTaskLocationSpan);
        myTaskContainer.appendChild(document.createElement("br"));
        myTaskContainer.appendChild(myTaskDescription);
        myTaskContainer.appendChild(myTaskDescriptionP);
        myLabel.appendChild(myTaskContainer);
        myFormCheck.appendChild(myInput);
        myFormCheck.appendChild(myLabel);
        document.getElementById("tasks-container").appendChild(myFormCheck);

        //Put in array
        tasks.push({
            id: inputtasks[i].id,
            location_name: inputtasks[i].location_name,
            description: inputtasks[i].description,
            image: inputtasks[i].img_url,
            level: {
                lat: inputtasks[i].location.level_lat,
                lng: inputtasks[i].location.level_lng,
            },
            crosscut: {
                lat: inputtasks[i].location.crosscut_lat,
                lng: inputtasks[i].location.crosscut_lng,
            },
        });
    }

    //Create Return Button
    let myHRef = document.createElement("a");
    myHRef.href = "/";
    let myButton = document.createElement("button");
    myButton.type = "button";
    myButton.id = "task-button";
    myButton.classList.add("btn");
    myButton.classList.add("btn-danger");
    myButton.style.marginLeft = "1.5vw";
    myButton.style.marginTop = "1vh";
    if (isLeafletAvailable) {
        myButton.innerHTML = "Return to Home Page";
    } else {
        myButton.innerHTML = "To Logout, Please Fill All Tasks";
        myButton.disabled = true;
    }
    myHRef.appendChild(myButton);
    document.getElementById("tasks-container").appendChild(myHRef);

    changeLevel(0);
}

function changeLevel(levelNumber) {
    if (levelNumber > tasks.length - 1) {
        return;
    }

    if (!isLevelState) {
        changeImage();
    }

    //Set Current Level
    currentLevel = levelNumber;

    if (!isLeafletAvailable) {
        document.getElementById("taskId").value = tasks[levelNumber].id;
        document.getElementById("location").value =
            tasks[levelNumber].location_name;
        document.getElementById("locationImage").src = tasks[levelNumber].image;
        document.getElementById("description").value =
            tasks[levelNumber].description;
        if (tasks[levelNumber].progress != undefined) {
            document.getElementById("progress").value =
                tasks[levelNumber].progress;
        } else {
            document.getElementById("progress").value = "";
        }
        if (tasks[levelNumber].notes != undefined) {
            document.getElementById("notes").value = tasks[levelNumber].notes;
        } else {
            document.getElementById("notes").value = "";
        }
    } else {
        //Set Map Image
        levelImage = tasks[levelNumber].image;
        setLeafletImage(levelImage);

        //Set Leaflet Marker
        setLeafletMarker(levelNumber, isLevelState);
    }

    //Set Previous Level
    previousLevel = levelNumber;
}

function test() {
    console.log("test");
}

function fillTask() {
    taskFilled[previousLevel] = true;
    document.getElementById("task-container" + previousLevel).style.border =
        "3px solid green";
    //Save Progress and Notes
    let myProgress = document.getElementById("progress").value;
    let myNotes = document.getElementById("notes").value;
    if (myProgress != "") {
        tasks[previousLevel].progress = myProgress;
    }
    if (myNotes != "") {
        tasks[previousLevel].notes = myNotes;
    }

    if (taskFilled[0] && taskFilled[1] && taskFilled[2]) {
        document.getElementById("task-button").innerHTML = "Logout";
        document.getElementById("task-button").disabled = false;
        document.getElementById("task-button").onclick = logoutHandler;
    }
}

function nextTask() {
    changeLevel((currentLevel + 1) % tasks.length);
    //Change Radio Button
    document.getElementById("flexRadioDefault" + currentLevel).checked = true;
}

function logoutHandler() {
    if (taskFilled[0] && taskFilled[1] && taskFilled[2]) {
        let assignment_statuses = [];
        for (let i = 0; i < tasks.length; i++) {
            assignment_statuses.push({
                id: tasks[i].id,
                progress: tasks[i].progress,
                remarks: tasks[i].notes || "",
                is_completed: tasks[i].progress == 100 ? true : false,
            });
        }

        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log(response);
            }
        };
        xhttp.open("POST", "http://localhost:3000/employees/logout", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(
            JSON.stringify({
                id: id,
                password: password,
                assignment_statuses: assignment_statuses,
            })
        );
    }
}
