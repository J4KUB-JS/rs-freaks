import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import Image from "next/image";

export async function getData() {
  const q = query(collection(db, "carsInClub"));
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return doc.data();
  });
}

export default async function Cars() {
  const imageUrls = await getData();

  return (
    <main className="drawer drawer-end lg:max-w-[1300px] lg:m-auto z-0">
      <div className="grid grid-cols-5">
        <div className="p-16 col-span-5 md:col-span-5 lg:col-span-2 relative h-full mt-14">
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
        <div className="gap-4 my-10 px-6 lg:col-span-3 col-span-5 grid grid-cols-1 sm:grid-cols-2 justify-self-center">
          {imageUrls.map((img, index) => {
            return img.files.map((imgURL: string) => {
              return (
                <Image
                  src={imgURL}
                  key={index}
                  width={300}
                  height={600}
                  className={`w-auto h-[600px]`}
                  alt=""
                />
              );
            });
          })}
        </div>
      </div>
    </main>
  );
}
