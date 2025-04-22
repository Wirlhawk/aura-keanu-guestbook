import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { Home, Link } from "lucide-react";
import { Separator } from "@radix-ui/react-select";

const PageHeader = ({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}) => {
  return (
    <div className="rounded-md border bg-white space-y-5 p-5 px-7">
      <div className="flex gap-2">
        <Button asChild variant={"outline"}>
          <Link href="/">
            <Home />
            Menu
          </Link>
        </Button>

        <Separator aria-orientation="vertical" />

        <span className="flex gap-2 items-center">
          {icon}
          <h1 className="text-2xl">{title}</h1>
        </span>
      </div>

      {children}
    </div>
  );
};

export default PageHeader;
