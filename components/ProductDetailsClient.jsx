
"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProductDetailsClient({ product, details }) {
  const markets = Array.isArray(details?.markets) ? details.markets : [];

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("bn-BD");

  const units = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  const prices = markets.flatMap((market) => [
    Number(market.min),
    Number(market.max),
  ]).filter(Number.isFinite);

  const minimum = prices.length ? Math.min(...prices) : 0;
  const maximum = prices.length ? Math.max(...prices) : 0;
  const average = prices.length
    ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length)
    : 0;

  const direction = product.change?.dir;
  const percentage = Number(product.change?.pct || 0);

  const changeColor =
    direction === "up"
      ? "text-red-600"
      : direction === "down"
        ? "text-green-700"
        : "text-gray-500";

  const arrow =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#f0f5f0]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-8 lg:px-[144px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500"
          >
            <Link href="/" className="hover:text-green-700">
              হোম
            </Link>

            <span>›</span>

            <span>{product.categoryNameBn}</span>

            <span>›</span>

            <span className="font-medium text-gray-700">
              {product.nameBn}
            </span>
          </nav>

          <section className="mb-4 flex items-center justify-between gap-4 rounded-xl border border-[#e0e8e1] bg-white/80 p-4 sm:p-5">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl sm:h-14 sm:w-14 sm:text-4xl">
                {product.image}
              </div>

              <div className="min-w-0">
                <h1 className="text-lg font-extrabold text-[#253329] sm:text-2xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  প্রতি {units[product.unit] || product.unit}
                  {" · "}
                  {product.categoryNameBn}
                </p>

                <p className="mt-1 text-[11px] text-gray-600 sm:text-xs">
                  গতকালের তুলনায় আজকের দাম { 
                    direction === "up"
                      ? "বেড়েছে"
                      : direction === "down"
                        ? "কমেছে"
                        : "অপরিবর্তিত"
                  } · {formatPrice(product.change?.amount ?? 0)} টাকা
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-3 py-3 text-center sm:px-5">
              <p className="text-[10px] text-gray-500 sm:text-xs">
                আজকের দাম
              </p>

              <p className="text-xl font-extrabold leading-7 text-[#253329] sm:text-2xl">
                {formatPrice(product.today)}
              </p>

              <p className="text-[10px] text-gray-500">
                টাকা / {units[product.unit] || product.unit}
              </p>

              <p className={`mt-1 text-[10px] font-bold ${changeColor}`}>
                {arrow} {formatPrice(Math.abs(percentage))}%
              </p>
            </div>
          </section>

          <section className="mb-4 rounded-xl border border-[#e0e8e1] bg-white/80 p-3 sm:p-4">
            <h2 className="mb-3 text-sm font-bold text-[#253329]">
              দামের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-[#e0e8e1] bg-white p-3">
                <p className="text-[11px] text-gray-500">
                  সর্বনিম্ন দাম
                </p>

                <p className="mt-1 text-lg font-extrabold text-green-700">
                  {formatPrice(minimum)} টাকা
                </p>

                <p className="mt-1 text-[10px] text-gray-500">
                  বাজারে পাওয়া সর্বনিম্ন দাম
                </p>
              </div>

              <div className="rounded-xl border border-[#e0e8e1] bg-white p-3">
                <p className="text-[11px] text-gray-500">
                  সর্বোচ্চ দাম
                </p>

                <p className="mt-1 text-lg font-extrabold text-red-600">
                  {formatPrice(maximum)} টাকা
                </p>

                <p className="mt-1 text-[10px] text-gray-500">
                  বাজারে পাওয়া সর্বোচ্চ দাম
                </p>
              </div>

              <div className="rounded-xl border border-[#e0e8e1] bg-white p-3">
                <p className="text-[11px] text-gray-500">
                  গড় দাম
                </p>

                <p className="mt-1 text-lg font-extrabold text-[#253329]">
                  {formatPrice(average)} টাকা
                </p>

                <p className="mt-1 text-[10px] text-gray-500">
                  প্রতি বাজারের দামের গড়
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#e0e8e1] bg-white/80 p-3 sm:p-4">
            <h2 className="mb-3 text-sm font-bold text-[#253329]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            {markets.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                বর্তমানে বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[580px] border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500">
                      <th className="px-3 py-3 font-semibold">বাজার</th>
                      <th className="px-3 py-3 font-semibold">বিভাগ</th>
                      <th className="px-3 py-3 text-right font-semibold">
                        সর্বনিম্ন
                      </th>
                      <th className="px-3 py-3 text-right font-semibold">
                        সর্বোচ্চ
                      </th>
                      <th className="px-3 py-3 text-right font-semibold">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className={`border-b border-[#dce5dd] last:border-b-0 ${
                          index % 2 === 0 ? "bg-white/60" : "bg-[#f0f5f0]"
                        }`}
                      >
                        <td className="px-3 py-3 font-medium text-[#253329]">
                          {market.market}
                        </td>

                        <td className="px-3 py-3 text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-3 py-3 text-right text-gray-700">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right text-gray-700">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right font-bold text-[#253329]">
                          {formatPrice(
                            Math.round(
                              (Number(market.min) + Number(market.max)) / 2
                            )
                          )} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
