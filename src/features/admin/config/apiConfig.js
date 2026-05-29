const BASE_URL = import.meta.env.VITE_BASE_URL;

class apiConfig {
 uploadImage = `${BASE_URL}upload`

 addProduct = `${BASE_URL}admin/add-product`
 getProduct = `${BASE_URL}admin/get-product`
 getProductById = `${BASE_URL}admin/get-product-by-id/`
 updateProduct = `${BASE_URL}admin/update-product/`
 deleteProduct = `${BASE_URL}admin/delete-product/`
 dashboardDetail = `${BASE_URL}admin/dashboard-detail`
}
export default new apiConfig()