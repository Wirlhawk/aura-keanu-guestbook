"use server";

import { createClient } from "@/utils/supabase/server";

export const getGuests = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("guests")
      .select("*, relation(name), attendance(*)")

    console.log(data)

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
  vip: boolean;
  category: string;
}) => {
  try {
    const supabase = await createClient();
    const id = Math.random().toString(36).substring(2, 7).toUpperCase();

    const { error } = await supabase
      .from("guests")
      .insert({
        id,
        name,
        relation_id: relationId,
        vip,
        kategori: category,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating guest:", error);
      return null;
    }
  } catch (err) {
    console.error("Unexpected error creating guest:", err);
    return null;
  }
};
