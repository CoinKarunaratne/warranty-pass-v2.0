"use client";

import Navbar from "./components/Navbar";
import LargeHeading from "@/app/components/ui/LargeHeading";
import Paragraph from "@/app/components/ui/Paragraph";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main>
      <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
        {/* @ts-expect-error Server Component */}
        <Navbar />
        <div className="container pt-32 max-w-7xl w-full mx-auto h-full">
          <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
            <LargeHeading
              size="lg"
              className="three-d text-black dark:text-light-gold"
            >
              Store and Manage <br /> Your Product <br /> Warranties Easily.
            </LargeHeading>

            <Paragraph className="max-w-xl lg:text-left">
              Store all your warranty info in one place with WarrantEase. Never
              lose an important document again.{" "}
              <Link
                href="/authentication"
                className="underline underline-offset-2 text-black dark:text-light-gold"
              >
                Get started
              </Link>{" "}
              and have peace of mind!
            </Paragraph>

            <div className="relative w-full max-w-xl lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
              <Image
                priority
                quality={100}
                style={{ objectFit: "contain" }}
                className="scale-125 img-shadow"
                fill
                src={`/ps5.png`}
                alt="controller"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
