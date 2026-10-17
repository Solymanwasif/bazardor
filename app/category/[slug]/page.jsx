
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

  // Invalid category or category with no products
  if (!category || products.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-5 py-20 text-center">
        <div className="text-6xl mb-5">🔎</div>

        <h1 className="text-3xl font-bold text-gray-900">
          {category ? "কোনো পণ্য পাওয়া যায়নি" : "ক্যাটাগরি পাওয়া যায়নি"}
        </h1>

        <p className="text-gray-500 mt-3">
          {category
            ? "এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।"
            : "আপনার নির্বাচিত ক্যাটাগরিটি খুঁজে পাওয়া যায়নি।"}
        </p>

        <Link
          href="/"
          className="inline-block mt-6 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <section className="mb-8">
        <div className="text-6xl">{category.icon}</div>

        <h1 className="text-3xl sm:text-4xl font-bold mt-3">
          {category.nameBn}
        </h1>

        <p className="text-gray-500 mt-2">
          এই ক্যাটাগরির সকল পণ্য
        </p>

        <p className="text-sm text-gray-500 mt-2">
          মোট পণ্য: {products.length}টি
        </p>
      </section>

      <CategoryProducts products={products} />
    </main>
  );
}
