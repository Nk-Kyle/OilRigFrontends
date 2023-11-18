import { Button } from "react-bootstrap";

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
            dataField: "df1",
            text: "Action",
            sort: false,
            formatter: (cell, row) => {
                return (
                    <div>
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                showQR(row);
                            }}
                        >
                            QR Code
                        </Button>
                        <Button
                            variant="outline-danger"
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
