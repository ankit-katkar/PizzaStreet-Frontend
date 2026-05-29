import React, { useEffect, useState } from "react";
import { ShoppingCart, Star, IndianRupee, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import httpService from '../../../shared/services/httpService.js'
import apiConfig from "../config/apiConfig.js";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../../redux/slice.js";
import loginHttpService from '../../auth/service/loginHttpSercice.js'


const categories = [
  { name: "All", value: "All" },
  { name: "Our Special", value: "OurSpecial" },
  { name: "Pizza", value: "Pizza" },
  { name: "Burger", value: "Burger" },
  { name: "Desserts", value: "Desserts" },
  { name: "Cold Drinks", value: "coldDrinks" },
];


export default function OurMenuPage() {
  const userId = localStorage.getItem('loginUserId')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart.item);

  const [activeCategory, setActiveCategory] = useState("All");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProductData();
  }, [activeCategory])

  const getProductData = async () => {
    const response = await httpService.getService(apiConfig.getProductByCategory + activeCategory);
    setProductData(response?.data?.docs || [])
  }

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
            "foodType" : item.foodType,
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


  return (
    <div className="py-20 px-6 md:px-20 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="poppins_bold text-4xl md:text-6xl text-gray-900">
          Our <span className="text-red-600">Menu</span>
        </h2>

        <p className="text-gray-500 mt-10 max-w-175 mx-auto leading-8 text-base md:text-lg poppins_regular">
          Explore our delicious menu crafted with premium ingredients, authentic
          taste, and unforgettable flavors specially designed for food lovers.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mt-14"
      >
        {categories.map((category, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveCategory(category.value)}
            className={`px-6 py-3 rounded-full text-sm md:text-base border transition-all duration-300 poppins_medium relative overflow-hidden

            ${activeCategory === category.name
                ? "bg-red-600 border-red-600 text-white poppins_regular shadow-lg shadow-red-200"
                : "bg-white border-gray-200 text-gray-700 hover:border-red-500 hover:text-red-600 poppins_regular"
              }`}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {productData.map((item, index) => (
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
                    className={`text-xs sm:text-sm px-4 py-1.5 rounded-full min-w-[85px] sm:min-w-[95px] inline-flex items-center justify-center whitespace-nowrap font-medium
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}