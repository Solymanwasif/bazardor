
"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Signin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push("/");
    } catch {
      toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push("/");
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("সাইন ইন করা যায়নি");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[550px] bg-[#f1f7f2] px-4 pt-8 pb-20">
      <div className="max-w-[340px] mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#1c3023]">
            সাইন ইন
          </h1>

          <p className="text-xs text-gray-500 mt-2">
            বিস্তারিত দাম, বাজার তুলনা ও প্রাইসিং দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="bg-white border border-[#dce8df] rounded-xl p-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-800">
                ইমেইল
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#dce8df] rounded-lg px-3 py-2.5 text-xs bg-[#fcfefd] outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-800">
                পাসওয়ার্ড
              </label>

              <input
                type="password"
                placeholder="কমপক্ষে ৬ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-[#dce8df] rounded-lg px-3 py-2.5 text-xs bg-[#fcfefd] outline-none focus:border-green-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#008b46] hover:bg-[#00783c] text-white rounded-lg py-2.5 text-sm font-semibold shadow-sm transition cursor-pointer disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleSocialLogin(new GoogleAuthProvider())
              }
              className="flex items-center justify-center gap-1.5 border border-[#dce8df] rounded-lg py-2.5 px-1 text-[11px] font-medium hover:bg-gray-50 transition cursor-pointer disabled:opacity-60"
            >
              <FcGoogle size={15} />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleSocialLogin(new GithubAuthProvider())
              }
              className="flex items-center justify-center gap-1.5 border border-[#dce8df] rounded-lg py-2.5 px-1 text-[11px] font-medium hover:bg-gray-50 transition cursor-pointer disabled:opacity-60"
            >
              <FaGithub size={15} />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-600 mt-4">
            অ্যাকাউন্ট নেই?
            <Link
              href="/signup"
              className="text-[#008b46] font-semibold ml-1 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
