import React, { useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./assignmentTable.css";
import columns from "../../data/columns";
export const AssignmentTable = (assignments) => {
    const mock = [
        {
            creator: "admin",
            description: "Test",
            division: "Development",
            id: "JB4",
            level_id: "654bacafc5c9a371ec3613d2",
            level_name: "A1",
            location_id: "c3464eb1c15f41d587e88a1dd6269cd5",
            location_name: "Test @2",
            pdf_link:
                "https://drive.google.com/file/d/1Ei0S3sfTrMMVc2zG-1QH2iaGAUj6s_OV/view?usp=drive_link",
            status: "TO DO",
            work_type: "Operator Jumbodrill",
        },
    ];

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
