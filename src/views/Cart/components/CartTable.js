import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import {
  Button,
  LinearProgress,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import { SectionHeader } from 'components/molecules'
import Close from '@material-ui/icons/Close'
import Checkout from './Checkout.js'
import { connect } from 'react-redux'
import {
  createOrderCheckoutSession,
  updateCart,
  getPromoCode,
  createCartSession,
  updateCartSession,
} from '../../../../redux/orders/action'
import Link from 'next/link'
import { Elements } from '@stripe/react-stripe-js'
import getStripe from '../../../utils/getStripejs'
import { getProductPrice } from '../../../utils/getProductPrice'
import { subtotal, calcPromoCode, shippingFeeIncluded } from '../../../utils/subtotal'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import * as pixels from '../../../utils/pixels'
import moment from 'moment'
import Geocode from 'react-geocode'
Geocode.setApiKey('AIzaSyA432aPRBMyTi-rTZTu1eIKF4jgND-6JYM')
Geocode.setLanguage('en')

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 500,
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
  descriptionCta: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  tablesContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cartBasicTableContainer: {
    marginBottom: 20,
    maxWidth: 750,
  },
  cartDirectTableContainer: {
    marginBottom: 20,
    maxWidth: 750,
    background: '#faf4e5',
    '& td': {
      borderColor: '#e0e0e0',
    },
    // background: '#fafafa',
  },
  cartTotalTableContainer: {
    maxWidth: 450,
    marginBottom: 20,
  },
  table: {
    minWidth: 300,
  },
  tableHead: {
    '& th': {
      borderColor: '#e0e0e0',
    },
  },
  tableRow: {
    '& td': {
      padding: 8,
    },
    [theme.breakpoints.down('xs')]: {
      '& td': {
        padding: '8px 4px',
      },
    },
    '& input': {
      background: '#fff',
    },
  },
  fixedWidth: {
    width: 58,
  },
  close: {
    width: 45,
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none',
    // },
    '& svg': {
      '&:hover': {
        color: '#fff',
        background: theme.palette.secondary.main,
        borderRadius: 25,
        cursor: 'pointer',
      },
    },
  },
  amountToAdd: {
    '& .MuiOutlinedInput-input': {
      padding: '5px 0px',
      width: 50,
      height: 20,
      textAlign: 'center',
    },
  },
  productContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(0.95)',
      transition: 'all .2s ease-in-out',
    },
  },
  productImageContainer: {
    position: 'relative',
    height: 60,
    width: 60,
    marginRight: '10px !important',
    '& img': {
      borderRadius: 10,
    },
  },
  productName: {},
  priceSlash: {
    textDecoration: 'line-through',
  },
  shippingFeeWarningContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '10px',
    background: '#fff0d9',
  },
  shippingFeeSuccessContainer: {
    background: '#eaf3cf',
    '& p': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
    },
    '& svg': {
      marginLeft: 10,
    },
  },
  shippingFeeProgessContainer: {
    width: 300,
    display: 'flex',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: 700,
  },
  totalPriceText: {
    fontWeight: 750,
  },
  buttonContainer: {
    display: 'flex',
  },
  guestBtn: {
    marginLeft: 10,
  },
  emptyCartContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  emptyCart: {
    fontSize: 20,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    marginTop: 50,
  },
  coupon: {
    '& .MuiOutlinedInput-input': {
      padding: 5,
      width: 100,
      height: 20,
      textAlign: 'center',
    },
  },
  successCoupon: {
    '& .MuiOutlinedInput-input': {
      padding: 5,
      width: 100,
      height: 20,
      textAlign: 'center',
    },
    '& fieldset': {
      border: '2px solid #a0c037',
    },
  },

  button: {
    marginLeft: theme.spacing(1),
  },
}))

