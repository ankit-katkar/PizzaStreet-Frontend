import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import logo from "../../../assets/logo/pizzaStreet-main-logo.png";

export default function VerifyOTP({ onVerify }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const login = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length === 6) {
      localStorage.setItem('loginUserRole', 'Admin')
      onVerify(finalOtp);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <img src={logo} alt="logo" className="h-16" />
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-900">
        Verify OTP
      </h2>

      <p className="text-center text-gray-500 mt-3">
        Enter the 6 digit OTP sent to your mobile number
      </p>

      <form onSubmit={login} className="mt-8">
        <label className="block text-gray-700 font-medium mb-4">
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
              className="w-12 h-14 md:w-14 md:h-16 border border-gray-300 rounded-2xl text-center text-xl outline-none focus:border-red-500 transition-all duration-300"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl mt-8 flex items-center justify-center gap-2 transition-all duration-300"
        >
          Verify OTP
          <ShieldCheck size={18} />
        </button>
      </form>
    </div>
  );
}
