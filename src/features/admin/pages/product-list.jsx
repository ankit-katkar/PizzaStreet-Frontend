import React from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Star, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const productData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600",
    name: "Italian Cheese Pizza",
    category: "Pizza",
    price: "$25",
    rating: "4.8",
    stock: "In Stock",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1548365328-9f547fb0953b?q=80&w=600",
    name: "Veggie Special Pizza",
    category: "Pizza",
    price: "$20",
    rating: "4.5",
    stock: "In Stock",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600",
    name: "Chicken Burger",
    category: "Burger",
    price: "$18",
    rating: "4.7",
    stock: "Low Stock",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=600",
    name: "Cold Drink",
    category: "Drinks",
    price: "$10",
    rating: "4.3",
    stock: "Out of Stock",
  },
];


export default function ProductList() {
const router = useNavigate()

function addProduct(){
router('/add-product')
}

  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-20  min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl poppins_bold text-gray-900">
            Product <span className="text-red-600">List</span>
          </h1>

          <p className="text-gray-500 mt-2 text-sm md:text-base poppins_regular">
            Manage your food products, edit details and control inventory.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg transition-all duration-300 poppins_medium"
          onClick={addProduct}  
        >
          <Plus size={20} />
          Add Product
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-275 w-full border-collapse">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Product
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Category
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Price
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Rating
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Stock
                </th>

                <th className="text-left px-6 py-5 text-sm font-semibold">
                  Preview
                </th>
                <th className="sticky right-0 bg-red-600 z-20 text-left px-6 py-5 text-sm font-semibold min-w-45 shadow-[-4px_0_10px_rgba(0,0,0,0.08)]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {productData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-100 hover:bg-red-50/40 transition-all duration-300"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <h3 className="text-base poppins_semiBold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Fresh & Delicious
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-700 poppins_medium">
                    {item.category}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-red-600 text-lg poppins_semiBold">
                      {item.price}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Star
                        size={18}
                        className="text-yellow-500 fill-yellow-500"
                      />

                      <span className="text-gray-700 font-medium">
                        {item.rating}
                      </span>
                    </div>
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-medium ${
                        item.stock === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : item.stock === "Low Stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.stock}
                    </span>
                  </td>

                  {/* Preview */}
                  <td className="px-6 py-5">
                    <button className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-all duration-300">
                      <Eye size={18} className="text-gray-700" />
                    </button>
                  </td>

                  {/* Sticky Action Column */}
                  <td className="sticky right-0 bg-white z-10 px-6 py-5 shadow-[-4px_0_10px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-11 h-11 rounded-xl bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-all duration-300"
                      >
                        <Pencil size={18} className="text-blue-700" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-11 h-11 rounded-xl bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all duration-300"
                      >
                        <Trash2 size={18} className="text-red-700" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
