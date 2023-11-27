import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { ConfirmationModal } from "../confirmationModal";
import "./assignmentTable.css";
import { getColumns, expandRow } from "../../data/assignmentColumns";

export const AssignmentTable = ({ assignments, fetchAssignments }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);

    const columns = getColumns({
        handleDelete: (row) => {
            setShowConfirm(true);
            setCurrentRow(row);
        },
    });

    const deleteAssignment = (id) => {
        fetch(process.env.REACT_APP_BACKEND + "/assignments/" + id, {
            method: "DELETE",
        })
            .then(() => {
                setShowConfirm(false);
                fetchAssignments();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <BootstrapTable
                keyField="id"
                data={assignments}
                columns={columns}
                expandRow={expandRow}
                striped
                hover
                pagination={paginationFactory()}
                noDataIndication={() => "No Data Found"}
            />
            <ConfirmationModal
                show={showConfirm}
                handleClose={() => setShowConfirm(false)}
                handleConfirm={() => deleteAssignment(currentRow.id)}
                title="Delete Assignment"
                body="Are you sure you want to delete this assigment? This action cannot be undone."
                details={
                    <div className="mt-2">
                        <p>
                            <strong>Assignment ID:</strong>{" "}
                            {currentRow && currentRow.id}
                        </p>
                        <p>
                            <strong>Assignment Description:</strong>{" "}
                            {currentRow && currentRow.description}
                        </p>
                    </div>
                }
            />
        </div>
    );
};
