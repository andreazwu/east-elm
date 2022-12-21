// ACTION TYPES
const LOAD_ALL_PRODUCTS = 'products/loadallproducts';

// ACTION CREATORS
const acLoadAllProducts = (products) => ({
  type: LOAD_ALL_PRODUCTS,
  products
})

// THUNKS
export const thunkLoadAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products")
  if (response.ok) {
    const products = await response.json()
    // Products: [{ id, sellerId, cat, name, descp, details, colors, price, Images: [{url}, {url}]}, {}, {}]
    dispatch(acLoadAllProducts(products))
  }
}

// REDUCER
const initialState = {
  allProducts: {},
  singleProduct: {}
}

const productReducer = (state = initialState, action) => {
  let newState
  switch(action.type) {
    case LOAD_ALL_PRODUCTS:
      newState = {...state, allProducts:{...state.allProducts}}
      action.products.Products.forEach((product) => {
        newState.allProducts[product.id] = product
      })
      newState.singleProduct={}
      return newState

    default:
      return state
  }
}

export default productReducer
