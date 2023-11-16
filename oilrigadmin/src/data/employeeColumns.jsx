const headerSortingClasses = (column, sortOrder) => {
    if (sortOrder === "asc") {
        return "sorting-asc";
    }
    return "sorting-desc";
};

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

export default columns;
