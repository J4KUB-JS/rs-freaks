import Image from "next/image";
import { CardItem } from "./components/CardItem";
import { NewCardItem } from "./components/NewCardItem";

import blog1 from "../../public/img/blog-1.png";
import blog2 from "../../public/img/blog-2.png";
import blog3 from "../../public/img/blog-3.png";
import blogMain from "../../public/img/blog-main.png";

export default function Blog() {
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
          <Image alt="" src={blogMain} className="w-full overflow-hidden" />

          <div className="flex justify-between py-6 md:flex-row flex-col gap-4">
            <h1 className="xl:text-6xl font-bold md:text-5xl text-4xl font-Inter md:w-[50%]">
              Power that scares
            </h1>
            <div className="flex gap-6 flex-col items-start justify-between xl:text-lg pr-5 md:w-[50%]">
              <p>
                “I have driven few tuned sports cars but this one is something I have
                never experienced”
              </p>
              <button className="bg-gray-900 hover:bg-red-500 text-white font-Inter text-xl px-6 py-2 font-light uppercase tracking-widest">
                Read more
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-7">
          <h3 className="text-2xl font-semibold mb-5 uppercase">Latest posts</h3>
          <div className="divide-y divide-gray-900">
            <NewCardItem
              imgSrc={blog1}
              title={"Hydrogen VS Electric Cars"}
              body={"Will hydrogen-fueled cars ever catch up to EVs?"}
            />
            <NewCardItem
              imgSrc={blog2}
              title={"The Downsides of AI Artistry"}
              body={
                "What are the possible adverse effects of on-demand AI image generation?"
              }
            />
            <NewCardItem
              imgSrc={blog3}
              title={"Is VC Funding Drying Up?"}
              body={
                "Private funding by VC firms is down 50% YOY. We take a look at what that means."
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}
