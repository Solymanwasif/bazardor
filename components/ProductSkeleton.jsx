
export default function ProductSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-5 bg-white animate-pulse"
        >
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-5" />

          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />

          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6" />

          <div className="flex justify-between items-end">
            <div>
              <div className="h-3 bg-gray-200 rounded w-20 mb-2" />
              <div className="h-5 bg-gray-200 rounded w-24" />
            </div>

            <div className="h-8 bg-gray-200 rounded-lg w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="bg-green-50 rounded-2xl p-6 sm:p-10 lg:p-12 mb-12 overflow-hidden animate-pulse">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="h-5 w-40 bg-gray-200 rounded mb-5" />

          <div className="h-10 w-full max-w-lg bg-gray-200 rounded mb-3" />
          <div className="h-10 w-4/5 bg-gray-200 rounded mb-5" />

          <div className="h-5 w-full bg-gray-200 rounded mb-3" />
          <div className="h-5 w-4/5 bg-gray-200 rounded mb-7" />

          <div className="h-12 w-40 bg-gray-200 rounded-lg" />
        </div>

        <div className="bg-white rounded-3xl p-8 shadow w-full max-w-sm mx-auto">
          <div className="h-28 bg-gray-200 rounded-xl" />

          <div className="grid grid-cols-3 gap-4 mt-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-16 bg-gray-200 rounded-xl"
              />
            ))}
          </div>

          <div className="h-5 w-36 bg-gray-200 rounded mx-auto mt-6" />
        </div>
      </div>
    </section>
  );
}
