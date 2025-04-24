/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dayjs from "dayjs";

import { ColumnDef } from "@tanstack/react-table";
import { Guest } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Guest>[] = [
    {
        accessorKey: "NO",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
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
        cell: ({ row }) => {
            return row.index + 1;
        },
    },
    {
        accessorKey: "guest_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
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
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
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
                <Badge className="bg-yellow-300 text-yellow-800">
                    VIP {vip}
                </Badge>
            ) : (
                <Badge className="bg-gray-300 text-gray-800 ">NON-VIP</Badge>
            );
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
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
    // {
    //     id: "attendance",
    //     accessorKey: "attendance",
    //     cell: ({ row }) => {
    //         const attendance =
    //             (row.getValue("attendance") as Array<any>) || null;

    //         return attendance.length > 0 ? (
    //             <Badge className="bg-green-300 text-green-800">Attended</Badge>
    //         ) : (
    //             <Badge className="bg-gray-300 text-gray-800">Not Attend</Badge>
    //         );
    //     },
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() =>
    //                     column.toggleSorting(column.getIsSorted() === "asc")
    //                 }
    //             >
    //                 Attend
    //                 {column.getIsSorted() === "asc" ? (
    //                     <ArrowUp className="ml-2 h-4 w-4" />
    //                 ) : column.getIsSorted() === "desc" ? (
    //                     <ArrowDown className="ml-2 h-4 w-4" />
    //                 ) : (
    //                     <ArrowUpDown className="ml-2 h-4 w-4" />
    //                 )}
    //             </Button>
    //         );
    //     },
    // },
    {
        accessorFn: (row) => row.attendance?.[0]?.created_at ?? null,
        id: "checked_in",
        cell: ({ row }) => {
            const attendance = row.original.attendance as Array<any>;
            const created_at = attendance?.[0]?.created_at;
            const time = dayjs(created_at).format("hh:mm A");
            return time;
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
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
];
