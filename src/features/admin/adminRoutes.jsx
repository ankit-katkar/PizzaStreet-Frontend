import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../shared/route-guard/protectedRoute";

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
          <Route path="/dashboard" element={ < ProtectedRoute Component={Dashboard} />} />
          <Route path="/productList" element={<ProtectedRoute Component={ProductList} />} />
          <Route path="/add-product" element={<ProtectedRoute Component={AddUpdateProduct} />} />
          <Route path="/update-product/:productId" element={<ProtectedRoute Component={AddUpdateProduct} />} />
        </Routes>
      </Suspense>
    </>
  );
}
