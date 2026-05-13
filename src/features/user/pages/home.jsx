import React from "react";
import { ShoppingCart } from "lucide-react";


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

const pizzaData = [
  {
    id: 1,
    image: pizza4,
    name: "Italian Cheese Pizza",
    price: "$25",
    description:
      "Loaded with extra cheese, fresh vegetables, crispy crust, and authentic Italian flavor that gives an amazing pizza experience for every customer.",
  },
  {
    id: 2,
    image: pizza,
    name: "Veggie Special Pizza",
    price: "$20",
    description:
      "Fresh garden vegetables combined with mozzarella cheese and special pizza sauce baked perfectly for healthy and tasty food lovers.",
  },
  {
    id: 3,
    image: pizza3,
    name: "Spicy Chicken Pizza",
    price: "$30",
    description:
      "Delicious spicy chicken pizza with soft cheese layers, fresh toppings, premium sauce, and crispy baked crust for the perfect taste.",
  },
];

export default function Home() {
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
          >
            View Menu
          </button>
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
        <div className="absolute bottom-40 left-140 -rotate-12 w-30 h-18">
          <img src={onionSlice} className="w-30 h-28" />
        </div>
        <div className="absolute top-150 right-20 w-50 h-50">
          <img src={pizza2} className="w-50 h-50" />
        </div>
      </div>

      {/*  */}
      <div className="items-center py-20 px-6 md:px-20 relative">
        <div className="grid grid-cols-12">
          <div className="col-span-5">
            <div>
              <img
                src={pizza}
                alt="pizza"
                className="relative w-72 h-72 drop-shadow-2xl border-2 p-4 rounded-full border-red-600  flex justify-center items-center hover:scale-120 transition-all duration-600 "
              />
            </div>
          </div>

          <div className="col-span-7">
            <p className="poppins_medium text-3xl">
              Daily fresh and <br /> always <span className="red">tasty</span>
            </p>
            <p className="poppins_regular text-1xl mt-4">
              There are many variations of passages <br />
              of Lorem Ipsum available, but the
              <br /> majority haved
            </p>
          </div>
        </div>
        <div className="absolute bottom-50 right-50 w-40 h-25 rotate-12">
          <img src={tamato} />
        </div>
      </div>

      <div className="py-20 px-6 md:px-20">
        <h2 className="poppins_bold text-3xl md:text-5xl">
          Our <span className="text-red-600">Menu</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {pizzaData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full min-h-137.5"
            >
              <div className="h-65 flex justify-center items-center overflow-hidden p-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-52 md:w-56 object-contain transition-all duration-500 hover:rotate-45 hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl poppins_semiBold text-gray-800">
                  {item.name}
                </h3>
                <p
                  className="text-gray-500 text-sm leading-7 mt-4 flex-1 overflow-hidden poppins_regular"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-200">
                  <h4 className="text-2xl text-red-600 poppins_medium">
                    {item.price}
                  </h4>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm md:text-base transition-all duration-300 hover:scale-105 poppins_regular flex items-center gap-2">
                    <ShoppingCart size={18} />
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
