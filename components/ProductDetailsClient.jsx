
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

const units = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

function toNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    const normalized = value
      .replace(/[০-৯]/g, (digit) =>
        String(bengaliDigits.indexOf(digit))
      )
      .replace(/,/g, "")
      .trim();

    const number = Number(normalized);

    return normalized !== "" && Number.isFinite(number)
      ? number
      : null;
  }

  return null;
}

function formatPrice(value) {
  const price = toNumber(value);

  if (price === null) {
    return "—";
  }

  return price.toLocaleString("bn-BD");
}

export default function ProductDetailsClient({ product, details }) {
  const markets = Array.isArray(details?.markets)
    ? details.markets
    : [];

  const validMarkets = markets
    .map((market) => ({
      ...market,
      numericMin: toNumber(market.min),
      numericMax: toNumber(market.max),
    }))
    .filter(
      (market) =>
        market.numericMin !== null &&
        market.numericMax !== null
    );

  const minimum =
    validMarkets.length > 0
      ? Math.min(...validMarkets.map((market) => market.numericMin))
      : null;

  const maximum =
    validMarkets.length > 0
      ? Math.max(...validMarkets.map((market) => market.numericMax))
      : null;

  const average =
    minimum !== null && maximum !== null
      ? Math.round((minimum + maximum) / 2)
      : null;

  const unit = units[product.unit] || product.unit || "একক";

  return (
    <ProtectedRoute>
      <main className="max-w-6xl mx-auto px-4 sm:px-5 py-8 sm:py-10">

        {/* Product summary */}
        <section className="bg-green-50 rounded-2xl p-5 sm:p-8 lg:p-10">

          <div className="text-6xl sm:text-7xl">
            {product.image || "🛒"}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mt-4 text-gray-900">
            {product.nameBn}
          </h1>

          <p className="text-gray-600 mt-2">
            আজকের বাজার মূল্য
          </p>

          <div className="flex gap-3 mt-4 flex-wrap">
            {product.categoryNameBn && (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                {product.categoryNameBn}
              </span>
            )}

            <span className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm">
              প্রতি {unit}
            </span>
          </div>

          <div className="mt-6">
            <p className="text-gray-600">
              আজকের দাম
            </p>

            <h2 className="text-3xl font-bold text-green-700 mt-1">
              {formatPrice(product.today)} টাকা
            </h2>
          </div>
        </section>

        {/* Price summary */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-5">
            মূল্য সংক্ষিপ্তসার
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <h3 className="text-2xl font-bold mt-2 text-green-700">
                {formatPrice(minimum)} টাকা
              </h3>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <h3 className="text-2xl font-bold mt-2 text-red-600">
                {formatPrice(maximum)} টাকা
              </h3>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-gray-500">
                গড় দাম
              </p>

              <h3 className="text-2xl font-bold mt-2 text-gray-900">
                {formatPrice(average)} টাকা
              </h3>
            </div>

          </div>
        </section>

        {/* Market-wise prices */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-5">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {validMarkets.length === 0 ? (
            <div className="border border-gray-200 rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">🏪</div>

              <h3 className="font-semibold text-lg">
                বাজারের তথ্য পাওয়া যায়নি
              </h3>

              <p className="text-gray-500 mt-2">
                এই পণ্যের জন্য বর্তমানে কোনো বৈধ বাজারদর নেই।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {validMarkets.map((market, index) => (
                <article
                  key={`${market.market}-${market.division}-${index}`}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-lg">
                    {market.market}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {market.division}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-4">

                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        সর্বনিম্ন
                      </p>

                      <p className="font-bold text-green-700 mt-1">
                        {formatPrice(market.numericMin)} টাকা
                      </p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        সর্বোচ্চ
                      </p>

                      <p className="font-bold text-red-600 mt-1">
                        {formatPrice(market.numericMax)} টাকা
                      </p>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>
    </ProtectedRoute>
  );
}
