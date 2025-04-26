/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import dayjs from "dayjs";

import { ColumnDef } from "@tanstack/react-table";
import { Guest } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { removeAttendanceById } from "@/action/attendance";

export const columns: ColumnDef<Guest>[] = [
  {
    id: "NO",
    accessorKey: "NO",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No.
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row, table }) => {
      const dataIndex = table
        .getCoreRowModel()
        .rows.findIndex((r) => r.id === row.id);
      return dataIndex + 1;
    },
  },
  {
    accessorKey: "guest_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "relation_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Relation
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "vip",
    cell: ({ row }) => {
      const vip = row.getValue("vip") as boolean;
      return vip ? (
        <Badge className="bg-yellow-300 text-yellow-800">VIP {vip}</Badge>
      ) : (
        <Badge className="bg-gray-300 text-gray-800 ">NON-VIP</Badge>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          VIP
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: "checked_in",
    accessorKey: "checked_in",
    cell: ({ row }) => {
      return dayjs(row.original.checked_in).format("hh:mm | DD MMM ");
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Check In Time
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="destructive"
            onClick={() => {
              // Handle delete action
              removeAttendanceById(id);
            }}
          >
            Remove
          </Button>
        </div>
      );
    },
  },
];
