import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, Grid, Typography, Button, CircularProgress } from '@material-ui/core'
import { useTranslation } from 'next-i18next'
import { createBillingPortalSession } from '../../../../../redux/session/action'
import Link from 'next/link'
import Subscription from './Subscription'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  divider: {
    margin: '32px 0px',
  },
  btnMarginRight: {
    marginRight: 5,
  },
}))

const UserSubscriptions = props => {
  const {
    className,
    createBillingPortalSession,
    user,
    stripeCustomer,
    country,
    subscriptions,
    uploadPicture,
    ...rest
  } = props
  const classes = useStyles()
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation('account')
  const [stripeUrl, setStripeUrl] = React.useState('')

  useEffect(() => {
    if (user?.id && stripeCustomer) {
      createBillingPortalSession(user.id).then(res => {
        if (!res.error) setStripeUrl(res.url)
      })
    }
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <center>
            <Typography variant="h4" color="textPrimary">
              {t('subscriptions')}
            </Typography>
          </center>
        </Grid>
        <Grid item xs={12}>
          {subscriptions == null ? (
            <center>
              <CircularProgress />
            </center>
          ) : subscriptions.length == 0 ? (
            <center>
              <Typography variant="h6" color="textPrimary">
                You have no subscriptions yet...
                <br />
                learn more about our monthly subscription box!
              </Typography>
              <br />
              <Link href={'/subscribe'}>
                <a>
                  <Button variant="contained" color="primary">
                    Subscribe
                  </Button>
                </a>
              </Link>
            </center>
          ) : (
            <>
              <center>
                <Typography variant="h6" color="textPrimary">
                  Need assistance?
                </Typography>
                <br />
                <Link href={'/faq'}>
                  <a>
                    <Button variant="outlined" className={classes.btnMarginRight}>
                      FAQ
                    </Button>
                  </a>
                </Link>
                <Link href={'/contact'}>
                  <a>
                    <Button variant="outlined">Contact Us</Button>
                  </a>
                </Link>
              </center>
              {subscriptions.map(subscription => (
                <Subscription
                  key={subscription.id}
                  subscription={subscription}
                  stripeUrl={stripeUrl}
                />
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
  stripeCustomer: state.session.stripeCustomer,
  country: state.session.country,
  subscriptions: state.session.subscriptions,
})

const mapDispatchToProps = dispatch => ({
  createBillingPortalSession: userId => {
    return dispatch(createBillingPortalSession(userId))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSubscriptions)
