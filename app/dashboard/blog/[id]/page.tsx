import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";

import { TempPost } from "@/app/constants";
import { PostType } from "@/app/types";
import { KeyboardArrowLeft } from "@mui/icons-material";

import { db } from "@/lib/firebase/firebase";

async function getData(id: string): Promise<PostType> {
  const q = doc(db, `blog`, id);
  const response = await getDoc(q);
  const result = response.data() || TempPost;
  return {
    id: result.id,
    name: result.name,
    description: result.description,
    files: result.files || [],
  };
}

export default async function Blog({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return (
    <main className="lg:max-w-[1200px] lg:m-auto tracking-wide z-0">
      <div className="flex justify-between items-center mb-10">
        <div className="text-xl font-bold">
          <a href="/dashboard/blog">
            <div className="flex items-center text-sm">
              <KeyboardArrowLeft />
              Go Back
            </div>
          </a>
          {data.name}
        </div>
      </div>
      <div>{data.description}</div>
      <div className=" mt-10">
        {data.files.map((img: any, index: number) => {
          return (
            <Image
              src={img}
              key={index}
              width={300}
              height={600}
              className={`w-auto`}
              alt=""
            />
          );
        })}
      </div>
    </main>
  );
}
