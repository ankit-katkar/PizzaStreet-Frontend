import { useState } from "react";
import { ArrowRight } from "lucide-react";
import logo from "../../../assets/logo/pizzaStreet-main-logo.png";

export default function Login({ onSendOTP }) {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      onSendOTP(mobileNumber);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <img src={logo} alt="logo" className="h-16" />
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>

      <p className="text-center text-gray-500 mt-3">
        Enter your mobile number to continue
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <label className="block text-gray-700 font-medium mb-3">
          Mobile Number
        </label>

        <input
          type="tel"
          maxLength={10}
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter mobile number"
          className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-red-500 transition-all duration-300"
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 transition-all duration-300"
        >
          Send OTP
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
