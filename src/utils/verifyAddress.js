// GOOGLE GEOCODE
import Geocode from 'react-geocode'
Geocode.setApiKey('AIzaSyA432aPRBMyTi-rTZTu1eIKF4jgND-6JYM')
Geocode.setLanguage('en')
// Geocode.setLocationType("ROOFTOP");
// Geocode.enableDebug();

export const verifyAddress = async (
  shipping_address_line1,
  shipping_address_line2,
  shipping_city,
  shipping_country,
  shipping_state,
  shipping_zip
) => {
  var verified_shipping_address_line1
  var verified_shipping_city
  var verified_shipping_country
  var verified_shipping_state
  var verified_shipping_zip

  try {
    var response = await Geocode.fromAddress(
      shipping_address_line1 +
        ' ' +
        shipping_address_line2 +
        ' ' +
        shipping_city +
        ' ' +
        shipping_country +
        ' ' +
        shipping_state +
        ' ' +
        shipping_zip
    )
    var address_line1 = []
    response.results[0].address_components.forEach(address_component => {
      if (
        address_component.types.includes('street_number') ||
        address_component.types.includes('route')
      )
        address_line1.push(address_component.short_name)

      if (address_component.types.includes('locality'))
        verified_shipping_city = address_component.short_name

      if (address_component.types.includes('administrative_area_level_1'))
        verified_shipping_state = address_component.short_name

      if (address_component.types.includes('country')) {
        verified_shipping_country = address_component.short_name
      }

      if (address_component.types.includes('postal_code'))
        verified_shipping_zip = address_component.short_name

      if (
        address_component.types.includes('sublocality') ||
        address_component.types.includes('sublocality_level_1') ||
        address_component.types.includes('political')
      ) {
        if (!verified_shipping_city) verified_shipping_city = address_component.short_name
      }
    })

    if (address_line1.length > 0) verified_shipping_address_line1 = address_line1.join(' ')

    // if (
    //   !verified_shipping_address_line1 ||
    //   !verified_shipping_city ||
    //   !verified_shipping_country ||
    //   !verified_shipping_state ||
    //   !verified_shipping_zip
    // ) {
    //   return {
    //     error: 'Your address is invalid',
    //   }
    // }

    if (
      verified_shipping_address_line1 != shipping_address_line1 ||
      verified_shipping_city != shipping_city ||
      verified_shipping_country != shipping_country ||
      verified_shipping_state != shipping_state ||
      verified_shipping_zip != shipping_zip
    ) {
      return {
        confirm: {
          verified_shipping_address_line1,
          shipping_address_line2,
          verified_shipping_city,
          verified_shipping_country,
          verified_shipping_state,
          verified_shipping_zip,
        },
      }
    }
    return true
  } catch (err) {
    console.error(err)
    return
  }
}
