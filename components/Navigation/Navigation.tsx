"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

import Logo from "../../public/logo.svg";
import { usePathname } from "next/navigation";
import {
  auth,
  logInWithGoogle,
  logOutFromGoogle,
  provider,
} from "@/lib/firebase/firebase";
import { getAuth } from "firebase/auth";

export const Navigation = () => {
  const pathname = usePathname();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  return (
    <>
      <div className="drawer drawer-end lg:max-w-[1300px] lg:m-auto z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-between items-center px-8 py-8">
          <div className="flex items-center gap-10">
            <a href="/">
              <Image src={Logo} alt="" className="w-14" />
            </a>
            <ul className="hidden md:flex items-center gap-5 text-lg">
              <li className="relative">
                <a href="/">Home</a>
                {pathname === "/" && (
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
          <div>
            {!token && (
              <a href="/#" onClick={() => logInWithGoogle(auth, provider)}>
                <button className="font-Inter hidden md:block border-4 border-gray-950 px-2 uppercase font-bold text-xl">
                  Join Club!
                </button>
              </a>
            )}

            {token && (
              <div className="dropdown dropdown-end	">
                <label tabIndex={0} className="btn m-1">
                  Admin
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a
                      href="/#"
                      className=" space-x-1"
                      onClick={() => logOutFromGoogle(auth)}
                    >
                      <LogoutIcon />
                      <span>Log Out</span>
                    </a>
                  </li>
                  <li>
                    <a href="/admin/dashboard" className=" space-x-1">
                      <AdminPanelSettingsIcon />
                      <span> Admin Panel</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

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
