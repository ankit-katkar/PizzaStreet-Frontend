import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

import { Link } from "react-router-dom";
import logo from "../../assets/logo/pizzaStreet-main-logo.png";
import Login from "../../features/auth/pages/login";
import VerifyOTP from "../../features/auth/pages/verify-otp";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [loginUserRole, setLoginUserRole] = useState("");

  useEffect(() => {
    setLoginUserRole(localStorage.getItem("loginUserRole"));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setShowVerifyOTP(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setShowVerifyOTP(false);
  };

  const handleSendOTP = () => {
    setShowVerifyOTP(true);
  };

  const handleVerifyOTP = () => {
    alert("OTP Verified Successfully");
    closeLoginModal();
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="shrink-0 flex items-center">
              <a href="/" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="PizzaStreet Logo"
                  className="h-10 sm:h-14 w-auto"
                />
              </a>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {loginUserRole === "Admin" ? (
                <Link
                  to="/dashboard"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-colors duration-300"
                >
                  Dashboard
                </Link>
              ) : null}
              <Link
                to="/"
                className="text-gray-700 font-medium hover:text-orange-600 transition-colors duration-300"
              >
                Home
              </Link>
              {loginUserRole === "Admin" ? (
                <Link
                  to="/productList"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-colors duration-300"
                >
                  Product List
                </Link>
              ) : null}

              <Link
                to="/ourMenu"
                className="text-gray-700 font-medium hover:text-orange-600 transition-colors duration-300"
              >
                Our Menu
              </Link>
              <Link
                onClick={openLoginModal}
                className="text-gray-700 font-medium hover:text-orange-600 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to={"/cart"}
                className="flex items-center gap-2 text-gray-700 font-medium hover:text-orange-600 transition-colors duration-300"
              >
                <ShoppingCart size={18} /> Cart
              </Link>
              <Link
                to={"/searchProduct"}
                className="flex items-center gap-2 text-gray-700 font-medium hover:text-orange-600 transition-colors duration-300"
              >
                <Search size={18} />
              </Link>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 transition-transform duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        <div
          className={`fixed inset-y-0 right-0 z-50 w-72 max-w-full bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img src={logo} alt="PizzaStreet Logo" className="h-10 w-auto" />
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-5 py-6 space-y-3">
            <a
              href="/search"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 font-semibold hover:bg-orange-50 transition"
            >
              <Search size={18} /> Search
            </a>
            <a
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 font-semibold hover:bg-orange-50 transition"
            >
              <span className="text-lg">🏠</span>
              Home
            </a>
            <a
              href="/menu"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 font-semibold hover:bg-orange-50 transition"
            >
              <span className="text-lg">🍕</span>
              Our Menu
            </a>
            <a
              href="/login"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 font-semibold hover:bg-orange-50 transition"
            >
              <span className="text-lg">🔐</span>
              Login
            </a>
            <a
              href="/cart"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 font-semibold hover:bg-orange-50 transition"
            >
              <ShoppingCart size={18} />
              Cart
            </a>
          </div>
        </div>

        <button
          onClick={closeMenu}
          className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        />
      </header>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4">
          <div className="relative bg-white w-full max-w-md rounded-[30px] p-8 shadow-2xl">
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {!showVerifyOTP ? (
              <Login onSendOTP={handleSendOTP} />
            ) : (
              <VerifyOTP onVerify={handleVerifyOTP} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
