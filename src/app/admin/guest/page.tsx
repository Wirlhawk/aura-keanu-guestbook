import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { getGuests } from "@/action/guest";
import { BookUser} from "lucide-react";
import PageHeader from "@/components/page-header";

const GuestPage = async () => {
  const guests = await getGuests();

  return (
    <PageHeader icon={<BookUser strokeWidth={1.5} />} title="Guest List">
      <DataTable columns={columns} data={guests} />
    </PageHeader>
  );
};

export default GuestPage;
