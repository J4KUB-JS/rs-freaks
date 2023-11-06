"use client";

import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { UserAuth } from "@/app/context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const { user, googleSignIn, logOut } = UserAuth();

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, []);

  return (
    <div className="px-32 grid grid-cols-5">
      {user && (
        <>
          <div>
            <ul className="menu w-56 rounded-box bg-gray-200">
              <li>
                <a href="/admin/dashboard/events">
                  <EmojiEventsIcon />
                  Events
                </a>
              </li>
              <li>
                <a href="/admin/dashboard/cars">
                  <TimeToLeaveIcon />
                  Cars in club
                </a>
              </li>
              <li>
                <a href="/admin/dashboard/blog">
                  <NewspaperIcon />
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className=" col-span-4 bg-gray-200 rounded-box p-4">{children}</div>
        </>
      )}
    </div>
  );
}
