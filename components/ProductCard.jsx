
import Link from "next/link";

export default function ProductCard({ product }) {
  const units = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  const formatNumber = (number) =>
    Number(number).toLocaleString("bn-BD");

  const direction = product.change.dir;

  const badgeColor =
    direction === "up"
      ? "bg-green-100 text-green-700"
      : direction === "down"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-600";

  const arrow =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block h-full"
    >
      <div className="h-full bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
        <div className="flex justify-center items-center bg-green-50 rounded-xl h-28 text-6xl">
          {product.image}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mt-4">
          {product.nameBn}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          প্রতি {units[product.unit] || product.unit}
        </p>

        <div className="flex justify-between items-end gap-2 mt-5">
          <div>
            <p className="text-gray-500 text-xs">
              আজকের দাম
            </p>

            <p className="text-green-800 font-bold text-xl mt-1">
              {formatNumber(product.today)} টাকা
            </p>
          </div>

          <span
            className={`${badgeColor} px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap`}
          >
            {arrow} {formatNumber(Math.abs(product.change.pct))}%
          </span>
        </div>
      </div>
    </Link>
  );
}
