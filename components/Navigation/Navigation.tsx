"use client";
import Image from "next/image";
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

import Logo from "../../public/logo.svg";
import { usePathname } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";

export const Navigation = () => {
  const pathname = usePathname();
  const { user, googleSignIn, logOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

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
            {!user && (
              <button
                className="font-Inter hidden md:block border-4 border-gray-950 px-2 uppercase font-bold text-xl"
                onClick={handleSignIn}
              >
                Join Club!
              </button>
            )}

            {user && (
              <div className="dropdown dropdown-end	hidden md:block">
                <label
                  tabIndex={0}
                  className="btn m-1 bg-transparent border-none capitalize rounded-full p-1 pl-4 bg-gray-300"
                >
                  {user.displayName}

                  <Image
                    src={user.photoURL || ""}
                    height={40}
                    width={40}
                    alt=""
                    className="rounded-full"
                  />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a href="/" className=" space-x-1" onClick={handleSignOut}>
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

          <ul className="menu p-4 w-96 min-h-full bg-gray-100 text-lg">
            <div className="flex justify-between p-2 items-center">
              <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
                <CloseIcon fontSize="large" />
              </label>
              {user && (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn m-1 bg-transparent border-none capitalize rounded-full p-1 pl-4 bg-gray-300"
                  >
                    {user.displayName}
                    <Image
                      src={user.photoURL || ""}
                      height={40}
                      width={40}
                      alt=""
                      className="rounded-full"
                    />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a href="/" className=" space-x-1" onClick={handleSignOut}>
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
            <li className="">
              <a href="/">Home</a>
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
