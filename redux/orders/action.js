import { API_URL } from '../api'
import { store } from 'react-notifications-component'

export const actionTypes = {
  GET_CART: 'GET_CART',
  UPDATE_CART: 'UPDATE_CART',
  CLEAR_CART: 'CLEAR_CART',
  REQUEST_GET_USER_ORDERS: 'REQUEST_GET_USER_ORDERS',
  RECIEVE_GET_USER_ORDERS: 'RECIEVE_GET_USER_ORDERS',
  REQUEST_GET_USER_REVIEWS: 'REQUEST_GET_USER_REVIEWS',
  RECIEVE_GET_USER_REVIEWS: 'RECIEVE_GET_USER_REVIEWS',
  REQUEST_LOAD_STRIPE_TOKEN: 'REQUEST_LOAD_STRIPE_TOKEN',
  RECIEVE_LOAD_STRIPE_TOKEN: 'RECIEVE_LOAD_STRIPE_TOKEN',
  REQUEST_CREATE_ORDER: 'REQUEST_CREATE_ORDER',
  RECIEVE_CREATE_ORDER: 'RECIEVE_CREATE_ORDER',
  REQUEST_RETURN: 'REQUEST_RETURN',
  RECIEVE_RETURN: 'RECIEVE_RETURN',
  REQUEST_TAX_RATES: 'REQUEST_TAX_RATES',
  RECIEVE_TAX_RATES: 'RECIEVE_TAX_RATES',
  REQUEST_PRICES: 'REQUEST_PRICES',
  RECIEVE_PRICES: 'RECIEVE_PRICES',
  REQUEST_PROMOCODE: 'REQUEST_PROMOCODE',
  SET_PROMOCODE: 'SET_PROMOCODE',
  RESET_PROMOCODE: 'RESET_PROMOCODE',
  SET_CHECKOUT_SESSION: 'SET_CHECKOUT_SESSION',
  REQUEST_REQUEST_SET_SESSION: 'REQUEST_REQUEST_SET_SESSION',
  REQUEST_SET_SUBSCRIBE_SESSION: 'REQUEST_SET_SUBSCRIBE_SESSION',
}

export const createOrderCheckoutSession = (cart, affiliate, isInQCorON) => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_CREATE_ORDER })
    var jwt = JSON.parse(localStorage.getItem('jwt'))
    var headers = {}
    headers['Content-Type'] = 'application/json'
    if (jwt) headers['Authorization'] = 'Bearer ' + jwt
    return fetch(`${API_URL}/orders/createOrderCheckoutSession`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ cart: cart, affiliate: affiliate, isInQCorON: isInQCorON }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.id && !res.error) {
          dispatch({
            type: actionTypes.RECIEVE_CREATE_ORDER,
            payload: { res },
          })
        }
        return res
      })
      .catch(err => {
        console.error('err', err)
        return err
      })
  }
}

export function getCart() {
  var localStarage_cart = localStorage.getItem('cart')
  var cart = []
  if (localStarage_cart) cart = JSON.parse(localStarage_cart)
  return {
    type: actionTypes.GET_CART,
    cart,
  }
}

export const addToCart = (product, qty) => async (dispatch, getState) => {
  const { session } = getState()
  const { country } = session
  if (country == 'US' && !product?.country_US) return
  if (country == 'CA' && !product?.country_CA) return
  var qty = parseInt(qty)
  if (qty < 1) return
  else if (typeof qty === 'number') qty = 1

  var localStarage_cart = localStorage.getItem('cart')
  if (localStarage_cart) var cart = JSON.parse(localStarage_cart)

  if (!cart) {
    product.quantity = 0
    cart = [product]
  }

  var index = cart.findIndex(cartProduct => cartProduct.id == product.id)

  if (cart[index]) cart[index].quantity = cart[index].quantity + qty
  else {
    product.quantity = qty
    cart.push(product)
    index = cart.length - 1
  }

  if (cart[index].inventory < cart[index].quantity) {
    store.addNotification({
      title: 'Product unavailible',
      message: 'We have ran out of inventory for this product!',
      type: 'warning',
      insert: 'top',
      container: 'bottom-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
    })
    return
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  return dispatch({ type: actionTypes.UPDATE_CART, cart })
}

export function updateCart(product, qty) {
  var qty = parseInt(qty)
  var cart = JSON.parse(localStorage.getItem('cart'))
  const index = cart.findIndex(cartProduct => cartProduct.id == product.id)
  if (cart[index] && qty == 0) cart.splice(index, 1)
  else if (cart[index] && cart[index].inventory < qty) {
    store.addNotification({
      title: 'Product unavailible',
      message: 'We have ran out of inventory for this product!',
      type: 'warning',
      insert: 'top',
      container: 'bottom-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
    })
  } else cart[index].quantity = qty

  localStorage.setItem('cart', JSON.stringify(cart))
  return {
    type: actionTypes.UPDATE_CART,
    cart,
  }
}

export function clearCart() {
  localStorage.setItem('cart', [])
  return {
    type: actionTypes.CLEAR_CART,
  }
}

export const getUserOrders = userId => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_GET_USER_ORDERS })
    var jwt = JSON.parse(localStorage.getItem('jwt'))
    var bearerToken = 'Bearer ' + jwt
    return fetch(`${API_URL}/orders?user=` + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.RECIEVE_GET_USER_ORDERS,
            payload: { res },
          })
        }
        return res
      })
      .catch(err => {
        console.error('err', err)
        return err
      })
  }
}

