import Image from "next/image";
import gridImg1 from "../public/img/home-grid-1.png";
import gridImg2 from "../public/img/home-grid-2.png";
import gridImg3 from "../public/img/home-grid-3.png";
import homeAbout from "../public/img/home-about.png";
import homeCars from "../public/img/home-cars.png";
import homeEvents from "../public/img/home-events.png";
import homeEvents2 from "../public/img/home-events-2.png";

export default function Home() {
  return (
    <main className="lg:max-w-[1300px] lg:m-auto tracking-wide">
      <div className="uppercase text-center md:text-left md:px-16 py-10 relative tracking-widest">
        <span className="font-Inter text-[90px] font-extrabold italic mr-2 md:mr-5 md:text-[160px]">
          RS
        </span>
        <span className="font-Inter text-[60px] font-extrabold italic md:mr-5 md:text-[100px]">
          Freaks
        </span>
        <div className="mt-[-20px] text-lg md:text-2xl pl-2">
          Don&apos;t think twice{" "}
          <span className="relative">
            join us
            <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
          </span>
        </div>
      </div>
      <div className="font-Inter uppercase text-5xl font-bold text-gray-200 text-right px-8 md:px-16 md:text-6xl mt-8 mb-4 lg:text-7xl">
        Let&apos;s roll
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 px-4">
        <Image
          src={gridImg1}
          alt=""
          className="col-start-1 col-end-4 md:col-end-3 h-full"
        />
        <Image
          src={gridImg2}
          alt=""
          className="col-start-1 col-end-4 md:col-end-3 row-start-2 row-end-3 h-full"
        />
        <Image src={gridImg3} alt="" className="hidden md:block row-span-2 h-full" />
      </div>
      <div className="grid grid-cols-2 gap-16 lg:gap-24 mt-16 px-4 md:px-16 items-end">
        <div className="col-span-2 lg:col-span-1">
          <div className="text-3xl uppercase font-extrabold font-Inter">
            Get to know us better
          </div>
          <div className="mt-8 text-lg">
            Our car club is a close-knit community of car enthusiasts who share a deep
            passion for automobiles. We organize events, car shows, and road trips to
            celebrate our shared love for all things automotive. Whether you&apos;re a
            seasoned enthusiast or just starting, we welcome anyone who appreciates the
            thrill of engines and the camaraderie of like-minded individuals. Join us to
            celebrate the world of cars and be part of our passionate community.
          </div>
          <span className="text-xl uppercase font-bold relative mt-14 inline-block">
            <a href="/about">More about us &gt; </a>
            <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
          </span>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="hidden lg:block font-Inter uppercase text-5xl font-bold text-gray-200 lg:text-4xl mb-5">
            Smoke the tires
          </div>
          <Image src={homeAbout} alt="" className="w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-16 lg:gap-24 px-4 md:px-16 lg:mt-20 items-center">
        <div className="col-span-2 lg:col-span-1">
          <div className="hidden lg:block font-Inter uppercase text-5xl font-bold text-gray-200 lg:text-6xl mb-5">
            More power
          </div>

          <Image src={homeCars} alt="" className="hidden lg:block" />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="text-3xl uppercase font-extrabold font-Inter">what we have</div>
          <div className="mt-8 text-lg">
            Our car gallery features a diverse collection of vehicles owned by our club
            members, from classics to modern cars. It&apos;s a visual showcase of our
            shared passion for automobiles and the unique vehicles that make up our
            car-loving community.
          </div>
          <span className="text-xl uppercase font-bold relative mt-14 inline-block">
            <a href="/cars">Cars in club &gt;</a>
            <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-16 lg:gap-24 mt-16 px-4 md:px-16 items-baseline">
        <div className="col-span-2 lg:col-span-1 self-center">
          <div className="text-3xl uppercase font-extrabold font-Inter">
            See you on the spot
          </div>
          <div className="mt-8 text-lg">
            Our calendar section highlights upcoming events organized by our club.
            It&apos;s your go-to resource for staying updated on exciting activities like
            car meets, road trips, and community gatherings. Check dates, locations, and
            details here to join us in celebrating our shared love for cars. Stay in the
            loop and mark your calendar for memorable automotive experiences with our
            club.
          </div>
          <span className="text-xl uppercase font-bold relative mt-14 inline-block">
            <a href="/events">Planed events &gt;</a>
            <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
          </span>
        </div>
        <div className="col-span-2 row-start-1 lg:col-start-2 lg:col-span-1">
          <div className="hidden lg:block font-Inter uppercase text-5xl font-bold text-gray-200 lg:text-5xl mb-5">
            Let&apos;s goooo!
          </div>
          <Image src={homeEvents} alt="" className="hidden lg:block" />
          <Image src={homeEvents2} alt="" className="lg:hidden" />
        </div>
      </div>
    </main>
  );
}
