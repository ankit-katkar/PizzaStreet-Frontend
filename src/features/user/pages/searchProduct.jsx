import React, { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchProduct() {

  const [search, setSearch] = useState("");

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 md:px-12 lg:px-20">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">

          <h1 className="text-3xl sm:text-4xl md:text-5xl poppins_bold text-gray-900">
            Search{" "}
            <span className="text-red-600">
              Product
            </span>
          </h1>

          <p className="text-gray-500 mt-4 text-base md:text-lg poppins_regular">
            Find your favorite delicious pizza instantly
          </p>
        </div>

        <div className="relative">

          <div className="flex items-center bg-white border-2 border-gray-200 focus-within:border-red-500 rounded-full px-5 py-4 shadow-lg transition-all duration-300">

            <Search
              size={22}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search your pizza..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full px-4 text-gray-800 bg-transparent outline-none text-base md:text-lg poppins_regular"
            />

            {search && (
              <button
                onClick={clearSearch}
                className="w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all duration-300"
              >
                <X
                  size={18}
                  className="text-red-600"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}