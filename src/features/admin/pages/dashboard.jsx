import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  LayoutGrid,
  Package,
  ShoppingBag,
  IndianRupee,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import httpService from '../../../shared/services/httpService.js'
import apiConfig from "../config/apiConfig.js";

export default function Dashboard() {
  const router = useNavigate();

  const [dashboardDetail, setDashboardDetail] = useState({})

  useEffect(() => {
    getDashboardDetail()
  }, [])

  const setProduct = () => {
    router("/productList");
  };

  const getDashboardDetail = async () => {
    const response = await httpService.getService(apiConfig.dashboardDetail)
    if (response.status == true) {
      setDashboardDetail(response.data)
    }
  }

  const formatAmount = (amount) => {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(1) + "Cr";
    }
    if (amount >= 100000) {
      return (amount / 100000).toFixed(1) + "L";
    }
    if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + "K";
    }
    return amount;
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl poppins_bold text-gray-900 leading-tight"
          >
            Admin <span className="text-red-600">Dashboard</span>
          </motion.h1>

          <p className="text-gray-500 mt-3 text-sm md:text-base poppins_regular max-w-2xl">
            Manage your pizza products, categories, inventory and monitor
            your restaurant performance from one place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={setProduct}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all duration-300 poppins_medium"
          >
            <Plus size={20} />
            Set Product
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 poppins_regular">
                Total Products
              </p>
              <h2 className="text-3xl mt-3 text-gray-900 poppins_bold">
                {formatAmount(dashboardDetail.totalProduct)}
              </h2>
            </div>
            <div className="w-15 h-15 rounded-2xl bg-red-100 flex items-center justify-center">
              <Package size={28} className="text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 poppins_regular">
                Total Orders
              </p>
              <h2 className="text-3xl mt-3 text-gray-900 poppins_bold">
                {formatAmount(dashboardDetail.totalOrders)}
              </h2>
            </div>
            <div className="w-15 h-15 rounded-2xl bg-orange-100 flex items-center justify-center">
              <ShoppingBag
                size={28}
                className="text-orange-600"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 poppins_regular">
                Total Revenue
              </p>
              <h2 className="flex items-center gap-1 text-3xl mt-3 text-gray-900 poppins_bold">
                <IndianRupee size={24} />
                {formatAmount(dashboardDetail.totalRevenue)}
              </h2>
            </div>

            <div className="w-15 h-15 rounded-2xl bg-green-100 flex items-center justify-center">
              <IndianRupee
                size={28}
                className="text-green-600"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 poppins_regular">
                Total Users
              </p>

              <h2 className="text-2xl mt-3 text-gray-900 poppins_bold">
                {formatAmount(dashboardDetail.totalUsers)}
              </h2>
            </div>

            <div className="w-15 h-15 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Users size={28} className="text-blue-600" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}