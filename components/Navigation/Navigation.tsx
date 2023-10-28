"use client";
import Image from "next/image";
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import Logo from "../../public/logo.svg";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="drawer drawer-end lg:max-w-[1300px] lg:m-auto z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-between items-center px-8 py-8">
          <div className="flex items-center gap-10">
            <a href="/home">
              <Image src={Logo} alt="" className="w-14" />
            </a>
            <ul className="hidden md:flex items-center gap-5 text-lg">
              <li className="relative">
                <a href="/home">Home</a>
                {pathname === "/home" && (
                  <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
                )}
              </li>
              <li className="relative">
                <a href="/about">About</a>
                {pathname === "/about" && (
                  <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
                )}
              </li>
              <li className="relative">
                <a href="/cars">Cars</a>
                {pathname === "/cars" && (
                  <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
                )}
              </li>
              <li className="relative">
                <a href="/events">Events</a>
                {pathname === "/events" && (
                  <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
                )}
              </li>
              <li className="relative">
                <a href="/blog">Blog</a>
                {pathname === "/blog" && (
                  <span className="absolute bottom-[-5px] left-0 h-[3px] w-full bg-black"></span>
                )}
              </li>
            </ul>
          </div>
          <a href="/#">
            <button className="font-Inter hidden md:block border-4 border-gray-950 px-2 uppercase font-bold text-xl">
              Join Club!
            </button>
          </a>

          <label htmlFor="my-drawer-4" className="drawer-button md:hidden">
            <MenuIcon fontSize="large" />
          </label>
        </div>
        <div className="drawer-side md:hidden">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-gray-100 text-lg">
            <li>
              <label htmlFor="my-drawer-4" className="drawer-button">
                <CloseIcon fontSize="large" />
              </label>
            </li>
            <li className="">
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/cars">Cars</a>
            </li>
            <li>
              <a href="/events">Events</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
