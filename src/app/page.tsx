import { createClient } from "@/utils/supabase/server";
import { Guest } from "@/types/supabase";

export default async function Home() {
    const supabase = await createClient();
    const { data: guests } = await supabase.from("guests").select();

    return (
        <div>
            {guests?.map((guest: Guest) => (
                <p key={guest.id}>{guest.name}</p>
            ))}
        </div>
    );
}
