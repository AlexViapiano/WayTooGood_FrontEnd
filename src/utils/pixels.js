import { APP_URL } from '../../redux/api'

export const addToCart = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq)
    window.fbq('track', 'AddToCart', {
      content_id: options.content_id,
      content_type: 'product',
      currency: 'CAD',
      value: options.value,
    })
  if (window.ttq)
    window.ttq.track('AddToCart', {
      content_id: options.content_id,
      content_name: options.content_name,
    })
  if (window.gtag) window.gtag('event', 'add_to_cart', options)
  if (window.gtag)
    window.gtag('event', 'conversion', { send_to: 'AW-318718181/XQIICI3u6IkDEOWB_ZcB' })
  if (window.pintrk) {
    window.pintrk('track', 'addtocart', {
      value: options.value,
      order_quantity: 1,
      currency: 'CAD',
    })
  }
}

export const viewCart = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq) window.fbq('track', 'Lead', options)
  if (window.ttq) window.ttq.track('ClickButton', options)
  if (window.gtag) window.gtag('event', 'generate_lead', options)
}

export const viewContent = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq) window.fbq('track', 'ViewContent', options)
  if (window.ttq) window.ttq.track('ViewContent', options)
  if (window.gtag) window.gtag('event', 'view_item', options)
}

export const search = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq) window.fbq('track', 'Search', { search: options.content_id })
  if (window.ttq) window.ttq.track('Search', { content_id: options.content_id })
  if (window.gtag) window.gtag('event', 'search', options)
}

export const initiateCheckout = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq) window.fbq('track', 'InitiateCheckout', options)
  if (window.ttq) window.ttq.track('InitiateCheckout', { content_id: null })
  if (window.gtag) window.gtag('event', 'begin_checkout', options)
}

export const addPaymentInfo = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq) window.fbq('track', 'AddPaymentInfo', options)
  if (window.ttq) window.ttq.track('AddPaymentInfo', { content_id: null })
  if (window.gtag) window.gtag('event', 'add_payment_info', options)
}

export const completePayment = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq) window.fbq('track', 'CompletePayment', options)
  if (window.ttq) window.ttq.track('CompletePayment', { content_id: null })
  if (window.gtag) window.gtag('event', 'purchase', options)
  if (window.gtag) {
    gtag('event', 'conversion', {
      send_to: 'AW-318718181/f6ZnCM7U6YkDEOWB_ZcB',
      transaction_id: '',
    })
  }
}

export const viewSubscribe = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq) window.fbq('track', 'FindLocation', options)
  if (window.ttq) window.ttq.track('Download', { content_id: null })
  if (window.gtag) window.gtag('event', 'view_promotion', options)
}

export const subscribe = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq) window.fbq('track', 'Subscribe', options)
  if (window.ttq) window.ttq.track('Subscribe', { content_id: null })
  if (window.gtag) window.gtag('event', 'sign_up', options)
  if (window.pintrk) {
    window.pintrk('track', 'custom', options)
  }
}

export const addToWishlist = (options = {}) => {
  if (APP_URL != 'https://waytoogood.com') return
  if (window.fbq) window.fbq('track', 'AddToWishlist', options)
  if (window.ttq) window.ttq.track('AddToWishlist', { content_id: null })
  if (window.gtag) window.gtag('event', 'add_to_wishlist', options)
}
