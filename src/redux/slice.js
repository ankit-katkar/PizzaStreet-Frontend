import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  item: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const exists = state.item.find(ele => ele._id === action.payload._id)
      if (!exists) {
        state.item.push(
          {...action.payload, 
            quantity:1, 
            productId:action.payload._id,
            contactNumber:localStorage.getItem('contactNumber'),
            userId: localStorage.getItem('loginUserId')
          })
      }
      localStorage.setItem('cart', JSON.stringify(state.item))
    },

    removeItem: (state, action) => {
      const itemId = action.payload._id || action.payload.productId
      const cartData = state.item.filter(
        (ele) => (ele._id || ele.productId) !== itemId
      );
      state.item = cartData      
      localStorage.setItem('cart', JSON.stringify(cartData))
    },

    setCartItems: (state, action) => {
      state.item = action.payload || []
      localStorage.setItem('cart', JSON.stringify(state.item))
    },

    updateItemQuantity: (state, action) => {
      const itemId = action.payload._id || action.payload.productId
      const { quantity } = action.payload
      state.item = state.item.map((ele) =>
        (ele._id || ele.productId) === itemId ? { ...ele, quantity } : ele
      )
      localStorage.setItem('cart', JSON.stringify(state.item))
    }
  }
})

export const { addItem, removeItem, setCartItems, updateItemQuantity } = cartSlice.actions
export default cartSlice.reducer