
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

function toNumericPrice(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = value.replace(/[০-৯]/g, (digit) =>
    String(bengaliDigits.indexOf(digit))
  );

  const normalized = englishDigits.replace(/,/g, "").trim();
  const match = normalized.match(/-?\d+(\.\d+)?/);

  if (!match) {
    return 0;
  }

  const price = Number(match[0]);
  return Number.isFinite(price) ? price : 0;
}

export default function CategoryProducts({ products = [] }) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort(
        (a, b) => toNumericPrice(a.today) - toNumericPrice(b.today)
      );
    } else if (sort === "high") {
      result.sort(
        (a, b) => toNumericPrice(b.today) - toNumericPrice(a.today)
      );
    }

    return result;
  }, [products, sort]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <p className="text-gray-600">
          মোট পণ্য:{" "}
          <span className="font-semibold text-gray-900">
            {products.length}
          </span>
          টি
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="category-sort"
            className="text-sm text-gray-600 whitespace-nowrap"
          >
            সাজান:
          </label>

          <select
            id="category-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="w-full sm:w-auto border border-gray-300 bg-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🛒</div>

          <h2 className="text-2xl font-bold mb-2">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
