
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProducts, getSingleProduct } from "@/lib/api";
import ProductDetailsClient from "@/components/ProductDetailsClient";

async function ProductContent({ params }) {
  const { slug } = await params;

  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === slug
  );
  if (!product) {
    notFound();
  }

  const details = await getSingleProduct(product.id);

  if (!details) {
    notFound();
  }

  return (
    <ProductDetailsClient
      product={product}
      details={details}
    />
  );
}

function ProductLoading() {
  return (
    <main className="max-w-6xl mx-auto px-5 py-10 animate-pulse">
      <div className="h-16 w-16 rounded-xl bg-gray-200 mb-5" />

      <div className="h-9 w-64 max-w-full rounded bg-gray-200 mb-3" />

      <div className="h-5 w-48 rounded bg-gray-200 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-xl p-5"
          >
            <div className="h-4 w-28 bg-gray-200 rounded mb-5" />
            <div className="h-8 w-36 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      <div className="h-7 w-56 bg-gray-200 rounded mt-10 mb-5" />

      <div className="grid sm:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 bg-gray-200 rounded-xl"
          />
        ))}
      </div>
    </main>
  );
}

export default function ProductDetails({ params }) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
