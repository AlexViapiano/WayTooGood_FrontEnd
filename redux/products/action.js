import { API_URL } from '../api'
global.fetch = require('node-fetch')
import { diets } from '../../src/common/data.js'

export const actionTypes = {
  REQUEST_PRODUCTS: 'REQUEST_PRODUCTS',
  RECIEVE_PRODUCTS: 'RECIEVE_PRODUCTS',
  REQUEST_SIMILAR_PRODUCTS: 'REQUEST_SIMILAR_PRODUCTS',
  RECIEVE_SIMILAR_PRODUCTS: 'RECIEVE_SIMILAR_PRODUCTS',
  REQUEST_MORE_PRODUCTS: 'REQUEST_MORE_PRODUCTS',
  RECIEVE_MORE_PRODUCTS: 'RECIEVE_MORE_PRODUCTS',
  REFRESH_PRODUCTS: 'REFRESH_PRODUCTS',
  REQUEST_SPONSORED_PRODUCTS: 'REQUEST_SPONSORED_PRODUCTS',
  RECIEVE_SPONSORED_PRODUCTS: 'RECIEVE_SPONSORED_PRODUCTS',
  REQUEST_PRODUCTS_SEARCH: 'REQUEST_PRODUCTS_SEARCH',
  RECIEVE_PRODUCTS_SEARCH: 'RECIEVE_PRODUCTS_SEARCH',

  SET_DIET: 'SET_DIET',
  RESET_DIET: 'RESET_DIET',
  REMOVE_DIET: 'REMOVE_DIET',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_BRAND: 'SET_BRAND',
  SET_SALE: 'SET_SALE',
  SET_VARIETY_PACKS: 'SET_VARIETY_PACKS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_SORT: 'SET_SORT',
  SET_SORT_DIRECTION: 'SET_SORT_DIRECTION',
  SET_VIEW: 'SET_VIEW',
  RESET_START: 'RESET_START',

  REQUEST_REVIEWS: 'REQUEST_REVIEWS',
  RECIEVE_REVIEWS: 'RECIEVE_REVIEWS',
  REQUEST_CREATE_REVIEW: 'REQUEST_CREATE_REVIEW',
  RECIEVE_CREATE_REVIEW: 'RECIEVE_CREATE_REVIEW',
  REQUEST_DELETE_REVIEW: 'REQUEST_DELETE_REVIEW',
  RECIEVE_DELETE_REVIEW: 'RECIEVE_DELETE_REVIEW',
  RECEIVE_ADD_TO_WISHLIST: 'RECEIVE_ADD_TO_WISHLIST',
  REQUEST_ADD_TO_WISHLIST: 'REQUEST_ADD_TO_WISHLIST',
}

export const getProducts = searchText => async (dispatch, getState) => {
  const { session, products } = getState()
  const {
    selectedDiets,
    category,
    brand,
    sale,
    varietyPacks,
    sort,
    sortDirection,
    view,
    start,
  } = products
  const { country, locale } = session
  var params = {}
  if (country != 'CA' && country != 'US') return
  if (country == 'CA') params['country_CA'] = true
  if (country == 'US') params['country_US'] = true
  if (searchText) params['_q'] = searchText
  if (category) params['category.name_contains'] = category
  if (brand) params['brand.name_contains'] = brand
  if (varietyPacks) params['variety_pack'] = true
  if (sale) params['list_price_null'] = false
  if (sort && sortDirection) params['_sort'] = sort + ':' + sortDirection
  if (view) params['_limit'] = view
  if (start) params['_start'] = start.toString()
  params['_locale'] = locale

  var query = Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&')

  var dietParams = ''
  selectedDiets.length > 0 &&
    selectedDiets.forEach(diet => {
      dietParams = dietParams + '&diets_in=' + diet
    })

  dispatch({
    type: actionTypes.REQUEST_PRODUCTS,
    payload: {
      searchText: searchText,
    },
  })
  return fetch(`${API_URL}/products?` + query + dietParams, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(res => {
      if (!res.error && Array.isArray(res)) {
        dispatch({
          type: actionTypes.RECIEVE_PRODUCTS,
          payload: {
            products: res,
            start: view,
          },
        })
      }
      return res
    })
    .catch(err => {
      console.error('err', err)
      return err
    })
}

export const findSimilar = productId => async (dispatch, getState) => {
  const { session, products } = getState()
  const { country, locale } = session
  var params = {}
  if (!productId) return
  params['productId'] = productId
  if (country != 'CA' && country != 'US') return
  if (country == 'CA') params['country_CA'] = true
  if (country == 'US') params['country_US'] = true
  params['_locale'] = locale

  var query = Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&')

  dispatch({ type: actionTypes.REQUEST_SIMILAR_PRODUCTS })
  return fetch(`${API_URL}/find-similar?` + query, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(res => {
      if (!res.error && Array.isArray(res)) {
        dispatch({
          type: actionTypes.RECIEVE_SIMILAR_PRODUCTS,
          payload: {
            products: res,
          },
        })
      }
      return res
    })
    .catch(err => {
      console.error('err', err)
      return err
    })
}

export const refreshProducts = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.REFRESH_PRODUCTS,
    payload: {},
  })
  dispatch(getProducts())
}

