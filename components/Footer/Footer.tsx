import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

export const Footer = () => {
  return (
    <div className="bg-gray-950 w-full text-gray-100 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:max-w-[1200px] md:grid-cols-2 mx-auto p-6 gap-10">
        <div className="">
          <div className="font-Inter font-bold text-xl uppercase mb-5">Contact</div>
          <div className="text-sm">Email: rs.freaks@mail.com</div>
        </div>
        <div className="max-w-[150px] text-sm">
          <div className="col-span-2 font-Inter font-bold text-xl uppercase mb-5">
            Links
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="">
              <a href="/home">Home</a>
            </div>
            <div className="">
              <a href="/about">About</a>
            </div>
            <div className="">
              <a href="/cars">Cars</a>
            </div>
            <div className="">
              <a href="/events">Events</a>
            </div>
            <div className="">
              <a href="/blog">Blog</a>
            </div>
          </div>
        </div>
        <div className="">
          <div className="font-Inter font-bold text-xl uppercase col-span-4 mb-5">
            Social Media
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="">
              <a href="/#">
                <InstagramIcon />
              </a>
            </div>
            <div className="">
              <a href="/#">
                <FacebookIcon />
              </a>
            </div>
            <div className="">
              <a href="/#">
                <TwitterIcon />
              </a>
            </div>
            <div className="">
              <a href="/#">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="font-Inter font-bold text-xl uppercase col-span-4 mb-5">
            Newsletter
          </div>
          <div className="join ">
            <input
              className="input join-item rounded-none border-2 max-w-[250px] w-full border-gray-100 bg-gray-950"
              placeholder="example@mail.com"
            />
            <button className="btn join-item rounded-none bg-gray-100">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t-2 px-6 py-2 text-center">
        &copy; 2023 Design and Developed by{" "}
        <a href="/#" className="font-bold">
          &lt;CODE JS&gt;
        </a>
      </div>
    </div>
  );
};
