
"use client";

import { useEffect, useState } from "react";

export default function MarketDateTime() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      setDate(
        new Intl.DateTimeFormat("bn-BD", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Dhaka",
        }).format(new Date())
      );
    };

    updateDate();

    const timer = setInterval(updateDate, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-3">
      <div className="inline-flex rounded-full border border-green-100 bg-[#e0f3e5] px-3 py-1.5 text-xs font-semibold text-green-800">
        {date || "আজকের বাজার আপডেট"}
      </div>
    </div>
  );
}