export const searchProducts = searchText => async (dispatch, getState) => {
  const { session } = getState()
  const { country, locale } = session
  var params = {}
  if (searchText) params['_q'] = searchText
  if (country != 'CA' && country != 'US') return
  if (country == 'CA') params['country_CA'] = true
  if (country == 'US') params['country_US'] = true
  params['_limit'] = 10
  params['_locale'] = locale

  var query = Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&')

  return fetch(`${API_URL}/searchProducts?` + query, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(res => {
      if (!res.error && Array.isArray(res)) {
        dispatch({
          type: actionTypes.RECIEVE_PRODUCTS_SEARCH,
          payload: {
            products: res,
          },
        })
      }
      return res
    })
    .catch(err => {
      console.error('err', err)
      return err
    })
}

export const setDiet = (diet, reset) => async (dispatch, getState) => {
  const foundDiet = diets.find(_diet => {
    return _diet?.id?.includes(diet[0])
  })
  dispatch({
    type: actionTypes.SET_DIET,
    payload: { diet: diet, reset: reset },
  })
}

export function removeDiet(diet) {
  return {
    type: actionTypes.REMOVE_DIET,
    payload: { diet },
  }
}

export const setCategory = (category, reset) => async (dispatch, getState) => {
  if (category == 'all') category = ''
  dispatch({
    type: actionTypes.SET_CATEGORY,
    payload: { category, reset: reset },
  })
}

export const setBrand = brand => async (dispatch, getState) => {
  if (brand == 'All') brand = ''
  dispatch({
    type: actionTypes.SET_BRAND,
    payload: { brand },
  })
}

export const setSale = sale => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.SET_SALE,
    payload: { sale },
  })
}

export const setVarietyPacks = varietyPacks => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.SET_VARIETY_PACKS,
    payload: { varietyPacks },
  })
}

export function resetFilters() {
  return {
    type: actionTypes.RESET_FILTERS,
    payload: {},
  }
}

export function setSort(sort) {
  return {
    type: actionTypes.SET_SORT,
    payload: { sort },
  }
}

export function setSortDirection(sortDirection) {
  return {
    type: actionTypes.SET_SORT_DIRECTION,
    payload: { sortDirection },
  }
}

export function setView(view) {
  return {
    type: actionTypes.SET_VIEW,
    payload: { view },
  }
}

export const getReviews = (productId, sort, sortDirection, view, start) => {
  var params = {}
  if (productId) params['product'] = productId
  if (sort && sortDirection) params['_sort'] = sort + ':' + sortDirection
  if (view) params['_limit'] = view
  if (start) params['_start'] = start.toString()

  var query = Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&')

  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_REVIEWS })
    return fetch(`${API_URL}/reviews?` + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.RECIEVE_REVIEWS,
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

export const createReview = data => {
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_CREATE_REVIEW })
    var jwt = JSON.parse(localStorage.getItem('jwt'))
    var bearerToken = 'Bearer ' + jwt
    return fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.RECIEVE_CREATE_REVIEW,
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

export const deleteReview = review => {
  const reviewId = review.id
  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_DELETE_REVIEW })
    var jwt = JSON.parse(localStorage.getItem('jwt'))
    var bearerToken = 'Bearer ' + jwt
    return fetch(`${API_URL}/reviews/` + reviewId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.RECIEVE_DELETE_REVIEW,
            payload: { reviewId },
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
export const addToWishlist = productId => {
  alert('Added to Wishlist')

  return dispatch => {
    dispatch({ type: actionTypes.REQUEST_ADD_TO_WISHLIST })
    return fetch(`${API_URL}/wish`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId }),
    })
      .then(response => response.json())
      .then(res => {
        if (!res.error) {
          dispatch({
            type: actionTypes.RECEIVE_ADD_TO_WISHLIST,
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
