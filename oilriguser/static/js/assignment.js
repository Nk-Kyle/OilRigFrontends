//VARIABLES
var tasks = [];
const crossSectionImage = document.getElementById("overlay").src;
var levelImage = "";
var currentLevel = 0;

//STATE
var isLevelState = true;

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

var temptask = {
    data: [
        {
            creator: "admin",
            description: "Test",
            division: "Development",
            id: "JB4",
            level_id: "654bacafc5c9a371ec3613d2",
            level_name: "A1",
            location_id: "c3464eb1c15f41d587e88a1dd6269cd5",
            location_name: "Test @2",
            pdf_link:
                "https://drive.google.com/file/d/1Ei0S3sfTrMMVc2zG-1QH2iaGAUj6s_OV/view?usp=drive_link",
            status: "TO DO",
            work_type: "Operator Jumbodrill",
        },
        {
            creator: "admin",
            description: "Test 2",
            division: "Development",
            id: "JB5",
            level_id: "654bacafc5c9a371ec3613d2",
            level_name: "A1",
            location_id: "c3464eb1c15f41d587e88a1dd6269cd5",
            location_name: "Test @2",
            pdf_link:
                "https://drive.google.com/file/d/1Ei0S3sfTrMMVc2zG-1QH2iaGAUj6s_OV/view?usp=drive_link",
            status: "TO DO",
            work_type: "Operator Jumbodrill",
        },
    ],
    status: 200,
};

//Create Leaflet map
var map = L.map("map", {
    center: [67, 130],
    zoom: 2.8,
});

var myIcon = L.icon({
    iconUrl: document.getElementById("leaflet-marker-icon").src,
    shadowSize: [0, 0],
});

function setLeafletImage(imageURL) {
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

//Other Functions
function changeImage() {
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
    for (i = 0; i < inputtasks.length; i++) {
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
        myLabel.classList.add("radio-button-2x-label");
        myLabel.htmlFor = "flexRadioDefault" + i;
        myLabel.innerHTML = inputtasks[i].id;

        //Append
        myFormCheck.appendChild(myInput);
        myFormCheck.appendChild(myLabel);
        document.getElementById("task-container").appendChild(myFormCheck);

        //Put in array
        //TODO: get data correctly
        tasks.push({
            image: templevelurl[i],
            level: {
                lat: temppoint.crosscut_lat,
                lng: temppoint.crosscut_lng,
            },
            crosscut: {
                lat: temppoint.level_lat,
                lng: temppoint.level_lng,
            },
        });
    }
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

    //Set Map Image
    levelImage = tasks[levelNumber].image;
    setLeafletImage(levelImage);

    //Set Leaflet Marker
    setLeafletMarker(levelNumber, isLevelState);
}

//Execute
//TODO: Get tasks from backend
loadTasks(temptask.data);
