import { BookUser } from "lucide-react";
import React from "react";

const AddGuestPage = () => {
  return (
    <div className="rounded-md border bg-white space-y-2 p-5 px-7">
      <span className="flex gap-3 items-center">
        <BookUser strokeWidth={1.5} />
        <h1 className="text-2xl">Add Guest Form</h1>
      </span>

      
    </div>
  );
};

export default AddGuestPage;
