import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/dashboard"));
const ProductList = lazy(() => import("./pages/product-list"));
const AddUpdateProduct = lazy(() => import("./pages/add-update-product"));

export default function AdminRoutes() {
  return (
    <>
      <Suspense
        fallback={<div className="flex justify-center mt-20">Loading...</div>}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/add-product" element={<AddUpdateProduct />} />
          <Route path="/update-product/:productId" element={<AddUpdateProduct />} />
        </Routes>
      </Suspense>
    </>
  );
}
