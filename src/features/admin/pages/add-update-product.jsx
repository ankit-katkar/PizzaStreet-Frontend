import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  ImagePlus,
  PackageCheck,
  IndianRupee,
  Boxes,
} from "lucide-react";

export default function AddUpdateProduct() {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl poppins_bold text-gray-900">
          Add <span className="text-red-600">Product</span>
        </h1>

        <p className="text-gray-500 mt-2 text-sm md:text-base poppins_regular">
          Add delicious food items with complete details and manage your menu
          professionally.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[30px] shadow-2xl border border-gray-200 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Side */}
          <div className="lg:col-span-4 bg-red-600 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>

            <div className="absolute bottom-0 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <PackageCheck size={32} />
              </div>

              <h2 className="text-3xl poppins_bold leading-snug">
                Create New Product
              </h2>

              <p className="mt-4 text-white/90 leading-7 text-sm md:text-base">
                Add your latest pizza, burger, pasta, or drink item with
                attractive details and pricing.
              </p>

              <div className="mt-10 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <ImagePlus size={18} />
                  </div>

                  <span className="text-sm">
                    Upload high quality food images
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <IndianRupee size={18} />
                  </div>

                  <span className="text-sm">
                    Manage product price & stock
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-8 p-6 md:p-10">
            <form className="space-y-7">
              {/* Upload Image */}
              <div>
                <label className="block text-sm mb-3 text-gray-700 poppins_medium">
                  Upload Product Image
                </label>

                <label className="border-2 border-dashed border-red-200 hover:border-red-500 transition-all duration-300 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer bg-red-50/30">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-44 h-44 object-cover rounded-2xl shadow-lg"
                    />
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <UploadCloud
                          size={30}
                          className="text-red-600"
                        />
                      </div>

                      <p className="text-gray-700 poppins_medium">
                        Click to Upload Image
                      </p>

                      <span className="text-gray-500 text-sm mt-1">
                        PNG, JPG or JPEG
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* Product Name + Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700 poppins_medium">
                    Product Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="w-full h-14 rounded-2xl border border-gray-300 px-5 outline-none focus:border-red-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700 poppins_medium">
                    Product Price
                  </label>

                  <input
                    type="number"
                    placeholder="Enter product price"
                    className="w-full h-14 rounded-2xl border border-gray-300 px-5 outline-none focus:border-red-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Category + Stock Count */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700 poppins_medium">
                    Product Category
                  </label>

                  <select className="w-full h-14 rounded-2xl border border-gray-300 px-5 outline-none focus:border-red-500 transition-all duration-300 bg-white text-gray-600">
                    <option value="">Select Category</option>
                    <option value="Our Special">Our Special</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Cold Drinks">Cold Drinks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700 poppins_medium">
                    Total Stock Items
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter stock quantity"
                      className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-5 outline-none focus:border-red-500 transition-all duration-300"
                    />

                    <Boxes
                      size={20}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm mb-2 text-gray-700 poppins_medium">
                  Product Description
                </label>

                <textarea
                  rows="6"
                  placeholder="Write delicious product description..."
                  className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none resize-none focus:border-red-500 transition-all duration-300"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg poppins_medium"
                >
                  Add Product
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  className="w-full sm:w-auto border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 px-8 py-4 rounded-2xl transition-all duration-300 poppins_medium"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}