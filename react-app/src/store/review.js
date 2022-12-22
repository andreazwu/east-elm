// ACTION TYPES:
const LOAD_PRODUCT_REVIEWS = "reviews/loadproductreviews"
const LOAD_USER_REVIEWS = "reviews/loaduserreviews"
const CREATE_REVIEW = "reviews/createreview"
const UPDATE_REVIEW = "reviews/updatereview"
const DELETE_REVIEW = "reviews/deletereview"


// ACTION CREATORS:
const acLoadProductReviews = (reviews) => {
  return {
    type: LOAD_PRODUCT_REVIEWS,
    reviews
  }
}

const acLoadUserReviews = (reviews) => {
  return {
    type: LOAD_USER_REVIEWS,
    reviews
  }
}

const acCreateReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

const acUpdateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review
  }
}

const acDeleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

// THUNK ACs:
export const thunkGetProductReviews = (ProductId) => async (dispatch) => {
  const response = await fetch(`/api/products/${ProductId}/reviews`)
  if (response.ok) {
    // {"Reviews": [ {id, userId, productId, stars, title, content, createdAt, User: {xxx}, Product: {xxx}}, {}, {} ] }
    const data = await response.json()
    const reviewsArr = data.Reviews
    dispatch(acLoadProductReviews(reviewsArr))
  }
}

export const thunkGetUserReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews/current")
  if (response.ok) {
    // {"Reviews": [ {id, userId, productId, stars, title, content, createdAt, User: {xxx}, Product: {xxx}}, {}, {} ] }
    const data = await response.json()
    const reviewsArr = data.Reviews
    dispatch(acLoadUserReviews(reviewsArr))
  }
}

export const thunkCreateNewReview = (productId, newreview) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/reviews`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newreview)
  })
  if (response.ok){
    // {id, userId, productId, stars, title, content, createdAt, User: {xxx}, Product: {xxx}}}
    const review = await response.json()
    dispatch(acCreateReview(review))
    return null
  } else if (response.status < 500) {
    const data = await response.json()
    // {"errors": [ "field: error", " ", " "]}
    return data.errors
  } else {
    return ["An error occured. Please try again."]
  }
}

export const thunkEditReview = (reviewId, myreview) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(myreview)
  })
  if (response.ok) {
    const review = await response.json()
    dispatch(acUpdateReview(review))
    return review
  } else if (response.status < 500) {
    const data = await response.json()
    // {"errors": [ "field: error", " ", " "]}
    // {"message": product not found/ unauthorized}
    return data.errors
  } else {
    return ["An error occured. Please try again."]
  }
}

export const thunkRemoveReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })
  if (response.ok){
    dispatch(acDeleteReview(reviewId))
  }
  const data = await response.json()
  console.log(data.message)
  return data.message
}

// REDUCER:
const initialState = {
  product:{},
  user:{}
}

const reviewReducer = (state = initialState, action) => {
  let newState
  switch (action.type){
    case LOAD_PRODUCT_REVIEWS:
      newState = {...state}
      const normalizedReviews = {}
      action.reviews.forEach((review) => normalizedReviews[review.id] = review)
      newState.product = normalizedReviews
      newState.user = {}
      return newState
    case LOAD_USER_REVIEWS:
      newState = {...state}
      const normalizedUserReviews = {}
      action.reviews.forEach((review) => normalizedUserReviews[review.id] = review)
      newState.user = normalizedUserReviews
      return newState
    case CREATE_REVIEW:
      newState = {...state}
      newState.product = {...state.product}
      newState.user = {...state.user}
      newState.product[action.review.id] = action.review
      newState.user[action.review.id] = action.review
      return newState
    case UPDATE_REVIEW:
      newState = {...state}
      newState.product = {...state.product}
      newState.user = {...state.user}
      newState.product[action.review.id] = action.review
      newState.user[action.review.id] = action.review
      return newState
    case DELETE_REVIEW:
      newState = {...state}
      newState.product = {...state.product}
      newState.user = {...state.user}
      delete newState.product[action.reviewId]
      delete newState.user[action.reviewId]
      return newState

    default:
      return state
  }
}


export default reviewReducer
