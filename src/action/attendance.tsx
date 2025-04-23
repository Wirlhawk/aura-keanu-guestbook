/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const addAttendance = async (guestId: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("attendance")
      .insert({ guest_id: guestId })
      .select()
      .single();

    if (error) {
      console.error("Error adding attendance:", error);
      return null;
    }

    revalidatePath("/admin/guest");
    return data;
  } catch (err) {
    console.error("Unexpected error adding attendance:", err);
    return null;
  }
};

export const removeAttendance = async (guestId: string) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("attendance")
      .delete()
      .eq("guest_id", guestId);

    if (error) {
      console.error("Error removing attendance:", error);
      return null;
    }

    revalidatePath("/admin/guest");
    return data;
  } catch (err) {
    console.error("Unexpected error removing attendance:", err);
    return null;
  }
};

export const getAttendanceSorted = async () => {
  try {
    const supabase = await createClient();

    type response = {
      name: string;
      total_attendance: number;
      total_guests: number;
    };

    const { data, error } = await supabase.rpc(
      "get_relation_attendance_summary"
    );

    if (error) {
      console.error("Error fetching sorted attendance:", error);
      return [];
    }

    return data as Array<response>;
  } catch (err) {
    console.error("Unexpected error fetching sorted attendance:", err);
    return [];
  }
};
