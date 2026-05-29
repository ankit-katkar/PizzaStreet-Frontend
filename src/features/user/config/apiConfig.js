const BASE_URL = import.meta.env.VITE_BASE_URL;

class apiConfig {
// product
 getProductByCategory = `${BASE_URL}product/get-product-by-category/`
 getProductById = `${BASE_URL}product/get-product-by-id/`
 mostSellingProduct = `${BASE_URL}product/most-selling-product`
 searchProduct = `${BASE_URL}product/search-product`

//  cart apis 
 addToCart = `${BASE_URL}cart/addToCart`
 getCartProduct = `${BASE_URL}cart/getCartProduct`
 removeToCart = `${BASE_URL}cart/removeToCart/`

//  checkout
 checkoutOrder = `${BASE_URL}checkout/checkoutOrder`
 getUserOrder = `${BASE_URL}checkout/userOrder`
 setProductRating = `${BASE_URL}checkout/setProductRating`

//  profile   
 setProfile = `${BASE_URL}auth/setProfile`
 getUserProfile = `${BASE_URL}auth/getUserProfile`
 
}
export default new apiConfig()