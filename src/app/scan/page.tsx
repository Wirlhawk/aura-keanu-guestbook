"use client";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import React, { useState } from "react";
import Image from "next/image";
import { Guest } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "motion/react";

const ScanPage = () => {
    const [guest, setGuest] = useState<Guest | null>(null);

    const onScan = async (result: IDetectedBarcode[]) => {
        if (result.length === 0) return;

        const guestId = result[0].rawValue;
        const supabase = createClient();

        try {
            const { data, error, count } = await supabase
                .from("guests")
                .select("*")
                .eq("id", guestId)
                .single();

            if (error) {
                console.error("Error fetching guest:", error.message);
                toast.error("Terjadi Kesalahan, silahkan coba lagi");
                setGuest(null);
                return;
            }

            if (!data || count === 0) {
                console.error("Error guests not found");
                toast.error("Terjadi Kesalahan, silahkan coba lagi");

                return;
            }

            toast.success("Sukses");
            setGuest(data);
        } catch (err) {
            console.error("Unexpected error:", err);
            toast.error("Terjadi Kesalahan, silahkan coba lagi");
            setGuest(null);
        }
    };

    return (
        <div className="bg-white bg-[url('/assets/background/5.png')] h-[100lvh] w-full flex flex-row py-10 px-12 gap-15 font-forum relative">
            <div className="w-1/2 flex flex-col items-center text-center">
                <div className=" p-5 rounded">
                    <Scanner
                        classNames={{}}
                        onScan={onScan}
                        allowMultiple={true}
                        constraints={{ facingMode: "", aspectRatio: 1 }}
                        scanDelay={1000}
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
                        untuk mengisi buku tamu dan turut merayakan momen
                        bahagia ini 💖
                    </p>
                </div>
            </div>

            <div className="w-1/2 font-forum items-center pt-5 text-center flex flex-col justify-between ">
                <div className="">
                    <h1 className="text-3xl text-primary">Welcome</h1>
                    <p className="text-secondary">
                        To The Wedding of Aura & Keanu
                    </p>
                </div>
                {guest ? (
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-lg text-secondary">
                            Yth. Bpk/Ibu/Sdr/i
                        </h2>
                        <h1 className="text-4xl text-primary font-bold">
                            {guest.name}
                        </h1>
                        <p className="mb-5 text-secondary"> ID: {guest.id}</p>
                        <p className="px-10 text-secondary">
                            Thank you for coming and sharing this special moment
                            with us 💖
                        </p>
                    </motion.div>
                ) : (
                    <h1 className="">
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
            <Toaster />
        </div>
    );
};

export default ScanPage;
