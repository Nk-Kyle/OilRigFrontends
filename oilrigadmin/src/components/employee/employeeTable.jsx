import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import getColumns from "../../data/employeeColumns";
import { QRModal } from "./qrModal";
import filterFactory from "react-bootstrap-table2-filter";
export const EmployeeTable = ({ employees, fetchEmployees }) => {
    const [showQRModal, setShowQRModal] = useState(false);
    const [employee, setEmployee] = useState(null);
    const columns = getColumns({
        showQR: (row) => {
            setEmployee(row);
            setShowQRModal(true);
        },
        handleDelete: (row) => {
            fetch(process.env.REACT_APP_BACKEND + "/employees/" + row.id, {
                method: "DELETE",
            })
                .then(() => {
                    fetchEmployees();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });
    return (
        <div>
            <BootstrapTable
                keyField="id"
                data={employees}
                columns={columns}
                striped
                hover
                noDataIndication={() => "No Data Found"}
                filter={filterFactory()}
            />
            <QRModal
                show={showQRModal}
                handleClose={() => setShowQRModal(false)}
                employee={employee}
            />
        </div>
    );
};
