import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { getGuests } from "@/action/guest";

const GuestPage = async () => {
    const guests = await getGuests();
    console.log(guests);

    return (
        <div className="rounded-md border bg-white space-y-2 p-5 px-7">
            <h1 className="text-2xl">Guest List</h1>
            <DataTable columns={columns} data={guests} />
        </div>
    );
};

export default GuestPage;
