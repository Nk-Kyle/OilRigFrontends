import { Badge, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import {
    textFilter,
    selectFilter,
    numberFilter,
} from "react-bootstrap-table2-filter";
import setting from "./setting";

const headerSortingClasses = (column, sortOrder) => {
    if (sortOrder === "asc") {
        return "sorting-asc";
    }
    return "sorting-desc";
};

const getColumns = ({ handleDelete }) => {
    let columns = [
        {
            dataField: "id",
            text: "Assignment ID",
            sort: true,
            headerSortingClasses: headerSortingClasses,
            filter: textFilter(),
        },
        {
            dataField: "division",
            text: "Division",
            sort: true,
            headerSortingClasses: headerSortingClasses,
            filter: selectFilter({
                options: {
                    ...setting.division.reduce((acc, cur) => {
                        acc[cur.name] = cur.name;
                        return acc;
                    }, {}),
                },
            }),
        },
        {
            dataField: "work_type",
            text: "Work Type",
            sort: true,
            headerSortingClasses: headerSortingClasses,
            filter: selectFilter({
                options: {
                    ...setting.division.reduce((acc, cur) => {
                        cur.work_types.forEach((work_type) => {
                            acc[work_type.name] = work_type.name;
                        });
                        return acc;
                    }, {}),
                },
            }),
        },
        {
            dataField: "level_name",
            text: "Level Name",
            sort: true,
            headerSortingClasses: headerSortingClasses,
            filter: textFilter(),
        },
        {
            dataField: "location_name",
            text: "Location Name",
            sort: true,
            headerSortingClasses: headerSortingClasses,
            filter: textFilter(),
        },
        {
            dataField: "progress",
            text: "Progress",
            sort: true,
            headerSortingClasses: headerSortingClasses,
            filter: numberFilter({
                defaultValue: { number: 0, comparator: ">=" },
            }),
        },
        {
            dataField: "priority",
            text: "Priority",
            sort: true,
            headerSortingClasses: headerSortingClasses,
            filter: numberFilter({
                defaultValue: { number: 0, comparator: ">=" },
            }),
        },

        {
            dataField: "status",
            text: "Status",
            sort: true,
            formatter: (cellContent, row) => {
                let color;
                switch (cellContent) {
                    case "TO DO":
                        color = "info";
                        break;
                    case "IN PROGRESS":
                        color = "primary";
                        break;
                    case "DONE":
                        color = "success";
                        break;
                    default:
                        color = "dark";
                }
                return (
                    <Badge pill bg={color}>
                        {cellContent}
                    </Badge>
                );
            },
            headerSortingClasses: headerSortingClasses,
            filter: selectFilter({
                options: {
                    "TO DO": "TO DO",
                    "IN PROGRESS": "IN PROGRESS",
                    DONE: "DONE",
                },
            }),
        },
        {
            dataField: "df1",
            text: "Actions",
            sort: false,
            formatter: (cell, row) => {
                return (
                    <div>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                                const pattern = /\/d\/(.*)\/view/i;
                                const match = row.pdf_link.match(pattern);
                                const fileId = match[1];
                                const link =
                                    "https://drive.google.com/uc?print=false&id=" +
                                    fileId;
                                window.open(link, "_blank");
                            }}
                        >
                            Open PDF
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="mx-2"
                            onClick={() => handleDelete(row)}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];

    return columns.map((column) => {
        return {
            ...column,
            style: {
                overflow: "auto", // Add scrollbars if content is too big
                wordWrap: "break-word", // Break words into new lines
            },
        };
    });
};

const expandColumns = [
    {
        dataField: "timestamp",
        text: "Timestamp",
    },
    {
        dataField: "state",
        text: "Status",
    },
    {
        dataField: "progress",
        text: "Progress",
    },
    {
        dataField: "assigned_to.name",
        text: "Assigned To",
    },
    { dataField: "remarks", text: "Remarks" },
];
const expandRow = {
    onlyOneExpanding: true,
    renderer: (row) => (
        <div>
            Description: {row.description}
            <BootstrapTable
                keyField="id"
                data={row.logs}
                columns={expandColumns}
                hover
                noDataIndication={() => "No Data Found"}
            />
        </div>
    ),
};
export { getColumns, expandRow };
