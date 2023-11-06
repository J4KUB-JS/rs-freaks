"use client";

import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { imageDb } from "@/lib/firebase/firebase";
import Image from "next/image";
import { removeDuplicates } from "@/utils/utils";

export default function Cars() {
  const imagesListRef = ref(imageDb, "carsInClub/");

  const [imageUrls, setImageUrls] = useState<any[]>([]);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      console.log(response.items);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => removeDuplicates([...prev, url]));
        });
      });
    });
  }, [imagesListRef]);

  return (
    <main className="drawer drawer-end lg:max-w-[1300px] lg:m-auto z-0">
      <div className="grid grid-cols-5">
        <div className="p-16 col-span-5 md:col-span-5 lg:col-span-2 relative h-full">
          <div className="lg:sticky top-32">
            <div className="text-6xl font-bold uppercase font-Inter">Our Team</div>
            <div className="text-xl uppercase text-red-400 max-w-[300px]">
              we want to see your car on that gallery
            </div>
            <div className="mt-8 text-lg max-w-sm">
              We don&apos;t believe in exclusive club bull shit. We are team that is open
              for every one to join either to join or just hang out
            </div>
            <span className="text-xl uppercase font-bold relative mt-14 inline-block">
              <a href="/cars">Want to see them in person ? &gt;</a>
              <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
            </span>
          </div>
        </div>
        <div className="gap-4 mt-10 px-16 lg:col-span-3 col-span-5 grid grid-cols-1 sm:grid-cols-2">
          {imageUrls.map((img, index) => {
            return (
              <Image
                src={img}
                key={index}
                width={200}
                height={600}
                className={`w-full h-full ${index % 2 == 0 ? "mt-16" : ""}`}
                alt=""
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
