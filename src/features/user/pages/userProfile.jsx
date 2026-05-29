import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  VenusAndMars,
  LogOut,
  Edit,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  Star
} from "lucide-react";

import EditUser from './editUserProfile'
import httpService from "../../../shared/services/httpService";
import apiConfig from "../config/apiConfig";

export default function UserProfile() {

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [userData, setUserData] = useState({})
  const [userOrderData, setUserOrderData] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const [ratingData, setRatingData] = useState({});

  const ordersPerPage = 10;

  useEffect(() => {
    getUserProfile();
  }, [])

  useEffect(() => {
    getUserOrder();
  }, [currentPage])

  const getUserProfile = async () => {
    const payload = {
      "userId": localStorage.getItem('loginUserId')
    }

    const response = await httpService.postService(
      apiConfig.getUserProfile,
      payload
    );

    if (response.status == true) {
      setUserData(response.data)
    }
  }

  const getUserOrder = async () => {

    const payload = {
      "userId": localStorage.getItem('loginUserId'),
      "page": currentPage,
      "limit": ordersPerPage
    }

    const response = await httpService.postService(apiConfig.getUserOrder, payload);

    if (response.status == true) {

      setUserOrderData(response?.data?.docs || [])
      setTotalPages(response?.data?.totalPages || 1)
      setTotalOrders(response?.data?.totalDocs || 0)

      let ratingObj = {};

      response?.data?.docs?.forEach((item) => {
        ratingObj[item._id] = item.rating || 0;
      });

      setRatingData(ratingObj);
    }
  }

  const updateRating = async (userId, productId, rating) => {
    setRatingData((prev) => ({
      ...prev,
      [productId]: rating
    }));
    const payload = {
      "userId": userId,
      "productId": productId,
      "rating": rating
    }
    const response = await httpService.postService(apiConfig.setProductRating, payload);
    if(response.status == true){
      getUserOrder()
    }
  }

  const formatDate = (date) => {
    if (!date) return "";

    const newDate = new Date(date);

    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginUserName");
    localStorage.removeItem("loginUserRole");
    localStorage.removeItem("contactNumber");
    localStorage.removeItem("loginUserId");

    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  const startIndex = (currentPage - 1) * ordersPerPage;

  return (
    <>
      <div className="min-h-screen py-8 sm:py-10 lg:py-14 px-4 sm:px-6 md:px-10 lg:px-20">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-10"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-4xl text-gray-900 poppins_bold">
            My <span className="text-red-600">Profile</span>
          </h1>

          <p className="text-gray-500 mt-3 text-sm sm:text-base poppins_regular">
            Manage your account details and track your recent orders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="xl:col-span-4"
          >
            <div className="bg-white rounded-4xl shadow-xl border border-gray-100 overflow-hidden">

              <div className="h-40 bg-linear-to-r from-red-600 via-red-500 to-orange-500 relative">

                <div className="absolute inset-0 bg-black/10"></div>

                <button
                  onClick={() => setIsEditOpen(true)}
                  className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Edit size={18} />
                </button>
              </div>

              <div className="px-6 sm:px-8 pb-8 relative">

                <div className="w-30 h-30 rounded-full bg-white p-2 shadow-2xl absolute -top-16 left-1/2 -translate-x-1/2">

                  <div className="w-full h-full rounded-full bg-linear-to-br from-red-100 to-orange-100 flex items-center justify-center">
                    <User size={48} className="text-red-600" />
                  </div>
                </div>

                <div className="pt-20 text-center">

                  <h2 className="text-2xl sm:text-3xl text-gray-900 poppins_bold">
                    {userData.userName}
                  </h2>

                  <p className="text-gray-500 mt-2 text-sm poppins_regular">
                    Food Explorer 🍕
                  </p>
                </div>

                <div className="mt-8 space-y-5">

                  <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-red-50 transition-all duration-300">

                    <div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-red-600" />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-gray-400 poppins_regular">
                        Email Address
                      </p>

                      <h4 className="text-sm sm:text-base text-gray-800 poppins_medium break-all">
                        {userData.email}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-red-50 transition-all duration-300">

                    <div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-red-600" />
                    </div>

                    <div>

                      <p className="text-xs text-gray-400 poppins_regular">
                        Phone Number
                      </p>

                      <h4 className="text-sm sm:text-base text-gray-800 poppins_medium">
                        {userData.contactNumber}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-red-50 transition-all duration-300">

                    <div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                      <VenusAndMars size={18} className="text-red-600" />
                    </div>

                    <div>

                      <p className="text-xs text-gray-400 poppins_regular">
                        Gender
                      </p>

                      <h4 className="text-sm sm:text-base text-gray-800 poppins_medium">
                        {userData.gender}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-red-50 transition-all duration-300">

                    <div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                      <CalendarDays size={18} className="text-red-600" />
                    </div>

                    <div>

                      <p className="text-xs text-gray-400 poppins_regular">
                        Date Of Birth
                      </p>

                      <h4 className="text-sm sm:text-base text-gray-800 poppins_medium">
                        {formatDate(userData.dateOfBirth)}
                      </h4>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full mt-8 bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-red-200 poppins_medium hover:-translate-y-1"
                  onClick={handleLogOut}
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="xl:col-span-8"
          >
            <div className="bg-white rounded-4xl border border-gray-100 shadow-xl overflow-hidden">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 sm:px-8 py-6 border-b border-gray-100">

                <div>

                  <h2 className="text-2xl sm:text-2xl text-gray-900 poppins_bold">
                    Recent Orders
                  </h2>

                  <p className="text-gray-500 mt-1 text-sm poppins_regular">
                    Track your latest orders and delivery updates
                  </p>
                </div>

                <div className="bg-red-50 text-red-600 px-5 py-2 rounded-full text-sm poppins_medium">
                  {totalOrders} Total Orders
                </div>
              </div>

              <div className="divide-y divide-gray-100">

                {
                  userOrderData.length > 0 ?

                    userOrderData.map((item, index) => (

                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 px-6 sm:px-8 py-6 hover:bg-red-50/40 transition-all duration-300"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center text-3xl shadow-sm overflow-hidden">

                            <img
                              src={item.productImage?.imageUrl}
                              alt={item.productImage?.imageName}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>

                            <h3 className="text-lg text-gray-900 poppins_semiBold">
                              {item.productName}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                              Order ID : #{item._id}
                            </p>

                            <p className="text-gray-400 text-xs mt-1">
                              {formatDate(item.createdAt)}
                            </p>

                            <div className="flex items-center gap-1 mt-3">
                              {
                                [1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => updateRating(item.userId, item.productId, star)}
                                    className="transition-all duration-300 hover:scale-110"
                                  >
                                    <Star
                                      size={20}
                                      className={
                                        ratingData[item._id] >= star
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }
                                    />
                                  </button>
                                ))
                              }

                              <span className="ml-2 text-sm text-gray-500 poppins_medium">
                                {ratingData[item._id] || 0}/5
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-red-600">

                          <IndianRupee size={20} />

                          <h2 className="text-4xl md:text-2xl poppins_bold">
                            {item?.discountPrice}
                          </h2>
                        </div>
                      </motion.div>
                    ))

                    :

                    <div className="p-10 text-center text-gray-500 poppins_regular">
                      No orders found
                    </div>
                }
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 py-5 border-t border-gray-100 bg-gray-50">

                <p className="text-sm text-gray-500 poppins_regular">
                  Showing {userOrderData.length === 0 ? 0 : startIndex + 1} -
                  {Math.min(startIndex + ordersPerPage, totalOrders)} of {totalOrders} orders
                </p>

                <div className="flex items-center gap-3">

                  <button
                    onClick={previousPage}
                    disabled={currentPage === 1}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300
                    ${currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-200 hover:border-red-500 hover:text-red-600"
                      }`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm poppins_medium shadow-md">
                    {currentPage} / {totalPages}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300
                    ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-200 hover:border-red-500 hover:text-red-600"
                      }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <EditUser
        userData={userData}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );
}