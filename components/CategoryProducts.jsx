
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function toNumericPrice(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const digits = "০১২৩৪৫৬৭৮৯";

  const normalized = value
    .replace(/[০-৯]/g, (digit) => String(digits.indexOf(digit)))
    .replace(/,/g, "")
    .trim();

  const match = normalized.match(/-?\d+(\.\d+)?/);

  return match && Number.isFinite(Number(match[0]))
    ? Number(match[0])
    : 0;
}

function ProductPriceCard({ product }) {
  const direction = product.change?.dir;
  const percentage = toNumericPrice(product.change?.pct);

  const units = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  const badgeStyle =
    direction === "up"
      ? "bg-red-50 text-red-600"
      : direction === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-600";

  const arrow =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block min-w-0 rounded-xl border border-[#e0e8e1] bg-white/80 p-2.5 transition hover:border-green-200 hover:shadow-sm"
    >
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0f5f0] text-xl">
          {product.image}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xs font-bold text-[#253329]">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 truncate text-[10px] text-gray-500">
            প্রতি {units[product.unit] || product.unit}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-1 border-t border-gray-100 pt-2">
        <div className="min-w-0">
          <p className="text-[10px] text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-0.5 text-sm font-extrabold leading-5 text-[#253329]">
            {toNumericPrice(product.today).toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${badgeStyle}`}
        >
          {arrow} {percentage.toLocaleString("bn-BD")}%
        </span>
      </div>
    </Link>
  );
}

export default function CategoryProducts({ products = [] }) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort(
        (a, b) => toNumericPrice(a.today) - toNumericPrice(b.today)
      );
    }

    if (sort === "high") {
      result.sort(
        (a, b) => toNumericPrice(b.today) - toNumericPrice(a.today)
      );
    }

    return result;
  }, [products, sort]);

  return (
    <>
      <div className="mb-2 flex min-h-[42px] items-center justify-end rounded-xl border border-[#e0e8e1] bg-white/80 px-3 py-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor="category-sort"
            className="text-[10px] text-gray-500"
          >
            সাজান
          </label>

          <select
            id="category-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="max-w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-[10px] text-gray-700 outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <p className="mb-3 text-[10px] text-gray-500">
        মোট {products.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length === 0 ? (
        <div className="rounded-xl border border-[#e0e8e1] bg-white px-4 py-12 text-center">
          <div className="mb-3 text-4xl">🛒</div>

          <h2 className="text-lg font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductPriceCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
