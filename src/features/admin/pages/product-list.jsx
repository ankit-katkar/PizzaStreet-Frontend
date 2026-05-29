import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import httpService from "../../../shared/services/httpService.js";
import apiConfig from "../config/apiConfig.js";
import { useDispatch } from "react-redux";
import { removeItem } from "../../../redux/slice.js";
import CustomPopup from '../../../shared/component/customPopup.jsx'
import CustomAlert from '../../../shared/component/customAlert.jsx'

export default function ProductList() {
  const router = useNavigate();
  const reducter = useDispatch()

  const [productData, setProductData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchString, setSearchString] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [customPopup, setCustomPopup] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const [customAlert, setCustomAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    getProductData();
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      getProductData();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchString]);

  const getProductData = async () => {
    let query = '?page=' + currentPage;

    if (searchString.trim()) {
      query += '&searchString=' + searchString;
    }
    const response = await httpService.getService(apiConfig.getProduct + query);
    if (response.status == true) {
      setProductData(response.data.docs);
      setPagination({
        hasNextPage: response.data.hasNextPage,
        hasPrevPage: response.data,
        limit: response.data.limit,
        nextPage: response.data.nextPage,
        page: response.data.page,
        pagingCounter: response.data.pagingCounter,
        prevPage: response.data.prevPage,
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages
      })
    }
  };

  const addProduct = () => {
    router("/add-product");
  };

  const editRecord = (id) => {
    router("/update-product/" + id);
  };

  const deleteRecord = async (item) => {
    setSelectedItem(item)
    setCustomPopup({
      isOpen: true,
      type: "warning",
      message: "Are you sure you want to delete this record?",
    })
  };

  const confirmDelete = async () => {
    const response = await httpService.deleteService(apiConfig.deleteProduct + selectedItem._id);
    if (response.status === true) {
      getProductData();
      reducter(removeItem(selectedItem));
      setCustomPopup({
        isOpen: false,
        type: "",
        message: "",
      })
      setCustomAlert({
        isOpen: true,
        type: "success",
        message: response.message,
      });
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl poppins_bold text-gray-900">
            Product <span className="text-red-600">List</span>
          </h1>

          <p className="text-gray-500 mt-2 text-sm md:text-base poppins_regular">
            Manage your food products, edit details and
            control inventory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search product..."
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="w-full h-13 rounded-2xl border border-gray-300 pl-12 pr-4 outline-none focus:border-red-500 transition-all duration-300"
            />

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Add Product Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all duration-300 whitespace-nowrap"
            onClick={addProduct}
          >
            <Plus size={20} />
            Add Product
          </motion.button>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-[1600px] w-full border-collapse">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Sr No
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Product Image
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Product Name
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Product Price
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Product Discount
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Discount Price
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Product Category
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Food Type
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Product Stock
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold min-w-87.5">
                  Product Description
                </th>

                <th className="sticky right-0 bg-red-600 z-20 text-left px-6 py-5 text-sm font-semibold min-w-[180px] shadow-[-4px_0_10px_rgba(0,0,0,0.08)]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {productData.length > 0 ? (
                productData.map((data, index) => (
                  <motion.tr
                    key={data._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.04,
                    }}
                    className="border-b border-gray-100 hover:bg-red-50/40 transition-all duration-300"
                  >
                    <td className="px-6 py-5 text-gray-700 poppins_medium">
                      {(pagination.page - 1) * pagination.limit +
                        index + 1}
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={data.productImage.imageUrl}
                          alt={data.productImage.imageUrl}
                          className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    </td>

                    {/* Product Name */}
                    <td className="px-6 py-5">
                      <h3 className="text-gray-900 poppins_regular">
                        {data.productName}
                      </h3>
                    </td>

                    {/* Product Price */}
                    <td className="px-6 py-5 poppins_regular">
                      ₹ {data.productPrice}
                    </td>

                    {/* Discount */}
                    <td className="px-6 py-5">
                      {data.discount}%
                    </td>

                    {/* Discount Price */}
                    <td className="px-6 py-5 poppins_regular">
                      ₹ {data.discountPrice}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5">
                      <span className="px-4 py-2 poppins_regular text-sm">
                        {data.category}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {
                        data.foodType == 'VEG' ?
                          <span className="px-4 py-2 poppins_regular rounded-full text-green-600 text-sm">
                            {data.foodType}
                          </span> :
                          <span className="px-4 py-2 poppins_regular rounded-full text-red-600 text-sm">
                            {data.foodType}
                          </span>
                      }
                    </td>

                    <td className="px-6 py-5">
                      {
                        data.productStock == 'Aveliable' ?
                          <span className="px-4 py-2 poppins_regular rounded-full bg-green-100 text-green-600 text-sm">
                            {data.productStock}
                          </span> :
                          <span className="px-4 py-2 poppins_regular rounded-full bg-red-100 text-red-600 text-sm">
                            {data.productStock}
                          </span>
                      }
                    </td>

                    {/* Description */}
                    <td className="px-6 py-5 text-gray-600 text-sm poppins_regular leading-7">
                      {data.description}
                    </td>

                    {/* Sticky Actions */}
                    <td className="sticky right-0 bg-white z-10 px-6 py-5 shadow-[-4px_0_10px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-11 h-11 rounded-xl bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-all duration-300"
                          onClick={() =>
                            editRecord(data._id)
                          }
                        >
                          <Pencil
                            size={18}
                            className="text-blue-700"
                          />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-11 h-11 rounded-xl bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all duration-300"
                          onClick={() =>
                            deleteRecord(data)
                          }
                        >
                          <Trash2
                            size={18}
                            className="text-red-700"
                          />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-16 text-gray-500 text-lg"
                  >
                    No Product Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 px-6 py-5 border-t border-gray-200 bg-white">
          <div className="text-sm text-gray-500 poppins_regular">
            Showing{" "}
            <span className="poppins_medium">
              25
            </span>{" "}
            items of{" "}
            <span className="poppins_medium">
              {pagination.totalDocs}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-100 hover:bg-red-200 text-red-600"
                }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="px-5 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-sm poppins_medium text-gray-700">
              Page {pagination.page} of{" "}
              {pagination.totalPages || 1}
            </div>

            {/* Next */}
            <button
              onClick={handleNextPage}
              disabled={
                pagination.page === pagination.totalPages ||
                pagination.totalPages === 0
              }
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${pagination.page === pagination.totalPages ||
                pagination.totalPages === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-100 hover:bg-red-200 text-red-600"
                }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
      <CustomPopup
        isOpen={customPopup.isOpen}
        type={customPopup.type}
        message={customPopup.message}
        onClose={() =>
          setCustomPopup({
            isOpen: false,
            type: "",
            message: "",
          })
        }
        onConfirm={confirmDelete}
      />

      <CustomAlert
        isOpen={customAlert.isOpen}
        type={customAlert.type}
        message={customAlert.message}
        onClose={() =>
          setCustomAlert({
            isOpen: false,
            type: "",
            message: "",
          })
        }
      />
    </div>
  );
}