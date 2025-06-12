'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import TrackList from "./tracklist";
import AnimatedText from "./AnimatedText";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const baseTitle = "☆ﾟ.*･｡ﾟ";
    let index = 0;

    const interval = setInterval(() => {
      document.title = baseTitle.slice(index) + baseTitle.slice(0, index);
      index = (index - 1) % baseTitle.length;
    }, 200); // Speed in ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="grid items-center justify-items-stretch min-h-screen ">
      <main className="flex flex-col row-start-2 items-stretch sm:items-start">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className=" text-xl font-mono animate-pulse">
              x . x . l o a d i n g . x . x
            </div>
          </div>
        )}
        <TrackList setIsLoading={setIsLoading} />
      </main>
      {!isLoading && <footer className="mb-20 row-start-3 h-50 flex gap-[24px] flex-wrap items-center justify-center">
       <a className="animate-pulse font-semibold" href="https://instagram.com/mlee.live" target="_blank">{'<3'}</a>
      </footer>}
    </div>
  );
}
