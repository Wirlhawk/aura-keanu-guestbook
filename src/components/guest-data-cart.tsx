import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const GuestDataCart = ({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className?: string;
}) => {
  return (
    <Card className="flex-1 gap-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className={`font-bold text-7xl ${className}`}>{value}</h1>
      </CardContent>
      <CardFooter>
        <p>Guest</p>
      </CardFooter>
    </Card>
  );
};

export default GuestDataCart;
