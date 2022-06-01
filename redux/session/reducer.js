import { actionTypes } from './action'

const initialState = {
  locale: 'en',
  user: {},
  userLoading: false,
  jwt: '',
  stripeCustomer: {},
  subscriptions: null,
  country: 'CA',
  customerCards: [],
  paymentMethods: [],
  popupTriggered: false,
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_LOCALE:
      return {
        ...state,
        locale: action.payload.locale,
      }
    case actionTypes.CHANGE_DELIVERY_COUNTRY:
      return {
        ...state,
        country: action.payload.country,
      }
    case actionTypes.REQUEST_GET_USER:
      return {
        ...state,
        userLoading: true,
      }
    case actionTypes.RECIEVE_GET_USER:
      return {
        ...state,
        user: action.payload.res.user,
        userLoading: false,
      }
    case actionTypes.RECIEVE_UPDATE_USER:
      return {
        ...state,
        user: action.payload.res.user,
      }
    case actionTypes.RECIEVE_LOGIN:
      return {
        ...state,
        user: action.payload.res.user,
        jwt: action.payload.res.jwt,
      }
    case actionTypes.RECIEVE_SIGNUP:
      return {
        ...state,
        user: action.payload.res.user,
        jwt: action.payload.res.jwt,
      }
    case actionTypes.RECIEVE_RESET_PASSWORD:
      return {
        ...state,
        user: action.payload.res.user,
        jwt: action.payload.res.jwt,
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: {},
        jwt: '',
        stripeCustomer: {},
        customerCards: [],
        paymentMethods: [],
      }
    case actionTypes.RECIEVE_GET_STRIPE_CUSTOMER:
      return {
        ...state,
        stripeCustomer: action.payload.res,
      }
    case actionTypes.RECIEVE_CREATE_STRIPE_CUSTOMER:
      return {
        ...state,
        stripeCustomer: action.payload.res,
      }
    case actionTypes.RECIEVE_UPDATE_STRIPE_CUSTOMER:
      return {
        ...state,
        stripeCustomer: action.payload.res,
      }
    case actionTypes.RECIEVE_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload.res,
      }
    case actionTypes.RECIEVE_CUSTOMER_CARDS:
      return {
        ...state,
        customerCards: action.payload.res.data,
      }
    case actionTypes.RECIEVE_PAYMENT_METHODS:
      return {
        ...state,
        paymentMethods: action.payload.res.data,
      }
    case actionTypes.SET_POPUP_TRIGGERED:
      return {
        ...state,
        popupTriggered: true,
      }
    case actionTypes.SET_UTM:
      return {
        ...state,
        utm_source: action.data.utm_source,
        utm_medium: action.data.utm_medium,
        utm_campaign: action.data.utm_campaign,
      }
    case actionTypes.SET_IS_IN_QC_OR_ON:
      return {
        ...state,
        isInQCorON: action.payload.isInQCorON,
      }
    default:
      return state
  }
}