export const getUserReviews = userId => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_GET_USER_REVIEWS })
    var jwt = JSON.parse(localStorage.getItem('jwt'))
    var bearerToken = 'Bearer ' + jwt
    return fetch(`${API_URL}/reviews?user=` + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.RECIEVE_GET_USER_REVIEWS,
            payload: { res },
          })
        }
        return res
      })
      .catch(err => {
        console.error('err', err)
        return err
      })
  }
}

export const createPaymentIntent = (cart, country, state, code) => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_LOAD_STRIPE_TOKEN })
    var jwt = JSON.parse(localStorage.getItem('jwt'))
    var headers = {}
    headers['Content-Type'] = 'application/json'
    if (jwt) headers['Authorization'] = 'Bearer ' + jwt
    return fetch(`${API_URL}/orders/createPaymentIntent`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        cart,
        country,
        state,
        code,
      }),
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error && res?.statusCode == 200) {
          dispatch({
            type: actionTypes.RECIEVE_LOAD_STRIPE_TOKEN,
            payload: { res },
          })
        } else console.error('err', res)
        return res
      })
      .catch(err => {
        console.error('err', err)
        return err
      })
  }
}

export const createOrder = data => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_CREATE_ORDER })
    var jwt = JSON.parse(localStorage.getItem('jwt'))
    var headers = {}
    headers['Content-Type'] = 'application/json'
    if (jwt) headers['Authorization'] = 'Bearer ' + jwt
    var bearerToken = 'Bearer ' + jwt
    return fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(res => {
        if (res.id && !res.error) {
          dispatch({
            type: actionTypes.RECIEVE_CREATE_ORDER,
            payload: { res },
          })
        }
        return res
      })
      .catch(err => {
        console.error('err', err)
        return err
      })
  }
}

export const getTaxRates = () => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_TAX_RATES })
    return fetch(`${API_URL}/taxRates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.RECIEVE_TAX_RATES,
            payload: { res },
          })
        }
        return res
      })
      .catch(err => {
        console.error('err', err)
        return err
      })
  }
}

export const getPrices = () => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_PRICES })
    return fetch(`${API_URL}/prices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.RECIEVE_PRICES,
            payload: { prices: res.data },
          })
        }
        return res
      })
      .catch(err => {
        console.error('err', err)
        return err
      })
  }
}

export const getPromoCode = code => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_PROMOCODE })
    return fetch(`${API_URL}/promocode?code=` + code, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.SET_PROMOCODE,
            payload: { promoCode: res },
          })
        }
        return res
      })
      .catch(err => {
        dispatch({
          type: actionTypes.RESET_PROMOCODE,
        })
        console.error('err', err)
        return err
      })
  }
}

export const createCartSession = (cart, email) => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_REQUEST_SET_SESSION })
    return fetch(`${API_URL}/checkout-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart: cart,
        email: email,
      }),
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.SET_CHECKOUT_SESSION,
            payload: { res },
          })
        }
        return res
      })
      .catch(err => {
        console.error('err', err)
        return err
      })
  }
}

export const updateCartSession = (checkoutSessionId, data, reset) => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_REQUEST_SET_SESSION })
    return fetch(`${API_URL}/checkout-sessions/` + checkoutSessionId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.SET_CHECKOUT_SESSION,
            payload: { res, reset: reset },
          })
        }
        return res
      })
      .catch(err => {
        console.error('err', err)
        return err
      })
  }
}
