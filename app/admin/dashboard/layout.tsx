"use client";

import { Navigation } from "@/components/Navigation/Navigation";
import { Footer } from "@/components/Footer/Footer";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import NewspaperIcon from "@mui/icons-material/Newspaper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/admin/login");
    }
  }, []);
  return (
    <div className="px-32 grid grid-cols-5">
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
    </div>
  );
}
