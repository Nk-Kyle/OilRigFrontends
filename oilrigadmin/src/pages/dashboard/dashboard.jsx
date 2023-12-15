import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
    Chart,
    ArcElement,
    CategoryScale,
    BarElement,
    LinearScale,
    DoughnutController,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";
import { NavbarComponent } from "../../components/navbar";
import { EmployeeCarousel } from "../../components/dashboard/employeeCarousel";

Chart.register(
    DoughnutController,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const templateDonutData = {
    labels: ["Completed", "Not Completed"],
    datasets: [
        {
            data: [0, 100],
            backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
        },
    ],
};

const templateBarData = {
    labels: ["Activity"],
    datasets: [
        {
            label: "Active",
            data: [0],
            backgroundColor: "rgba(75,192,192,0.4)",
        },
        {
            label: "Inactive",
            data: [10],
            backgroundColor: "rgba(255,99,132,0.4)",
        },
    ],
};

// Define the options for the chart
const barOptions = {
    indexAxis: "y", // This will make the bar chart horizontal
    scales: {
        x: {
            stacked: true,
            display: false,
            grid: {
                display: false,
            },
        },
        y: {
            stacked: true,
            display: false,
            grid: {
                display: false,
            },
        },
    },
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
        },
    },
};

const donutOptions = {
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

const textCenterPlugin2 = {
    id: "textCenter2",
    beforeDraw: (chart) => {
        const {
            ctx,
            data: { datasets },
        } = chart;
        const dataset = datasets[0];

        ctx.save();
        ctx.font = "bolder 2em Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        dataset.data.forEach((value, index) => {
            const x = chart.width / 2; // middle of the canvas width
            const y = (chart.height / dataset.data.length) * (index + 0.5); // middle of the bar

            ctx.fillText(value, x, y);
        });

        ctx.restore();
    },
};

function Dashboard() {
    const [analytics, setAnalytics] = useState({});
    const [progressDivisionDataMap, setprogressDivisionDataMap] = useState({
        Development: JSON.parse(JSON.stringify(templateDonutData)),
        Production: JSON.parse(JSON.stringify(templateDonutData)),
        Construction: JSON.parse(JSON.stringify(templateDonutData)),
    });
    const [activityDivisionDataMap, setActivityDivisionDataMap] = useState({
        Development: JSON.parse(JSON.stringify(templateBarData)),
        Production: JSON.parse(JSON.stringify(templateBarData)),
        Construction: JSON.parse(JSON.stringify(templateBarData)),
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

                const newProgressDivisionDataMap = JSON.parse(
                    JSON.stringify(progressDivisionDataMap)
                );
                Object.keys(newProgressDivisionDataMap).forEach((key) => {
                    if (data.data.division_data[key]) {
                        const completed = Math.round(
                            (data.data.division_data[key].average_progress *
                                100) /
                                100
                        );
                        newProgressDivisionDataMap[key].datasets[0].data = [
                            completed,
                            100 - completed,
                        ];
                    }
                });
                setprogressDivisionDataMap(newProgressDivisionDataMap);

                const newActivityDivisionDataMap = JSON.parse(
                    JSON.stringify(activityDivisionDataMap)
                );
                Object.keys(newActivityDivisionDataMap).forEach((key) => {
                    if (data.data.division_data[key]) {
                        const active = data.data.division_data[key].logged_in;
                        const inactive =
                            data.data.division_data[key].logged_out;
                        newActivityDivisionDataMap[key].datasets[0].data = [
                            active,
                        ];
                        newActivityDivisionDataMap[key].datasets[1].data = [
                            inactive,
                        ];
                    }
                });
                setActivityDivisionDataMap(newActivityDivisionDataMap);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <NavbarComponent />
            {/* Controls */}
            <div className="px-5 pt-2">
                <h1>Dashboard</h1>
                <hr />

                <EmployeeCarousel
                    analytics={analytics}
                    fetchAnalytics={fetchAnalytics}
                />

                <hr />

                <div className="row">
                    {Object.keys(progressDivisionDataMap).map((key, index) => {
                        return (
                            <div className="col-md-4 mt-4" key={index}>
                                <Card>
                                    <Card.Header className="d-flex justify-content-center">
                                        {key} Division Progress
                                    </Card.Header>
                                    <Card.Body>
                                        {/* Using react-chartjs-2 create a donut chart*/}
                                        <Doughnut
                                            data={progressDivisionDataMap[key]}
                                            options={donutOptions}
                                            plugins={[textCenterPlugin]}
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                </div>
                <hr />
                <div className="row">
                    {Object.keys(activityDivisionDataMap).map((key, index) => {
                        return (
                            <div className="col-md-4 mt-4" key={index}>
                                <Card>
                                    <Card.Header className="d-flex justify-content-center">
                                        {key} Division Activity
                                    </Card.Header>
                                    <Card.Body>
                                        {/* Using react-chartjs-2 create a donut chart*/}
                                        <Bar
                                            data={activityDivisionDataMap[key]}
                                            options={barOptions}
                                            plugins={[textCenterPlugin2]}
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                    ;
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
