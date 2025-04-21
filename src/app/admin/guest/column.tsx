"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Guest } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Guest>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
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
        accessorKey: "relation.name",
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
                <Badge className="bg-yellow-300 text-yellow-800">VIP</Badge>
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
    {
        accessorKey: "attendance",
        cell: ({ row }) => {
            const attendance = row.getValue("attendance") as Array<unknown>;
            return attendance.length > 0 ? (
                <Badge className="bg-green-300 text-green-800">Attended</Badge>
            ) : (
                <Badge className="bg-gray-300 text-gray-800">Not Attend</Badge>
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
                    Attend
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
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const attendance = row.getValue("attendance") as Array<unknown>;
            const id = row.getValue("id");
            const name = row.getValue("name") as string;

            if (attendance.length > 0) {
                return "Already Attend";
            }
            return (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            size={"sm"}
                            variant="secondary"
                            className="text-white"
                        >
                            Add To Attend List
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Add {name} to Attend List?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() =>
                                    console.log("Add to Attend List")
                                }
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        },
    },
];
