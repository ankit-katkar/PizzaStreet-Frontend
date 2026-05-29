import { useState } from "react";
import { ArrowRight } from "lucide-react";
import logo from "../../../assets/logo/pizzaStreet-main-logo.png";
import loginHttpService from "../service/loginHttpSercice";

export default function Login({ onVerifyContact }) {
  const [mobileNumber, setMobileNumber] = useState("7420998599");

  const handleMobileNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 10);
    setMobileNumber(value);
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) return;
    try {
      const payload = {
        contactNumber: mobileNumber,
      };
      const response = await loginHttpService.httpPostService(
        "auth/verifyContactNumber",
        payload
      );
      if (response) {
        loginHttpService.setContactNumber(response.data.contactNumber)
        onVerifyContact(mobileNumber);
      }
    } catch (error) {
      console.log("OTP ERROR:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <img src={logo} alt="logo" className="h-16" />
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-900 poppins_bold">
        Login
      </h2>

      <p className="text-center text-gray-500 mt-3 poppins_regular">
        Enter your mobile number to continue
      </p>

      <form className="mt-8" onSubmit={sendOTP}>
        <label className="block text-gray-700 mb-3 text-[14px] poppins_regular">
          Mobile Number
        </label>

        <input
          type="text"
          value={mobileNumber}
          onChange={handleMobileNumber}
          placeholder="Enter mobile number"
          className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-red-500 transition-all duration-300"
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={mobileNumber.length !== 10}
          className={`w-full py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 transition-all duration-300 ${
            mobileNumber.length === 10
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Send OTP
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}