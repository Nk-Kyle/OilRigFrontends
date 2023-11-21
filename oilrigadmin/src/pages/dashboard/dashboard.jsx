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
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    let index = context.dataIndex;
                    let dataset = context.dataset;
                    let currentValue = dataset.data[index];
                    return currentValue + "%";
                },
            },
        },
    },
};

const textCenterPlugin = {
    id: "textCenter",
    beforeDatasetDraw: (chart, args, pluginOptions) => {
        const { ctx, data } = chart;

        ctx.save();
        ctx.font = "bolder 1em Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
            data.datasets[0].data[0] + "%",
            chart.getDatasetMeta(0).data[0].x,
            chart.getDatasetMeta(0).data[0].y
        );
    },
};

function Dashboard() {
    const [analytics, setAnalytics] = useState({});
    const [dataMap, setDataMap] = useState({
        Development: JSON.parse(JSON.stringify(templateData)),
        Production: JSON.parse(JSON.stringify(templateData)),
        Construction: JSON.parse(JSON.stringify(templateData)),
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
                    if (data.data.division_data[key]) {
                        const completed = Math.round(
                            (data.data.division_data[key].average_progress *
                                100) /
                                100
                        );
                        newDataMap[key].datasets[0].data = [
                            completed,
                            100 - completed,
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
                                        {key} Division Progress
                                    </Card.Header>
                                    <Card.Body>
                                        {/* Using react-chartjs-2 create a donut chart*/}
                                        <Doughnut
                                            data={dataMap[key]}
                                            options={options}
                                            plugins={[textCenterPlugin]}
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
