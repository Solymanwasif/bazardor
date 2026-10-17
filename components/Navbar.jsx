
"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaShoppingCart,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import PriceTicker from "@/components/PriceTicker";

const categories = [
  { name: "সব পণ্য", href: "/", icon: "🏠" },
  { name: "চাল", href: "/category/chal", icon: "🍚" },
  { name: "ডাল", href: "/category/dal", icon: "🫘" },
  { name: "তেল", href: "/category/tel", icon: "🛢️" },
  { name: "সবজি", href: "/category/sobji", icon: "🥬" },
  { name: "মাছ", href: "/category/mach", icon: "🐟" },
  { name: "মাংস", href: "/category/mangsho", icon: "🍗" },
  { name: "ডিম", href: "/category/dim-dui", icon: "🥚" },
  { name: "মসলা", href: "/category/mosla", icon: "🌶️" },
];

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDate(
        new Date().toLocaleDateString("bn-BD", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Dhaka",
        })
      );
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("সাইন আউট করা যায়নি");
    }
  };

  return (
    <nav className="bg-white text-gray-900 border-b border-gray-200 relative z-50">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-4">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-[#008c45] rounded-xl flex items-center justify-center text-white">
              <FaShoppingCart size={20} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#1e3024]">
                বাজার দর
              </h1>

              <p className="text-[11px] text-gray-500">
                {date || "আজকের বাজারের দাম"}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {loading ? (
              <div
                className="h-10 w-28 sm:w-36 rounded-lg bg-gray-100 animate-pulse"
                aria-label="অ্যাকাউন্ট লোড হচ্ছে"
              />
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((previous) => !previous)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition cursor-pointer"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={32}
                      height={32}
                      unoptimized
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaUserCircle className="text-gray-400 text-2xl" />
                    </div>
                  )}

                  <span className="text-sm font-medium max-w-24 sm:max-w-48 truncate">
                    {user.displayName ||
                      user.email?.split("@")[0] ||
                      "ব্যবহারকারী"}
                  </span>

                  <FaChevronDown
                    size={10}
                    className={`text-gray-500 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-52 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold truncate">
                        {user.displayName || "ব্যবহারকারী"}
                      </p>

                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-green-50 transition"
                    >
                      <FaUser className="text-green-700" />
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <FaSignOutAlt />
                      সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium px-3 py-2 hover:text-green-700 transition"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="bg-[#008c45] hover:bg-[#00783b] text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-3 text-sm border-t border-gray-100">
          {categories.map((category) => {
            const active =
              category.href === "/"
                ? pathname === "/"
                : pathname === category.href ||
                  pathname.startsWith(`${category.href}/`);

            return (
              <Link
                key={category.href}
                href={category.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 transition ${
                  active
                    ? "bg-green-50 text-green-700 font-bold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-xs">{category.icon}</span>
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>

      <PriceTicker />
    </nav>
  );
}
