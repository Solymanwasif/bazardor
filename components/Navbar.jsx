
"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { toast } from "react-hot-toast";
import {
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

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function getBangladeshDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const [date, setDate] = useState("");
  const [dropdownState, setDropdownState] = useState({
    pathname: "",
    open: false,
  });
  const [signingOut, setSigningOut] = useState(false);

  const dropdownRef = useRef(null);

  const dropdownOpen =
    dropdownState.pathname === pathname && dropdownState.open;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDate(getBangladeshDate());
    }, 0);

    const interval = setInterval(() => {
      setDate(getBangladeshDate());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownState({
          pathname,
          open: false,
        });
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [pathname]);

  const closeDropdown = () => {
    setDropdownState({
      pathname,
      open: false,
    });
  };

  const toggleDropdown = () => {
    setDropdownState({
      pathname,
      open: !dropdownOpen,
    });
  };

  const handleLogout = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await logout();

      closeDropdown();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("সাইন আউট করা যায়নি");
      setSigningOut(false);
    }
  };

  const accountLoading = !mounted || loading;

  return (
    <nav className="relative z-50 border-b border-gray-200 bg-white text-gray-900">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3">
          
              <Link
                href="/"
                onClick={closeDropdown}
                className="flex shrink-0 items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#008c45]">
                  <Image
                    src="/logo-icon.png"
                    alt="বাজার দর লোগো"
                    width={23}
                    height={23}
                    priority
                    className="h-[23px] w-[23px] object-contain"
                  />
                </div>

                <div>
                  <h1 className="text-lg font-bold leading-tight text-[#1e3024]">
                    বাজার দর
                  </h1>

                  <p className="text-[10px] text-gray-500">
                    {date || "আজকের বাজারের দাম"}
                  </p>
                </div>
              </Link>


          <div className="flex items-center gap-2 sm:gap-3">
            {accountLoading ? (
              <div
                className="h-9 w-28 animate-pulse rounded-lg bg-gray-100 sm:w-36"
                aria-label="অ্যাকাউন্ট লোড হচ্ছে"
              />
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={32}
                      height={32}
                      unoptimized
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                      <FaUserCircle className="text-2xl text-gray-400" />
                    </div>
                  )}

                  <span className="max-w-24 truncate text-sm font-medium sm:max-w-40">
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
                    className="absolute right-0 top-full z-50 mt-2 w-52 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
                  >
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="truncate text-sm font-semibold">
                        {user.displayName || "ব্যবহারকারী"}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={closeDropdown}
                      className="flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-green-50"
                    >
                      <FaUser className="text-green-700" />
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      disabled={signingOut}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FaSignOutAlt />
                      {signingOut
                        ? "অপেক্ষা করুন..."
                        : "সাইন আউট"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-3">
                <Link
                  href="/signin"
                  className="rounded-lg px-2 py-2 text-sm font-medium transition hover:text-green-700 sm:px-3"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-[#008c45] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#00783b] sm:px-4"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto border-t border-gray-100 py-2 text-sm">
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
                onClick={closeDropdown}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 transition ${
                  active
                    ? "bg-green-50 font-bold text-green-700"
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
