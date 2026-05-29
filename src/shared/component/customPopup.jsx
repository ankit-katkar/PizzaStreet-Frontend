import React from "react";
import {
  X,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomPopup({
  isOpen,
  onClose,
  onConfirm,
  type = "success",
  title,
  message,
}) {
  const popupConfig = {
    success: {
      icon: <CheckCircle2 />,
      label: "Success",
      bg: "bg-green-100",
      iconColor: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
      border: "border-green-100",
    },

    error: {
      icon: <XCircle />,
      label: "Error",
      bg: "bg-red-100",
      iconColor: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
      border: "border-red-100",
    },

    warning: {
      icon: <AlertTriangle />,
      label: "Warning",
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      button: "bg-yellow-500 hover:bg-yellow-600",
      border: "border-yellow-100",
    },

    info: {
      icon: <Info />,
      label: "Info",
      bg: "bg-blue-100",
      textBg: "bg-blue-50",
      iconColor: "text-blue-600",
      labelColor: "text-blue-700",
      button: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-100",
    },
  };

  const currentPopup = popupConfig[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
              y: 30,
            }}
            transition={{
              duration: 0.3,
            }}
            className={`relative z-10 w-full
            max-w-[92%]
            sm:max-w-90
            md:max-w-100
            lg:max-w-105
            bg-white rounded-[28px] border ${currentPopup.border} shadow-2xl overflow-hidden`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center text-gray-600 z-20"
            >
              <X size={16} />
            </button>

            <div className="px-5 sm:px-7 py-7 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                }}
                className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full flex items-center justify-center ${currentPopup.bg} ${currentPopup.iconColor}`}
              >
                {React.cloneElement(currentPopup.icon, {
                  size: 24,
                })}
              </motion.div>

              <div
                className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full mt-1 text-xs text-md-2xl sm:text-2xl poppins_medium ${currentPopup.textBg} ${currentPopup.labelColor}`}
              >
                {currentPopup.label}
              </div>

              <h2 className="text-xl sm:text-2xl text-gray-900 mt-4 poppins_bold leading-tight">
                {title}
              </h2>

              <p className="text-gray-500 text-sm sm:text-[15px] leading-6 mt-3 poppins_regular max-w-sm mx-auto">
                {message}
              </p>

              {type === "warning" ? (
                <div className="flex flex-col sm:flex-row gap-3 mt-7">
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm poppins_medium transition-all duration-300"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={onConfirm}
                    className="w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm poppins_medium transition-all duration-300 shadow-lg shadow-red-100"
                  >
                    Sure
                  </button>
                </div>
              ) : (
                <button
                  onClick={onClose}
                  className={`mt-7 w-full sm:w-auto px-8 py-3 rounded-full text-sm text-white transition-all duration-300 shadow-lg ${currentPopup.button} poppins_medium`}
                >
                  Close
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// const [customPopup, setCustomPopup] = useState({
//   isOpen: false,
//   type: "",
//   message: "",
// });

{/* <CustomPopup
  isOpen={customPopup.isOpen}
  type={customPopup.type}
  message={customPopup.message}
  onClose={onClosePopup}
/> */}