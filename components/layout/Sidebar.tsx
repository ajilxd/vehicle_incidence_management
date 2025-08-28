import Link from "next/link";
import { Truck } from "lucide-react";
import NavLinks from "../nav-links";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-4 py-2 md:px-2 bg-background">
      <Link
        className="mb-2 flex h-20 items-center justify-start rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-4 md:h-40 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 shadow-md"
        href="/"
      >
        <div className="flex items-center space-x-3">
          <Truck className="h-8 w-8 text-white animate-pulse" />{" "}
          <div className="w-32 text-white md:w-40">
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Fleet Management
            </h1>
            <p className="text-xs text-blue-100 hidden md:block">
              Incident Tracking
            </p>{" "}
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
