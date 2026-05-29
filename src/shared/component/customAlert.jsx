import { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomAlert({
  isOpen,
  onClose,
  type = "success",
  message = "",
}) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  const alertStyles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      icon: <CheckCircle size={20} />,
      button: "hover:bg-green-100",
    },

    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      icon: <AlertCircle size={20} />,
      button: "hover:bg-red-100",
    },
  };

  const currentStyle = alertStyles[type] || alertStyles.success;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 20,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -80,
            scale: 0.9,
          }}
          transition={{
            duration: 0.35,
          }}
          className="fixed top-0 left-1/2 -translate-x-1/2 z-9999 w-full max-w-md px-4"
        >
          <div
            className={`flex items-start gap-3 rounded-2xl border shadow-xl backdrop-blur-md px-5 py-4 ${currentStyle.bg} ${currentStyle.border}`}
          >

            <div className={`mt-0.5 ${currentStyle.text}`}>
              {currentStyle.icon}
            </div>

            <div className="flex-1">
              <h4 className={`font-semibold text-[15px] ${currentStyle.text}`}>
                {type === "success" ? "Success" : "Error"}
              </h4>

              <p className="text-gray-600 text-[14px] mt-1 leading-6">
                {message}
              </p>
            </div>

            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${currentStyle.button}`}
            >
              <X size={16} className={currentStyle.text} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// const [customAlert, setCustomAlert] = useState({
//     isOpen: false,
//     type: "",
//     message: "",
//   });

//  <CustomAlert
//         isOpen={customAlert.isOpen}
//         type={customAlert.type}
//         message={customAlert.message}
//         onClose={() =>
//           setCustomAlert({
//             isOpen: false,
//             type: "",
//             message: "",
//           })
//         }
//       />
