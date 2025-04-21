"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const addAttendance = async (guestId: string) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("attendance")
      .insert({ guest_id: guestId });

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
