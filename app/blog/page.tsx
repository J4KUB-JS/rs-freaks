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
      <div className="grid lg:grid-cols-3 gap-x-7 gap-y-12 md:grid-cols-2 sm:grid-cols-1">
        <div id="grid-item-1" className="md:col-span-2 sm:col-span-1 px-6">
          <div className="w-full overflow-hidden">
            <Image alt="" src={blogMain} />
          </div>
          <div className="flex justify-between py-6 md:flex-row flex-col gap-4">
            <h1 className="text-left xl:text-6xl font-bold md:w-80 md:text-5xl text-6xl w-96">
              Power that scares
            </h1>
            <div className="w-[400px] text-left text-darkGrayishBlue flex gap-6 flex-col items-start justify-between xl:text-lg pr-5">
              <p>
                “I have driven few tuned sports cars but this one is something I have
                never experienced”
              </p>
              <button className="bg-softRed hover:bg-veryDarkBlue text-offWhite text-xl px-6 py-2 font-light uppercase tracking-widest">
                Read more
              </button>
            </div>
          </div>
        </div>
        <div id="grid-item-2" className="text-left text-offWhite px-6 py-7">
          <h3 className="text-2xl font-semibold mb-5 uppercase">Latest posts</h3>
          <div className="space-y-7 divide-y divide-gray-900">
            <NewCardItem
              title={"Hydrogen VS Electric Cars"}
              body={"Will hydrogen-fueled cars ever catch up to EVs?"}
            />
            <NewCardItem
              title={"The Downsides of AI Artistry"}
              body={
                "What are the possible adverse effects of on-demand AI image generation?"
              }
            />
            <NewCardItem
              title={"Is VC Funding Drying Up?"}
              body={
                "Private funding by VC firms is down 50% YOY. We take a look at what that means."
              }
            />
          </div>
        </div>
        <div>
          <div>Interviews</div>
          <div className="flex justify-between lg:col-span-3 md:col-span-1 lg:flex-row flex-col gap-5">
            <CardItem
              index={"01"}
              title={"Reviving Retro PCs"}
              body={"What happens when old PCs are given modern upgrades?"}
              imgSrc={blog1}
            />
            <CardItem
              index={"02"}
              title={"Top 10 Laptops of 2022"}
              body={"Our best picks for various needs and budgets."}
              imgSrc={blog2}
            />
            <CardItem
              index={"03"}
              title={"The Growth of Gaming"}
              body={"How the pandemic has sparked fresh opportunities."}
              imgSrc={blog3}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
