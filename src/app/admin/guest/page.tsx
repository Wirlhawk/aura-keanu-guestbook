import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { getGuests } from "@/action/guest";
import { BookUser } from "lucide-react";

const GuestPage = async () => {
  const guests = await getGuests();

  return (
    <div className="rounded-md border bg-white space-y-2 p-5 px-7">
      <span className="flex gap-3 items-center">
        <BookUser strokeWidth={1.5} />
        <h1 className="text-2xl">Guest List</h1>
      </span>
      <DataTable columns={columns} data={guests} />
    </div>
  );
};

export default GuestPage;
