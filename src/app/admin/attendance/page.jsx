import React from "react";
import { ListCheck } from "lucide-react";
import PageHeader from "@/components/page-header";
import { columns } from "./column";
import { getAllAttendance } from "@/action/attendance";
import { DataTable } from "./data-table";

const AttendancePage = async () => {
    const attendance = await getAllAttendance();
    console.log(attendance);

    return (
        <PageHeader icon={<ListCheck strokeWidth={1.5} />} title="Attendance List">
            <DataTable columns={columns} data={attendance} />
        </PageHeader>
    );
};

export default AttendancePage;