const CartTable = props => {
  const {
    user,
    cart,
    country,
    createOrderCheckoutSession,
    updateCart,
    promoCode,
    getPromoCode,
    checkoutSessionId,
    createCartSession,
    updateCartSession,
    className,
    ...rest
  } = props
  const classes = useStyles()
  const { t } = useTranslation('cart')

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))
  const [showCheckout, setShowCheckout] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [checkoutSessionCreated, setCheckoutSessionCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const session_cart = cart.map(product => {
      return {
        id: product.id,
        name: product.name,
        qty: product.quantity,
        image: product.media[0].formats?.thumbnail?.url,
      }
    })

    if (checkoutSessionId == null && checkoutSessionCreated == false) {
      setCheckoutSessionCreated(true)
      createCartSession(session_cart, user.email)
    } else {
      updateCartSession(checkoutSessionId, { cart: session_cart, email: user.email })
    }

    // if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      try {
        Geocode.fromLatLng(
          position.coords.latitude.toString(),
          position.coords.longitude.toString()
        ).then(
          response => {
            let state
            for (let i = 0; i < response.results[0].address_components.length; i++) {
              for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                switch (response.results[0].address_components[i].types[j]) {
                  case 'administrative_area_level_1':
                    state = response.results[0].address_components[i].long_name
                    break
                }
              }
            }
            localStorage.setItem('isInQCorON', state == 'Québec' || state == 'Ontario')
            return
          },
          error => {
            console.error(error)
          }
        )
      } catch (err) {
        console.error(err)
      }
    })
    // } else {
    //   console.log('Geolocation Not Available')
    // }
  }, [])

  const onChangeProductAmount = (product, qty) => {
    if (product.inventory < qty || qty == 0) return
    updateCart(product, qty)
  }

  const onClickApplyCoupon = async () => {
    await getPromoCode(couponCode)
    setCouponApplied(true)
  }

  const initiateCheckout = async () => {
    setIsLoading(true)

    // ---------- WAYTOOGOOD CLOSED ---------
    alert('The marketplace is unavailable until further notice.')
    return

    // OLD CHECKOUT SESSION
    // setShowCheckout(true)

    pixels.initiateCheckout()
    updateCartSession(checkoutSessionId, { initiate_checkout: true })

    var product_qty = cart.map(product => {
      if ((country == 'US' && product?.country_US) || (country == 'CA' && product?.country_CA))
        return { id: product.id, qty: product.quantity }
      else productError.push(product.name)
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

    var isInQCorON = localStorage.getItem('isInQCorON')

    // NEW CHECKOUT SESSION
    const session = await createOrderCheckoutSession(product_qty, affiliate, isInQCorON)
    const stripe = await getStripe()
    stripe.redirectToCheckout({
      sessionId: session.id,
    })
  }

  const basic_cart = cart.filter(product => !product.direct_shipping && !product.frozen)
  const direct_cart = cart.filter(product => product.direct_shipping || product.frozen)

  const basic_subtotal = subtotal(basic_cart, country)
  var order_subtotal = subtotal(cart, country)
  const shipping_fee_included = shippingFeeIncluded(cart, country)
  // if (shipping_fee_included) order_subtotal = order_subtotal + 15
  const shippingProgress = Math.trunc((basic_subtotal / 50) * 100)
  const amountRemaining = (50 - basic_subtotal).toFixed(2)

  // console.log('isInQCorON', localStorage.getItem('isInQCorON'))

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {showCheckout ? (
        <div className={clsx(classes.root, className)} {...rest}>
          {/* <Elements stripe={getStripe()}>
            <Checkout setShowCheckout={setShowCheckout} />
          </Elements> */}
        </div>
      ) : cart.length == 0 ? (
        <div className={classes.emptyCartContainer}>
          <div className={classes.emptyCart}>{t('cart-empty')}</div>
          <Link href={'/products'}>
            <a>
              <Button color="primary" variant="contained" className={classes.button} size="large">
                {t('start-shopping')}
              </Button>
            </a>
          </Link>
          <div className={classes.imageContainer}>
            <Image
              src="/images/illustrations/undraw_empty_cart.svg"
              alt="Cart Empty"
              loading="lazy"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      ) : (
        <>
          <SectionHeader title={<span className={classes.title}>{t('shopping-cart')}</span>} />
          <div className={classes.tablesContainer}>
            {direct_cart.length > 0 && (
              <TableContainer className={classes.cartDirectTableContainer} component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                  <TableHead className={classes.tableHead}>
                    <TableRow>
                      <TableCell className={classes.close} align="left"></TableCell>
                      <TableCell>{t('products')}</TableCell>
                      <TableCell className={classes.fixedWidth} align="right">
                        {t('quantity')}
                      </TableCell>
                      {isSm && (
                        <TableCell className={classes.fixedWidth} align="right">
                          {t('unit')}
                        </TableCell>
                      )}
                      <TableCell className={classes.fixedWidth} align="right">
                        {t('price')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {direct_cart.map(product => {
                      var price = getProductPrice(product, country)

                      let mediaUrl = product?.media[0]?.formats?.thumbnail?.url
                        ? product.media[0].formats.thumbnail.url
                        : product?.media[0]?.url
                        ? product.media[0].url
                        : product?.media
                      return (
                        <TableRow key={product.id} className={classes.tableRow}>
                          <TableCell className={classes.close} align="left">
                            <Close onClick={() => updateCart(product, 0)} />
                          </TableCell>
                          <Link href="/products/[url]" as={`/products/${product.url}`}>
                            <TableCell>
                              <div className={classes.productContainer}>
                                <div className={classes.productImageContainer}>
                                  <Image
                                    alt={product.name}
                                    src={mediaUrl}
                                    layout="fill"
                                    loading="lazy"
                                    objectFit="contain"
                                  />
                                </div>
                                <div>{product.name}</div>
                              </div>
                            </TableCell>
                          </Link>
                          <TableCell align="center">
                            <TextField
                              onChange={() => onChangeProductAmount(product, event.target.value)}
                              className={classes.amountToAdd}
                              type="number"
                              id="outlined-basic"
                              InputProps={{ inputProps: { min: 1, max: product?.inventory } }}
                              value={product.quantity}
                              label=""
                              variant="outlined"
                            />
                          </TableCell>
                          {isSm && <TableCell align="center">{price?.toFixed(2)}$</TableCell>}
                          <TableCell align="center">
                            {(product.quantity * price).toFixed(2)}$
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
                <div className={classes.shippingFeeSuccessContainer}>
                  <Typography variant="body2" color="textSecondary">
                    {t('qualifies')}
                    <CheckCircleIcon />
                  </Typography>
                </div>
              </TableContainer>
            )}
            {basic_cart.length > 0 && (
              <TableContainer className={classes.cartBasicTableContainer} component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                  <TableHead className={classes.tableHead}>
                    <TableRow>
                      <TableCell className={classes.close} align="left"></TableCell>
                      <TableCell>{t('products')}</TableCell>
                      <TableCell className={classes.fixedWidth} align="right">
                        {t('quantity')}
                      </TableCell>
                      {isSm && (
                        <TableCell className={classes.fixedWidth} align="right">
                          {t('unit')}
                        </TableCell>
                      )}

                      <TableCell className={classes.fixedWidth} align="right">
                        {t('price')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {basic_cart.map(product => {
                      var price = getProductPrice(product, country)

                      let mediaUrl = product?.media[0]?.formats?.thumbnail?.url
                        ? product.media[0].formats.thumbnail.url
                        : product?.media[0]?.url
                        ? product.media[0].url
                        : product?.media
                      return (
                        <TableRow key={product.id} className={classes.tableRow}>
                          <TableCell className={classes.close} align="left">
                            <Close onClick={() => updateCart(product, 0)} />
                          </TableCell>
                          <Link href="/products/[url]" as={`/products/${product.url}`}>
                            <TableCell>
                              <div className={classes.productContainer}>
                                <div className={classes.productImageContainer}>
                                  <Image
                                    alt={product.name}
                                    src={mediaUrl}
                                    layout="fill"
                                    loading="lazy"
                                    objectFit="contain"
                                  />
                                </div>

                                <div className={classes.productName}>{product.name}</div>
                              </div>
                            </TableCell>
                          </Link>
                          <TableCell align="center">
                            <TextField
                              onChange={() => onChangeProductAmount(product, event.target.value)}
                              className={classes.amountToAdd}
                              type="number"
                              id="outlined-basic"
                              InputProps={{ inputProps: { min: 1, max: product?.inventory } }}
                              value={product.quantity}
                              label=""
                              variant="outlined"
                            />
                          </TableCell>
                          {isSm && <TableCell align="center">{price?.toFixed(2)}$</TableCell>}
                          <TableCell align="center">
                            {(product.quantity * price).toFixed(2)}$
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {/* <TableRow className={classes.tableRow}>
                      <TableCell className={classes.close} align="left"></TableCell>
                      <TableCell className={classes.highlight}>{t('shipping-fee')}</TableCell>
                      <TableCell align="center"></TableCell>
                      {isSm && <TableCell align="center"></TableCell>}
                      <TableCell className={classes.highlight} align="center">
                        {shipping_fee_included ? (
                          '15$'
                        ) : (
                          <span className={classes.priceSlash}>$10</span>
                        )}
                      </TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
                {shipping_fee_included ? (
                  <div className={classes.shippingFeeWarningContainer}>
                    <Typography variant="body2" color="textSecondary">
                      {t('missing-1')} <b>{amountRemaining}$</b> {t('missing-2')}
                    </Typography>
                    <div className={classes.shippingFeeProgessContainer}>
                      <Box width="100%" mr={1}>
                        <LinearProgress
                          variant="buffer"
                          value={shippingProgress}
                          valueBuffer={shippingProgress}
                        />
                      </Box>
                      <Box minWidth={35}>
                        <Typography variant="body2" color="textSecondary">
                          <span style={{ whiteSpace: 'nowrap' }}>
                            {basic_subtotal.toFixed(2)} / 50 $
                          </span>
                        </Typography>
                      </Box>
                    </div>
                  </div>
                ) : (
                  <div className={classes.shippingFeeSuccessContainer}>
                    <Typography variant="body2" color="textSecondary">
                      {t('qualifies')}
                      <CheckCircleIcon />
                    </Typography>
                  </div>
                )}
              </TableContainer>
            )}

            <TableContainer className={classes.cartTotalTableContainer} component={Paper}>
              <Table className={classes.table} aria-label="spanning table">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2}>{t('subtotal')}</TableCell>
                    <TableCell align="right">{order_subtotal.toFixed(2)} $</TableCell>
                  </TableRow>
                  {promoCode?.coupon?.amount_off != null && (
                    <TableRow>
                      <TableCell colSpan={2}>Discount: {promoCode?.code}</TableCell>
                      <TableCell align="right">
                        -{(promoCode?.coupon?.amount_off / 100).toFixed(2)}$
                      </TableCell>
                    </TableRow>
                  )}
                  {promoCode?.coupon?.percent_off != null && (
                    <TableRow>
                      <TableCell colSpan={2}>Discount: {promoCode?.code}</TableCell>
                      <TableCell align="right">
                        ({promoCode?.coupon?.percent_off}%) -
                        {((promoCode?.coupon?.percent_off / 100) * order_subtotal).toFixed(2)}$
                      </TableCell>
                    </TableRow>
                  )}
                  {(promoCode?.coupon?.percent_off != null ||
                    promoCode?.coupon?.amount_off != null) && (
                    <TableRow>
                      <TableCell colSpan={2}></TableCell>
                      <TableCell align="right">
                        {calcPromoCode(order_subtotal, promoCode).toFixed(2)} $
                      </TableCell>
                    </TableRow>
                  )}

                  {/* <TableRow>
                    <TableCell colSpan={2}>
                      <Button
                        color="primary"
                        variant="contained"
                        className={classes.button}
                        size="small"
                        onClick={() => onClickApplyCoupon()}
                      >
                        {t('apply-coupon')}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {couponApplied && promoCode == null ? (
                        <div className={classes.couponValidContainer}>Invalid</div>
                      ) : promoCode != null ? (
                        <div className={classes.couponValidContainer}>Valid!</div>
                      ) : null}
                      <TextField
                        onChange={() => setCouponCode(event.target.value)}
                        className={promoCode != null ? classes.successCoupon : classes.coupon}
                        id="outlined-basic"
                        value={''}
                        label=""
                        variant="outlined"
                        value={couponCode}
                      />
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>

            <div className={classes.buttonContainer}>
              {showCheckout ? null : user && Object.keys(user).length === 0 ? (
                <>
                  <Link href={'/signin'}>
                    <a>
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isLoading}
                      >
                        {t('login-checkout')}
                      </Button>
                    </a>
                  </Link>
                  <Button
                    className={classes.button}
                    onClick={() => initiateCheckout()}
                    className={classes.guestBtn}
                    variant="contained"
                    color="secondary"
                    size="large"
                    disabled={cart.length == 0}
                    disabled={isLoading}
                  >
                    {t('guest-checkout')}
                  </Button>
                </>
              ) : (
                <Button
                  className={classes.button}
                  onClick={() => initiateCheckout()}
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={cart.length == 0 || isLoading}
                >
                  {t('checkout')}
                </Button>
              )}
            </div>
            <br />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Link href={'/products'}>
                <a>
                  <Button className={classes.button} variant="outlined" size="small">
                    <span>Continue Shopping</span>
                  </Button>
                </a>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
  cart: state.orders.cart,
  country: state.session.country,
  promoCode: state.orders.promoCode,
  checkoutSessionId: state.orders.checkoutSessionId,
})

const mapDispatchToProps = dispatch => ({
  updateCart: (product, quantity) => {
    return dispatch(updateCart(product, quantity))
  },
  getPromoCode: code => {
    return dispatch(getPromoCode(code))
  },
  createCartSession: (cart, email) => {
    return dispatch(createCartSession(cart, email))
  },
  updateCartSession: (checkoutSessionId, data) => {
    return dispatch(updateCartSession(checkoutSessionId, data))
  },
  createOrderCheckoutSession: (cart, affiliate, isInQCorON) => {
    return dispatch(createOrderCheckoutSession(cart, affiliate, isInQCorON))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CartTable)
