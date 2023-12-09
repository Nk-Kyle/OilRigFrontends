import { Button, Badge } from "react-bootstrap";
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
// employeeColumns.jsx
const getColumns = ({ showQR, handleDelete }) => {
    let columns = [
        {
            dataField: "id",
            text: "Employee ID",
            sort: true,
            headerSortingClasses: headerSortingClasses,
            filter: textFilter(),
        },
        {
            dataField: "name",
            text: "Employee Name",
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
            dataField: "is_logged_in",
            text: "Status",
            sort: true,
            formatter: (cellContent, row) => {
                if (cellContent) {
                    return (
                        <Badge
                            pill
                            bg="success"
                            style={{ fontSize: "0.8em", padding: "6px 12px" }}
                        >
                            Logged In
                        </Badge>
                    );
                } else {
                    return (
                        <Badge
                            pill
                            bg="primary"
                            style={{ fontSize: "0.8em", padding: "6px 12px" }}
                        >
                            Logged Out
                        </Badge>
                    );
                }
            },
            headerSortingClasses: headerSortingClasses,
            filter: selectFilter({
                options: {
                    true: "Logged In",
                    false: "Logged Out",
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
                                showQR(row);
                            }}
                        >
                            QR Code
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                                handleDelete(row);
                            }}
                            className="mx-2"
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

export default getColumns;
