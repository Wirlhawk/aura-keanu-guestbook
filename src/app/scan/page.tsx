"use client";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import React, { useState } from "react";
import Image from "next/image";
import { Guest } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "motion/react";
import { addAttendance } from "@/action/attendance";

const ScanPage = () => {
    const [guest, setGuest] = useState<Guest | null>(null);

    const onScan = async (result: IDetectedBarcode[]) => {
        if (result.length === 0) return;

        const guestId = result[0].rawValue;
        const supabase = createClient();

        try {
            const { data: guest, error: guestError } = await supabase
                .from("guests")
                .select("*")
                .eq("id", guestId)
                .single();

            if (guestError || !guest) {
                console.error("Error fetching guest:", guestError?.message);
                toast.error("Tamu tidak ditemukan");
                setGuest(null);
                return;
            }

            const { data: attendance, error: attendanceError } = await supabase
                .from("attendance")
                .select("*")
                .eq("guest_id", guestId);

            if (attendanceError) {
                console.error(
                    "Error fetching attendance:",
                    attendanceError.message
                );
                toast.error("Terjadi Kesalahan, silahkan coba lagi");
                setGuest(null);
                return;
            }

            if (attendance && attendance.length > 0) {
                toast.error("Tamu Sudah Check In");
                setGuest(null);
                return;
            }

            await addAttendance(guestId);

            toast.success("Tamu berhasil Check In");
            setGuest(guest);
        } catch (err) {
            console.error("Unexpected error:", err);
            toast.error("Terjadi Kesalahan, silahkan coba lagi");
            setGuest(null);
        }
    };

    return (
        <div className="h-[100lvh] w-full flex flex-col sm:flex-row py-10 px-12 gap-15 font-forum relative font-forum">
            <ScannerSection onScan={onScan} />
            <WelcomeSection guest={guest} />

            <Image
                src="/assets/flower/7.png"
                width={300}
                height={300}
                alt=""
                className="fixed -bottom-3 right-0 translate-x-1/2 w-32 "
            />
            <Image
                src="/assets/flower/18.png"
                width={300}
                height={300}
                alt=""
                className="fixed -bottom-3 left-0 -translate-x-1/2 w-32 "
            />
        </div>
    );
};

function ScannerSection({
    onScan,
}: {
    onScan: (result: IDetectedBarcode[]) => void;
}) {
    return (
        <div className="sm:w-1/2 flex flex-col items-center text-center my-auto">
            <div className=" p-5 rounded">
                <Scanner
                    onScan={(result) =>
                        toast.promise(async () => await onScan(result), {
                            loading: "Scanning...",
                        })
                    }
                    allowMultiple={true}
                    constraints={{ facingMode: "", aspectRatio: 1 }}
                    scanDelay={3000}
                    components={{ finder: false }}
                    styles={{
                        container: { height: "fit-content" },
                        video: {
                            height: "fit-content",
                            borderRadius: "20px",
                        },
                    }}
                />
            </div>

            <div className="w-full flex flex-col px-10 gap-2">
                <h1 className="text-3xl text-primary">Scan Qr</h1>
                <p className="text-secondary">
                    untuk mengisi buku tamu dan turut merayakan momen bahagia
                    ini 💖
                </p>
            </div>
        </div>
    );
}

function WelcomeSection({ guest }: { guest: Guest | null }) {
    return (
        <div className="sm:w-1/2 font-forum items-center pt-5 text-center flex flex-col justify-between ">
            <div className="">
                <h1 className="text-3xl text-primary">Welcome</h1>
                <p className="text-secondary">To The Wedding of Aura & Keanu</p>
            </div>
            {guest ? (
                <GuestCard guest={guest} />
            ) : (
                <h1 className="text-secondary text-xl">
                    Scan the QR code to check in
                    <br /> and leave a message
                </h1>
            )}

            <Image
                src={"/assets/header.png"}
                width={250}
                height={250}
                className="max-w-40"
                alt="aura & keanu"
            />
        </div>
    );
}

function GuestCard({ guest }: { guest: Guest }) {
    return (
        <AnimatePresence>
            <motion.div
                key={guest.id}
                className="border-secondary border flex p-1 relative"
                initial={{ y: 150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="bg-secondary flex flex-col items-center w-full py-5 px-4 gap-3">
                    <h2 className="text-lg text-white">Yth. Bpk/Ibu/Sdr/i</h2>

                    {guest.vip === true ? (
                        <div>
                            <h1 className="text-2xl  font- text-yellow-500">
                                {guest.name}
                            </h1>
                            <p className="tracking-widest text-yellow-500 text-md">
                                VIP {guest.vip} GUEST
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-2xl  font- text-white">
                                {guest.name}
                            </h1>
                            <p className="text-white text-md">ID: {guest.id}</p>
                        </div>
                    )}

                    <p className="px-10 text-white text-xs">
                        Thank you for coming and sharing this special moment
                        with us 💖
                    </p>
                </div>

                <Image
                    width={200}
                    height={200}
                    src="/assets/flower/6.png"
                    alt=""
                    className="absolute w-20 left-1/2 -translate-x-1/2 top-0 -translate-y-3/4"
                />

                <Image
                    width={200}
                    height={200}
                    src="/assets/flower/8.png"
                    alt=""
                    className="absolute w-14 left-1/2 -translate-x-1/2 bottom-0 translate-y-3/4 z-20"
                />
            </motion.div>
        </AnimatePresence>
    );
}

export default ScanPage;
