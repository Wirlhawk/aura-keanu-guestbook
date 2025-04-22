import AddGuestForm from "@/components/add-guest-form";
import PageHeader from "@/components/page-header";
import { UserPlus } from "lucide-react";
import React from "react";

const AddGuestPage = () => {
  return (
    <PageHeader icon={<UserPlus strokeWidth={1.5} />} title="Add Guest Form">
      <AddGuestForm />
    </PageHeader>
  );
};

export default AddGuestPage;
