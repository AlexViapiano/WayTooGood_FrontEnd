import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import { useTranslation } from 'next-i18next'
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete'
import { verifyAddress } from '../../../../utils/verifyAddress'
import { updateSubscription } from '../../../../../redux/session/action'
import moment from 'moment'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  root: {},
  divider: {
    margin: '32px 0px',
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
  select: {
    '& li': {
      minHeight: 30,
    },
  },
  button: {
    marginRight: 5,
  },
}))

const Subscription = props => {
  const {
    className,
    stripeUrl,
    subscription,
    updateSubscription,
    user,
    stripeCustomer,
    country,
    subscriptions,
    uploadPicture,
    ...rest
  } = props
  const classes = useStyles()

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: { country: 'ca' },
    },
    debounce: 300,
  })

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))
  const { t } = useTranslation('account')
  const [loading, setLoading] = useState(false)
  const [shipping_address_line1, setShipping_address_line1] = useState('')
  const [shipping_address_line2, setShipping_address_line2] = useState('')
  const [shipping_city, setShipping_city] = useState('')
  const [shipping_country, setShipping_country] = useState('')
  const [shipping_state, setShipping_state] = useState('')
  const [shipping_zip, setShipping_zip] = useState('')
  const [error, setError] = useState(null)
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    if (subscription?.metadata) {
      setShipping_address_line1(subscription?.metadata?.line1)
      setShipping_address_line2(subscription?.metadata?.line2)
      setShipping_city(subscription?.metadata?.city)
      setShipping_country(subscription?.metadata?.country)
      setShipping_state(subscription?.metadata?.state)
      setShipping_zip(subscription?.metadata?.postal_code)
    }
  }, [user, stripeCustomer])

  const handleSubmitAddress = async event => {
    setLoading(true)

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

    const metadata = {
      city: shipping_city,
      country: shipping_country,
      line1: shipping_address_line1,
      line2: shipping_address_line2,
      postal_code: shipping_zip,
      state: shipping_state,
    }

    if (user?.id) {
      updateSubscription(user.id, subscription.id, metadata).then(res => {
        setLoading(false)
      })
    }
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

    const metadata = {
      city: verified_shipping_city,
      country: shipping_country,
      line1: verified_shipping_address_line1,
      line2: shipping_address_line2,
      postal_code: verified_shipping_zip,
      state: verified_shipping_state,
    }

    if (user?.id) {
      updateSubscription(user.id, subscription.id, metadata).then(res => {
        setLoading(false)
      })
    }

    setShipping_address_line1(verified_shipping_address_line1)
    setShipping_address_line2(shipping_address_line2)
    setShipping_city(verified_shipping_city)
    setShipping_country(shipping_country)
    setShipping_state(verified_shipping_state)
    setShipping_zip(verified_shipping_zip)
    setConfirm(null)
  }

  const handleSkip = async () => {
    setConfirm(null)
    setLoading(true)

    const metadata = {
      city: shipping_city,
      country: shipping_country,
      line1: shipping_address_line1,
      line2: shipping_address_line2,
      postal_code: shipping_zip,
      state: shipping_state,
    }

    if (user?.id) {
      updateSubscription(user.id, subscription.id, metadata).then(res => {
        setLoading(false)
      })
    }

    setConfirm(null)
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Divider className={classes.divider} />
      <Typography variant="h6" color="textPrimary">
        <center>Wbox Subscription ({subscription?.id?.slice(-5)})</center>
        <br />
        {subscription?.quantity != 1 ? (
          <>
            Plan: {(subscription?.plan?.amount / 100).toFixed(2)}$ x {subscription?.quantity} boxes
            = {(subscription?.plan?.amount / 100).toFixed(2) * subscription?.quantity}$ /{' '}
            {subscription?.plan?.interval}
          </>
        ) : (
          <>
            Plan: {(subscription?.plan?.amount / 100).toFixed(2)}$ / {subscription?.plan?.interval}
          </>
        )}
        <br />
        {subscription?.pause_collection ? (
          <>Paused</>
        ) : subscription?.cancel_at_period_end ? (
          <>
            <>Cancelled at the end of period*</> <br />
          </>
        ) : (
          <>
            <>Next charge: {moment.unix(subscription?.current_period_end).format('MMMM Do YYYY')}</>
          </>
        )}
        {subscription?.metadata?.diet && (
          <>
            <br />
            Diet Selected: {subscription?.metadata?.diet}
          </>
        )}
        {subscription?.metadata?.gift_to && (
          <>
            <br />
            Gifted To: {subscription?.metadata?.gift_to}
          </>
        )}
      </Typography>
      <br />
      <Grid item container justify="flex-start" xs={12}>
        <Link href={stripeUrl ? stripeUrl : '/'}>
          <a>
            <Button variant="contained" color="secondary" size="large">
              Manage Subscription
            </Button>
          </a>
        </Link>
      </Grid>
      <br /> <br />
      {confirm ? (
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12}>
            <br />
            <Typography variant="h5">Verify your address</Typography>
            <Typography variant="subtitle1">
              {confirm.verified_shipping_address_line1 +
                ', ' +
                (confirm.shipping_address_line2 ? confirm.shipping_address_line2 + ', ' : '') +
                confirm.verified_shipping_city +
                ', ' +
                confirm.verified_shipping_country +
                ', ' +
                confirm.verified_shipping_state +
                ', ' +
                confirm.verified_shipping_zip}
            </Typography>
            <br />
            <Button
              onClick={handleConfirm}
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              {t('confirm')}
            </Button>
            <br /> <br />
            <Button
              variant="outlined"
              size="small"
              onClick={() => setConfirm(false)}
              className={classes.button}
            >
              Back
            </Button>
            <Button variant="outlined" size="small" onClick={handleSkip} className={classes.button}>
              Save unverified address
            </Button>
            <br /> <br />
            <Typography variant="subtitle1">Unverified Address:</Typography>
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
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              {t('shipping-address')}:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              required
              value={shipping_address_line1 ? shipping_address_line1 : ''}
              onChange={event => setShipping_address_line1(event.target.value)}
              variant="outlined"
              size={isSm ? 'medium' : 'small'}
              name="address_line1"
              label={t('shipping-address-1')}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              value={shipping_address_line2 ? shipping_address_line2 : ''}
              onChange={event => setShipping_address_line2(event.target.value)}
              variant="outlined"
              size={isSm ? 'medium' : 'small'}
              name="address_line2"
              label={t('shipping-address-2')}
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              value={shipping_city ? shipping_city : ''}
              onChange={event => setShipping_city(event.target.value)}
              variant="outlined"
              size={isSm ? 'medium' : 'small'}
              name="country"
              fullWidth
              type="text"
              label={t('city')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {country == 'CA' ? (
              <FormControl size={isSm ? 'medium' : 'small'} fullWidth variant="outlined">
                <InputLabel>{t('province')}</InputLabel>
                <Select
                  required
                  variant="outlined"
                  required
                  fullWidth
                  value={shipping_state ? shipping_state : ''}
                  onChange={event => setShipping_state(event.target.value)}
                  label="Province*"
                  className={classes.select}
                >
                  <MenuItem value={'AB'}>AB - Alberta</MenuItem>
                  <MenuItem value={'BC'}>BC - British Columbia</MenuItem>
                  <MenuItem value={'QC'}>QC - Quebec</MenuItem>
                  <MenuItem value={'ON'}>ON - Ontario</MenuItem>
                  <MenuItem value={'MB'}>MB- Manitoba</MenuItem>
                  <MenuItem value={'NL'}>NL - Newfoundland</MenuItem>
                  <MenuItem value={'NS'}>NS - Nova Scotia</MenuItem>
                  <MenuItem value={'NT'}>NT - Northwest Territories</MenuItem>
                  <MenuItem value={'NU'}>NU - Nunavut</MenuItem>
                  <MenuItem value={'NB'}>NB - New Brunswick</MenuItem>
                  <MenuItem value={'PE'}>PE - Prince Edward Island</MenuItem>
                  <MenuItem value={'SK'}>SK - Saskatchewan</MenuItem>
                  <MenuItem value={'YT'}>YT - Yukon</MenuItem>
                </Select>
              </FormControl>
            ) : country == 'US' ? (
              <FormControl size={isSm ? 'medium' : 'small'} fullWidth variant="outlined">
                <InputLabel>{t('state')}</InputLabel>
                <Select
                  required
                  variant="outlined"
                  required
                  fullWidth
                  value={shipping_state ? shipping_state : ''}
                  onChange={event => setShipping_state(event.target.value)}
                  label="State*"
                >
                  <MenuItem value={'AL'}>ALABAMA - AL</MenuItem>
                  <MenuItem value={'AK'}>ALASKA - AK</MenuItem>
                  <MenuItem value={'AS'}>AMERICAN SAMOA - AS</MenuItem>
                  <MenuItem value={'AZ'}>ARIZONA - AZ</MenuItem>
                  <MenuItem value={'AR'}>ARKANSAS - AR</MenuItem>
                  <MenuItem value={'CA'}>CALIFORNIA - CA</MenuItem>
                  <MenuItem value={'CO'}>COLORADO - CO</MenuItem>
                  <MenuItem value={'CT'}>CONNECTICUT - CT</MenuItem>
                  <MenuItem value={'DE'}>DELAWARE - DE</MenuItem>
                  <MenuItem value={'DC'}>DISTRICT OF COLUMBIA - DC</MenuItem>
                  <MenuItem value={'FL'}>FLORIDA - FL</MenuItem>
                  <MenuItem value={'GA'}>GEORGIA - GA</MenuItem>
                  <MenuItem value={'GU'}>GUAM - GU</MenuItem>
                  <MenuItem value={'HI'}>HAWAII - HI</MenuItem>
                  <MenuItem value={'ID'}>IDAHO - ID</MenuItem>
                  <MenuItem value={'IL'}>ILLINOIS - IL</MenuItem>
                  <MenuItem value={'IN'}>INDIANA - IN</MenuItem>
                  <MenuItem value={'IA'}>IOWA - IA</MenuItem>
                  <MenuItem value={'KS'}>KANSAS - KS</MenuItem>
                  <MenuItem value={'KY'}>KENTUCKY - KY</MenuItem>
                  <MenuItem value={'LA'}>LOUISIANA - LA</MenuItem>
                  <MenuItem value={'ME'}>MAINE - ME</MenuItem>
                  <MenuItem value={'MD'}>MARYLAND - MD</MenuItem>
                  <MenuItem value={'MA'}>MASSACHUSETTS - MA</MenuItem>
                  <MenuItem value={'MI'}>MICHIGAN - MI</MenuItem>
                  <MenuItem value={'MN'}>MINNESOTA - MN</MenuItem>
                  <MenuItem value={'MS'}>MISSISSIPPI - MS</MenuItem>
                  <MenuItem value={'MO'}>MISSOURI - MO</MenuItem>
                  <MenuItem value={'MT'}>MONTANA - MT</MenuItem>
                  <MenuItem value={'NE'}>NEBRASKA - NE</MenuItem>
                  <MenuItem value={'NV'}>NEVADA - NV</MenuItem>
                  <MenuItem value={'NH'}>NEW HAMPSHIRE - NH</MenuItem>
                  <MenuItem value={'NJ'}>NEW JERSEY - NJ</MenuItem>
                  <MenuItem value={'NM'}>NEW MEXICO - NM</MenuItem>
                  <MenuItem value={'NY'}>NEW YORK - NY</MenuItem>
                  <MenuItem value={'NC'}>NORTH CAROLINA - NC</MenuItem>
                  <MenuItem value={'ND'}>NORTH DAKOTA - ND</MenuItem>
                  <MenuItem value={'MP'}>NORTHERN MARIANA IS - MP</MenuItem>
                  <MenuItem value={'OH'}>OHIO - OH</MenuItem>
                  <MenuItem value={'OK'}>OKLAHOMA - OK</MenuItem>
                  <MenuItem value={'OR'}>OREGON - OR</MenuItem>
                  <MenuItem value={'PA'}>PENNSYLVANIA - PA</MenuItem>
                  <MenuItem value={'PR'}>PUERTO RICO - PR</MenuItem>
                  <MenuItem value={'RI'}>RHODE ISLAND - RI</MenuItem>
                  <MenuItem value={'SC'}>SOUTH CAROLINA - SC</MenuItem>
                  <MenuItem value={'SD'}>SOUTH DAKOTA - SD</MenuItem>
                  <MenuItem value={'TN'}>TENNESSEE - TN</MenuItem>
                  <MenuItem value={'TX'}>TEXAS - TX</MenuItem>
                  <MenuItem value={'UT'}>UTAH - UT</MenuItem>
                  <MenuItem value={'VT'}>VERMONT - VT</MenuItem>
                  <MenuItem value={'VA'}>VIRGINIA - VA</MenuItem>
                  <MenuItem value={'VI'}>VIRGIN ISLANDS - VI</MenuItem>
                  <MenuItem value={'WA'}>WASHINGTON - WA</MenuItem>
                  <MenuItem value={'WV'}>WEST VIRGINIA - WV</MenuItem>
                  <MenuItem value={'WI'}>WISCONSIN - WI</MenuItem>
                  <MenuItem value={'WY'}>WYOMING - WY</MenuItem>
                </Select>
              </FormControl>
            ) : null}
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              value={shipping_country ? shipping_country : ''}
              disabled
              variant="outlined"
              size={isSm ? 'medium' : 'small'}
              name="country"
              fullWidth
              type="text"
              label={t('country')}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              value={shipping_zip ? shipping_zip : ''}
              onChange={event => setShipping_zip(event.target.value)}
              variant="outlined"
              size={isSm ? 'medium' : 'small'}
              name="zip"
              label={country == 'CA' ? 'Postal code' : 'Zip'}
              fullWidth
              type="text"
            />
          </Grid>
          {error != null && typeof error == 'string' && (
            <div className={classes.errorContainer}>{error}</div>
          )}
          <Grid item container justify="flex-start" xs={12}>
            {loading ? (
              <center>
                <CircularProgress />
              </center>
            ) : (
              <Button
                onClick={() => handleSubmitAddress()}
                variant="contained"
                type="submit"
                color="primary"
                size="large"
                disabled={
                  !shipping_address_line1 ||
                  !shipping_city ||
                  !shipping_country ||
                  !shipping_state ||
                  !shipping_zip
                }
              >
                {t('save')}
              </Button>
            )}
          </Grid>
        </Grid>
      )}
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
  updateSubscription: (userId, subscriptionId, metadata) => {
    return dispatch(updateSubscription(userId, subscriptionId, metadata))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Subscription)
