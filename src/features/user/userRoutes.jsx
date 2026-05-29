import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/about";

const Home = lazy(() => import("./pages/home"));
const OurMenuPage = lazy(() => import("./pages/ourMenu"));
const ProductDetailPage = lazy(() => import("./pages/product-detail"));
const CartPage = lazy(() => import("./pages/cart"));
const SearchProduct = lazy(() => import("./pages/searchProduct"));
const CheckoutPage = lazy(() => import("./pages/checkout"));
const UserProfile = lazy(() => import("./pages/userProfile"));

export default function UserRoutes() {
  return (
    <>
      <Suspense
        fallback={<div className="flex justify-center mt-20">Loading...</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/ourMenu" element={<OurMenuPage />} />
         <Route path="/productDetail/:productId" element={<ProductDetailPage />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/searchProduct" element={<SearchProduct />} />
         <Route path="/checkout" element={<CheckoutPage />} />
         <Route path="/userProfile" element={<UserProfile />} />
         <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </>
  );
}
