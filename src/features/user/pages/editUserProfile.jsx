import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  VenusAndMars,
  Edit,
  ChevronRight,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import httpService from '../../../shared/services/httpService.js'
import apiConfig from "../config/apiConfig.js";

export default function EditUser({ userData, isOpen, onClose }) {

  const [userProfileData, setUserProfileData] = useState()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [userName, setUserName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [email, setEmail] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [gender, setGender] = useState("")


 useEffect(() => {
  if (isOpen && userData) {
    console.log(userData)
    setUserName(userData?.userName || "")
    setContactNumber(userData?.contactNumber || "")
    setEmail(userData?.email || "")
    setGender(userData?.gender || "")
    setDateOfBirth(
      userData.dateOfBirth
        ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
        : ""
    )
  }

}, [isOpen, userData])

  const getUserProfile = async ()=> {
    const payload = {
      "userId": localStorage.getItem('loginUserId')
    }
  }
  const updateProfile = async ()=> {
    setIsSubmitted(true);
    if(userName && contactNumber){
      setIsSubmitted(false)
      const payload = {
        "userId": localStorage.getItem('loginUserId'),
        "contactNumber": contactNumber,
        "userName": userName,
        "email":email || null,
        "dateOfBirth": dateOfBirth || null,
        "gender" : gender || null,
        "userRole": localStorage.getItem('loginUserRole')
      }
      const response = await httpService.postService(apiConfig.setProfile, payload);
      if(response.status == true){
        onClose()
      }

    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="w-full max-w-2xl bg-white rounded-4xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-linear-to-r from-red-600 via-red-500 to-orange-500 px-6 sm:px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl text-white poppins_bold">
                    Edit Profile
                  </h2>

                  <p className="text-white/80 text-sm mt-1 poppins_regular">
                    Update your profile details
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-3 poppins_medium">
                      User Name <span className="text-red-600">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter user name"
                        className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-5 outline-none focus:border-red-500 transition-all duration-300"
                        value={userName}
                        onInput={(e)=> setUserName(e.target.value)}
                      />

                      <User
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500"
                      />
                    </div>
                    {
                      !userName && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">User name is required</div> : ''
                    }
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-3 poppins_medium">
                      Contact Number{" "}
                      <span className="text-red-600">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter contact number"
                        className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-5 outline-none focus:border-red-500 transition-all duration-300"
                        value={contactNumber}
                        onInput={(e)=> setContactNumber(e.target.value)}
                      />

                      <Phone
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500"
                      />
                    </div>
                       {
                      !contactNumber && isSubmitted ? <div className="text-red-600 text-[12px] poppins_regular mt-2">Contact number is required</div> : ''
                    }
                  </div>

                   <div>
                    <label className="block text-sm text-gray-700 mb-3 poppins_medium">
                      Email Address
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter email address"
                        className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-5 outline-none focus:border-red-500 transition-all duration-300"
                        value={email}
                        onInput={(e)=> setEmail(e.target.value)}

                      />

                      <Mail
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-3 poppins_medium">
                      Date Of Birth{" "}
                    </label>

                    <div className="relative">
                      <input
                        type="date"
                        className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-5 outline-none focus:border-red-500 transition-all duration-300"
                        value={dateOfBirth}
                        onInput={(e)=> setDateOfBirth(e.target.value)}
                      />

                      <CalendarDays
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-3 poppins_medium">
                    </label>

                    <div className="relative">
                      <select className="w-full h-14 rounded-2xl border border-gray-300 pl-14 pr-5 outline-none focus:border-red-500 transition-all duration-300 appearance-none bg-white text-gray-700"
                      value={gender} onChange={(e)=> setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <VenusAndMars
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-10">
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 px-8 py-4 rounded-2xl transition-all duration-300 poppins_medium"
                  >
                    Cancel
                  </button>
                  <button className="w-full sm:w-auto bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-red-200 poppins_medium"
                  onClick={updateProfile}>
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}