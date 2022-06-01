import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import Link from 'next/link'
import AddressForm from './AddressForm'
import ReviewOrder from './ReviewOrder'
import {
  createPaymentIntent,
  createOrder,
  clearCart,
  getTaxRates,
  updateCartSession,
} from '../../../../redux/orders/action'
import Image from 'next/image'
import { getPaymentMethods } from '../../../../redux/session/action'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { updateStripeCustomer } from '../../../../redux/session/action'
var SalesTax = require('sales-tax')
import { verifyAddress } from '../../../utils/verifyAddress'
import { useTranslation } from 'next-i18next'
import * as pixels from '../../../utils/pixels'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    '& text': {
      fill: '#fff',
    },
    '& MuiStepLabel-iconContainer': {
      paddingRight: 5,
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 50,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  paymentMethodsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  newPaymentMethodBtn: {
    margin: '10px 0px 40px 0px',
    width: 250,
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paymentMethodBtn: {
    marginRight: 10,
    marginBottom: 10,
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
  carElement: {
    margin: 10,
    padding: 10,
    border: '1px solid #c4c4c4',
    borderRadius: 5,
  },
  carElementNotAllowed: {
    margin: 10,
    padding: 10,
    border: '1px solid #c4c4c4',
    borderRadius: 5,
    pointerEvents: 'none !important',
    cursor: 'not-allowed !important',
    filter: 'opacity(0.5)',
  },
  container: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container1: { display: 'flex', flexDirection: 'column' },
  imageContainer: {
    minWidth: 200,
    minHeight: 200,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      marginTop: 5,
    },
  },
}))

const steps = ['Address', 'Payment', 'Review']

