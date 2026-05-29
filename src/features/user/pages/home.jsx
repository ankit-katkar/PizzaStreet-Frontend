import React, { useEffect, useState } from "react";
import { ShoppingCart, Star, ArrowRight, IndianRupee, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import httpService from "../../../shared/services/httpService";
import apiConfig from "../config/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../../redux/slice.js";
import CustomPopup from '../../../shared/component/customPopup.jsx'

// 👉 Assets (use your real images)
import pizza from "../../../assets/img/02.png";
import pizza2 from "../../../assets/img/03.png";
import pizza3 from "../../../assets/img/01.png";
import pizza4 from "../../../assets/img/04.png";
import thumb1 from "../../../assets/img/2.png";
import thumb2 from "../../../assets/img/4.png";
import thumb3 from "../../../assets/img/1.png";
import thumb4 from "../../../assets/img/4.png";
import tomatos from "../../../assets/img/image.png";
import leaf from "../../../assets/img/1.png";
import leaf1 from "../../../assets/img/leaf.png";
import tamato from "../../../assets/img/tomato.png";
import onionSlice from "../../../assets/img/onionSlice.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const userId = localStorage.getItem('loginUserId')

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart.item);

  const [mostSellingProduct, setMostSellingProduct] = useState([]);

  useEffect(() => {
    getMostSellingProduct();
  }, []);

  const getMostSellingProduct = async () => {
    const response = await httpService.getService(apiConfig.mostSellingProduct);
    if (response.status == true) {
      setMostSellingProduct(response.data);
    }
  };
  
   const onViewProduct = (productId) => {
    navigate('/productDetail/' + productId);
  };

  const addToCart = async (e, item) => {
    e.stopPropagation();
    const token = localStorage.getItem('authToken')
    if (token) {
      const getContactNumber = localStorage.getItem('contactNumber')
      const payload = {
        "cartData": [
          {
            userId: userId,
            "productId": item._id,
            "contactNumber": getContactNumber,
            "productImage": item.productImage,
            "productName": item.productName,
            "productPrice": item.productPrice,
            "discount": item.discount,
            "discountPrice": item.discountPrice,
            "category": item.category,
            "foodType": item.foodType,
            "description": item.description,
            "quantity": 1
          }
        ]
      }
      const response = await httpService.postService(apiConfig.addToCart, payload);
      if (response.status == true) {
        dispatch(addItem(item))
      }
    } else {
      dispatch(addItem(item))
    }
  }

  const removeToCart = async (e, item) => {
    e.stopPropagation();
    const token = localStorage.getItem('authToken')
    const itemId = item.productId || item._id

    if (token) {
      const response = await httpService.deleteService(apiConfig.removeToCart + itemId);
      if (response.status == true) {
        dispatch(removeItem({ _id: itemId, productId: itemId }))
      }
    } else {
      dispatch(removeItem({ _id: itemId, productId: itemId }))
    }
  }

  const viewMenu = ()=> {
    navigate('/ourMenu');
  }

  return (
    <>
      <div className="flex py-30 h-200 px-6 md:px-20 relative overflow-hidden">
        <div className="flex-1">
          <div className="absolute top-20 left-20 w-40 h-20 rotate-180">
            <img src={leaf1} className="w-200 h-32" />
          </div>
          <div className="absolute top-20 left-125 w-40 h-20 rotate-12">
            <img src={tamato} className="w-200 h-32" />
          </div>
          <div className="text-5xl md:text-7xl poppins_bold leading-tight mt-20">
            <span className="red">Pizza</span> Street
          </div>
          <div className="poppins_medium text-3xl mt-3 leading-tight">
            Handmade, With an Extra <br />
            Pinch of <span className="red">Love</span>
          </div>
          <p className="poppins_regulr text-1xl mt-4">
            Gather your friends and family and enjoy the best pizza in town.
            Freshly made and delivered hot!
          </p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base md:text-lg lg:text-xl
              font-regular px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 transition-all box-border border border-transparent 
              rounded-full duration-300 mt-10 poppins_regular"
          onClick={viewMenu}
          >
            View Menu
          </button>

          <div className="grid grid-cols-3 gap-4 mt-6 max-w-xl">
            <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-5 text-center">
              <h3 className="text-3xl text-red-600 poppins_bold">50+</h3>

              <p className="text-gray-500 text-sm mt-2 poppins_regular">
                Pizza Types
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-5 text-center">
              <h3 className="text-3xl text-red-600 poppins_bold">10K+</h3>

              <p className="text-gray-500 text-sm mt-2 poppins_regular">
                Happy Clients
              </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-5 text-center">
              <h3 className="text-3xl text-red-600 poppins_bold">24/7</h3>

              <p className="text-gray-500 text-sm mt-2 poppins_regular">
                Fast Delivery
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-30 right-110 w-40 h-20 rotate-12">
          <img src={tomatos} className="w-200 h-32" />
        </div>
        <div className="absolute top-120 right-120 w-16 h-10 rotate-45">
          <img src={thumb3} className="w-16 h-10" />
        </div>
        <div className="flex-1 relative flex justify-center items-center">
          <div className="absolute -right-100 -bottom-20 w-170 h-170 bg-red-500 rounded-full z-0"></div>{" "}
          <img
            src={pizza}
            alt="pizza"
            className="relative z-10 bottom-10 -right-10 h-90 w-90 drop-shadow-2xl"
          />
          <div className="absolute top-20 right-0 rotate-45 w-20 h-10">
            <img src={thumb1} className="w-12 h-16" />
          </div>
          <div className="absolute bottom-36 right-10 rotate-45 w-20 h-10">
            <img src={thumb2} className="w-12 h-16" />
          </div>
        </div>
        <div className="absolute bottom-10 left-160 -rotate-12 w-30 h-18">
          <img src={onionSlice} className="w-30 h-28" />
        </div>
        <div className="absolute top-150 right-20 w-50 h-50">
          <img src={pizza2} className="w-50 h-50" />
        </div>
      </div>

      <div className="items-center py-20 px-5 sm:px-8 md:px-14 lg:px-20 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl"></div>

              <img
                src={pizza}
                alt="pizza"
                className="relative w-72 sm:w-80 md:w-96 h-auto drop-shadow-2xl border-2 p-4 rounded-full border-red-600 hover:scale-105 transition-all duration-500"
              />

              <div className="absolute -bottom-6 -left-6 w-20 sm:w-24 rotate-[-15deg]">
                <img
                  src={tamato}
                  alt="tomato"
                  className="w-full object-contain"
                />
              </div>

              <div className="absolute -top-6 -right-6 w-16 sm:w-20 rotate-12">
                <img src={leaf1} alt="leaf" className="w-full object-contain" />
              </div>
            </div>
          </motion.div>

          {/* About */}

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <p className="poppins_bold text-4xl md:text-5xl leading-tight text-center lg:text-left">
              Daily fresh and <br />
              always <span className="text-red-600">tasty</span>
            </p>

            <div className="w-full lg:w-[75%] mx-auto lg:mx-0">
              <p className="poppins_regular text-sm sm:text-base mt-6 leading-7 text-gray-500 text-center lg:text-left">
                There are many variations of pizza available crafted with
                premium ingredients, authentic Italian flavors and extra cheesy
                toppings to satisfy your cravings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl text-red-600 poppins_bold">
                  100%
                </h3>

                <p className="text-gray-500 mt-2 text-sm poppins_regular">
                  Fresh Ingredients
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl text-red-600 poppins_bold">
                  30 Min
                </h3>

                <p className="text-gray-500 mt-2 text-sm poppins_regular">
                  Fast Delivery
                </p>
              </div>
              <div className="absolute bottom-78 right-30 w-40 h-25 rotate-12">
                <img src={tamato} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our menu  */}

      <div className="py-10 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#fffdf9] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center">
          <span className="text-red-600 tracking-[5px] uppercase text-sm poppins_medium">
            Premium Taste
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-5 text-gray-900 poppins_bold leading-tight">
            Explore Our <span className="text-red-600"> Menu</span>
          </h2>

          <div className="w-28 h-1 bg-red-600 mx-auto rounded-full mt-6"></div>

          <p className="text-gray-500 mt-8 max-w-3xl mx-auto leading-8 poppins_regular text-sm sm:text-base">
            Crafted with premium ingredients, authentic recipes and rich
            flavors, our menu delivers a luxurious dining experience specially
            designed for food lovers who enjoy quality and taste together.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap justify-center gap-4 mt-14">
          <button className="px-8 py-3 rounded-full bg-red-600 text-white shadow-lg shadow-red-100 poppins_medium hover:bg-red-700 transition-all duration-300">
            Our Special
          </button>

          <button className="px-8 py-3 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-red-500 hover:text-red-600 transition-all duration-300 poppins_medium">
            Pizza
          </button>

          <button className="px-8 py-3 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-red-500 hover:text-red-600 transition-all duration-300 poppins_medium">
            Burger
          </button>

          <button className="px-8 py-3 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-red-500 hover:text-red-600 transition-all duration-300 poppins_medium">
            Pasta
          </button>

          <button className="px-8 py-3 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-red-500 hover:text-red-600 transition-all duration-300 poppins_medium">
            Cold Drinks
          </button>
        </div>

        <div className="relative z-10 flex justify-center mt-16">
          <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full shadow-xl shadow-red-100 transition-all duration-300 hover:scale-105 poppins_medium"
           onClick={viewMenu}>
            View Full Menu
          </button>
        </div>
      </div>

      {/* most selling product */}

      <div className="py-10 px-5 sm:px-8 md:px-14 lg:px-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl poppins_bold leading-tight">
            Most Selling <span className="text-red-600">Products</span>
          </h2>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-8 poppins_regular text-sm sm:text-base">
            Taste our customers favourite pizzas crafted with premium
            ingredients, loaded cheese and authentic Italian flavors.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">
          {mostSellingProduct.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl overflow-hidden group transition-all duration-300 flex flex-col"
               onClick={() => onViewProduct(item._id)}
            >
              <div className="relative h-64 flex justify-center items-center overflow-hidden p-6">
                <div className="absolute top-5 left-5 bg-red-600 text-white text-xs px-4 py-2 rounded-full poppins_medium">
                  Best Seller
                </div>

                <img
                  src={item.productImage.imageUrl}
                  alt={item.productImage.imageName}
                  className={`w-52 object-contain transition-all duration-500 group-hover:scale-110
          ${item.category?.toLowerCase() === "pizza"
                      ? "group-hover:rotate-12"
                      : ""
                    }`}
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={17}
                        fill={i < item.rating ? "currentColor" : "none"}
                        className={
                          i < item.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <div
                    className={`text-xs sm:text-sm px-4 py-1.5 rounded-full min-w-21.25 sm:min-w-23.75 inline-flex items-center justify-center whitespace-nowrap font-medium
                    ${item.foodType === "VEG" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" }`}
                  >
                    {item.foodType}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 gap-3">
                  <h3 className="text-[16px] text-gray-800 poppins_medium leading-8">
                    {item.productName}
                  </h3>
                </div>

                <p
                  className="text-gray-500 text-sm leading-7 mt-2 poppins_regular overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </p>

                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex flex-col">
                      <h4 className="text-2xl text-red-600 poppins_semiBold leading-tight flex items-center gap-1">
                        <IndianRupee size={20} />
                        {item.discountPrice}
                      </h4>
                      <span className="text-gray-400 line-through text-sm poppins_regular flex items-center gap-1">
                        <IndianRupee size={14} />
                        {item.productPrice}
                      </span>
                    </div>

                    {!cartSelector.find(
                      (cartId) => cartId?._id == item?._id
                    ) ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-red-300 poppins_regular flex items-center gap-2 whitespace-nowrap"
                        onClick={(e) => addToCart(e, item)}
                      >
                        <ShoppingCart size={18} />
                        Add
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-red-300 poppins_regular flex items-center gap-2 whitespace-nowrap"
                        onClick={(e) => removeToCart(e, item)}
                      >
                        <Trash2 size={18} />
                        Remove
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
