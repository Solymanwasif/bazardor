
"use client";

import { useEffect, useState } from "react";

export default function PriceTicker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!res.ok) {
          throw new Error("Failed to load products");
        }

        const data = await res.json();
        setProducts(data.slice(0, 12));
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="bg-green-900 text-white overflow-hidden py-3">
      <div className="ticker-track flex w-max gap-8">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm"
          >
            <span>{product.image}</span>
            <span className="font-semibold">{product.nameBn}</span>
            <span>
              {Number(product.today).toLocaleString("bn-BD")} টাকা
            </span>
            <span
              className={
                product.change.dir === "up"
                  ? "text-green-300"
                  : product.change.dir === "down"
                  ? "text-red-300"
                  : "text-gray-300"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
              {Number(product.change.pct).toLocaleString("bn-BD")}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
