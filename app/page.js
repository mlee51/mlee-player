'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import TrackList from "./tracklist";
import AnimatedText from "./AnimatedText";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="grid items-center justify-items-center min-h-screen ">
      <main className="lg:w-[23%] w-[96%] flex flex-col row-start-2 items-stretch sm:items-start">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className=" text-xl font-mono animate-pulse">
              x . x . l o a d i n g . x . x
            </div>
          </div>
        )}
        <TrackList setIsLoading={setIsLoading} />
      </main>
      <footer className="row-start-3 h-50 flex gap-[24px] flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
}
