import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

import pizza from "../../../assets/img/02.png";

export default function ProductDetailPage() {
  return (
    <div className="bg-white py-16 px-6 md:px-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] bg-red-50 rounded-full blur-3xl"></div>

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
              src={pizza}
              alt="pizza"
              className="w-[240px] md:w-[340px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
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
            Italian Cheese Pizza
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mt-5"
          >
            <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-100 px-4 py-2 rounded-full">
              <Star size={16} fill="currentColor" className="text-yellow-500" />

              <span className="text-sm text-gray-700 poppins_medium">
                4.9 Rating
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 leading-8 text-sm md:text-base mt-7 poppins_regular"
          >
            Enjoy our delicious Italian Cheese Pizza loaded with extra
            mozzarella cheese, crispy crust, fresh toppings, and authentic
            Italian flavors specially crafted for pizza lovers. Freshly baked
            with premium ingredients for an unforgettable taste experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-5 mt-10 border-t border-gray-100 pt-8"
          >
            <div className="flex items-center gap-4">
              <h2 className="text-4xl md:text-5xl text-red-600 poppins_bold">
                $25
              </h2>

              <span className="text-gray-400 line-through text-xl poppins_medium">
                $35
              </span>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-full text-sm md:text-base transition-all duration-300 flex items-center gap-3 shadow-lg shadow-red-100 poppins_medium"
            >
              <ShoppingCart size={20} />
              Add To Cart
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 mt-12"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-red-600 poppins_bold">20+</h3>

              <p className="text-gray-500 mt-2 text-sm poppins_regular">
                Ingredients
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-red-600 poppins_bold">15m</h3>

              <p className="text-gray-500 mt-2 text-sm poppins_regular">
                Delivery
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-red-600 poppins_bold">100%</h3>

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
