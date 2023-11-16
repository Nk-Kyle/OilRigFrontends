import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./employeeTable.css";
import columns from "../../data/employeeColumns";
export const EmployeeTable = (assignments) => {
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
