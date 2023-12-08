import Image from "next/image";
import moment from "moment";
import { get } from "lodash";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import { PostType } from "../types";
import { NewCardItem } from "./components/NewCardItem";

async function getData(): Promise<PostType[]> {
  const q = query(
    collection(db, "blog"),
    where("createdAt", ">=", `${moment().format("YYYY")} ${moment().format("MM")} 01`),
    where("createdAt", "<=", `${moment().format("YYYY")} ${moment().format("MM")} 31`)
  );
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      name: doc.data().name,
      files: doc.data().files,
      description: doc.data().description,
      subtitle: doc.data().subtitle,
      highlight: doc.data().highlight,
      id: doc.id,
    };
  });
}

async function getHighlighted(): Promise<PostType[]> {
  const q = query(collection(db, "blog"), where("highlight", "==", true));
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      name: doc.data().name,
      files: doc.data().files,
      description: doc.data().description,
      subtitle: doc.data().subtitle,
      highlight: doc.data().highlight,
      id: doc.id,
    };
  });
}

export default async function Blog() {
  const posts = await getData();
  const [mainPost] = await getHighlighted();

  return (
    <main className="lg:max-w-[1200px] lg:m-auto tracking-wide z-0">
      <div className="my-10 lg:my-20 uppercase flex justify-center font-Inter">
        <div>
          <div className=" text-4xl font-extrabold lg:text-8xl">All about cars</div>
          <div className="text-red-400 font-semibold">By RS_Freaks</div>
        </div>
      </div>

      <div className="md:grid lg:grid-cols-3 md:gap-x-7 md:grid-cols-2 ">
        <div className="md:col-span-2 px-6">
          <div className="overflow-hidden h-96 w-full relative">
            <Image
              alt=""
              src={get(mainPost, "files[0]", "")}
              className="w-full overflow-hidden"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>
          <div className="flex justify-between py-6 md:flex-row flex-col gap-4">
            <h1 className="xl:text-6xl font-bold md:text-5xl text-4xl font-Inter md:w-[50%]">
              {get(mainPost, "name", "")}
            </h1>
            <div className="flex gap-6 flex-col items-start justify-between xl:text-lg pr-5 md:w-[50%]">
              <p>{get(mainPost, "subtitle", "")}</p>
              <a href={"/blog/" + get(mainPost, "id", "")}>
                <button className="bg-gray-900 hover:bg-red-500 text-white font-Inter text-xl px-6 py-2 font-light uppercase tracking-widest">
                  Read more
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="px-6">
          <h3 className="text-2xl font-semibold mb-5 uppercase">Latest posts</h3>
          <div className="border-t border-gray-900 ">
            {posts.map((item, index) => {
              if (item.highlight || index > 6) return null;
              return (
                <a href={"/blog/" + item.id} key={item.id}>
                  <NewCardItem item={item} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
