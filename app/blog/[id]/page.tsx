import Image from "next/image";
import { get } from "lodash";
import { doc, getDoc } from "firebase/firestore";
import { PostType } from "@/app/types";
import { TempPost } from "@/app/constants";
import { db } from "@/lib/firebase/firebase";

async function getData(id: string): Promise<PostType> {
  const q = doc(db, `blog`, id);
  const response = await getDoc(q);
  const result = response.data() || TempPost;
  return {
    id: result.id,
    name: result.name,
    description: result.description,
    subtitle: result.subtitle,
    highlight: result.highlight,
    files: result.files || [],
  };
}

function createMarkup(val: string) {
  return { __html: val };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const blogPost = await getData(params.id);

  return (
    <main className="lg:max-w-[1300px] lg:m-auto z-0 md:px-10 md:pt-5">
      <div className="font-bold py-2 uppercase">
        <a href="/blog">&lt; Go back to blog page</a>
      </div>
      <div className="h-[400px] overflow-hidden relative">
        <Image
          src={get(blogPost.files, "[1]", get(blogPost.files, "[0]", ""))}
          alt=""
          fill
          style={{ objectFit: "cover" }}
          quality={100}
        />
      </div>
      <div className="font-bold text-5xl font-Inter uppercase pt-10">{blogPost.name}</div>
      <div className="font-semibold text-2xl font-Inter uppercase max-w-[500px] pt-2">
        {blogPost.subtitle}
      </div>
      <div className="flex justify-center">
        <div
          className="font-Lato pt-10 max-w-[700px]"
          dangerouslySetInnerHTML={createMarkup(blogPost.description)}
        ></div>
      </div>
    </main>
  );
}
