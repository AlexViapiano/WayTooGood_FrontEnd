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
  Avatar,
} from '@material-ui/core'
import {
  updateStripeCustomer,
  updateUser,
  uploadPicture,
} from '../../../../../redux/session/action'
import { useTranslation } from 'next-i18next'
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete'
import { verifyAddress } from '../../../../utils/verifyAddress'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: '32px 0px',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: 100,
    marginTop: -100,
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  avatar: {
    cursor: 'pointer',
    width: 150,
    height: 150,
    border: '2px solid #fbfbfb',
    position: 'absolute',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .2s ease-in-out',
    },
    [theme.breakpoints.down('sm')]: {
      width: 100,
      height: 100,
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
  select: {
    '& li': {
      minHeight: 30,
    },
  },
  button: {
    marginRight: 5,
  },
}))

const General = props => {
  const {
    className,
    user,
    stripeCustomer,
    country,
    updateStripeCustomer,
    updateUser,
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
  const { t } = useTranslation('account')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState({ preview: '', raw: '' })
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [formState, setFormState] = useState({ diets: [] })
  const [shipping_address_line1, setShipping_address_line1] = useState('')
  const [shipping_address_line2, setShipping_address_line2] = useState('')
  const [shipping_city, setShipping_city] = useState('')
  const [shipping_country, setShipping_country] = useState('')
  const [shipping_state, setShipping_state] = useState('')
  const [shipping_zip, setShipping_zip] = useState('')
  const [error, setError] = useState(null)
  const [confirm, setConfirm] = useState(null)

  useEffect(() => {
    if (user != null) {
      var diets = user?.diets
        ? user.diets.map(diet => {
            return diet.id.toString()
          })
        : []
      setFormState({ diets: diets })
    }
    setFirstName(user?.first_name)
    setLastName(user?.last_name)
    setPhoneNumber(user?.phone_number)
    if (stripeCustomer != null) {
      setShipping_address_line1(stripeCustomer?.shipping?.address?.line1)
      setShipping_address_line2(stripeCustomer?.shipping?.address?.line2)
      setShipping_city(stripeCustomer?.shipping?.address?.city)
      setShipping_country(country)
      setShipping_state(stripeCustomer?.shipping?.address?.state)
      setShipping_zip(stripeCustomer?.shipping?.address?.postal_code)
    }
  }, [user, stripeCustomer])

  const handleFieldChange = event => {
    event.persist()
    setFormState(formState => ({
      ...formState,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }))
  }

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      })
    }
  }

  const handleSubmitUser = async event => {
    setLoading(true)

    if (image?.raw) {
      var res = await uploadPicture(image.raw)
    }

    const uploadedPicture = res?.data[0]

    var data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      diets: formState.diets,
    }

    if (uploadedPicture?.id) data.profile_pic = uploadedPicture.id

    if (user?.id) {
      updateUser(user.id, data).then(res => {
        setLoading(false)
      })
    }
  }

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

    if (user?.id) {
      updateStripeCustomer(user.id, data).then(res => {
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
    setLoading(true)

    if (verified_shipping_country != 'CA') {
      setError(`We currently only ship to Canada`)
      setConfirm(null)
      return
    }

    const data = {
      shipping: {
        address: {
          city: verified_shipping_city,
          country: verified_shipping_country,
          line1: verified_shipping_address_line1,
          line2: shipping_address_line2,
          postal_code: verified_shipping_zip,
          state: verified_shipping_state,
        },
        name: '',
        phone: '',
      },
    }

    if (user?.id) {
      updateStripeCustomer(user.id, data).then(res => {
        setLoading(false)
      })
    }

    setShipping_address_line1(verified_shipping_address_line1)
    setShipping_address_line2(shipping_address_line2)
    setShipping_city(verified_shipping_city)
    setShipping_country(verified_shipping_country)
    setShipping_state(verified_shipping_state)
    setShipping_zip(verified_shipping_zip)
    setConfirm(null)
  }

  const handleSkip = async () => {
    setConfirm(null)
    setLoading(true)

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

    if (user?.id) {
      updateStripeCustomer(user.id, data).then(res => {
        setLoading(false)
      })
    }

    setConfirm(null)
  }

  if (confirm)
    return (
      <div>
        <Typography variant="h5">Verify your address </Typography>
        <Typography variant="subtitle1">
          {confirm.verified_shipping_address_line1 +
            ', ' +
            (confirm.shipping_address_line2 && confirm.shipping_address_line2 + ', ') +
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
        <Typography variant="subtitle1">Unverified Address</Typography>
        <Typography variant="subtitle2">
          {shipping_address_line1 +
            ', ' +
            (shipping_address_line2 && shipping_address_line2 + ', ') +
            shipping_city +
            ', ' +
            shipping_country +
            ', ' +
            shipping_state +
            ', ' +
            shipping_zip}
        </Typography>
      </div>
    )

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <label htmlFor="upload-button">
            <div className={classes.avatarContainer}>
              <Avatar
                className={classes.avatar}
                alt={user?.username ? user.username : 'profile-pic'}
                src={
                  image.preview
                    ? image.preview
                    : user?.profile_pic?.formats?.thumbnail?.url
                    ? user?.profile_pic?.formats?.thumbnail?.url
                    : null
                }
              />
            </div>
          </label>

          <input
            type="file"
            id="upload-button"
            style={{ display: 'none' }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            {t('basic-info')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            value={user?.username ? user.username : ''}
            label={t('username')}
            variant="outlined"
            size="medium"
            name="username"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            value={user?.email ? user.email : ''}
            label={t('e-mail')}
            variant="outlined"
            size="medium"
            name="email"
            fullWidth
            type="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={firstName}
            onChange={() => setFirstName(event.target.value)}
            label={t('first-name')}
            variant="outlined"
            size="medium"
            name="first_name"
            fullWidth
            type="first_name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={lastName}
            onChange={() => setLastName(event.target.value)}
            label={t('last-name')}
            variant="outlined"
            size="medium"
            name="last_name"
            fullWidth
            type="last_name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={phoneNumber}
            onChange={() => setPhoneNumber(event.target.value)}
            label={t('phone-number')}
            variant="outlined"
            size="medium"
            name="phone_number"
            fullWidth
            type="phone_number"
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            label="Diets"
            variant="outlined"
            size="medium"
            name="diets"
            fullWidth
            type="text"
            select
            SelectProps={{
              multiple: true,
              value: formState.diets,
              onChange: handleFieldChange,
            }}
          >
            <MenuItem value="1">Dairy Free</MenuItem>
            <MenuItem value="2">Fair Trade</MenuItem>
            <MenuItem value="3">Gluten Free</MenuItem>
            <MenuItem value="4">High Fiber</MenuItem>
            <MenuItem value="5">High Protein</MenuItem>
            <MenuItem value="6">Keto</MenuItem>
            <MenuItem value="7">Kosher</MenuItem>
            <MenuItem value="8">Low Fat</MenuItem>
            <MenuItem value="9">No Sugar Added</MenuItem>
            <MenuItem value="10">Non GMO</MenuItem>
            <MenuItem value="11">Nut Free</MenuItem>
            <MenuItem value="12">Organic</MenuItem>
            <MenuItem value="13">Paleo</MenuItem>
            <MenuItem value="14">Plant-Based</MenuItem>
            <MenuItem value="15">Soy Free</MenuItem>
            <MenuItem value="16">Vegan</MenuItem>
          </TextField>
        </Grid> */}

        <Grid item container justify="flex-start" xs={12}>
          {loading ? (
            <center>
              <CircularProgress />
            </center>
          ) : (
            <Button
              onClick={() => handleSubmitUser()}
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              {t('save')}
            </Button>
          )}
        </Grid>
        {/* 
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            {t('default-shipping-address')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            value={shipping_address_line1 ? shipping_address_line1 : ''}
            onChange={event => setShipping_address_line1(event.target.value)}
            variant="outlined"
            size="medium"
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
            size="medium"
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
            size="medium"
            name="country"
            fullWidth
            type="text"
            label={t('city')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {country == 'CA' ? (
            <FormControl fullWidth variant="outlined">
              <InputLabel>{t('province')}</InputLabel>
              <Select
                required
                size="medium"
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
            <FormControl fullWidth variant="outlined">
              <InputLabel>{t('state')}</InputLabel>
              <Select
                required
                size="medium"
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
            size="medium"
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
            size="medium"
            name="zip"
            label={country == 'CA' ? 'Postal code' : 'Zip'}
            fullWidth
            type="text"
          />
        </Grid> */}
        {/* 
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
        </Grid> */}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
  stripeCustomer: state.session.stripeCustomer,
  country: state.session.country,
})

const mapDispatchToProps = dispatch => ({
  updateStripeCustomer: (userId, data) => {
    return dispatch(updateStripeCustomer(userId, data))
  },
  updateUser: (userId, data) => {
    return dispatch(updateUser(userId, data))
  },
  uploadPicture: image => {
    return dispatch(uploadPicture(image))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(General)
