import { BookUser, ScanLine, ShieldUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    return (
      <div className="h-[100dvh] w-full grid place-items-center py-10 relative">
        <div className="flex flex-col items-center gap-10 justify-between h-full">
          {/* header */}
          <div className="text-center flex flex-col">
            <h1 className="text-5xl text-primary font-bold">
              Aura & Keanu Guestbook
            </h1>
            <p className="text-2xl text-secondary">Select A Menu To Open</p>
          </div>

          <div className="flex flex-row gap-10">
            <Link
              href="/scan"
              className="w-48 aspect-square bg-white rounded-xl shadow-md flex flex-col items-center justify-center gap-5 p-5 active:bg-primary/50 transition-all"
            >
              <ScanLine
                className="text-primary w-full h-full"
                strokeWidth={1.2}
              />
              <h1 className="text-2xl tracking-widest text-secondary">
                Scan Qr
              </h1>
            </Link>
            <Link
              href="/admin"
              className="w-48 aspect-square bg-white rounded-xl shadow-md flex flex-col items-center justify-center gap-5 p-5 active:bg-primary/50 transition-all"
            >
              <ShieldUser
                className="text-primary w-full h-full"
                strokeWidth={1.2}
              />
              <h1 className="text-2xl tracking-widest text-secondary">
                Dashboard
              </h1>
            </Link>
            <Link
              href="/admin/guest"
              className="w-48 aspect-square bg-white rounded-xl shadow-md flex flex-col items-center justify-center gap-5 p-5 active:bg-primary/50 transition-all"
            >
              <BookUser
                className="text-primary w-full h-full"
                strokeWidth={1.2}
              />
              <h1 className="text-2xl tracking-widest text-secondary">
                Guest
              </h1>
            </Link>
          </div>

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
          className="fixed -bottom-3 right-0 translate-x-1/2 w-56"
        />
        <Image
          src="/assets/flower/18.png"
          width={300}
          height={300}
          alt=""
          className="fixed -bottom-3 left-0 -translate-x-1/2 w-56 "
        />
      </div>
    );
}
