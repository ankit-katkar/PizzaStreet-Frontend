import React, { useMemo, useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  TicketPercent,
  ShoppingBag,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import pizza1 from "../../../assets/img/01.png";
import pizza2 from "../../../assets/img/02.png";
import pizza3 from "../../../assets/img/03.png";

export default function Cart() {
    const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: pizza1,
      name: "Italian Cheese Pizza",
      category: "Cheese Pizza",
      price: 25,
      quantity: 1,
    },

    {
      id: 2,
      image: pizza2,
      name: "Veggie Supreme Pizza",
      category: "Veg Pizza",
      price: 20,
      quantity: 2,
    },

    {
      id: 3,
      image: pizza3,
      name: "Spicy Chicken Pizza",
      category: "Chicken Pizza",
      price: 30,
      quantity: 1,
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const taxes = Number((subtotal * 0.08).toFixed(2));

  const delivery = subtotal > 0 ? 5 : 0;

  const discount = subtotal > 100 ? 10 : 0;

  const total = subtotal + taxes + delivery - discount;

  function goToOurMenu(){
    navigate('/ourMenu')
  }

  function proceedToCheckout(){
    navigate('/checkout')
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

          <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 poppins_bold">
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
          className="text-gray-500 mt-6 max-w-[700px] mx-auto leading-8 text-base md:text-lg poppins_regular"
        >
          Review your selected delicious items and proceed to checkout for a
          fast and fresh pizza delivery experience.
        </motion.p>
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="flex flex-col items-center justify-center py-24"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="bg-red-50 border border-red-100 p-8 rounded-full"
          >
            <ShoppingBag size={80} className="text-red-600" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl mt-8 text-gray-900 poppins_bold">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-4 text-center max-w-[500px] leading-8 poppins_regular">
            Looks like you haven't added any delicious pizza yet.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full poppins_medium shadow-lg shadow-red-100"
            onClick={goToOurMenu} >
            Explore Menu
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-5">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
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
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-xl"
                      />
                    </motion.div>

                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-xl md:text-2xl text-gray-900 poppins_semiBold">
                        {item.name}
                      </h2>

                      <p className="text-gray-500 mt-1 text-sm poppins_regular">
                        {item.category}
                      </p>

                      <h3 className="text-2xl text-red-600 mt-3 poppins_bold">
                        ${item.price}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <motion.button
                        whileTap={{
                          scale: 0.9,
                        }}
                        onClick={() => decreaseQty(item.id)}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-500 hover:text-red-600 transition-all duration-300"
                      >
                        <Minus size={16} />
                      </motion.button>

                      <span className="text-lg min-w-[30px] text-center text-gray-900 poppins_medium">
                        {item.quantity}
                      </span>

                      <motion.button
                        whileTap={{
                          scale: 0.9,
                        }}
                        onClick={() => increaseQty(item.id)}
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
                      onClick={() => removeItem(item.id)}
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
                className="relative overflow-hidden bg-white border border-gray-200 rounded-[32px] p-6 md:p-8 shadow-2xl"
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

                      <span className="text-gray-900 poppins_medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 poppins_regular">
                        Delivery Fee
                      </span>

                      <span className="text-gray-900 poppins_medium">
                        ${delivery.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 poppins_regular">
                        Taxes
                      </span>

                      <span className="text-gray-900 poppins_medium">
                        ${taxes.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-green-600">
                      <span className="poppins_regular">Discount</span>

                      <span className="poppins_medium">
                        -$
                        {discount.toFixed(2)}
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
                          Orders above $100
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
                      className="text-lg md:text-2xl text-red-600 poppins_bold"
                    >
                      ${total.toFixed(2)}
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
                     onClick={proceedToCheckout} >
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
    </div>
  );
}
