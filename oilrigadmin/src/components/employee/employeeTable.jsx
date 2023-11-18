import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./employeeTable.css";
import getColumns from "../../data/employeeColumns";
import { QRModal } from "./qrModal";
export const EmployeeTable = (assignments) => {
    const [showQRModal, setShowQRModal] = useState(false);
    const [employee, setEmployee] = useState(null);
    const columns = getColumns({
        rowSelected: (row) => {
            setEmployee(row);
            setShowQRModal(true);
        },
    });
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
            <QRModal
                show={showQRModal}
                handleClose={() => setShowQRModal(false)}
                employee={employee}
            />
        </div>
    );
};
