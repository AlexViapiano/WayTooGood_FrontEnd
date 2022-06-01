import { actionTypes } from './action'

const initialState = {
  cart: [],
  prices: [],
  orders: [],
  promoCode: null,
  userReviews: [],
  addToCartTiggered: false,
  checkoutSessionId: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CART:
      return {
        ...state,
        cart: action?.cart != null ? action.cart : [],
      }
    case actionTypes.UPDATE_CART:
      return {
        ...state,
        cart: action?.cart,
        addToCartTiggered: true,
      }
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
      }
    case actionTypes.RECIEVE_PRICES:
      return {
        ...state,
        prices: action?.payload?.prices,
      }
    case actionTypes.RECIEVE_GET_USER_ORDERS:
      return {
        ...state,
        orders: action.payload.res,
      }
    case actionTypes.RECIEVE_GET_USER_REVIEWS:
      return {
        ...state,
        userReviews: action.payload.res,
      }
    case actionTypes.RECIEVE_CREATE_ORDER:
      return {
        ...state,
        promoCode: null,
      }
    case actionTypes.SET_PROMOCODE:
      return {
        ...state,
        promoCode: action?.payload?.promoCode,
      }
    case actionTypes.RESET_PROMOCODE:
      return {
        ...state,
        promoCode: null,
      }
    case actionTypes.SET_CHECKOUT_SESSION:
      if (action.payload.reset) {
        return {
          ...state,
          checkoutSessionId: null,
        }
      } else {
        return {
          ...state,
          checkoutSessionId: action.payload.res.id,
        }
      }

    default:
      return state
  }
}
