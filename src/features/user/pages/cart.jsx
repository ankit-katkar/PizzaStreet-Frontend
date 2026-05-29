import React, { useEffect, useMemo, useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  TicketPercent,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import httpService from '../../../shared/services/httpService.js'
import apiConfig from '../config/apiConfig.js'
import { useDispatch } from "react-redux";
import { addItem, removeItem, updateItemQuantity } from "../../../redux/slice.js";
import CustomPopup from '../../../shared/component/customPopup.jsx'

export default function Cart() {

  const userId = localStorage.getItem('loginUserId')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartData, setCartData] = useState([]);
  const [checkout, setCheckoutData] = useState({})
  const [customPopup, setCustomPopup] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const token = localStorage.getItem('authToken')

  useEffect(() => {
    getCartData()
  }, [])

  useEffect(() => {
    calculateCheckout(cartData);
  }, [cartData]);

  const getCartData = async () => {
    if (token) {
      const payload = {
        userId: localStorage.getItem('loginUserId')
      }

      const response = await httpService.postService(
        apiConfig.getCartProduct,
        payload
      )

      setCartData(response.data || [])

    } else {

      const getCartDataFromLoca = localStorage.getItem('cart');

      setCartData(JSON.parse(getCartDataFromLoca))
    }
  }

  const updateCartQty = async (item, newQuantity) => {
    if (newQuantity < 1) return;
    const itemId = item.productId || item._id;
    if (token) {
      const getContactNumber = localStorage.getItem('contactNumber')
      const payload = {
        cartData: [
          {
            userId: userId,
            productId: itemId,
            contactNumber: getContactNumber,
            productImage: item.productImage,
            productName: item.productName,
            productPrice: item.productPrice,
            discount: item.discount,
            discountPrice: item.discountPrice,
            category: item.category,
            description: item.description,
            quantity: newQuantity,
          }
        ]
      }
      const response = await httpService.postService(apiConfig.addToCart, payload)
      if (response?.status === true) {
        await getCartData()
      }
    } else {
      const updatedItems = cartData.map((cartItem) =>
        (cartItem._id || cartItem.productId) === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
      setCartData(updatedItems)
      dispatch(
        updateItemQuantity({
          _id: itemId,
          quantity: newQuantity
        })
      )
    }
  }

  const increaseQty = async (item) => {
    await updateCartQty(item, (item.quantity || 1) + 1)
  };

  const decreaseQty = async (item) => {
    if ((item.quantity || 1) <= 1) return;
    await updateCartQty(item, item.quantity - 1)
  };

  const calculateCheckout = (updatedCartData) => {
    let totalAmount = 0;
    let deliveryCharges = 0;
    let taxes = 0;
    let discount = 0;
    let finalAmount = 0;

    updatedCartData.forEach((item) => {
      const productTotal = item.discountPrice * item.quantity;
      totalAmount += productTotal;
      const getdiscountPrice = (item.productPrice - item.discountPrice) * item.quantity;
      discount += getdiscountPrice;
    });

    if (totalAmount < 300) {
      deliveryCharges = 40;
    }

    taxes = Math.floor((totalAmount * 4) / 100);
    finalAmount = totalAmount + deliveryCharges + taxes - discount;

    setCheckoutData({
      totalAmount,
      deliveryCharges,
      taxes,
      discount,
      finalAmount
    });
  };

  const removeItemFromCart = async (item) => {
    const itemId = item.productId || item._id
    const payload = {
      _id: itemId,
      productId: itemId
    }

    if (token) {
      const response = await httpService.deleteService(apiConfig.removeToCart + itemId);

      if (response?.status === true) {
        dispatch(removeItem(payload))
        await getCartData()
      }
    } else {
      dispatch(removeItem(payload))
      setCartData((prevCart) =>
        prevCart.filter(
          (cartItem) =>
            (cartItem._id || cartItem.productId) !== itemId
        )
      )
    }
  }

  function goToOurMenu() {
    navigate('/ourMenu')
  }

  function proceedToCheckout() {
    const token = localStorage.getItem('authToken')
    if (token) {
      navigate('/checkout')
    } else {
      setCustomPopup({
        isOpen: true,
        type: "error",
        message: "Please login to continue.",
      });
    }
  }

  return (
    <div className="bg-white min-h-screen py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">

      <motion.div
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="text-center mb-14"
      >

        <div className="flex items-center justify-center gap-4">

          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="bg-red-50 border border-red-100 p-4 rounded-full shadow-lg"
          >
            <ShoppingCart className="text-red-600" size={30} />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-4xl text-gray-900 poppins_bold">
            Your <span className="text-red-600">Cart</span>
          </h1>
        </div>

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="text-gray-500 mt-4 max-w-175 mx-auto leading-8 text-base md:text-md poppins_regular"
        >
          Review your selected delicious items and proceed to checkout for a
          fast and fresh pizza delivery experience.
        </motion.p>
      </motion.div>

      {cartData.length === 0 ? (

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="flex flex-col items-center justify-center"
        >

          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="bg-red-50 border border-red-100 p-4 rounded-full"
          >
            <ShoppingBag size={40} className="text-red-600" />
          </motion.div>

          <h2 className="text-2xl md:text-3xl mt-4 text-gray-900 poppins_bold">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-2 text-center max-w-125 leading-8 poppins_regular">
            Looks like you haven't added any delicious pizza yet.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full poppins_medium shadow-lg shadow-red-100"
            onClick={goToOurMenu}
          >
            Explore Menu
          </motion.button>
        </motion.div>

      ) : (

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 space-y-5">

            <AnimatePresence>

              {cartData.map((item, index) => (

                <motion.div
                  key={item._id}
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 120,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="relative overflow-hidden bg-white border border-gray-200 rounded-[30px] p-4 md:p-5 shadow-sm hover:shadow-2xl transition-all duration-500"
                >

                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                    }}
                    className="absolute -top-12 -right-12 w-40 h-40 bg-red-50 rounded-full blur-3xl"
                  ></motion.div>

                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">

                    <motion.div
                      whileHover={{
                        rotate: 8,
                        scale: 1.05,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="bg-red-50 border border-red-100 rounded-full p-3 shadow-md"
                    >
                      <img
                        src={item.productImage.imageUrl}
                        alt={item.productImage.imageUrl}
                        className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-xl"
                      />
                    </motion.div>

                    <div className="flex-1 text-center sm:text-left">

                      <h2 className="text-xl md:text-2xl text-gray-900 poppins_semiBold">
                        {item.productName}
                      </h2>

                      <p className="text-gray-500 mt-1 text-sm poppins_regular">
                        {item.category}
                      </p>

                      <h3 className="text-2xl text-red-600 mt-3 poppins_bold flex items-center justify-center sm:justify-start gap-1">
                        <IndianRupee size={22} />
                        {item.discountPrice}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">

                      <motion.button
                        whileTap={{
                          scale: 0.9,
                        }}
                        onClick={() => decreaseQty(item)}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-500 hover:text-red-600 transition-all duration-300"
                      >
                        <Minus size={16} />
                      </motion.button>

                      <span className="text-lg min-w-7.5 text-center text-gray-900 poppins_medium">
                        {item.quantity}
                      </span>

                      <motion.button
                        whileTap={{
                          scale: 0.9,
                        }}
                        onClick={() => increaseQty(item)}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-500 hover:text-red-600 transition-all duration-300"
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        rotate: 8,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() => removeItemFromCart(item)}
                      className="w-11 h-11 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="hidden xl:block">

            <div className="sticky top-8">

              <motion.div
                initial={{
                  opacity: 0,
                  x: 60,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="relative overflow-hidden bg-white border border-gray-200 rounded-4xl p-6 md:p-8 shadow-2xl"
              >

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                  }}
                  className="absolute -top-20 -right-20 w-56 h-56 bg-red-50 rounded-full blur-3xl"
                ></motion.div>

                <div className="relative z-10">

                  <h2 className="text-2xl md:text-3xl text-gray-900 poppins_bold">
                    Checkout
                  </h2>

                  <div className="mt-8 space-y-5">

                    <div className="flex items-center justify-between">

                      <span className="text-gray-500 poppins_regular">
                        Subtotal
                      </span>

                      <span className="text-gray-900 poppins_medium flex items-center gap-1">
                        <IndianRupee size={16} />
                        {checkout?.totalAmount?.toFixed(2) || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">

                      <span className="text-gray-500 poppins_regular">
                        Delivery Fee
                      </span>

                      <span className="text-gray-900 poppins_medium flex items-center gap-1">
                        <IndianRupee size={16} />
                        {checkout?.deliveryCharges?.toFixed(2) || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">

                      <span className="text-gray-500 poppins_regular">
                        Taxes
                      </span>

                      <span className="text-gray-900 poppins_medium flex items-center gap-1">
                        <IndianRupee size={16} />
                        {checkout?.taxes?.toFixed(2) || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-green-600">

                      <span className="poppins_regular">
                        Discount
                      </span>

                      <span className="poppins_medium flex items-center gap-1">
                        -
                        <IndianRupee size={16} />
                        {checkout?.discount?.toFixed(2) || 0}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    className="mt-7 bg-red-50 border border-dashed border-red-200 rounded-2xl p-5"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-full bg-white border border-red-100 flex justify-center items-center shadow-sm">
                        <TicketPercent size={22} className="text-red-600" />
                      </div>

                      <div>

                        <h3 className="text-gray-900 poppins_medium">
                          Free Delivery
                        </h3>

                        <p className="text-gray-500 text-sm poppins_regular">
                          Orders above ₹300
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">

                    <h3 className="text-lg md:text-xl text-gray-900 poppins_semiBold">
                      Total Amount
                    </h3>

                    <motion.h2
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="text-lg md:text-2xl text-red-600 poppins_bold flex items-center gap-1"
                    >
                      <IndianRupee size={22} />
                      {checkout?.finalAmount?.toFixed(2) || 0}
                    </motion.h2>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="w-full mt-8 tex-lg bg-red-600 hover:bg-red-700 text-white py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-red-100 text-base md:text-lg poppins_medium"
                    onClick={proceedToCheckout}
                  >
                    Proceed To Checkout

                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </motion.button>

                  <p className="text-center text-gray-400 text-sm mt-5 leading-7 poppins_regular">
                    Secure payment and fast delivery guaranteed
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <CustomPopup
        isOpen={customPopup.isOpen}
        type={customPopup.type}
        message={customPopup.message}
        onClose={() => setCustomPopup({
          isOpen: false,
          type: "",
          message: "",
        })}
      />
    </div>
  );
}