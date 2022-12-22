// ACTION TYPES
const LOAD_ALL_PRODUCTS = "products/loadallproducts"
const LOAD_ONE_PRODUCT = "products/loadoneproduct"
const LOAD_MY_PRODUCTS = "products/loadmyproducts"
const CREATE_PRODUCT = "products/createproduct"
const UPDATE_PRODUCT = "products/updateproduct"
const DELETE_PRODUCT = "products/deleteproduct"

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

const acCreateProduct = (product) => ({
  type: CREATE_PRODUCT,
  product
})

const acUpdateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product
})

const acDeleteProduct = (productid) => ({
  type: DELETE_PRODUCT,
  productid
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
  } else {
    const data = await response.json()
    console.log(data.message)
    return data.message
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

export const thunkCreateProduct = (product) => async (dispatch) => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(product)
  })
  if (response.ok) {
    const newproduct = await response.json()
    // { id, sellerId, cat, name, descp, details(optional), colors(optional), price, Images: [{url}, {url}] }
    await dispatch(acCreateProduct(newproduct))
    return null
  } else if (response.status < 500) {
    const data = await response.json()
    // {"errors": [ "field: error", " ", " "]}
    return data.errors
  } else {
    return ["An error occured. Please try again."]
  }

  // try{
  //   const response = await fetch("/api/products", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json"},
  //     body: JSON.stringify(product)
  //   })
  //   if (response.ok) {
  //     const newproduct = await response.json()
  //     await dispatch(acCreateProduct(newproduct))
  //     return newproduct
  //   }
  // } catch (error) {
  //   throw error
  // }
}

export const thunkUpdateProduct = (productid, product) => async (dispatch) => {
  const response = await fetch(`/api/products/${productid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(product)
  })
  if (response.ok) {
    const editproduct = await response.json()
    // { id, sellerId, cat, name, descp, details(optional), colors(optional), price, Images: [{url}, {url}] }
    await dispatch(acUpdateProduct(editproduct))
    return null
  } else if (response.status < 500) {
    const data = await response.json()
    // {"errors": [ "field: error", " ", " "]}
    // {"message": product not found/ unauthorized}
    return data.errors
  } else {
    return ["An error occured. Please try again."]
  }
}

export const thunkDeleteProduct = (productid) => async (dispatch) => {
  const response = await fetch(`/api/products/${productid}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(acDeleteProduct(productid))
    console.log(data.message)
    return data.message
  } else {
    const data = await response.json()
    console.log(data.message)
    return data.message
  }
}

// REDUCER
const initialState = {
  allProducts: {},
  singleProduct: {},
  myProducts: {}
}

const productReducer = (state = initialState, action) => {
  let newState
  switch(action.type) {
    case LOAD_ALL_PRODUCTS:
      newState = {...state}
      action.products.Products.forEach((product) => {
        newState.allProducts[product.id] = product
      })
      newState.singleProduct = {}
      newState.myProducts = {}
      return newState
    case LOAD_ONE_PRODUCT:
      newState = {...state}
      newState.singleProduct=action.product
      newState.allProducts = {}
      newState.myProducts = {}
      return newState
    case LOAD_MY_PRODUCTS:
      newState = {...state}
      action.products.Products.forEach((product) => {
        newState.myProducts[product.id] = product
      })
      newState.allProducts = {}
      newState.singleProduct = {}
      return newState
    case CREATE_PRODUCT:
      newState = {...state}
      newState.singleProduct = action.product
      newState.myProducts[action.product.id] = action.product
      return newState
    case UPDATE_PRODUCT:
      newState = {...state}
      newState.singleProduct = action.product
      newState.myProducts[action.product.id] = action.product
      return newState
    case DELETE_PRODUCT:
      newState = {...state, allProducts:{...state.allProducts}, myProducts:{...state.myProducts}, singleProduct:{...state.singleProduct}}
      delete newState.allProducts[action.productid]
      delete newState.myProducts[action.productid]
      if (newState.singleProduct.id === action.productid) newState.singleProduct = {}
      return newState

    default:
      return state
  }
}

export default productReducer
