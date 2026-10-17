
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (loading || user || redirected.current) return;

    redirected.current = true;
    toast.error("Please login first", {
      id: "login-required",
    });

    router.replace("/signin");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return children;
}
