import Image from "next/image";

import about1 from "../../public/img/about-1.png";
import about2 from "../../public/img/about-2.png";
import about3 from "../../public/img/home-grid-1.png";
import about5 from "../../public/img/home-events-2.png";
import about4 from "../../public/img/about-4.png";

export default function About() {
  return (
    <main className="lg:max-w-[1300px] lg:m-auto tracking-wide">
      <div className="grid grid-cols-2 gap-10 lg:gap-24 px-4 md:px-16 lg:mt-20 mt-10 mb-16 item">
        <div className="col-span-2 lg:col-span-1">
          <Image src={about1} alt="" className="hidden lg:block" />
          <Image src={about3} alt="" className=" lg:hidden" />
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div>
              <div className="text-xl lg:text-7xl uppercase font-extrabold font-Inter">
                About
              </div>
              <div className="text-lg lg:text-2xl uppercase font-Inter">
                More than just car club
              </div>
            </div>
            <div className="mt-8 text-lg">
              The core concept that drives our club is straightforward: &quot;Bring
              together and ignite the passion of as many car enthusiasts as we can.&quot;
              Everyone is invited, regardless of whether you own a car or not. Come be a
              part of our community and connect with new people as we share our knowledge
              and engage in exciting activities as a group. To witness our activities in
              action, don&apos;t forget to visit our YouTube channel.
            </div>
            <span className="text-xl uppercase font-bold relative mt-14 inline-block">
              <a href="/events">See you on the spot &gt;</a>
              <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
            </span>{" "}
          </div>

          <div className="hidden lg:block font-Inter uppercase text-5xl font-bold text-gray-200 xl:text-7xl self-end">
            More power
          </div>
        </div>
      </div>

      <div className="px-4 md:px-16">
        <Image src={about4} alt="" className="md:hidden row-span-2 w-full" />
      </div>
      <div className="md:grid grid-cols-3 hidden gap-4 px-4 md:px-16 lg:hidden">
        <Image src={about5} alt="" className=" col-span-2 h-[150px]" />
        {/* <Image
          src={gridImg2}
          alt=""
          className="col-start-1 col-end-4 md:col-end-3 row-start-2 row-end-3 h-full"
        /> */}
        <Image src={about4} alt="" className="row-span-2 h-[150px]" />
      </div>
      <div className="grid grid-cols-2 lg:gap-16 mt-16 px-4 md:px-16 items-center">
        <div className="col-span-2 lg:col-span-1">
          <div className="text-3xl uppercase font-extrabold font-Inter">What we do?</div>
          <div className="max-w-[500px] mt-14">
            <div className="text-2xl font-semibold font-Inter">Meets & Road trips</div>
            <div className="mt-8 text-lg">
              We organize casual car meets as well us themed meets like track days, road
              trips, events with special guests. Basically you name it we got it. You can
              check them in Event section. If you have ideas for meet or to improve let us
              know and will do it. Here is Contact section.
            </div>
          </div>
          <div className="md:ml-20 max-w-[500px] mt-14">
            <div className="text-2xl font-semibold font-Inter">Content Creation</div>
            <div className="mt-8 text-lg">
              Check out our Youtube channel where you can see recap of car meets and and
              special content for all car enthusiast like: drag races, vlogs, car trips
              and much more. Car Blog is another place YouTube channel where you can read
              a on much wider and different topics. Get there much more in depth
              knowledgeable. Check our Blog section.
            </div>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 justify-self-end">
          <Image src={about2} alt="" height={800} className="hidden lg:block" />
        </div>
      </div>
    </main>
  );
}
