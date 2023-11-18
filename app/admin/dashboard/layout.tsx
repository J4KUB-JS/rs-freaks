"use client";

import { usePathname } from "next/navigation";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import NewspaperIcon from "@mui/icons-material/Newspaper";

import { UserAuth } from "@/app/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const { user } = UserAuth();

  return (
    <div className="px-32 grid grid-cols-5 gap-10">
      {user && (
        <>
          <div className="col-span-1 relative h-full">
            <ul className="sticky top-28 menu w-full rounded-xl bg-gray-200">
              <li
                className={`${
                  pathname === "/admin/dashboard"
                    ? "bg-gray-800 text-gray-50 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                    : ""
                }`}
              >
                <a href="/admin/dashboard/events">
                  <EmojiEventsIcon />
                  Events
                </a>
              </li>
              <li
                className={`${
                  pathname === "/admin/dashboard/cars"
                    ? "bg-gray-800 text-gray-50 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                    : ""
                }`}
              >
                <a href="/admin/dashboard/cars">
                  <TimeToLeaveIcon />
                  Cars in club
                </a>
              </li>
              <li
                className={`${
                  pathname === "/admin/dashboard/blog"
                    ? "bg-gray-800 text-gray-50 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                    : ""
                }`}
              >
                <a href="/admin/dashboard/blog">
                  <NewspaperIcon />
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className=" col-span-4 bg-gray-200 rounded-box px-8 py-6">{children}</div>
        </>
      )}
    </div>
  );
}
