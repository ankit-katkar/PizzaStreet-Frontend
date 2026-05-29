import React, { useEffect, useState } from "react";
import {
  Search,
  X,
  Eye,
  Star,
  IndianRupee,
  ShoppingBag,
} from "lucide-react";
import httpService from "../../../shared/services/httpService";
import apiConfig from "../config/apiConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SearchProduct() {

  const navigate = useNavigate();

  const [searchString, setSearchString] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {

      if (searchString.trim()) {
        getSearchProduct(searchString);
      } else {
        setSearchProduct([]);
      }

    }, 500);

    return () => clearTimeout(timer);

  }, [searchString]);

  const clearSearch = () => {
    setSearchString("");
    setSearchProduct([]);
  };

  const getSearchProduct = async (searchString) => {

    try {

      setIsSearching(true);

      const response = await httpService.getService(
        apiConfig.searchProduct + "?searchString=" + searchString
      );

      if (response.status === true) {
        setSearchProduct(response.data || []);
      } else {
        setSearchProduct([]);
      }

    } catch (error) {

      setSearchProduct([]);

    } finally {

      setIsSearching(false);

    }
  };

  const onViewProduct = (productId) => {
    navigate("/productDetail/" + productId);
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
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="w-full px-4 text-gray-800 bg-transparent outline-none text-base md:text-lg poppins_regular"
            />

            {searchString && (
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

      {
        searchString &&
        !isSearching &&
        searchProduct.length === 0 && (

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="flex flex-col items-center justify-center py-24"
          >

            <div className="w-28 h-28 rounded-full bg-red-50 flex items-center justify-center">
              <ShoppingBag
                size={45}
                className="text-red-600"
              />
            </div>

            <h2 className="text-3xl text-gray-900 mt-6 poppins_bold">
              No Product Found
            </h2>

            <p className="text-gray-500 mt-3 text-center max-w-md leading-8 poppins_regular">
              We couldn't find any delicious pizza matching your search.
            </p>

          </motion.div>
        )
      }

      {
        searchProduct.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

            {searchProduct.map((item, index) => (

              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl overflow-hidden group transition-all duration-300 flex flex-col"
              >

                <div className="relative h-64 flex justify-center items-center overflow-hidden p-6">

                  <img
                    src={item.productImage.imageUrl}
                    alt={item.productImage.imageName}
                    className={`w-52 object-contain transition-all duration-500 group-hover:scale-110
                    ${item.category?.toLowerCase() === "pizza"
                        ? "group-hover:rotate-12"
                        : ""
                      }`}
                  />

                </div>

                <div className="p-6 flex flex-col flex-1">

                  <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-1">

                      {[...Array(5)].map((_, i) => (

                        <Star
                          key={i}
                          size={17}
                          fill={i < item.rating ? "currentColor" : "none"}
                          className={
                            i < item.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />

                      ))}

                    </div>

                    <div
                      className={`text-xs sm:text-sm px-4 py-1.5 rounded-full min-w-[85px] sm:min-w-[95px] inline-flex items-center justify-center whitespace-nowrap font-medium
                      ${item.foodType === "VEG"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.foodType}
                    </div>

                  </div>

                  <div className="flex items-center justify-between mt-2 gap-3">

                    <h3 className="text-[16px] text-gray-800 poppins_medium leading-8">
                      {item.productName}
                    </h3>

                  </div>

                  <p
                    className="text-gray-500 text-sm leading-7 mt-2 poppins_regular overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </p>

                  <div className="mt-auto pt-6">

                    <div className="flex items-end justify-between gap-4">

                      <div className="flex flex-col">

                        <h4 className="text-2xl text-red-600 poppins_semiBold leading-tight flex items-center gap-1">
                          <IndianRupee size={20} />
                          {item.discountPrice}
                        </h4>

                        <span className="text-gray-400 line-through text-sm poppins_regular flex items-center gap-1">
                          <IndianRupee size={14} />
                          {item.productPrice}
                        </span>

                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-red-300 poppins_regular flex items-center gap-2 whitespace-nowrap"
                        onClick={() => onViewProduct(item._id)}
                      >
                        <Eye size={18} />
                        View
                      </motion.button>

                    </div>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>
        )
      }

    </div>
  );
}