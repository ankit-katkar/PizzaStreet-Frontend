import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  ImagePlus,
  PackageCheck,
  IndianRupee,
  Percent,
} from "lucide-react";
import apiConfig from '../config/apiConfig.js'
import httpService from '../../../shared/services/httpService.js'
import { useNavigate, useParams } from "react-router-dom";
import CustomPopup from '../../../shared/component/customPopup.jsx'

export default function AddUpdateProduct() {
  const { productId } = useParams();

  const router = useNavigate()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [preview, setPreview] = useState("");
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState({ imageUrl: "", imageName: "" });
  const [customPopup, setCustomPopup] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    if (productId) {
      getProductById()
    }
  }, [productId])

  const getProductById = async () => {
    try {
      const response = await httpService.getService(apiConfig.getProductById + productId)
      const result = response?.data || response || {}

      setProductImage({
        imageUrl: result?.productImage?.imageUrl || "",
        imageName: result?.productImage?.imageName || ""
      });
      setPreview(result?.productImage?.imageUrl || "")
      setProductName(result?.productName || "");
      setProductPrice(result?.productPrice || "");
      setDiscount(result?.discount || "");
      setCategory(result?.category || "");
      setFoodType(result?.foodType || "")
      setStock(result?.productStock || "")
      setDescription(result?.description || "")
    } catch (error) {
      console.error("Failed to load product", error);
    }
  }

  const handleImageChange = async (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    if (file) {
      const response = await httpService.uploadFileService(apiConfig.uploadImage, file)
      setProductImage({
        imageUrl: response.data.imageUrl,
        imageName: response.data.imageName
      })
      setPreview(response.data.imageUrl)
    }
  };

  const addProduct = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    if (productImage.imageUrl && productPrice && foodType && stock && description) {
      setIsSubmitted(false)
      const payload = {
        "productImage": {
          "imageUrl": productImage.imageUrl,
          "imageName": productImage.imageName
        },
        "productName": productName,
        "productPrice": productPrice,
        "discount": discount || null,
        "category": category,
        "foodType": foodType,
        "productStock": stock,
        "description": description
      }
      const response = await httpService.postService(apiConfig.addProduct, payload)
      if (response.status == true) {
        setCustomPopup({
          isOpen: true,
          type: "success",
          message: response.message,
        });
        clearForm();
      }
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    if (productImage.imageUrl && productPrice && category && foodType && stock && description) {
      setIsSubmitted(false)
      const payload = {
        "productImage": {
          "imageUrl": productImage.imageUrl,
          "imageName": productImage.imageName
        },
        "productName": productName,
        "productPrice": productPrice,
        "discount": discount || null,
        "category": category,
        "foodType": foodType,
        "productStock": stock,
        "description": description
      }
      const response = await httpService.putService(apiConfig.updateProduct + productId, payload)
      if (response.status == true) {
        router('/productList')
        clearForm();
      }
    }
  }

  const onClosePopup = () => {
    setCustomPopup({
      isOpen: false,
      type: '',
      message: '',
    });
    router('/productList')
  }

  const clearForm = () => {
    setProductImage({
      imageUrl: "",
      imageName: ""
    });
    setPreview("");
    setProductName("")
    setProductPrice("")
    setDiscount("")
    setCategory("")
    setFoodType("")
    setDescription("")
  }

  return (
    <div className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        {
          !productId ?
            <h1 className="text-[28px] md:text-[36px] poppins_bold text-gray-900">
              Add <span className="text-red-600">Product</span>
            </h1> :
            <h1 className="text-[28px] md:text-[36px] poppins_bold text-gray-900">
              Update <span className="text-red-600">Product</span>
            </h1>
        }


        <p className="text-gray-500 mt-2 text-[14px] md:text-[15px] poppins_regular">
          Add delicious food items with complete details and manage your menu
          professionally.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[30px] shadow-xl border border-gray-200 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 bg-red-600 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>

            <div className="absolute bottom-0 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <PackageCheck size={30} />
              </div>

              <h2 className="text-[28px] poppins_bold leading-snug">
                Create New Product
              </h2>

              <p className="mt-4 text-white/90 leading-7 text-[14px] md:text-[15px]">
                Add your latest pizza, burger, pasta, or drink item with
                attractive details and pricing.
              </p>

              <div className="mt-10 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <ImagePlus size={18} />
                  </div>

                  <span className="text-[14px]">
                    Upload attractive food images
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <IndianRupee size={18} />
                  </div>

                  <span className="text-[14px]">
                    Manage product pricing easily
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 p-6 md:p-10">
            <form className="space-y-7">
              <div>
                <label className="block text-[14px] mb-3 text-gray-700 poppins_medium">
                  Product Image <span className="text-red-600">*</span>
                </label>

                <label className="border-2 border-dashed border-red-200 hover:border-red-500 transition-all duration-300 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer bg-red-50/30">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  {preview ? (
                    <motion.img
                      whileHover={{ scale: 1.04 }}
                      src={preview}
                      alt="preview"
                      className="w-44 h-44 object-cover rounded-2xl shadow-lg"
                    />
                  ) : (
                    <>
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4"
                      >
                        <UploadCloud
                          size={30}
                          className="text-red-600"
                        />
                      </motion.div>

                      <p className="text-gray-700 poppins_medium text-[15px]">
                        Click to Upload Image
                      </p>

                      <span className="text-gray-500 text-sm mt-1">
                        PNG, JPG or JPEG
                      </span>
                    </>
                  )}
                </label>
                {
                  !productImage.imageUrl && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Product image is required</div> : ""
                }
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[14px] mb-2 text-gray-700 poppins_medium">
                    Product Name <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="w-full h-14 rounded-2xl border border-gray-300 px-5 outline-none focus:border-red-500 transition-all duration-300"
                    value={productName}
                    onInput={(event) => setProductName(event.target.value)}
                  />
                  {
                    !productName && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Product name is required</div> : ""
                  }
                </div>

                <div>
                  <label className="block text-[14px] mb-2 text-gray-700 poppins_medium">
                    Product Price <span className="text-red-600">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter product price"
                      className="w-full h-14 rounded-2xl border border-gray-300 pl-12 pr-5 outline-none focus:border-red-500 transition-all duration-300"
                      value={productPrice}
                      onInput={(event) => setProductPrice(event.target.value)}
                    />

                    <IndianRupee
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
                    />
                  </div>
                  {
                    !productPrice && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Product price is required</div> : ""
                  }
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[14px] mb-2 text-gray-700 poppins_medium">
                    Discount (%)
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter discount percentage"
                      className="w-full h-14 rounded-2xl border border-gray-300 pl-12 pr-5 outline-none focus:border-red-500 transition-all duration-300"
                      value={discount}
                      onInput={(event) => setDiscount(event.target.value)}
                    />

                    <Percent
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
                    />
                  </div>
                  {
                    !discount && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Discount is required</div> : ""
                  }
                </div>

                <div>
                  <label className="block text-[14px] mb-2 text-gray-700 poppins_medium">
                    Category <span className="text-red-600">*</span>
                  </label>

                  <select className="w-full h-14 rounded-2xl border border-gray-300 px-5 outline-none focus:border-red-500 transition-all duration-300 bg-white text-gray-600"
                    value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="">Select Category</option>
                    <option value="ourSpecial">Our Special</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                    <option value="Desserts">Desserts</option>
                    <option value="coldDrinks">Cold Drinks</option>
                  </select>

                  {
                    !category && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Category is required</div> : ""
                  }
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[14px] mb-2 text-gray-700 poppins_medium">
                    FoodType <span className="text-red-600">*</span>
                  </label>

                  <select className="w-full h-14 rounded-2xl border border-gray-300 px-5 outline-none focus:border-red-500 transition-all duration-300 bg-white text-gray-600"
                    value={foodType} onChange={(event) => setFoodType(event.target.value)}>
                    <option value="">Select FoodType</option>
                    <option value="VEG">Veg</option>
                    <option value="NONVEG">Non Veg</option>
                  </select>

                  {
                    !category && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Category is required</div> : ""
                  }
                </div>
                <div>
                  <label className="block text-[14px] mb-2 text-gray-700 poppins_medium">
                    Stock <span className="text-red-600">*</span>
                  </label>

                  <select className="w-full h-14 rounded-2xl border border-gray-300 px-5 outline-none focus:border-red-500 transition-all duration-300 bg-white text-gray-600"
                    value={stock} onChange={(event) => setStock(event.target.value)}>
                    <option value="">Select Stock</option>
                    <option value="Aveliable">Aveliable</option>
                    <option value="outOfStock">Out Of Stock</option>
                  </select>

                  {
                    !stock && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Stock is required</div> : ""
                  }
                </div>
              </div>

              <div>
                <label className="block text-[14px] mb-2 text-gray-700 poppins_medium">
                  Description <span className="text-red-600">*</span>
                </label>

                <textarea
                  rows="6"
                  placeholder="Write delicious product description..."
                  className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none resize-none focus:border-red-500 transition-all duration-300"
                  value={description}
                  onInput={(event) => setDescription(event.target.value)}
                ></textarea>
                {
                  !description && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Description is required</div> : ""
                }
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                {
                  !productId ?
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg poppins_medium"
                      onClick={addProduct}
                    >
                      Add Product
                    </motion.button> :
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg poppins_medium"
                      onClick={updateProduct}
                    >
                      Update Product
                    </motion.button>
                }


                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  className="w-full sm:w-auto border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 px-8 py-4 rounded-2xl transition-all duration-300 poppins_medium"
                  onClick={clearForm}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* popup  */}
      <CustomPopup
        isOpen={customPopup.isOpen}
        type={customPopup.type}
        message={customPopup.message}
        onClose={onClosePopup}
      />
    </div>
  );
}