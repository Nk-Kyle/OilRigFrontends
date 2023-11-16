import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./assignmentTable.css";
import columns from "../../data/assignmentColumns";
export const AssignmentTable = (assignments) => {
    return (
        <div>
            <BootstrapTable
                keyField="id"
                data={assignments.assignments}
                columns={columns}
                striped
                hover
                noDataIndication={() => "No Data Found"}
            />
        </div>
    );
};
