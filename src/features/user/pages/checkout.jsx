import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  CircleDollarSign,
  IndianRupee
} from "lucide-react";
import httpSevide from '../../../shared/services/httpService.js'
import apiConfig from '../config/apiConfig.js'
import { useDispatch, useSelector } from "react-redux";
import { removeItem, setCartItems } from "../../../redux/slice.js";
import { useNavigate } from "react-router-dom";
import CustomPopup from '../../../shared/component/customPopup.jsx'


export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useNavigate()

  const [productData, setProductData] = useState([]);
  const [checkout, setCheckout] = useState({});
  const [isSubmitted, setisSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customPopup, setCustomPopup] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    getOrder()
  }, [])

  const getOrder = async () => {
    const payload = {
      userId: localStorage.getItem('loginUserId')
    }
    const response = await httpSevide.postService(apiConfig.getCartProduct, payload);
    if (response.status == true) {
      setProductData(response.data);
      setCheckout(response.cehckout)
    }
  }

  const placeOrder = async () => {
    setisSubmitted(true)
    if (firstName && lastName && email && contactNumber && country && address1 && zipCode && city && paymentMethod) {
      setisSubmitted(false)
      const payload = {
        "userId": localStorage.getItem('loginUserId'),
        "firstName": firstName,
        "lastName": lastName,
        "emailAddress": email,
        "country": country,
        "contactNumber": contactNumber,
        "address1": address1,
        "address2": address2,
        "city": city,
        "zipcode": zipCode,
        "paymentMethod": paymentMethod,
        "totalAmount": checkout.totalAmount,
        "finalAmount": checkout.finalAmount,

        "productList": productData.map((ele) => ({
          "productId": ele.productId,
          "productImage": {
            "imageUrl": ele.productImage.imageUrl,
            "imageName": ele.productImage.imageName
          },
          "productName": ele.productName,
          "productPrice": ele.productPrice,
          "discount": ele.discount,
          "discountPrice": ele.discountPrice,
          "foodType": ele.foodType,
          "category": ele.category,
          "quantity": ele.quantity,
          "description": ele.description
        }
        ))
      }
      const response = await httpSevide.postService(apiConfig.checkoutOrder, payload);
      if (response.status == true) {
        localStorage.removeItem('cart');
        dispatch(setCartItems([]));
        setProductData([]);
        setCheckout({});
        clearForm();
        setCustomPopup({
          isOpen: true,
          type: "success",
          message: "Congratulations! Your order has been placed successfully.",
        });
      }
    }
  }

  const clearForm = () => {
    setFirstName("")
    setLastName('')
    setEmail(''),
      setCountry('')
    setContactNumber(''),
      setAddress1('')
    setAddress2('')
    setZipCode('')
    setCity('')
    setPaymentMethod('')
  }

  const onClosePopup = () => {
    setCustomPopup({
      isOpen: false,
      type: "",
      message: "",
    });
    router('/ourMenu')
  }


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

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  First Name <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter first name"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                  value={firstName}
                  onInput={(event) => setFirstName(event.target.value)}
                />
                {
                  !firstName && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">First name is required</div> : ""
                }
              </div>

              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Last Name <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter last name"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                  value={lastName}
                  onInput={(event) => setLastName(event.target.value)}

                />
                {
                  !lastName && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Last name is required</div> : ""
                }
              </div>

              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Email Address <span className="text-red-600">*</span>
                </label>

                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                  value={email}
                  onInput={(event) => setEmail(event.target.value)}
                />
                {
                  !email && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Email is required</div> : ""
                }
              </div>

              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Country <span className="text-red-600">*</span>
                </label>

                <select
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                </select>
                {
                  !country && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Country is required</div> : ""
                }
              </div>

              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Phone No <span className="text-red-600">*</span>
                </label>

                <input
                  type="number"
                  placeholder="Enter phone number"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                  value={contactNumber}
                  onInput={(event) => setContactNumber(event.target.value)}

                />
                {
                  !contactNumber && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Contact number is required</div> : ""
                }
              </div>

              <div className="md:col-span-12">
                <label className="text-sm text-gray-700 poppins_medium">
                  House number and street name <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter full address"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                  value={address1}
                  onInput={(event) => setAddress1(event.target.value)}
                />
                {
                  !address1 && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Address is required</div> : ""
                }
              </div>

              <div className="md:col-span-12">
                <label className="text-sm text-gray-700 poppins_medium">
                  Apartment, suite, unit, etc.
                </label>

                <input
                  type="text"
                  placeholder="Apartment details"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                  value={address2}
                  onInput={(event) => setAddress2(event.target.value)}
                />
              </div>

              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Postcode / Zip <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Zip code"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                  value={zipCode}
                  onInput={(event) => setZipCode(event.target.value)}
                />
                {
                  !zipCode && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Zip code is required</div> : ""
                }
              </div>

              <div className="md:col-span-6">
                <label className="text-sm text-gray-700 poppins_medium">
                  Town / City <span className="text-red-600">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter city"
                  className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-red-500 transition-all"
                  value={city}
                  onInput={(event) => setCity(event.target.value)}
                />
                {
                  !city && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">City is required</div> : ""
                }
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
              {productData.map((item) => (
                <motion.div
                  whileHover={{ y: -3 }}
                  key={item._id}
                  className="flex items-center gap-4 border border-gray-200 rounded-2xl p-4"
                >
                  <img
                    src={item.productImage.imageUrl}
                    alt={item.productImage.imageName}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-base poppins_semiBold text-gray-900">
                      {item.productName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Qty : {item.quantity}
                    </p>

                    <p className="flex items-center text-red-600 mt-2 text-lg poppins_medium">
                      <IndianRupee size={16} />
                      {item.discountPrice}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Price Details */}
            <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
              <div className="flex justify-between items-center text-gray-700">
                <span className="text-[14px] poppins_regular">Subtotal</span>
                <span className="text-[14px] poppins_regular mt-3 poppins_regular flex items-center justify-center sm:justify-start gap-1">
                  <IndianRupee size={14} />
                  {checkout.totalAmount}
                </span>
              </div>

              <div className="flex justify-between items-center text-gray-700">
                <span className="text-[14px] poppins_regular">Shipping Cost</span>
                <span className="text-[14px] poppins_regular mt-3 regular flex items-center justify-center sm:justify-start gap-1">
                  <IndianRupee size={14} />
                  {checkout.deliveryCharges}
                </span>
              </div>

              <div className="flex justify-between items-center text-gray-700">
                <span className="text-[14px] poppins_regular">Tax</span>
                <span className="text-[14px] mt-3 poppins_regular flex items-center justify-center sm:justify-start gap-1">
                  <IndianRupee size={14} />
                  {checkout.taxes}
                </span>
              </div>

              <div className="flex justify-between items-center text-gray-700">
                <span className="text-[14px] poppins_regular">
                  Discount
                </span>
                <span className="text-[14px] poppins_regular flex items-center gap-1">
                  <IndianRupee size={14} />
                  {checkout.discount}
                </span>
              </div>

              <div className="flex justify-between items-center text-xl poppins_semiBold text-gray-900 border-t border-dashed border-gray-300 pt-4">
                <span>Total</span>
                <span className="text-2xl text-red-600 flex items-center gap-1">
                  <IndianRupee size={22} />
                  {checkout.finalAmount}
                </span>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-8">
              <h3 className="text-lg poppins_semiBold text-gray-900 mb-4">
                Payment Method
              </h3>

              <div className="space-y-4">
                <label className="flex items-center gap-3 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-red-500 transition-all">
                  <input type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    name="payment" />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-red-500 transition-all">
                  <input type="radio"
                    value="CARD"
                    checked={paymentMethod === "CARD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    name="payment" />
                  <span className="text-gray-700">Credit / Debit Card</span>
                </label>

                <label className="flex items-center gap-3 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-red-500 transition-all">
                  <input type="radio"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    name="payment" />
                  <span className="text-gray-700">UPI Payment</span>
                </label>
              </div>
              {
                !paymentMethod && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Payment method is required</div> : ''
              }
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl flex items-center justify-center gap-2 text-base poppins_medium transition-all"
              onClick={() => placeOrder()}
            >
              <ShieldCheck size={20} />
              Place Order
            </motion.button>

            <div className="flex justify-center items-center gap-2 mt-5 text-gray-500 text-sm">
              <CircleDollarSign size={16} />
              100% Secure Checkout
            </div>
          </div>
        </motion.div>
      </div>
      <CustomPopup
        isOpen={customPopup.isOpen}
        type={customPopup.type}
        message={customPopup.message}
        onClose={onClosePopup}
      />
    </div>
  );
}