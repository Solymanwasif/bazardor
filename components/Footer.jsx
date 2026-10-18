
export default function Footer() {
  return (
    <footer className=" border-t border-black bg-[#FAFCFA] text-black">
      <div className="mx-[144px] px-5 py-8 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>

            <p className="mt-1 text-sm text-gray-600">
             বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <div className="max-w-md sm:text-right">
            <p className="text-sm leading-6 text-gray-600">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
