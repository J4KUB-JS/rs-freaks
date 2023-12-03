"use client";

import { usePathname } from "next/navigation";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import NewspaperIcon from "@mui/icons-material/Newspaper";

import { UserAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoadingUser } = UserAuth();

  return (
    <>
      {user ? (
        <div className="px-32 grid grid-cols-5 gap-10">
          <div className="col-span-1 relative h-full">
            <ul className="sticky top-28 menu w-full rounded-xl bg-gray-200">
              <li
                className={`${
                  pathname === "/dashboard"
                    ? "bg-gray-800 text-gray-50 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                    : ""
                }`}
              >
                <a href="/dashboard/events">
                  <EmojiEventsIcon />
                  Events
                </a>
              </li>
              <li
                className={`${
                  pathname === "/dashboard/cars"
                    ? "bg-gray-800 text-gray-50 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                    : ""
                }`}
              >
                <a href="/dashboard/cars">
                  <TimeToLeaveIcon />
                  Cars in club
                </a>
              </li>
              <li
                className={`${
                  pathname === "/dashboard/blog"
                    ? "bg-gray-800 text-gray-50 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                    : ""
                }`}
              >
                <a href="/dashboard/blog">
                  <NewspaperIcon />
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className=" col-span-4 bg-gray-200 rounded-box px-8 py-6">{children}</div>
        </div>
      ) : (
        <div className="w-100% text-center h-[60vh] flex justify-center items-center">
          {isLoadingUser ? (
            <div>
              <span className="loading loading-dots loading-lg"></span>
              <div>Loading data</div>
            </div>
          ) : (
            <div>
              Admin page access denied. Go to
              <a href="/" className="font-bold underline pl-1">
                home page
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
