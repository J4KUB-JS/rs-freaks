import Image from "next/image";
import { NewCardItem } from "./components/NewCardItem";

import blog1 from "../../public/img/blog-1.png";
import blog2 from "../../public/img/blog-2.png";
import blog3 from "../../public/img/blog-3.png";
import blogMain from "../../public/img/blog-main.png";
import { PostType } from "../types";
import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { db } from "@/lib/firebase/firebase";
import { get } from "lodash";

async function getData(): Promise<PostType[]> {
  const q = query(
    collection(db, "blog")
    // where("createdAt", ">=", `${moment().format("MM")}/00/2023`),
    // where("createdAt", "<=", `${moment().format("MM")}/32/2023`)
  );
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      name: doc.data().name,
      files: doc.data().files,
      description: doc.data().description,
      subtitle: doc.data().subtitle,
      id: doc.id,
    };
  });
}

export default async function Blog() {
  const posts = await getData();
  console.log(posts);
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
          <Image
            alt=""
            src={get(posts[0], "files[0]", "")}
            className="w-full overflow-hidden"
            width={100}
            height={100}
          />

          <div className="flex justify-between py-6 md:flex-row flex-col gap-4">
            <h1 className="xl:text-6xl font-bold md:text-5xl text-4xl font-Inter md:w-[50%]">
              {get(posts[0], "name", "")}
            </h1>
            <div className="flex gap-6 flex-col items-start justify-between xl:text-lg pr-5 md:w-[50%]">
              <p>{get(posts[0], "subtitle", "")}</p>
              <button className="bg-gray-900 hover:bg-red-500 text-white font-Inter text-xl px-6 py-2 font-light uppercase tracking-widest">
                Read more
              </button>
            </div>
          </div>
        </div>
        <div className="px-6">
          <h3 className="text-2xl font-semibold mb-5 uppercase">Latest posts</h3>
          <div className="divide-y divide-gray-900 border-t border-b border-gray-900 ">
            {posts.map((item, index) => {
              if (index === 0 || index > 6) return null;
              return (
                <NewCardItem
                  key={item.id}
                  imgSrc={item.files[0]}
                  title={item.name}
                  body={item.subtitle}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
