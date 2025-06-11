'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import TrackList from "./tracklist";
import AnimatedText from "./AnimatedText";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-stretch sm:items-start w-1/2">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className=" text-xl font-mono animate-pulse">
              x . x . l o a d i n g . x . x
            </div>
          </div>
        )}
        <TrackList setIsLoading={setIsLoading} />
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Player
      </footer> */}
    </div>
  );
}
