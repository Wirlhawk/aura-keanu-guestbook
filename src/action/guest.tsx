"use server";

import { createClient } from "@/utils/supabase/server";

export const getGuests = async () => {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("guests")
            .select("*, relation(name), attendance(*)");

        if (error) {
            console.error("Error fetching guests:", error);
            return [];
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching guests:", err);
        return [];
    }
};
