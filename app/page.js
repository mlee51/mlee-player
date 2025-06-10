'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import TrackList from "./tracklist";
import AnimatedText from "./AnimatedText";

export default function Home() {

  return (
    <div  className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     <main className="flex flex-col gap-[32px] row-start-2 items-stretch sm:items-start w-1/2">
       <AnimatedText/>
       <TrackList/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Player
      </footer>
    </div>
  );
}
