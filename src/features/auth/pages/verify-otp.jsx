import { useState } from "react";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import logo from "../../../assets/logo/pizzaStreet-main-logo.png";
import loginHttpService from "../service/loginHttpSercice";
import CustomAlert from "../../../shared/component/customAlert";
import httpService from "../../../shared/services/httpService";
import apiConfig from "../../user/config/apiConfig";

export default function VerifyOTP({ onBack, verifyUserName }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [customAlert, setCustomAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) return;
    try {
      const getNumber = loginHttpService.getContactNumber();
      const payload = {
        contactNumber: getNumber,
        otp: Number(finalOtp),
      };
      const response = await loginHttpService.httpPostService(
        "auth/verifyOTP",
        payload,
      );
      if (response.status === true) {
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('loginUserId', response.data?.userId);
        localStorage.setItem('loginUserRole', response.data?.userRole);
        localStorage.setItem('loginUserName', response.data?.userName);
        localStorage.setItem('contactNumber', response.data?.contactNumber)
        verifyUserName(response.data?.userName || null);
        handleCartdata();
         
      } else {
        setCustomAlert({
          isOpen: true,
          type: "error",
          message: response.message,
        });
      }
    } catch (error) {
      setCustomAlert({
        isOpen: true,
        type: "error",
        message: "Something went wrong",
      });
    }
  };

  const handleCartdata = async () => {
    const getCartProduct = localStorage.getItem('cart');
    if (!getCartProduct) {
      return;
    }

    const parsedCartData = JSON.parse(getCartProduct);
    if (!Array.isArray(parsedCartData) || parsedCartData.length === 0) {
      return;
    }
    const payload = {
      cartData: parsedCartData
    };
    const response = await httpService.postService(apiConfig.addToCart, payload);
  };

  return (
    <div className="w-full">
      <CustomAlert
        isOpen={customAlert.isOpen}
        type={customAlert.type}
        message={customAlert.message}
        onClose={() =>
          setCustomAlert({
            isOpen: false,
            type: "",
            message: "",
          })
        }
      />

      <div className="flex items-center">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all duration-300"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <img src={logo} alt="logo" className="h-16" />
      </div>

      <h2 className="font-bold text-center text-gray-900 text-[24px] poppins_bold">
        Verify OTP
      </h2>

      <p className="text-center text-gray-500 leading-7 text-[14px] poppins_medium">
        Enter the 6 digit OTP sent to your mobile number
      </p>

      <form onSubmit={verifyOTP} className="mt-4">
        <label className="block text-gray-700 font-medium mb-4 text-[14px] poppins_regular">
          Enter OTP
        </label>

        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              className="w-12 h-12 md:w-14 md:h-14 border border-gray-300 rounded-2xl text-center text-xl outline-none focus:border-red-500 transition-all duration-300"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={otp.join("").length !== 6}
          className={`w-full py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 transition-all duration-300 ${otp.join("").length === 6
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Verify OTP
          <ShieldCheck size={18} />
        </button>
      </form>
    </div>
  );
}