const Checkout = props => {
  const classes = useStyles()
  const stripe = useStripe()
  const elements = useElements()

  const {
    user,
    cart,
    promoCode,
    setShowCheckout,
    createPaymentIntent,
    stripeCustomer,
    country,
    createOrder,
    clearCart,
    paymentMethods,
    getPaymentMethods,
    updateStripeCustomer,
    getTaxRates,
    utm_source,
    utm_medium,
    utm_campaign,
    checkoutSessionId,
    updateCartSession,
  } = props
  const { t } = useTranslation('cart')

  const [activeStep, setActiveStep] = React.useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('new')
  const [paymentIntent, setPaymentIntent] = useState(null)
  const [order, setOrder] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [shipping_address_line1, setShipping_address_line1] = useState('')
  const [shipping_address_line2, setShipping_address_line2] = useState('')
  const [shipping_city, setShipping_city] = useState('')
  const [shipping_country, setShipping_country] = useState(country)
  const [shipping_state, setShipping_state] = useState('')
  const [shipping_zip, setShipping_zip] = useState('')
  const [billing_address_line1, setBilling_address_line1] = useState('')
  const [billing_address_line2, setBilling_address_line2] = useState('')
  const [billing_city, setBilling_city] = useState('')
  const [billing_country, setBilling_country] = useState(country)
  const [billing_state, setBilling_state] = useState('')
  const [billing_zip, setBilling_zip] = useState('')
  const [salesTaxes, setSalesTaxes] = useState([])
  const [taxRates, setTaxRates] = useState([])
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true)
  const [useAsDefaultAddress, setUseAsDefaultAddress] = useState(true)

  useEffect(() => {
    if (paymentMethods.length == 0 && user && Object.keys(user).length !== 0)
      getPaymentMethods(user.id)
    if (user && user.email) setEmail(user.email)
    if (user && user.first_name) setFirst_name(user.first_name)
    if (user && user.last_name) setLast_name(user.last_name)
    if (user && user.phone_number) setPhone_number(user.phone_number)

    getTaxRates().then(res => {
      const state = stripeCustomer?.shipping?.address?.state
      const taxRates = res.data
      setTaxRates(taxRates)
      setLoading(false)
      if (taxRates && country == 'CA' && state) {
        const stateTaxRates = taxRates.filter(taxRate => taxRate.state == state)
        setSalesTaxes(stateTaxRates)
      }
    })

    if (stripeCustomer && stripeCustomer?.shipping?.address) setUseAsDefaultAddress(false)
  }, [])

  const theme = useTheme()

  const handleBack = () => {
    setError(null)
    if (activeStep == 0) setShowCheckout(false)
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    setError(null)
    var nextStep = activeStep + 1
    if (nextStep == 2) {
      getPaymentIntent()
      pixels.addPaymentInfo({ email: email })
    } else setActiveStep(nextStep)
  }

  const getPaymentIntent = async () => {
    setLoading(true)
    // ---------------------- VALIDATE PRODUCTS & COUNTRY ------------------------------
    var productError = []
    var product_qty = cart.map(product => {
      if ((country == 'US' && product?.country_US) || (country == 'CA' && product?.country_CA))
        return { id: product.id, qty: product.quantity }
      else productError.push(product.name)
    })

    if (productError.length > 0) {
      setError(productError[0] + ' is not sold in your country')
      setLoading(false)
      return
    }

    // -------------------------- CREATE PAYMENT INTENT ------------------------------
    const code = promoCode?.code
    const paymentIntent = await createPaymentIntent(product_qty, country, shipping_state, code)
    if (!paymentIntent.id || paymentIntent.error) {
      var error =
        paymentIntent?.error?.message && typeof paymentIntent?.error?.message == 'string'
          ? paymentIntent.error.message
          : 'An error occured when loading your credit card'
      console.error(error)
      setError(error)
      setLoading(false)
      return
    }

    if (paymentMethod == 'new') {
      const cardElement = elements.getElement(CardElement)

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (error) setError(error?.message)
      else {
        setPaymentIntent(paymentIntent)
        setActiveStep(2)
      }
    } else {
      setPaymentIntent(paymentIntent)
      setActiveStep(2)
    }
    setLoading(false)
  }

  const handleNextAddress = async () => {
    const user = {
      first_name,
      last_name,
      email,
      phone_number,
      shipping_address_line1,
      shipping_address_line2,
      shipping_city,
      shipping_country,
      shipping_state,
      shipping_zip,
    }
    updateCartSession(checkoutSessionId, { user: user, email: email })

    setLoading(true)
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

    if (billingSameAsShipping) {
      setBilling_address_line1(shipping_address_line1)
      setBilling_address_line2(shipping_address_line2)
      setBilling_city(shipping_city)
      setBilling_state(shipping_state)
      setBilling_zip(shipping_zip)
    }

    // --------------------- UPDATE STRIPE CUSTOMER ------------------------
    if (
      user?.id &&
      useAsDefaultAddress &&
      (stripeCustomer?.shipping?.address?.line1 != shipping_address_line1 ||
        stripeCustomer?.shipping?.address?.line2 != shipping_address_line2 ||
        stripeCustomer?.shipping?.address?.city != shipping_city ||
        stripeCustomer?.shipping?.address?.state != shipping_state ||
        stripeCustomer?.shipping?.address?.postal_code != shipping_zip)
    ) {
      const data = {
        shipping: {
          address: {
            city: shipping_city,
            country: shipping_country,
            line1: shipping_address_line1,
            line2: shipping_address_line2,
            postal_code: shipping_zip,
            state: shipping_state,
          },
          name: '',
          phone: '',
        },
      }
      const stripeCustomer = await updateStripeCustomer(user.id, data)
      setLoading(false)
    }

    setError(false)
    setLoading(false)
    setActiveStep(1)
  }

  const handleConfirm = async () => {
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
    setShipping_address_line1(verified_shipping_address_line1)
    setShipping_city(verified_shipping_city)
    setShipping_state(verified_shipping_state)
    setShipping_zip(verified_shipping_zip)
    setConfirm(null)
    if (billingSameAsShipping) {
      setBilling_address_line1(shipping_address_line1)
      setBilling_address_line2(shipping_address_line2)
      setBilling_city(shipping_city)
      setBilling_state(shipping_state)
      setBilling_zip(shipping_zip)
    }
    setActiveStep(1)
  }

  const handleSkip = async () => {
    setConfirm(null)
    handleNext()
  }

  const placeOrder = async () => {
    setLoading(true)
    const cardPayment = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      payment_method:
        paymentMethod == 'new'
          ? {
              card: elements.getElement(CardElement),
              billing_details: {
                address: {
                  city: billingSameAsShipping ? shipping_city : billing_city,
                  country: billingSameAsShipping ? shipping_country : billing_country,
                  line1: billingSameAsShipping ? shipping_address_line1 : billing_address_line1,
                  line2: billingSameAsShipping ? shipping_address_line2 : billing_address_line2,
                  postal_code: billingSameAsShipping ? shipping_zip : billing_zip,
                  state: billingSameAsShipping ? shipping_state : billing_state,
                },
              },
            }
          : paymentMethod.id,
      setup_future_usage: paymentMethod == 'new' ? 'off_session' : null,
      receipt_email: user.email,
    })
    if (cardPayment?.error?.code == 'incomplete_zip') handleBack()
    if (cardPayment?.error) {
      var error =
        cardPayment.error?.message && typeof cardPayment.error?.message == 'string'
          ? cardPayment.error.message
          : cardPayment.error && typeof cardPayment.error == 'string'
          ? cardPayment.error
          : typeof cardPayment == 'string'
          ? cardPayment
          : 'An error occured when loading your credit card'
      console.error(cardPayment.error)
      setError(error)
      setLoading(false)
      return
    }

    const sanitizedCard = cart.map(product => {
      return { id: product.id, qty: product.quantity }
    })

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

    const data = {
      paymentIntentId: cardPayment.paymentIntent.id,
      cart: sanitizedCard,
      code: promoCode?.code,
      shipping_address: {
        shipping_address_line1,
        shipping_address_line2,
        shipping_city,
        shipping_country,
        shipping_state,
        shipping_zip,
      },
      billing_address: {
        billing_address_line1,
        billing_address_line2,
        billing_city,
        billing_country,
        billing_state,
        billing_zip,
      },
      customer_details: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
      },
      utm: {
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign,
      },
      affiliate: affiliate,
    }
    createOrder(data).then(res => {
      var items = res.product_qty.map(item => {
        return {
          id: item.id,
          name: item.name,
          quantity: item.qty,
          price: item.price,
          // "list_name": "Search Results",
          // "brand": "Google",
          // "category": "Apparel/T-Shirts",
          // "variant": "Black",
          // "list_position": 1,
        }
      })

      pixels.completePayment({
        transaction_id: res?.id,
        email: res?.email,
        promo_code: res?.promo_code,
        shipping: res?.shipping_fee,
        tax: res?.taxes,
        value: res?.total,
        currency: 'CAD',
        affiliation:
          res?.utm_medium || res?.utm_medium ? res?.utm_medium + '-' + res?.utm_source : null,
        items: items,
      })

      updateCartSession(checkoutSessionId, { complete: true, order: res.id }, true)

      if (res.id) {
        clearCart()
        setOrder(res)
        setLoading(false)
        handleNext()
      } else {
        var error =
          res.error?.message && typeof res.error?.message == 'string'
            ? res.error.message
            : res.error && typeof res.error == 'string'
            ? res.error
            : typeof res == 'string'
            ? res
            : 'An error occured while placing the order'
        console.error(res)
        setError(error)
        setLoading(false)
      }
    })
  }

  const isBillingInfoInvalid = () => {
    if (billingSameAsShipping) return false
    else
      return (
        !billing_address_line1 ||
        !billing_city ||
        !billing_country ||
        !billing_state ||
        !billing_zip ||
        billing_country == 'US'
      )
  }

  const isShippingInfoInvalid = () => {
    return (
      !shipping_address_line1 ||
      !shipping_city ||
      !shipping_country ||
      !shipping_state ||
      !shipping_zip ||
      shipping_country == 'US'
    )
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          {t('checkout')}
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* ---------- Display Stripe Card Element or Saved Payment Method ---------- */}
        {(activeStep === 1 || activeStep === 2) && (
          <>
            <Typography variant="h6">{t('payment-method')}</Typography>
            <Typography variant="subtitle1">
              Enter your <b>card details</b> and <b>postal code</b> below!
            </Typography>
            <br></br>
            {paymentMethod == 'new' ? (
              <div className={activeStep === 2 ? classes.carElementNotAllowed : classes.carElement}>
                <CardElement
                  options={{
                    iconStyle: 'solid',
                    style: {
                      base: {
                        margin: '24px 12px',
                        fontSize: '16px',
                        iconColor: '#c4f0ff',
                        fontWeight: 500,
                        fontFamily: 'Lato, Open Sans, Segoe UI, sans-serif',
                        fontSize: '16px',
                        fontSmoothing: 'antialiased',
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <Button
                key={paymentMethod.id}
                className={classes.paymentMethodBtn}
                variant="contained"
                color="primary"
                size="small"
                disabled
              >
                {paymentMethod.card.brand} {t('ending-in')}
                {paymentMethod.card.last4}
              </Button>
            )}
          </>
        )}
        {/* ------------------------------------------------------------------------- */}

        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : activeStep === 0 ? (
          <AddressForm
            setError={setError}
            confirm={confirm}
            setActiveStep={setActiveStep}
            country
            first_name={first_name}
            setFirst_name={setFirst_name}
            last_name={last_name}
            setLast_name={setLast_name}
            phone_number={phone_number}
            setPhone_number={setPhone_number}
            email={email}
            setEmail={setEmail}
            emailIsValid={emailIsValid}
            setEmailIsValid={setEmailIsValid}
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
            useAsDefaultAddress={useAsDefaultAddress}
            setUseAsDefaultAddress={setUseAsDefaultAddress}
            billingSameAsShipping={billingSameAsShipping}
            setBillingSameAsShipping={setBillingSameAsShipping}
            billing_address_line1={billing_address_line1}
            setBilling_address_line1={setBilling_address_line1}
            billing_address_line2={billing_address_line2}
            setBilling_address_line2={setBilling_address_line2}
            billing_city={billing_city}
            setBilling_city={setBilling_city}
            billing_state={billing_state}
            setBilling_state={setBilling_state}
            billing_country={billing_country}
            setBilling_country={setBilling_country}
            billing_zip={billing_zip}
            setBilling_zip={setBilling_zip}
            taxRates={taxRates}
            setTaxRates={setTaxRates}
            setSalesTaxes={setSalesTaxes}
          />
        ) : activeStep === 1 && paymentMethods.length > 0 ? (
          <div className={classes.paymentMethodsContainer}>
            <Button
              className={classes.newPaymentMethodBtn}
              onClick={() => setPaymentMethod('new')}
              color={paymentMethod == 'new' ? 'primary' : 'default'}
              variant={paymentMethod == 'new' ? 'contained' : 'outlined'}
              size="small"
            >
              {t('new-card')}
            </Button>
            <div className={classes.cardsContainer}>
              {paymentMethods.map(availiblePaymentMethod => {
                return (
                  <Button
                    key={availiblePaymentMethod.id}
                    className={classes.paymentMethodBtn}
                    onClick={() => setPaymentMethod(availiblePaymentMethod)}
                    variant={availiblePaymentMethod == paymentMethod ? 'contained' : 'outlined'}
                    color={availiblePaymentMethod == paymentMethod ? 'primary' : 'default'}
                    size="large"
                  >
                    {availiblePaymentMethod.card.brand} {t('ending-in')}{' '}
                    {availiblePaymentMethod.card.last4}
                  </Button>
                )
              })}
            </div>
          </div>
        ) : activeStep === 2 ? (
          <ReviewOrder
            shipping_address_line1={shipping_address_line1}
            shipping_address_line2={shipping_address_line2}
            shipping_city={shipping_city}
            shipping_country={shipping_country}
            shipping_state={shipping_state}
            shipping_zip={shipping_zip}
            cart={cart}
            country={country}
            salesTaxes={salesTaxes}
            promoCode={promoCode}
          />
        ) : activeStep === 3 ? (
          <React.Fragment>
            <div className={classes.container}>
              <div className={classes.container1}>
                <Typography variant="h5" gutterBottom>
                  {t('thank-you')}
                </Typography>
                <Typography variant="subtitle1">
                  {t('order-number')}
                  {order.id}. {t('confirmation')}
                </Typography>
                <div>
                  <Link href={'/'}>
                    <Button color="default" variant="contained" className={classes.button}>
                      {t('home')}
                    </Button>
                  </Link>

                  {user && Object.keys(user).length !== 0 && (
                    <Link href={'/account/orders'}>
                      <a>
                        <Button color="default" variant="contained" className={classes.button}>
                          Orders
                        </Button>
                      </a>
                    </Link>
                  )}
                  <Link
                    href={`https://docs.google.com/forms/d/e/1FAIpQLSe7dXYWG9_4apb4WtOnPeU3UtRNEqhZYpCzHj1cTac6gUawjw/viewform?entry.683757764=${order.id}`}
                  >
                    <a target="_blank">
                      <Button color="default" variant="contained" className={classes.button}>
                        Survey
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
              <div className={classes.imageContainer}>
                <Image
                  src="/images/illustrations/order-confirmed.png"
                  loading="lazy"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </React.Fragment>
        ) : null}

        {error != null && typeof error == 'string' && (
          <div className={classes.errorContainer}>{error}</div>
        )}

        <div className={classes.buttons}>
          {activeStep !== 3 && !loading && (
            <Button onClick={handleBack} variant="contained" className={classes.button}>
              {t('back')}
            </Button>
          )}

          {activeStep === 2 && !loading ? (
            <Button
              variant="contained"
              color="primary"
              onClick={placeOrder}
              className={classes.button}
              disabled={!paymentMethod}
            >
              {t('place-order')}
            </Button>
          ) : confirm && !loading ? (
            <>
              <Button variant="contained" onClick={handleSkip} className={classes.button}>
                Skip
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirm}
                className={classes.button}
              >
                {t('confirm')}
              </Button>
            </>
          ) : activeStep !== 3 && !loading ? (
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep == 0 ? handleNextAddress : handleNext}
              className={classes.button}
              disabled={
                !email || !emailIsValid || isShippingInfoInvalid() || isBillingInfoInvalid()
              }
            >
              {t('next')}
            </Button>
          ) : null}
        </div>
      </Paper>
    </main>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
  cart: state.orders.cart,
  stripeCustomer: state.session.stripeCustomer,
  country: state.session.country,
  paymentMethods: state.session.paymentMethods,
  promoCode: state.orders.promoCode,
  utm_source: state.session.utm_source,
  utm_medium: state.session.utm_medium,
  utm_campaign: state.session.utm_campaign,
  checkoutSessionId: state.orders.checkoutSessionId,
})

const mapDispatchToProps = dispatch => ({
  clearCart: () => {
    dispatch(clearCart())
  },
  createPaymentIntent: (cart, country, state, code) => {
    return dispatch(createPaymentIntent(cart, country, state, code))
  },
  createOrder: data => {
    return dispatch(createOrder(data))
  },
  getPaymentMethods: userId => {
    return dispatch(getPaymentMethods(userId))
  },
  updateStripeCustomer: (userId, data) => {
    return dispatch(updateStripeCustomer(userId, data))
  },
  getTaxRates: () => {
    return dispatch(getTaxRates())
  },
  updateCartSession: (checkoutSessionId, data, reset) => {
    return dispatch(updateCartSession(checkoutSessionId, data, reset))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
