import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
    Chart,
    ArcElement,
    CategoryScale,
    DoughnutController,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { NavbarComponent } from "../../components/navbar";
import { EmployeeCarousel } from "../../components/dashboard/employeeCarousel";

const templateData = {
    labels: ["Completed", "Not Completed"],
    datasets: [
        {
            data: [100, 0],
            backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
        },
    ],
};

// From templateData, change the data to the analytics data
// Copy and update the data from templateData

const options = {
    responsive: true,
    maintainAspectRatio: false,
};

function Dashboard() {
    const [analytics, setAnalytics] = useState({});
    const [dataMap, setDataMap] = useState({
        "Operator Jumbodrill": JSON.parse(JSON.stringify(templateData)),
        "Operator Cablebolt": JSON.parse(JSON.stringify(templateData)),
        "Operator LHD": JSON.parse(JSON.stringify(templateData)),
        "Operator Dump Truck": JSON.parse(JSON.stringify(templateData)),
        Welder: JSON.parse(JSON.stringify(templateData)),
        Helper: JSON.parse(JSON.stringify(templateData)),
    });

    useEffect(() => {
        fetchAnalytics(); // eslint-disable-next-line
    }, []);

    const fetchAnalytics = () => {
        fetch(process.env.REACT_APP_BACKEND + "/analytics", {
            method: "GET",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAnalytics(data.data);

                const newDataMap = JSON.parse(JSON.stringify(dataMap));
                Object.keys(newDataMap).forEach((key) => {
                    if (data.data.work_type_data[key]) {
                        newDataMap[key].datasets[0].data = [
                            data.data.work_type_data[key].average_progress,
                            100 -
                                data.data.work_type_data[key].average_progress,
                        ];
                    }
                });
                setDataMap(newDataMap);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    Chart.register(
        DoughnutController,
        ArcElement,
        CategoryScale,
        Tooltip,
        Legend
    );

    return (
        <div>
            <NavbarComponent />
            {/* Controls */}
            <div className="px-5 pt-2">
                <h1>Dashboard</h1>
                <hr />

                <EmployeeCarousel analytics={analytics} />

                <hr />

                <div className="row">
                    {Object.keys(dataMap).map((key, index) => {
                        return (
                            <div className="col-md-4 mt-4" key={index}>
                                <Card>
                                    <Card.Header className="d-flex justify-content-center">
                                        {key} Progress
                                    </Card.Header>
                                    <Card.Body className="d-flex justify-content-center">
                                        {/* Using react-chartjs-2 create a donut chart*/}
                                        <Doughnut
                                            data={dataMap[key]}
                                            options={options}
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
