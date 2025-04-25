"use server";

import { createClient } from "@/utils/supabase/server";
import { addAttendance } from "./attendance";

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

export const addGuest = async ({
    name,
    relationId,
    vip,
    category,
}: {
    name: string;
    relationId: number;
    vip: number;
    category: string;
}) => {
    try {
        const supabase = await createClient();
        const id = Math.random().toString(36).substring(2, 7).toUpperCase();

        const { data, error } = await supabase
            .from("guests")
            .insert({
                id,
                name,
                relation_id: relationId,
                vip,
                kategori: category,
            })
            .select("id")
            .single();

        if (error) {
            console.error("Error creating guest:", error);
            return null;
        }

        await addAttendance(data.id);
    } catch (err) {
        console.error("Unexpected error creating guest:", err);
        return null;
    }
};

export const getGuestsCount = async () => {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("guests")
            .select("*", { count: "exact" });

        if (error) {
            console.error("Error fetching guests count:", error);
            return 0;
        }

        return data.length;
    } catch (err) {
        console.error("Unexpected error fetching guests count:", err);
        return 0;
    }
};
