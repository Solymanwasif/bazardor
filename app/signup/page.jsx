
"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
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

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name.trim(),
      });

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
      router.push("/");
    } catch (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      toast.success("সফলভাবে লগইন হয়েছে");
      router.push("/");
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("লগইন করা যায়নি");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f7f2] px-4 py-10">
      <div className="max-w-[340px] mx-auto">
        <div className="text-center mb-7">
          <h1 className="text-[26px] font-bold text-[#1f3025]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="text-[13px] text-gray-500 mt-1">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="bg-white border border-[#dfe9e1] rounded-xl p-5">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium mb-1.5">
                নাম
              </label>

              <input
                type="text"
                placeholder="আপনার নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={2}
                required
                className="w-full border border-[#dce7df] bg-[#fcfefd] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5">
                ইমেইল
              </label>

              <input
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#dce7df] bg-[#fcfefd] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5">
                পাসওয়ার্ড
              </label>

              <input
                type="password"
                placeholder="কমপক্ষে ৬ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                className="w-full border border-[#dce7df] bg-[#fcfefd] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium mb-1.5">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                type="password"
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-[#dce7df] bg-[#fcfefd] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#008c45] hover:bg-[#00783b] text-white py-2.5 rounded-lg text-sm font-medium shadow-sm transition cursor-pointer disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() =>
                handleSocialLogin(new GoogleAuthProvider())
              }
              disabled={loading}
              className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2.5 text-[11px] font-medium hover:bg-gray-50 cursor-pointer disabled:opacity-60"
            >
              <FcGoogle size={16} />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() =>
                handleSocialLogin(new GithubAuthProvider())
              }
              disabled={loading}
              className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2.5 text-[11px] font-medium hover:bg-gray-50 cursor-pointer disabled:opacity-60"
            >
              <FaGithub size={16} />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-center text-xs mt-5 text-gray-600">
            অ্যাকাউন্ট আছে?
            <Link
              href="/signin"
              className="text-[#008c45] font-semibold ml-1 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
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
