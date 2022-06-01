export const getProductPrice = (product, country) => {
  var price =
    country == 'US' && product.country_US
      ? product.price_USD
      : country == 'CA' && product.country_CA
      ? product.price_CAD
      : null
  return price
}
