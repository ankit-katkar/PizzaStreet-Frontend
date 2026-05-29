import { useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import loginHttpService from "../service/loginHttpSercice";

export default function SetProfileName({ onBack, onSaveProfile }) {
  const [userName, setName] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const contactNumber = loginHttpService.getContactNumber();
    const payload = {
      contactNumber: contactNumber,
      userName: userName,
    };
    const response = await loginHttpService.httpPostService( "auth/setProfile", payload );
    if (response.status == true) {
      onSaveProfile(userName);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex items-center">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all duration-300"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
      </div>

      <div className="w-18 h-18 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <User size={28} className="text-red-600" />
      </div>

      <h2 className="font-semibold text-center text-gray-900 text-[24px] poppins_bold">
        Set Profile Name
      </h2>

      <p className="text-center text-gray-500 mt-2 leading-6 text-sm max-w-xs  text-[14px] poppins_regular">
        Choose your profile name and continue your delicious pizza journey with
        Pizza Street.
      </p>

      <form onSubmit={login} className="w-full mt-6">
        <label className="block text-gray-700 text-[14px] poppins_regular mb-3 text-sm">
          What do you call you?
        </label>

        <input
          type="text"
          placeholder="Enter your profile name"
          value={userName}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-13 px-5 rounded-2xl border border-gray-300 outline-none focus:border-red-500 transition-all duration-300 text-sm"
        />

        <button
          type="submit"
          className={`w-full py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 transition-all duration-300 ${
            userName
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Login
        </button>

        <p className="text-center text-xs text-gray-500 mt-4 leading-5 poppins_regular">
          You can always change your name later from your profile settings.
        </p>
      </form>
    </div>
  );
}
