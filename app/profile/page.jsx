
"use client";

import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function ProfileContent({ user, logout, refreshUser }) {
  const router = useRouter();

  const [name, setName] = useState(user.displayName || "");
  const [displayName, setDisplayName] = useState(
    user.displayName || ""
  );
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newName = name.trim();

    if (newName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    if (newName === (user.displayName || "")) {
      toast.error("নামে কোনো পরিবর্তন করা হয়নি");
      return;
    }

    setSaving(true);

    try {
      await updateProfile(user, {
        displayName: newName,
      });

      await refreshUser();

      setDisplayName(newName);
      setName(newName);

      toast.success("প্রোফাইল আপডেট হয়েছে");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("প্রোফাইল আপডেট করা যায়নি");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    setSigningOut(true);

    try {
      await logout();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("সাইন আউট করা যায়নি");
      setSigningOut(false);
    }
  };

  return (
    <main className="flex-1 bg-[#f0f7f2] px-4 pt-12 pb-24">
      <div className="max-w-[600px] mx-auto">

        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-[#1e3024]">
            আমার প্রোফাইল
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile information */}
        <div className="bg-white border border-[#dfe8e1] rounded-xl p-5 mb-5">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">

            <div className="shrink-0">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile picture"
                  width={64}
                  height={64}
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FaUserCircle className="text-gray-400 text-4xl" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-[#253329]">
                {displayName || "ব্যবহারকারী"}
              </h2>

              <p className="text-sm text-gray-500 break-all mt-0.5">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={signingOut}
              className="flex items-center justify-center gap-2 border border-red-400 text-red-500 rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-50 transition cursor-pointer disabled:opacity-60"
            >
              <FaSignOutAlt />
              {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
            </button>

          </div>
        </div>

        {/* Update profile */}
        <div className="bg-white border border-[#dfe8e1] rounded-xl p-5 sm:p-7">
          <h3 className="text-lg font-bold text-[#253329] mb-8">
            তথ্য আপডেট
          </h3>

          <form onSubmit={handleUpdate} className="px-0 sm:px-3">

            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              minLength={2}
              required
              disabled={saving}
              className="w-full border border-[#dce7df] bg-[#fcfefd] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-600 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#008c45] hover:bg-[#00783b] text-white py-2.5 rounded-lg mt-3 font-medium shadow-sm transition cursor-pointer disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "আপডেট ইনফরমেশন"}
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}

export default function ProfilePage() {
  const { user, loading, logout, refreshUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="flex-1 bg-[#f0f7f2] flex items-center justify-center py-20">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <ProfileContent
      key={user.uid}
      user={user}
      logout={logout}
      refreshUser={refreshUser}
    />
  );
}
