
import Link from "next/link";

export default function ProductCard({ product }) {
  const units = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  const formatNumber = (number) =>
    Number(number ?? 0).toLocaleString("bn-BD");

  const direction = product.change?.dir;
  const isUp = direction === "up";
  const isDown = direction === "down";

  const badgeColor = isUp
    ? "bg-red-50 text-red-600"
    : isDown
    ? "bg-green-50 text-green-700"
    : "bg-gray-100 text-gray-600";

  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block h-full"
    >
      <article className="h-full rounded-2xl border border-[#dfe8e1] bg-[#fbfdfb] p-3 transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
            {product.image || "🛒"}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-[#253329] sm:text-base">
              {product.nameBn}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
              প্রতি {units[product.unit] || product.unit}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-0.5 text-base font-extrabold text-[#253329] sm:text-lg">
              {formatNumber(product.today)}{" "}
              <span className="text-xs font-medium">টাকা</span>
            </p>
          </div>

          <span
            className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold sm:text-xs ${badgeColor}`}
          >
            {arrow} {formatNumber(Math.abs(product.change?.pct ?? 0))}%
          </span>
        </div>
      </article>
    </Link>
  );
}
