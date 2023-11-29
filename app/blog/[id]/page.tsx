import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../lib/firebase/firebase";
import Image from "next/image";
import { PostType } from "@/app/types";

async function getData(id: string) {
  const q = query(collection(db, "blog"), where("id", "==", id));
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return doc.data();
  })[0];
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
      <Image src={blogPost.files[0]} width={300} height={600} alt="" />
    </main>
  );
}
