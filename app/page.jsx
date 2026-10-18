
import { Suspense } from "react";
import Link from "next/link";
import MarketDateTime from "@/components/MarketDateTime";
import Image from "next/image";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

function SectionSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-gray-100 bg-white p-3"
        >
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" />
            <div className="flex-1">
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-100" />
            </div>
          </div>

          <div className="mt-4 flex justify-between border-t border-gray-100 pt-3">
            <div className="h-5 w-20 rounded bg-gray-200" />
            <div className="h-6 w-14 rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white px-4 py-12 text-center text-gray-500">
        বর্তমানে কোনো পণ্য পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function SectionHeading({
  icon,
  title,
  color = "text-[#253329]",
  iconColor = "text-gray-600",
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span
        className={`text-3xl font-extrabold leading-none ${iconColor}`}
        aria-hidden="true"
      >
        {icon}
      </span>

      <h2 className={`text-lg font-extrabold sm:text-xl ${color}`}>
        {title}
      </h2>
    </div>
  );
}

async function ProductSections() {
  const products = await getProducts();

  const risers = products
    .filter((item) => item.change?.dir === "up")
    .slice(0, 6);

  const fallers = products
    .filter((item) => item.change?.dir === "down")
    .slice(0, 6);

  return (
    <>
      <section className="mb-9">
        <SectionHeading
          icon="▲"
          title="আজ দাম বেড়েছে"
          iconColor="text-red-600"
        />

        <ProductGrid products={risers} />
      </section>

      <section className="mb-9">
        <SectionHeading
          icon="▼"
          title="আজ দাম কমেছে"
          iconColor="text-green-600"
        />

        <ProductGrid products={fallers} />
      </section>

      <section id="products" className="scroll-mt-6">
        <SectionHeading
          icon="🧺"
          title="সব পণ্য"
          iconColor="text-gray-700"
        />

        <p className="mb-5 text-sm text-gray-500">
          আজকের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।
        </p>

        <ProductGrid products={products} />
      </section>
    </>
  );
}

function ProductSectionsFallback() {
  return (
    <div className="space-y-9">
      {[6, 6, 12].map((count, index) => (
        <section key={index}>
          <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-200" />
          <SectionSkeleton count={count} />
        </section>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f7f2]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-white bg-gradient-to-r from-white via-[#f7fbf7] to-[#e8f5e9] p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full bg-green-100/50 blur-2xl" />
           <MarketDateTime />

          <div className="relative grid items-center gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-8">
            <div className="relative z-10">
              <span className="inline-flex rounded-full bg-[#e0f3e5] px-3 py-1.5 text-xs font-bold text-green-800">
                নিত্যপ্রয়োজনীয় পণ্যের দাম
              </span>

              <h1 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-[#203327] sm:text-3xl lg:text-4xl">
                আজকের বাজারের দাম এক নজরে
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের
                আজকের বাজারদর জানুন সহজেই।
              </p>

              <a
                href="#products"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#008c45] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#00783b]"
              >
                সব পণ্য দেখুন
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="relative mx-auto flex min-h-40 w-full max-w-md items-center justify-center sm:min-h-48 md:min-h-56">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের তাজা শাকসবজি ও নিত্যপ্রয়োজনীয় পণ্য"
                width={600}
                height={450}
                priority
                className="h-auto max-h-64 w-full object-contain sm:max-h-72"
              />
            </div>
          </div>
        </section>

        <Suspense fallback={<ProductSectionsFallback />}>
          <ProductSections />
        </Suspense>
      </div>
    </main>
  );
}
