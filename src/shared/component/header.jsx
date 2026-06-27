import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingCart, Search, User, LogOut } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/pizzaStreet-main-logo.png";
import Login from "../../features/auth/pages/login";
import VerifyOTP from "../../features/auth/pages/verify-otp";
import SetProfileName from "../../features/auth/pages/setProfileName";
import { useSelector } from "react-redux";
import CustomAlert from '../component/customAlert'

export default function Header() {
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const cartSelector = useSelector((state) => state.cart.item);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [showSetProfileName, setShowSetProfileName] = useState(false);
  const [loginUserRole, setLoginUserRole] = useState("");
  const [loginUserName, setLoginUserName] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [customAlert, setCustomAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const [otp, setOtp] = useState()

  useEffect(() => {
    if (otp) {
      setCustomAlert({
        isOpen: true,
        type: "success",
        message: `Your verification code is: ${otp}`,
      })
    }
  }, [otp])

  useEffect(() => {
    const role = localStorage.getItem("loginUserRole");
    const userName = localStorage.getItem("loginUserName");
    if (role) {
      setLoginUserRole(role);
    }

    if (userName) {
      setLoginUserName(userName);
    }
  }, [isLoginModalOpen]);

  // Update header when auth changes elsewhere in the app
  useEffect(() => {
    const handleAuthChange = () => {
      const role = localStorage.getItem("loginUserRole") || "";
      const userName = localStorage.getItem("loginUserName") || "";
      setLoginUserRole(role);
      setLoginUserName(userName);
      setShowProfileMenu(false);
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const receiveOtp = (data) => {
    if (data !== 'undefined') {
      setOtp(data)
    }
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setShowVerifyOTP(false);
    setShowSetProfileName(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setShowVerifyOTP(false);
    setShowSetProfileName(false);
  };

  useEffect(() => {
    const openLoginModalFromRouteGuard = () => {
      openLoginModal();
    };

    window.addEventListener("openLoginModal", openLoginModalFromRouteGuard);
    return () => window.removeEventListener("openLoginModal", openLoginModalFromRouteGuard);
  }, []);

  const handleSendOTP = () => {
    setShowVerifyOTP(true);
    setShowSetProfileName(false);
  };

  const handleBackToLogin = () => {
    setShowVerifyOTP(false);
    setShowSetProfileName(false);
  };

  const handleVerifyOTP = (userName) => {
    if (userName) {
      setLoginUserName(userName);
      localStorage.setItem("loginUserName", userName);
      setShowVerifyOTP(false);
      setShowSetProfileName(false);
      setIsLoginModalOpen(false);
      setCustomAlert({
        isOpen: true,
        type: "success",
        message: "User Login Successfully...",
      })
    } else {
      setShowVerifyOTP(false);
      setShowSetProfileName(true);
    }
  };

  const handleBackToVerifyOTP = () => {
    setShowSetProfileName(false);
    setShowVerifyOTP(true);
  };

  const handleSaveProfileName = (name) => {
    setLoginUserName(name);
    localStorage.setItem("loginUserName", name);
    closeLoginModal();
    setCustomAlert({
      isOpen: true,
      type: "success",
      message: "User Login Successfully...",
    })
  };

  const handleLogout = () => {
    setLoginUserRole("");
    setLoginUserName("");
    setShowProfileMenu(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginUserName");
    localStorage.removeItem("loginUserRole");
    localStorage.removeItem("contactNumber");
    localStorage.removeItem("loginUserId");
    navigate("/");
    // Notify other components that auth state changed
    try {
      window.dispatchEvent(new Event("authChanged"));
    } catch (e) {
      /* ignore */
    }
  };

  const redirectToUserProfile = () => {
    navigate('/userProfile')
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="PizzaStreet Logo"
                  className="h-10 sm:h-14 w-auto"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {loginUserRole === "Admin" && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300"
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/"
                className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300"
              >
                Home
              </Link>

              <Link
                to="/ourMenu"
                className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300"
              >
                Our Menu
              </Link>

              {!loginUserName ? (
                <button
                  onClick={openLoginModal}
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300"
                >
                  Login
                </button>
              ) : (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-3 px-4 hover:border-orange-500 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <User size={14} className="text-orange-600" />
                    </div>

                    <span className="font-medium text-gray-700">
                      {loginUserName}
                    </span>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute top-14 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                      <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-orange-50 transition-all duration-300 text-gray-700"
                        onClick={redirectToUserProfile}>
                        <User size={18} />
                        Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition-all duration-300 text-red-600"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Link
                to="/cart"
                className="flex items-center gap-2 text-gray-700 font-medium hover:text-orange-600 transition-all duration-300"
              >
                <ShoppingCart size={18} />
                Cart ({cartSelector.length ? cartSelector.length : 0})
              </Link>

              <Link
                to="/searchProduct"
                className="flex items-center gap-2 text-gray-700 font-medium hover:text-orange-600 transition-all duration-300"
              >
                <Search size={18} />
              </Link>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        <div
          className={`fixed inset-y-0 right-0 z-50 w-72 max-w-full bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <img src={logo} alt="PizzaStreet Logo" className="h-10 w-auto" />

            <button
              onClick={closeMenu}
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-5 py-6 space-y-3">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 font-semibold hover:bg-orange-50 transition-all duration-300"
            >
              🏠 Home
            </Link>

            <Link
              to="/ourMenu"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 font-semibold hover:bg-orange-50 transition-all duration-300"
            >
              🍕 Our Menu
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 font-semibold hover:bg-orange-50 transition-all duration-300"
            >
              <ShoppingCart size={18} />
              Cart
            </Link>

            {!loginUserName ? (
              <button
                onClick={() => {
                  closeMenu();
                  openLoginModal();
                }}
                className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 font-semibold hover:bg-orange-50 transition-all duration-300"
              >
                🔐 Login
              </button>
            ) : (
              <>
                <div className="px-4 py-4 rounded-2xl bg-orange-50">
                  <p className="text-sm text-gray-500">Logged in as</p>

                  <h3 className="font-semibold text-orange-600 mt-1">
                    {loginUserName}
                  </h3>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        <button
          onClick={closeMenu}
          className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
            }`}
        />
      </header>

      {isLoginModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4">
          <div className="relative bg-white w-full max-w-md rounded-[30px] p-8 shadow-2xl overflow-hidden">
            {!showVerifyOTP && !showSetProfileName && (
              <button
                onClick={closeLoginModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
              >
                <X size={18} />
              </button>
            )}

            {!showVerifyOTP && !showSetProfileName && (
              <Login onVerifyContact={handleSendOTP} getOtp={receiveOtp} />
            )}

            {showVerifyOTP && !showSetProfileName && (
              <VerifyOTP
                verifyUserName={handleVerifyOTP}
                onBack={handleBackToLogin}
              />
            )}

            {showSetProfileName && (
              <SetProfileName
                onBack={handleBackToVerifyOTP}
                onSaveProfile={handleSaveProfileName}
              />
            )}
          </div>
        </div>
      )}

      {/* popup  */}
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
    </>
  );
}
