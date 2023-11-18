import { Button, Badge } from "react-bootstrap";

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
        },
        {
            dataField: "name",
            text: "Employee Name",
            sort: true,
            headerSortingClasses: headerSortingClasses,
        },
        {
            dataField: "division",
            text: "Division",
            sort: true,
            headerSortingClasses: headerSortingClasses,
        },
        {
            dataField: "work_type",
            text: "Work Type",
            sort: true,
            headerSortingClasses: headerSortingClasses,
        },
        {
            dataField: "is_logged_in",
            text: "Logged In",
            sort: true,
            formatter: (cellContent, row) => {
                if (cellContent) {
                    return (
                        <Badge
                            pill
                            variant="success"
                            style={{ fontSize: "0.8em", padding: "6px 12px" }}
                        >
                            Logged In
                        </Badge>
                    );
                } else {
                    return (
                        <Badge
                            pill
                            variant="success"
                            style={{ fontSize: "0.8em", padding: "6px 12px" }}
                        >
                            Logged Out
                        </Badge>
                    );
                }
            },
            headerSortingClasses: headerSortingClasses,
        },
        {
            dataField: "df1",
            text: "Action",
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
