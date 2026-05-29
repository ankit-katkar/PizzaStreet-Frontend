import React from "react";
import { motion } from "framer-motion";
import {
  Pizza,
  ChefHat,
  Truck,
  Star,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import pizza from "../../../assets/img/03.png";


export default function About() {
  const features = [
    {
      id: 1,
      icon: <Pizza size={26} />,
      title: "Fresh Ingredients",
      description:
        "We use fresh vegetables, premium cheese, and authentic spices for every pizza.",
    },

    {
      id: 2,
      icon: <ChefHat size={26} />,
      title: "Expert Chefs",
      description:
        "Our experienced chefs prepare delicious pizzas with love and perfection.",
    },

    {
      id: 3,
      icon: <Truck size={26} />,
      title: "Fast Delivery",
      description:
        "Hot and fresh pizza delivered quickly to your doorstep every time.",
    },

    {
      id: 4,
      icon: <ShieldCheck size={26} />,
      title: "Quality Food",
      description:
        "We maintain high-quality standards to give the best taste experience.",
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      <section className="relative py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-linear-to-br from-red-50 via-white to-yellow-50">
        <div className="absolute top-0 left-0 w-52 h-52 sm:w-72 sm:h-72 bg-red-100 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute bottom-0 right-0 w-52 h-52 sm:w-72 sm:h-72 bg-yellow-100 rounded-full blur-3xl opacity-40"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
            }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm poppins_medium">
              <Pizza size={16} />
              About Pizzon
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-tight text-gray-900 mt-5 sm:mt-6 poppins_bold">
              Delicious Pizza Made With Love & Fresh Ingredients
            </h1>

            <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 mt-5 sm:mt-7 poppins_regular max-w-2xl mx-auto lg:mx-0">
              At Pizzon, we believe pizza is more than just food. It's an
              experience filled with flavor, freshness, and happiness. We serve
              handcrafted pizzas prepared with premium ingredients and authentic
              recipes to satisfy every craving.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-5 sm:gap-6 mt-8 sm:mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <Star size={20} />
                </div>

                <div className="text-left">
                  <h3 className="text-lg sm:text-xl text-gray-900 poppins_semiBold">
                    4.9 Rating
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm poppins_regular">
                    Customer Satisfaction
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <Clock3 size={20} />
                </div>

                <div className="text-left">
                  <h3 className="text-lg sm:text-xl text-gray-900 poppins_semiBold">
                    30 Min
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm poppins_regular">
                    Fast Delivery
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
            }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            <div className="absolute w-55 h-55 sm:w-[320px] sm:h-80 md:w-100 md:h-100 bg-red-100 rounded-full blur-3xl opacity-40"></div>

            <motion.img
              whileHover={{
                rotate: 6,
                scale: 1.03,
              }}
              transition={{
                duration: 0.4,
              }}
              src={pizza}
              alt="pizza"
              className="relative z-10 w-55 sm:w-75 md:w-95 lg:w-112.5 xl:w-130 drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 poppins_bold">
            Why Choose Us
          </h2>

          <p className="text-gray-500 mt-4 sm:mt-5 leading-7 sm:leading-8 text-sm sm:text-base poppins_regular">
            We provide the best quality pizzas with fresh ingredients, expert
            chefs, and quick delivery service for an unforgettable experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 mt-12 sm:mt-16">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -8,
              }}
              className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600">
                {item.icon}
              </div>

              <h3 className="text-xl sm:text-2xl text-gray-900 mt-5 sm:mt-6 poppins_semiBold">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-7 mt-3 sm:mt-4 text-sm poppins_regular">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-red-600">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 text-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white poppins_bold">
              10K+
            </h2>

            <p className="text-red-100 mt-2 sm:mt-3 text-sm sm:text-base poppins_regular">
              Happy Customers
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white poppins_bold">
              50+
            </h2>

            <p className="text-red-100 mt-2 sm:mt-3 text-sm sm:text-base poppins_regular">
              Pizza Varieties
            </p>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white poppins_bold">
              15+
            </h2>

            <p className="text-red-100 mt-2 sm:mt-3 text-sm sm:text-base poppins_regular">
              Expert Chefs
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}