
import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton, {
  HeroSkeleton,
} from "@/components/ProductSkeleton";

async function ProductSection() {
  const products = await getProducts();

  const risers = products
    .filter((item) => item.change?.dir === "up")
    .slice(0, 6);

  const fallers = products
    .filter((item) => item.change?.dir === "down")
    .slice(0, 6);

  return (
    <>
      {/* Prices that increased */}
      <section>
        <h2 className="text-2xl font-bold mb-5">
          আজ দাম বেড়েছে ▲
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {risers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* Prices that decreased */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-5">
          আজ দাম কমেছে ▼
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fallers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* All products */}
      <section
        id="products"
        className="mt-12 scroll-mt-24"
      >
        <h2 className="text-3xl font-bold">
          সব পণ্য
        </h2>

        <p className="text-gray-500 mb-6">
          আজকের সকল বাজার মূল্য
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-12">
      <HeroSkeleton />

      <section>
        <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-5" />
        <ProductSkeleton count={6} />
      </section>

      <section>
        <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-5" />
        <ProductSkeleton count={6} />
      </section>

      <section>
        <div className="h-9 w-40 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="h-5 w-64 max-w-full bg-gray-200 rounded animate-pulse mb-6" />
        <ProductSkeleton count={8} />
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <Suspense fallback={<HomeSkeleton />}>
        {/* Hero / Banner */}
        <section className="bg-green-50 rounded-2xl p-6 sm:p-10 lg:p-12 mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-green-700 font-semibold mb-3">
                আজকের বাজার আপডেট
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                বাজারের সব পণ্যের দাম এক নজরে
              </h1>

              <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed">
                চাল, ডাল, মাছ, মাংস, সবজি এবং নিত্যপ্রয়োজনীয়
                পণ্যের সর্বশেষ বাজারদর সহজেই জেনে নিন।
              </p>

              <a
                href="#products"
                className="inline-block mt-7 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                সব পণ্য দেখুন →
              </a>
            </div>

            <div className="flex justify-center items-center">
              <div className="relative bg-white rounded-3xl p-8 shadow-lg w-full max-w-sm">
                <div className="text-center text-7xl sm:text-8xl">
                  🛒
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div className="bg-green-50 rounded-xl p-3 text-4xl">
                    🍚
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 text-4xl">
                    🥔
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 text-4xl">
                    🐟
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 text-4xl">
                    🥬
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 text-4xl">
                    🥚
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 text-4xl">
                    🧅
                  </div>
                </div>

                <p className="text-center text-green-700 font-semibold mt-6">
                  আজকের বাজারদর
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product data loads asynchronously */}
        <ProductSection />
      </Suspense>
    </main>
  );
}
