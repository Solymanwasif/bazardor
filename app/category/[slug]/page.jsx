
import Link from "next/link";
import { getCategoryProducts, getCategories } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [productsData, categoriesData] = await Promise.all([
    getCategoryProducts(slug),
    getCategories(),
  ]);

  const products = Array.isArray(productsData) ? productsData : [];
  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[720px] px-4 py-10">
        <div className="rounded-xl border border-[#e0e8e1] bg-white p-8 text-center">
          <div className="mb-4 text-5xl">🔎</div>
          <h1 className="text-2xl font-bold text-gray-900">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>
          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-white"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
<main className="mx-4 min-h-screen py-5 sm:mx-8 lg:mx-[144px]">
        <section className="mb-4 flex items-center gap-3 rounded-xl border border-[#e0e8e1] bg-white/80 p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center text-2xl">
          {category.icon}
        </div>

        <div className="min-w-0">
          <h1 className="text-lg font-bold leading-6 text-[#253329]">
            {category.nameBn}
          </h1>

          <p className="mt-0.5 text-xs text-gray-500">
            প্রতি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      <CategoryProducts products={products} />
    </main>
  );
}
