import { Button } from "react-bootstrap";

const headerSortingClasses = (column, sortOrder) => {
    if (sortOrder === "asc") {
        return "sorting-asc";
    }
    return "sorting-desc";
};
// employeeColumns.jsx
const getColumns = ({ rowSelected }) => {
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
        },
        {
            dataField: "work_type",
            text: "Work Type",
            sort: true,
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
                                console.log(row);
                                rowSelected(row);
                            }}
                        >
                            QR Code
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
