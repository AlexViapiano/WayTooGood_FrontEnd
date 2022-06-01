import { getProductPrice } from './getProductPrice'

export const subtotal = (cart, country, filterTaxExampt) => {
  const subtotal = cart
    .map(product => {
      if (filterTaxExampt && product.tax_exempt) return 0
      var price = getProductPrice(product, country)
      return price * product.quantity
    })
    .reduce((sum, i) => sum + i, 0)
  return subtotal
}

export const calcPromoCode = (subtotal, promoCode) => {
  const coupon = promoCode?.coupon
  if (coupon?.amount_off) {
    const amount_off = coupon?.amount_off / 100
    subtotal = subtotal - amount_off
  } else if (coupon?.percent_off) {
    const amount_off = subtotal * (coupon?.percent_off / 100)
    subtotal = subtotal - amount_off
  }
  return subtotal
}

export const shippingFeeIncluded = (cart, country) => {
  var direct_subtotal = cart
    .map(product => {
      if (!product.direct_shipping && !product.frozen) {
        const price = getProductPrice(product, country)
        return price * product.quantity
      } else return 0
    })
    .reduce((sum, i) => sum + i, 0)
  if (direct_subtotal > 0 && direct_subtotal < 50) return true
  else return false
}
