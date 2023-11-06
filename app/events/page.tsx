"use client";

import {
  collection,
  addDoc,
  getDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";

import events from "../../public/img/events.png";

export default function Events() {
  const [thisMonthEvents, setThisMonthEvents] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "events"),
      where("date", ">=", `${moment().format("MM")}/00/2023`),
      where("date", "<=", `${moment().format("MM")}/32/2023`)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr: any[] = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setThisMonthEvents(itemsArr);

      return () => unsubscribe();
    });
  }, []);

  return (
    <main className="drawer drawer-end lg:max-w-[1300px] lg:m-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10 lg:gap-x-32 px-10 lg:px-16 mt-10">
        <div className="col-span-2 lg:col-span-1">
          <div>
            <div className="text-6xl font-bold uppercase">Events</div>
            <div className="text-xl uppercase text-red-400">By RS_FREAKS</div>
            <div className="mt-8 text-lg max-w-lg">
              Don&apos;t ask just get to the spot. Be a part of our team and never drive
              by yourself now. Remember to follow roles check them out here.
            </div>
            <span className="text-xl uppercase font-bold relative mt-14 inline-block">
              <a href="/cars">Check out our cars &gt;</a>
              <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
            </span>
          </div>
        </div>

        <div className=" border-t-2 border-gray-900 pt-8 pb-10 lg:row-start-2">
          <div className="mb-10 uppercase">
            <div className="text-lg">This month events</div>
            <div className="text-5xl font-Inter font-bold">{moment().format("MMMM")}</div>
          </div>
          <ul className="flex flex-wrap gap-10 gap-y-10">
            {thisMonthEvents.map((item, id) => {
              return (
                <li key={id} className="w-[170px] ">
                  <div
                    className={`border-t-4 lg:border-t-8 ${
                      item.isMain ? "border-red-400" : "border-gray-900"
                    }`}
                  >
                    <div
                      className={`font-bold text-2xl lg:text-4xl font-Inter ${
                        item.isMain ? "text-red-400" : ""
                      }`}
                    >
                      {moment(item.date).format("DD")}
                    </div>
                    <div
                      className={`text-md lg:text-lg font-Inter uppercase font-light ${
                        item.isMain ? "text-red-400" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                    {item.isMain && (
                      <div className="text-sm font-Inter uppercase font-light text-red-400">
                        (Special Event)
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:row-span-2 justify-self-end">
          <Image src={events} alt="" className="hidden lg:block  w-auto h-[700px]" />
          <div className="hidden lg:block font-Inter uppercase text-5xl font-bold text-gray-200 lg:text-6xl mt-5">
            More power
          </div>
        </div>
      </div>
    </main>
  );
}
