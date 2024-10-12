"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [toggleHamburger, setToggleHamburger] = useState(false);

  const handleToggle = () => {
    setToggleHamburger((toggleHamburger) => !toggleHamburger);
  };

  return (
    <div className="w-full flex items-center justify-center bg-transparent p-3">
      <div className="container flex justify-between items-center">
        <h1 className="font-semibold text-2xl">AmiaList</h1>
        <div>
          <div
            onClick={handleToggle}
            className={`${
              toggleHamburger ? "hamburger-toggle" : ""
            } cursor-pointer lg:hidden relative`}
          >
            <span className="hamburger-icon origin-top-left transition ease-in-out duration-300"></span>
            <span className="hamburger-icon transition ease-in-out duration-300"></span>
            <span className="hamburger-icon origin-bottom-left transition ease-in-out duration-300"></span>
          </div>
          <div
            className={`${
              toggleHamburger ? "flex" : "hidden"
            } absolute top-100 right-0 w-full h-screen lg:h-full flex-col lg:flex-row bg-white rounded-xl shadow-xl lg:relative lg:flex lg:w-auto lg:shadow-none lg:rounded-none lg:gap-8 lg:items-center z-50`}
          >
            <ul className="flex flex-col lg:flex-row gap-1 order-2 lg:order-1 text-lg lg:text-base">
              <li>
                <Link
                  href="/"
                  className={`link ${
                    pathname === "/" ? "activeLink" : ""
                  } p-2 hover:bg-slate-200 rounded-md`}
                >
                  Anime
                </Link>
              </li>
              <li>
                <Link
                  href="/manga"
                  className={`link ${
                    pathname === "/manga" ? "activeLink" : ""
                  } p-2 hover:bg-slate-200 rounded-md`}
                >
                  Manga
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`link ${
                    pathname === "/#" ? "activeLink" : ""
                  } p-2 hover:bg-slate-200 rounded-md`}
                >
                  Top Anime
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`link ${
                    pathname === "/#" ? "activeLink" : ""
                  } p-2 hover:bg-slate-200 rounded-md`}
                >
                  Top Manga
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`link ${
                    pathname === "/#" ? "activeLink" : ""
                  } p-2 hover:bg-slate-200 rounded-md`}
                >
                  Seasons
                </Link>
              </li>
            </ul>

            <div className="w-full lg:w-auto mt-3 lg:mt-0 flex flex-col lg:flex-row lg:items-center lg:gap-4 order-1 lg:order-2">
              <div className="relative mx-auto text-gray-600 h-full flex items-center order-2 lg:order-1">
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm w-full focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-2 mr-4"
                >
                  <svg
                    className="text-gray-600 h-6 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 56.966 56.966"
                    width="512px"
                    height="512px"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 lg:mt-0 order-1 lg:order-2 m-auto lg:m-0 p-4 lg:p-0">
                <img
                  src="/hero.jpg"
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
