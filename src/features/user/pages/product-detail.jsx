import React, { useEffect, useState } from "react";
import { ShoppingCart, Star, IndianRupee, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import httpService from "../../../shared/services/httpService.js";
import apiConfig from "../config/apiConfig.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../../redux/slice.js";

export default function ProductDetailPage() {
  const dispatch = useDispatch();

  const cartSelector = useSelector((state) => state?.cart?.item);

  const { productId } = useParams();

  const [productData, setProductData] = useState({});

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    const response = await httpService.getService(
      apiConfig.getProductById + productId
    );

    setProductData(response?.data || {});
  };

  const addToCart = async (e, item) => {
    e.stopPropagation();

    const token = localStorage.getItem("authToken");

    if (token) {
      const getContactNumber = localStorage.getItem("contactNumber");

      const payload = {
        cartData: [
          {
            userId: localStorage.getItem('loginUserId'),
            productId: item._id,
            contactNumber: getContactNumber,
            productImage: item.productImage,
            productName: item.productName,
            productPrice: item.productPrice,
            discount: item.discount,
            discountPrice: item.discountPrice,
            category: item.category,
            foodType: item.foodType,
            description: item.description,
            quantity: 1,
          },
        ],
      };

      const response = await httpService.postService(
        apiConfig.addToCart,
        payload
      );

      if (response.status === true) {
        dispatch(addItem(item));
      }
    } else {
      dispatch(addItem(item));
    }
  };

  const removeToCart = async (e, item) => {
    e.stopPropagation();

    const token = localStorage.getItem("authToken");

    if (token) {
      const response = await httpService.deleteService(
        apiConfig.removeToCart + item._id
      );

      if (response.status === true) {
        dispatch(removeItem(item));
      }
    } else {
      dispatch(removeItem(item));
    }
  };

  return (
    <div className="bg-white py-16 px-6 md:px-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-[320px] h-80 md:w-105 md:h-105 bg-red-50 rounded-full blur-3xl"></div>

          <motion.div
            whileHover={{
              rotate: 8,
              scale: 1.04,
            }}
            transition={{
              duration: 0.4,
            }}
            className="relative z-10 bg-white border border-red-100 rounded-full p-8 md:p-10 shadow-2xl"
          >
            <img
              src={productData?.productImage?.imageUrl}
              alt="pizza"
              className="w-60 md:w-85 drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-4xl text-gray-900 leading-tight poppins_bold"
          >
            {productData?.productName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-5"
          >
            <div className="flex items-center gap-2  px-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={
                      i < Math.round(productData?.rating || 0)
                        ? "currentColor"
                        : "none"
                    }
                    className={
                      i < Math.round(productData?.rating || 0)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-700 poppins_medium">
                {productData?.rating}
              </span>
            </div>

            <div
              className={`text-xs sm:text-sm px-4 py-2 rounded-full text-center whitespace-nowrap font-medium poppins_medium
              ${
                productData?.foodType === "VEG"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {productData?.foodType}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 leading-8 text-sm md:text-base mt-7 poppins_regular"
          >
            {productData?.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-5 mt-10 border-t border-gray-100 pt-8"
          >
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1 text-red-600">
                <IndianRupee size={34} />

                <h2 className="text-4xl md:text-5xl poppins_bold">
                  {productData?.discountPrice}
                </h2>
              </div>

              <div className="flex items-center gap-1 text-gray-400 line-through">
                <IndianRupee size={18} />

                <span className="text-xl poppins_medium">
                  {productData?.productPrice}
                </span>
              </div>
            </div>

            {!cartSelector.find(
              (cartId) => cartId?._id === productData?._id
            ) ? (
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-full text-sm md:text-base transition-all duration-300 flex items-center gap-3 shadow-lg shadow-red-100 poppins_medium"
                onClick={(e) => addToCart(e, productData)}
              >
                <ShoppingCart size={20} />
                Add To Cart
              </motion.button>
            ) : (
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-full text-sm md:text-base transition-all duration-300 flex items-center gap-3 shadow-lg shadow-red-100 poppins_medium"
                onClick={(e) => removeToCart(e, productData)}
              >
                <Trash2 size={20} />
                Remove To Cart
              </motion.button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-red-600 poppins_bold">
                20+
              </h3>

              <p className="text-gray-500 mt-2 text-sm poppins_regular">
                Ingredients
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-red-600 poppins_bold">
                30 Min
              </h3>

              <p className="text-gray-500 mt-2 text-sm poppins_regular">
                Delivery
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-red-600 poppins_bold">
                100%
              </h3>

              <p className="text-gray-500 mt-2 text-sm poppins_regular">
                Fresh
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}