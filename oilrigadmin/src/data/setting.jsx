// setting will be used to store the settings of the application
// If the setting store is empty, the application will fetch the settings from the server

const setting = {
    division: [
        {
            name: "Development",
            work_types: [
                {
                    name: "Operator Jumbodrill",
                    prefix: "JB",
                },
                { name: "Operator Cablebolt", prefix: "CB" },
            ],
        },
        {
            name: "Production",
            work_types: [
                {
                    name: "Operator LHD",
                    prefix: "LHD",
                },
                { name: "Operator Dump Truck", prefix: "DT" },
            ],
        },
        {
            name: "Construction",
            work_types: [
                { name: "Welder", prefix: "WD" },
                { name: "Helper", prefix: "HP" },
            ],
        },
    ],
    status: ["TO DO", "IN PROGRESS", "DONE", "CANCELLED", "ON HOLD"],
};

export default setting;
