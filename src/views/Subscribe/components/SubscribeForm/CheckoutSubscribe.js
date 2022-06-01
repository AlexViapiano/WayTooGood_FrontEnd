import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import { createCheckoutSession } from '../../../../../redux/session/action'
import { verifyAddress } from '../../../../utils/verifyAddress'
import AddressFormSubscribe from './AddressFormSubscribe'
import getStripe from '../../../../utils/getStripejs'
import * as pixels from '../../../../utils/pixels'
import { useTranslation } from 'next-i18next'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '30px 0px',
    width: '100%',
    '& div': {
      width: '100%',
    },
  },
  errorContainer: {
    color: '#fff',
    background: theme.palette.error.main,
    margin: 10,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
    fontWeight: 900,
    fontSize: 16,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const Checkout = props => {
  const classes = useStyles()
  const { t } = useTranslation('subscribe')

  const { user, price, stripeCustomer, country, createCheckoutSession } = props

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [shipping_address_line1, setShipping_address_line1] = useState('')
  const [shipping_address_line2, setShipping_address_line2] = useState('')
  const [shipping_city, setShipping_city] = useState('')
  const [shipping_country, setShipping_country] = useState(country)
  const [shipping_state, setShipping_state] = useState('')
  const [shipping_zip, setShipping_zip] = useState('')
  const [diet, setDiet] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [gift, setGift] = useState(false)
  const [giftTo, setGiftTo] = useState('')

  useEffect(() => {
    if (stripeCustomer != null) {
      setShipping_address_line1(stripeCustomer?.shipping?.address?.line1)
      setShipping_address_line2(stripeCustomer?.shipping?.address?.line2)
      setShipping_city(stripeCustomer?.shipping?.address?.city)
      setShipping_state(stripeCustomer?.shipping?.address?.state)
      setShipping_zip(stripeCustomer?.shipping?.address?.postal_code)
    }
  }, [stripeCustomer])

  const onClickNext = async view => {
    setLoading(true)

    // ---------- WAYTOOGOOD CLOSED ---------
    alert('The WBOX is unavailable until further notice.')
    return

    // -------------------------- VERIFY ADDRESS ----------------------------
    const verified = await verifyAddress(
      shipping_address_line1,
      shipping_address_line2,
      shipping_city,
      shipping_country,
      shipping_state,
      shipping_zip
    )

    if (verified.error) {
      setError(verified.error)
      setLoading(false)
      return
    }
    if (verified.confirm) {
      setError(null)
      setConfirm(verified.confirm)
      setLoading(false)
      return
    }

    // ----------- FIND AFFILIATE IN COOKIES ---------------
    var affiliate
    const affiliateStr = localStorage.getItem('affiliate')
    if (affiliateStr) {
      const affiliateCookie = JSON.parse(affiliateStr)
      if (moment(affiliateCookie.expiry).isBefore()) {
        localStorage.removeItem('affiliate')
        return null
      } else affiliate = affiliateCookie.value
    }

    const metadata = {
      line1: shipping_address_line1,
      line2: shipping_address_line2,
      city: shipping_city,
      state: shipping_state,
      country: shipping_country,
      postal_code: shipping_zip,
      diet: diet,
      email: user?.email,
      phone_number: user?.phone_number,
      name: user?.first_name + ' ' + user?.last_name,
      gift_to: giftTo,
      affiliate: affiliate,
    }

    pixels.subscribe({
      email: user.email,
    })

    const session = await createCheckoutSession(user.id, price, metadata, quantity, [], affiliate)
    const stripe = await getStripe()
    stripe.redirectToCheckout({
      sessionId: session.id,
    })
  }

  const handleConfirm = async () => {
    // ---------- WAYTOOGOOD CLOSED ---------
    alert('The WBOX is unavailable until further notice.')
    return

    const {
      verified_shipping_address_line1,
      verified_shipping_city,
      verified_shipping_country,
      verified_shipping_state,
      verified_shipping_zip,
    } = confirm
    if (verified_shipping_country != 'CA') {
      setError(`We currently only ship to Canada`)
      setConfirm(null)
      return
    }

    // ----------- FIND AFFILIATE IN COOKIES ---------------
    var affiliate
    const affiliateStr = localStorage.getItem('affiliate')
    if (affiliateStr) {
      const affiliateCookie = JSON.parse(affiliateStr)
      if (moment(affiliateCookie.expiry).isBefore()) {
        localStorage.removeItem('affiliate')
        return null
      } else affiliate = affiliateCookie.value
    }

    const metadata = {
      line1: verified_shipping_address_line1,
      line2: shipping_address_line2,
      city: verified_shipping_city,
      state: verified_shipping_state,
      country: verified_shipping_country,
      postal_code: verified_shipping_zip,
      diet: diet,
      email: user?.email,
      phone_number: user?.phone_number,
      name: user?.first_name + ' ' + user?.last_name,
      gift_to: giftTo,
      affiliate: affiliate,
    }

    const session = await createCheckoutSession(user.id, price, metadata, quantity, [], affiliate)
    const stripe = await getStripe()
    stripe.redirectToCheckout({
      sessionId: session.id,
    })
  }

  const handleSkip = async () => {
    // ---------- WAYTOOGOOD CLOSED ---------
    alert('The WBOX is unavailable until further notice.')
    return

    if (shipping_country != 'CA') {
      setError(`We currently only ship to Canada`)
      setConfirm(null)
      return
    }

    // ----------- FIND AFFILIATE IN COOKIES ---------------
    var affiliate
    const affiliateStr = localStorage.getItem('affiliate')
    if (affiliateStr) {
      const affiliateCookie = JSON.parse(affiliateStr)
      if (moment(affiliateCookie.expiry).isBefore()) {
        localStorage.removeItem('affiliate')
        return null
      } else affiliate = affiliateCookie.value
    }

    const metadata = {
      line1: shipping_address_line1,
      line2: shipping_address_line2,
      city: shipping_city,
      state: shipping_state,
      country: shipping_country,
      postal_code: shipping_zip,
      diet: diet,
      email: user?.email,
      phone_number: user?.phone_number,
      name: user?.first_name + ' ' + user?.last_name,
      gift_to: giftTo,
      affiliate: affiliate,
    }

    const session = await createCheckoutSession(user.id, price, metadata, quantity, [], affiliate)
    const stripe = await getStripe()
    stripe.redirectToCheckout({
      sessionId: session.id,
    })
  }

  const isShippingInfoInvalid = () => {
    return (
      !shipping_address_line1 ||
      !shipping_city ||
      !shipping_country ||
      !shipping_state ||
      !shipping_zip ||
      shipping_zip.length < 6 ||
      shipping_country == 'US'
    )
  }

  return (
    <div>
      <AddressFormSubscribe
        setError={setError}
        confirm={confirm}
        country
        shipping_address_line1={shipping_address_line1}
        setShipping_address_line1={setShipping_address_line1}
        shipping_address_line2={shipping_address_line2}
        setShipping_address_line2={setShipping_address_line2}
        shipping_city={shipping_city}
        setShipping_city={setShipping_city}
        shipping_country={shipping_country}
        setShipping_country={setShipping_country}
        shipping_state={shipping_state}
        setShipping_state={setShipping_state}
        shipping_zip={shipping_zip}
        setShipping_zip={setShipping_zip}
        diet={diet}
        setDiet={setDiet}
        quantity={quantity}
        setQuantity={setQuantity}
        gift={gift}
        setGift={setGift}
        giftTo={giftTo}
        setGiftTo={setGiftTo}
      />
      {error != null && typeof error == 'string' && (
        <div className={classes.errorContainer}>{error}</div>
      )}
      {confirm && !loading ? (
        <center>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            className={classes.button}
          >
            {t('confirm')}
          </Button>
          <br /> <br />
          <Button
            size="small"
            variant="outlined"
            onClick={() => setConfirm(null)}
            className={classes.button}
          >
            {t('back')}
          </Button>
          <Button size="small" variant="outlined" onClick={handleSkip} className={classes.button}>
            {t('save-unverified-address')}
          </Button>
          <br /> <br />
          <Typography variant="subtitle1">{t('verify-address-error')}</Typography>
          <Typography variant="subtitle2">
            {shipping_address_line1 +
              ', ' +
              (shipping_address_line2 ? shipping_address_line2 + ', ' : '') +
              shipping_city +
              ', ' +
              shipping_country +
              ', ' +
              shipping_state +
              ', ' +
              shipping_zip}
          </Typography>
          <br />
        </center>
      ) : !loading ? (
        <div className={classes.buttonContainer}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => onClickNext()}
            className={classes.button}
            disabled={isShippingInfoInvalid() || !price}
          >
            {t('next')}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
  stripeCustomer: state.session.stripeCustomer,
  country: state.session.country,
})

const mapDispatchToProps = dispatch => ({
  createCheckoutSession: (userId, subscriptionPrice, metadata, quantity, tax_rates, affiliate) => {
    return dispatch(
      createCheckoutSession(userId, subscriptionPrice, metadata, quantity, tax_rates, affiliate)
    )
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
