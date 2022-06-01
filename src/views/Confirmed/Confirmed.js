import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Button } from '@material-ui/core'
import Link from 'next/link'
import { clearCart } from '../../../redux/orders/action'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { Section } from 'components/organisms'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  layout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

const Checkout = props => {
  const classes = useStyles()
  const { clearCart, cart, ...rest } = props
  const { user } = props
  const { t } = useTranslation('cart')

  useEffect(() => {
    if (cart.length > 0) clearCart()

    // useEffect(() => {
    //   pixels.completePayment({
    //     transaction_id: res?.id,
    //     email: res?.email,
    //     promo_code: res?.promo_code,
    //     shipping: res?.shipping_fee,
    //     tax: res?.taxes,
    //     value: res?.total,
    //     currency: 'CAD',
    //     affiliation:
    //       res?.utm_medium || res?.utm_medium ? res?.utm_medium + '-' + res?.utm_source : null,
    //     items: items,
    //   })
    // }, [])
  })

  return (
    <Section>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <div className={classes.container}>
              <div className={classes.container1}>
                <Typography variant="h5" gutterBottom>
                  {t('thank-you')}
                </Typography>
                <Typography variant="subtitle1">{t('confirmation')}</Typography>
                <div>
                  <Link href={'/'}>
                    <Button color="primary" variant="contained" className={classes.button}>
                      {t('home')}
                    </Button>
                  </Link>

                  <Link href={'/account/orders'}>
                    <a>
                      <Button color="default" variant="contained" className={classes.button}>
                        My Orders
                      </Button>
                    </a>
                  </Link>
                  <Link
                    href={`https://docs.google.com/forms/d/e/1FAIpQLSe7dXYWG9_4apb4WtOnPeU3UtRNEqhZYpCzHj1cTac6gUawjw/viewform?entry.683757764=${0}`}
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
        </Paper>
      </main>
    </Section>
  )
}

const mapStateToProps = state => ({
  cart: state.orders?.cart,
})

const mapDispatchToProps = dispatch => ({
  clearCart: () => {
    dispatch(clearCart())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
