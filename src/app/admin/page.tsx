import { getAttendanceSorted } from "@/action/attendance";
import GuestCountChart from "@/components/guest-count-chart";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookUser } from "lucide-react";
import React from "react";

const Page = async () => {
  const summary = await getAttendanceSorted();
  return (
    <PageHeader icon={<BookUser strokeWidth={1.5} />} title="Dashboard">
      <div className="space-y-2 w-full">
        <h1>Total Guest</h1>
        <div className="flex w-full gap-5">
          <Card className="flex-1 gap-2">
            <CardHeader>
              <CardTitle>Total All Guest</CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-7xl">391</h1>
            </CardContent>
            <CardFooter>
              <p>Guest</p>
            </CardFooter>
          </Card>
          <Card className="flex-1 gap-2 max-w-xs">
            <CardHeader>
              <CardTitle>Total Attended Guest</CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-7xl">391</h1>
            </CardContent>
            <CardFooter>
              <p>Guest</p>
            </CardFooter>
          </Card>
          <Card className="flex-1 gap-2 max-w-xs">
            <CardHeader>
                <CardTitle>Total Absent Guests</CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className="font-bold text-7xl">391</h1>
            </CardContent>
            <CardFooter>
              <p>Guests</p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="space-y-2">
        <h1>Attended Guest</h1>
        <div className="grid grid-cols-4 gap-5">
          {summary.map((sum, i) => (
            <GuestCountChart
              key={i}
              name={sum.name}
              value={sum.total_attendance + 300}
              total={sum.total_guests}
            />
          ))}
        </div>
      </div>
    </PageHeader>
  );
};

export default Page;
