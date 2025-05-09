/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dayjs from "dayjs";

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
import { addAttendance, removeAttendance } from "@/action/attendance";
import toast from "react-hot-toast";

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
    accessorKey: "relation.name",
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
    id: "attendance",
    accessorKey: "attendance",
    cell: ({ row }) => {
      const attendance = (row.getValue("attendance") as Array<any>) || null;

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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
    accessorFn: (row) => row.attendance?.[0]?.created_at ?? null,
    id: "created_at",
    cell: ({ row }) => {
      const attendance = row.original.attendance as Array<any>;
      const created_at = attendance?.[0]?.created_at;
      const time = dayjs(created_at).format("hh:mm A");
      return attendance?.length > 0 ? time : "NULL";
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
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const attendance = row.getValue("attendance") as Array<unknown>;
      const id = row.getValue("id") as string;
      const name = row.getValue("name") as string;

      return attendance?.length > 0 ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size={"sm"}
              variant="destructive"
              className="text-white bg-red-900"
            >
              Remove From Attend List
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove {name} to Attend List?</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  toast.promise(removeAttendance(id), {
                    loading: "Adding guest to attend list",
                    success: "Guest added to attend list",
                    error: "error, guest could not be added",
                  });
                }}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size={"sm"} variant="secondary" className="text-white">
              Add To Attend List
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add {name} to Attend List?</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  toast.promise(addAttendance(id), {
                    loading: "Adding guest to attend list",
                    success: "Guest added to attend list",
                    error: "error, guest could not be added",
                  });
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
  // {
  //   accessorKey: "changeVip",
  //   header: "makeVip",
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     return (
  //       <div className="flex gap-2">
  //         <Button
  //           size={"sm"}
  //           variant="secondary"
  //           className="text-white"
  //           onClick={() =>
  //             toast.promise(updateGuestVIP({ id, vip: 0 }), {
  //               loading: "Changing Guest VIP...",
  //               success: "Guest VIP changed",
  //               error: "Error, guest VIP could not be changed",
  //             })
  //           }
  //         >
  //           VIP 0
  //         </Button>
  //         <Button
  //           size={"sm"}
  //           variant="secondary"
  //           className="text-white"
  //           onClick={() =>
  //             toast.promise(updateGuestVIP({ id, vip: 1 }), {
  //               loading: "Changing Guest VIP...",
  //               success: "Guest VIP changed",
  //               error: "Error, guest VIP could not be changed",
  //             })
  //           }
  //         >
  //           VIP 1
  //         </Button>
  //         <Button
  //           size={"sm"}
  //           variant="secondary"
  //           className="text-white"
  //           onClick={() =>
  //             toast.promise(updateGuestVIP({ id, vip: 2 }), {
  //               loading: "Changing Guest VIP...",
  //               success: "Guest VIP changed",
  //               error: "Error, guest VIP could not be changed",
  //             })
  //           }
  //         >
  //           VIP 2
  //         </Button>
  //         <Button
  //           size={"sm"}
  //           variant="secondary"
  //           className="text-white"
  //           onClick={() =>
  //             toast.promise(updateGuestVIP({ id, vip: 3 }), {
  //               loading: "Changing Guest VIP...",
  //               success: "Guest VIP changed",
  //               error: "Error, guest VIP could not be changed",
  //             })
  //           }
  //         >
  //           VIP 3
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
