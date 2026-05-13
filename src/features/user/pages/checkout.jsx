import React from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";

const orderItems = [
  {
    id: 1,
    name: "Italian Cheese Pizza",
    price: 25,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600",
  },
  {
    id: 2,
    name: "Veggie Special Pizza",
    price: 18,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1548365328-9f547fb0953b?q=80&w=600",
  },
];

export default function CheckoutPage() {
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 5;
  const tax = 3;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white min-h-screen py-10 md:py-16 px-4 sm:px-6 lg:px-20 overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-14"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl poppins_bold text-gray-900 leading-tight">
          Checkout <span className="text-red-600">Page</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-2xl mx-auto leading-7 poppins_regular px-2">
          Complete your order details and enjoy fresh & delicious pizza
          delivered hot to your doorstep.
        </p>
      </motion.div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Billing Details */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="xl:col-span-8"
        >
          <div className="bg-white border border-gray-200 rounded-3xl shadow-lg p-5 sm:p-7 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
                <CreditCard className="text-red-600" size={22} />
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl poppins_semiBold text-gray-900">
                  Billing Details
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Fill your personal information carefully.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* First Name */}
              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  First Name
                </label>

                <input
                  type="text"
                  placeholder="Enter first name"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                />
              </div>

              {/* Last Name */}
              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Last Name
                </label>

                <input
                  type="text"
                  placeholder="Enter last name"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                />
              </div>

              {/* Company */}
              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Company Name
                </label>

                <input
                  type="text"
                  placeholder="Enter company name"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Phone No
                </label>

                <input
                  type="number"
                  placeholder="Enter phone number"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                />
              </div>

              {/* Country */}
              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Country
                </label>

                <select className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all">
                  <option>India</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-12">
                <label className="text-sm text-gray-700 poppins_medium">
                  House number and street name
                </label>

                <input
                  type="text"
                  placeholder="Enter full address"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                />
              </div>

              {/* Apartment */}
              <div className="md:col-span-12">
                <label className="text-sm text-gray-700 poppins_medium">
                  Apartment, suite, unit, etc.
                </label>

                <input
                  type="text"
                  placeholder="Apartment details"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                />
              </div>

              {/* Zip */}
              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Postcode / Zip
                </label>

                <input
                  type="text"
                  placeholder="Zip code"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                />
              </div>

              {/* City */}
              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Town / City
                </label>

                <input
                  type="text"
                  placeholder="Enter city"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Your Order */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="xl:col-span-4"
        >
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-5 sm:p-7 sticky top-24">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
                <Truck className="text-red-600" size={22} />
              </div>

              <div>
                <h2 className="text-2xl poppins_semiBold text-gray-900">
                  Your Order
                </h2>
                <p className="text-gray-500 text-sm">
                  Review your delicious items
                </p>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-5">
              {orderItems.map((item) => (
                <motion.div
                  whileHover={{ y: -3 }}
                  key={item.id}
                  className="flex items-center gap-4 border border-gray-200 rounded-2xl p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-base poppins_semiBold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Qty : {item.quantity}
                    </p>

                    <p className="text-red-600 mt-2 text-lg poppins_medium">
                      ${item.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Price Details */}
            <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Shipping Cost</span>
                <span>${shipping}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>${tax}</span>
              </div>

              <div className="flex justify-between text-xl poppins_semiBold text-gray-900 border-t border-dashed border-gray-300 pt-4">
                <span>Total</span>
                <span className="text-red-600">${total}</span>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-8">
              <h3 className="text-lg poppins_semiBold text-gray-900 mb-4">
                Payment Method
              </h3>

              <div className="space-y-4">
                <label className="flex items-center gap-3 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-red-500 transition-all">
                  <input type="radio" name="payment" defaultChecked />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-red-500 transition-all">
                  <input type="radio" name="payment" />
                  <span className="text-gray-700">Credit / Debit Card</span>
                </label>

                <label className="flex items-center gap-3 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-red-500 transition-all">
                  <input type="radio" name="payment" />
                  <span className="text-gray-700">UPI Payment</span>
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl flex items-center justify-center gap-2 text-base poppins_medium transition-all"
            >
              <ShieldCheck size={20} />
              Place Order
            </motion.button>

            {/* Secure */}
            <div className="flex justify-center items-center gap-2 mt-5 text-gray-500 text-sm">
              <CircleDollarSign size={16} />
              100% Secure Checkout
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}