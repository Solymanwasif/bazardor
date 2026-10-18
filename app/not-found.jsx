import Link from "next/link";

export default function NotFound() {
  return (
    <main className="least-h-[70vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center">

        <div className="text-7xl mb-4">
          🛒
        </div>

        <h1 className="text-4xl font-bold text-green-700 mb-3">
          ৪০৪
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="text-gray-500 mb-8">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে
          অথবা ঠিকানাটি ভুল হয়েছে।
        </p>

        <Link
          href="/"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition"
        >
          হোম পেজে ফিরে যান
        </Link>

      </div>
    </main>
  );
}