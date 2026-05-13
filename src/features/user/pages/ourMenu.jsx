import React, { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import pizza1 from "../../../assets/img/01.png";
import pizza2 from "../../../assets/img/02.png";
import pizza3 from "../../../assets/img/03.png";
import pizza4 from "../../../assets/img/04.png";

const categories = [
  "All",
  "Our Special",
  "Pizza",
  "Burgers",
  "Slides",
  "Pasta",
  "Cold Drinks",
];

const menuData = [
  {
    id: 1,
    image: pizza1,
    category: "Pizza",
    name: "Italian Cheese Pizza",
    rating: 4.8,
    price: "$25",
    description: "Loaded with extra cheese, crispy crust, premium toppings, and authentic Italian flavor for pizza lovers.",
  },
  {
    id: 2,
    image: pizza2,
    category: "Our Special",
    name: "Veggie Supreme Pizza",
    rating: 4.6,
    price: "$20",
    description: "Fresh vegetables mixed with mozzarella cheese and special sauces baked perfectly for healthy food lovers.",
  },
  {
    id: 3,
    image: pizza3,
    category: "Pasta",
    name: "Creamy Pasta",
    rating: 4.7,
    price: "$18",
    description: "Creamy white sauce pasta with fresh herbs, premium cheese, and delicious Italian seasoning taste.",
  },
  {
    id: 4,
    image: pizza4,
    category: "Burgers",
    name: "Chicken Burger",
    rating: 4.5,
    price: "$15",
    description: "Juicy chicken burger with crispy layers, fresh lettuce, cheese, and premium burger sauce.",
  },
  {
    id: 5,
    image: pizza2,
    category: "Pizza",
    name: "Spicy Pizza",
    rating: 4.9,
    price: "$28",
    description: "Spicy loaded pizza with fresh vegetables, chicken toppings, mozzarella cheese, and crispy crust.",
  },
  {
    id: 6,
    image: pizza1,
    category: "Cold Drinks",
    name: "Cold Coffee",
    rating: 4.4,
    price: "$10",
    description: "Refreshing cold coffee with chocolate flavor, creamy texture, and chilled premium milk taste.",
  },
  {
    id: 7,
    image: pizza3,
    category: "Slides",
    name: "French Fries",
    rating: 4.3,
    price: "$12",
    description: "Crispy golden fries served with tomato sauce and special seasoning for amazing snack experience.",
  },
  {
    id: 8,
    image: pizza4,
    category: "Our Special",
    name: "Special Combo",
    rating: 5.0,
    price: "$35",
    description: "Special food combo with pizza, fries, burger, and drinks specially designed for food lovers.",
  },
];

export default function OurMenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filteredMenu = activeCategory === "All" 
  ? menuData : menuData.filter((item) => item.category === activeCategory);


  function onViewProduct(productId){
    console.warn('btn clicked for product:', productId);
    navigate('/productDetail/' + productId);
  };


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
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full text-sm md:text-base border transition-all duration-300 poppins_medium relative overflow-hidden

            ${
              activeCategory === category
                ? "bg-red-600 border-red-600 text-white poppins_regular shadow-lg shadow-red-200"
                : "bg-white border-gray-200 text-gray-700 hover:border-red-500 hover:text-red-600 poppins_regular"
            }`}
          >
            {category}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {filteredMenu.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[30px] border border-gray-200 hover:border-red-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col min-h-130 relative"
            onClick={() => onViewProduct(item.id)}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div  className="h-65 flex justify-center items-center p-6 relative cursor-pointer">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  whileHover={{
                    rotate: 12,
                    scale: 1.12,
                    y: -12,    
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-48 md:w-52 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] relative z-10"
                />
              </div>
              
              <div className="px-6 pb-8 flex flex-col flex-1 relative z-10">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg mt-5 text-gray-900 poppins_semiBold leading-snug">
                    {item.name}
                    </h3>
                </div>

                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full poppins_regular w-max mt-2">
                  <Star size={16} fill="currentColor" className="text-yellow-500" />
                  <span className="text-sm text-gray-700 poppins_medium">
                    {item.rating}
                  </span>
                </div>

                <p
                  className="text-gray-500 text-sm leading-7 mt-4 flex-1 overflow-hidden poppins_regular"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-200">
                  <h4 className="text-2xl text-red-600 poppins_medium">
                    {item.price}
                  </h4>
                  <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-red-300 poppins_regular flex items-center gap-2">
                    <ShoppingCart size={18} />
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}