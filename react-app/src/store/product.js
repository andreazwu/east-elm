// ACTION TYPES
const LOAD_ALL_PRODUCTS = "products/loadallproducts"
const LOAD_ONE_PRODUCT = "products/loadoneproduct"
const LOAD_MY_PRODUCTS = "products/loadmyproducts"

// ACTION CREATORS
const acLoadAllProducts = (products) => ({
  type: LOAD_ALL_PRODUCTS,
  products
})

const acLoadOneProduct = (product) => ({
  type: LOAD_ONE_PRODUCT,
  product
})

const acLoadMyProducts = (products) => ({
  type: LOAD_MY_PRODUCTS,
  products
})

// THUNKS
export const thunkLoadAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products")
  if (response.ok) {
    const products = await response.json()
    // Products: [{ id, sellerId, cat, name, descp, details, colors, price,
    // Images: [{url}, {url}]}, {}, {}]
    dispatch(acLoadAllProducts(products))
  }
}

export const thunkLoadOneProduct = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`)
  if (response.ok) {
    const product = await response.json()
    // { id, sellerId, cat, name, desc, details, colors, price,
    // User: {}, Images:[{},{}], Reviews:[{},{}], CartItems:[{},{}] }
    dispatch(acLoadOneProduct(product))
  }
}

export const thunkLoadMyProducts = () => async (dispatch) => {
  const response = await fetch("/api/products/current")
  if (response.ok) {
    const products = await response.json()
    // Products: [{ id, sellerId, cat, name, descp, details, colors, price,
    // Images: [{url}, {url}]}, {}, {}]
    dispatch(acLoadMyProducts(products))
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
      newState = {...state}
      action.products.Products.forEach((product) => {
        newState.allProducts[product.id] = product
      })
      newState.singleProduct={}
      return newState
    case LOAD_ONE_PRODUCT:
      newState = {...state}
      newState.singleProduct=action.product
      return newState
    case LOAD_MY_PRODUCTS:
      newState = {...state}
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
