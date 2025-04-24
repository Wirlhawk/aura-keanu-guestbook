import { getAttendanceSorted } from "@/action/attendance";
import GuestCountChart from "@/components/guest-count-chart";
import GuestDataCart from "@/components/guest-data-cart";
import PageHeader from "@/components/page-header";
import { BookUser } from "lucide-react";
import React from "react";

const Page = async () => {
  const summary = await getAttendanceSorted();

  console.log(summary);

  const totalAttendance = summary.reduce(
    (acc, curr) => acc + curr.total_attendance,
    0
  );
  const totalGuests = summary.reduce((acc, curr) => acc + curr.total_guests, 0);


  return (
    <PageHeader icon={<BookUser strokeWidth={1.5} />} title="Dashboard">
      <div className="space-y-2 w-full">
        <h1>Total Guest</h1>
        <div className="flex w-full gap-5">
          <GuestDataCart
            title="Total Guest"
            value={totalGuests}
            className="text-blue-800"
          />
          <GuestDataCart
            title="Total Attended Guest"
            value={totalAttendance}
            className="text-green-800"
          />
          <GuestDataCart
            title="Total Absent Guest"
            value={totalGuests - totalAttendance}
            className="text-red-800"
          />
        </div>
      </div>
      <div className="space-y-2">
        <h1>Attended Guest</h1>
        <div className="grid grid-cols-6 gap-5">
          {summary.map((sum, i) => (
            <GuestCountChart
              key={i}
              name={sum.name}
              value={sum.total_attendance }
              total={sum.total_guests}
            />
          ))}
        </div>
      </div>
    </PageHeader>
  );
};

export default Page;
