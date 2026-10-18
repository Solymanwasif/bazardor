export default function Loading() {
  return (
    <main className="maximum-w-6xl mx-auto px-5 py-10">
      <div className="animate-pulse mb-10">
        <div className="h-14 w-14 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-9 w-48 bg-gray-200 rounded-lg mb-3"></div>
        <div className="h-4 w-64 maximum-w-full bg-gray-200 rounded"></div>
      </div>

      <div className="flex justify-between items-center mb-6 animate-pulse">
        <div className="h-5 w-28 bg-gray-200 rounded"></div>
        <div className="h-10 w-44 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-5 bg-white animate-pulse"
          >
            <div className="h-28 bg-gray-200 rounded-xl"></div>

            <div className="h-6 w-3/4 bg-gray-200 rounded mt-4"></div>

            <div className="h-4 w-1/2 bg-gray-200 rounded mt-3"></div>

            <div className="flex justify-between items-center mt-6">
              <div className="h-7 w-24 bg-gray-200 rounded"></div>
              <div className="h-7 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}