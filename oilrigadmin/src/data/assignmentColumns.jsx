import { Badge } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
const headerSortingClasses = (column, sortOrder) => {
    if (sortOrder === "asc") {
        return "sorting-asc";
    }
    return "sorting-desc";
};

let columns = [
    {
        dataField: "id",
        text: "Assignment ID",
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
        dataField: "level_name",
        text: "Level Name",
        sort: true,
        headerSortingClasses: headerSortingClasses,
    },
    {
        dataField: "location_name",
        text: "Location Name",
        sort: true,
        headerSortingClasses: headerSortingClasses,
    },
    {
        dataField: "pdf_link",
        text: "PDF Link",
        formatter: (cellContent, row) => {
            const pattern = /\/d\/(.*)\/view/i;
            const match = cellContent.match(pattern);
            const fileId = match[1];
            const link = "https://drive.google.com/uc?print=false&id=" + fileId;
            return (
                <a href={link} target="_blank" rel="noreferrer">
                    Open PDF
                </a>
            );
        },
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
    },
];

columns = columns.map((column) => {
    return {
        ...column,
        style: {
            overflow: "auto", // Add scrollbars if content is too big
            wordWrap: "break-word", // Break words into new lines
        },
    };
});

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
export { columns, expandRow };
