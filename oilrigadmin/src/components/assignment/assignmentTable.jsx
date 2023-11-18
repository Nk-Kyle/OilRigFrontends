import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./assignmentTable.css";
import { columns, expandRow } from "../../data/assignmentColumns";
export const AssignmentTable = (assignments) => {
    return (
        <div>
            <BootstrapTable
                keyField="id"
                data={assignments.assignments}
                columns={columns}
                expandRow={expandRow}
                striped
                hover
                noDataIndication={() => "No Data Found"}
            />
        </div>
    );
};
