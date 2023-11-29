import Image from "next/image";
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

export default async function Cars({ params }: { params: { id: string } }) {
  const blogPost = await getData(params.id);

  return (
    <main className="drawer drawer-end lg:max-w-[1300px] lg:m-auto z-0">
      <div>{blogPost.name}</div>
      <div>{blogPost.subtitle}</div>
      <div dangerouslySetInnerHTML={createMarkup(blogPost.description)}></div>
      <Image src={blogPost.files[0]} width={300} height={600} alt="" quality={100} />
    </main>
  );
}
