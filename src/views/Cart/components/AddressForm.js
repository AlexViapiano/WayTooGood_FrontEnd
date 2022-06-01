import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Select,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  makeStyles,
  Checkbox,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
} from '@material-ui/core'
var SalesTax = require('sales-tax')
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete'
import { store } from 'react-notifications-component'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormHelperText-root': {
      color: theme.palette.error.main,
    },
  },
  defaultAddress: {
    paddingBottom: 15,
  },
  button: {
    marginTop: 15,
  },
  marginBottom: {
    marginBottom: 25,
  },
  suggestionsList: {
    listStyleType: 'none',
    position: 'absolute',
    minWidth: 295,
    zIndex: 999999,
    border: '2px solid #999',
    position: 'absolute',
    minWidth: 295,
    background: '#f1f1f1',
    borderRadius: 5,
    listStyleType: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
  suggestionListItem: {
    padding: 7,
    borderBottom: '1px solid #c4c4c4',
    cursor: 'pointer',
  },
  formControl: {
    width: '100%',
    '& legend': {
      width: '60px !important',
    },
  },
  select: {
    '& li': {
      minHeight: 30,
    },
  },
}))

const AddressForm = props => {
  const {
    setError,
    confirm,
    setActiveStep,
    user,
    stripeCustomer,
    country,
    first_name,
    setFirst_name,
    last_name,
    setLast_name,
    phone_number,
    setPhone_number,
    email,
    setEmail,
    emailIsValid,
    setEmailIsValid,
    shipping_address_line1,
    setShipping_address_line1,
    shipping_address_line2,
    setShipping_address_line2,
    shipping_city,
    setShipping_city,
    shipping_country,
    setShipping_country,
    shipping_state,
    setShipping_state,
    shipping_zip,
    setShipping_zip,
    useAsDefaultAddress,
    setUseAsDefaultAddress,
    billingSameAsShipping,
    setBillingSameAsShipping,
    billing_address_line1,
    setBilling_address_line1,
    billing_address_line2,
    setBilling_address_line2,
    billing_city,
    setBilling_city,
    billing_state,
    setBilling_state,
    billing_country,
    setBilling_country,
    billing_zip,
    setBilling_zip,
    taxRates,
    setTaxRates,
    setSalesTaxes,
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

  function validateEmail(email) {
    setEmail(email)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(email).toLowerCase())) setEmailIsValid(true)
    else setEmailIsValid(false)
  }

  const getTaxInfo = state => {
    setShipping_state(state)
    SalesTax.getSalesTax('CA', state).then(provinceSalesTax => {
      setSalesTaxes(provinceSalesTax)
    })
  }

  const handleSelect = res => {
    if (!ready) return
    clearSuggestions()
    setError()
    getDetails({
      placeId: res.place_id,
      fields: ['address_components'],
    })
      .then(details => {
        var address_line1 = []
        var addressIsValid = true
        if (details.address_components.length == 0) return
        details.address_components.forEach(address_component => {
          if (
            address_component.types.includes('street_number') ||
            address_component.types.includes('route')
          )
            address_line1.push(address_component.short_name)
          if (address_component.types.includes('locality'))
            setShipping_city(address_component.short_name)
          if (address_component.types.includes('administrative_area_level_1')) {
            setShipping_state(address_component.short_name)
            if (country == 'CA' && state)
              SalesTax.getSalesTax('CA', state).then(provinceSalesTax =>
                setSalesTaxes(provinceSalesTax)
              )
          }

          if (address_component.types.includes('country')) {
            if (address_component.short_name == 'CA' && country == 'CA')
              console.error('Canadian address is valid!')
            else if (address_component.types.short_name == 'USA' && country == 'US')
              console.error('American address is valid!')
            else {
              setShipping_address_line1('')
              setShipping_city('')
              setShipping_state(null)
              setShipping_zip('')
              setError(
                `This address is not found within ${
                  country == 'CA' ? 'Canada' : country == 'US' ? 'USA' : null
                }`
              )
              addressIsValid = false
            }
          }

          if (address_component.types.includes('postal_code'))
            setShipping_zip(address_component.short_name)
        })
        if (address_line1.length > 0 && addressIsValid) {
          setValue(address_line1.join(' '))
          setShipping_address_line1(address_line1.join(' '))
        }
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }

  const useDefaultAddress = () => {
    var { line1, line2, city, state, postal_code } = stripeCustomer?.shipping?.address
    setShipping_address_line1(line1)
    setShipping_address_line2(line2)
    setShipping_city(city)
    setShipping_state(state)
    setShipping_zip(postal_code)
    setBilling_address_line1(line1)
    setBilling_address_line2(line2)
    setBilling_city(city)
    setBilling_state(state)
    setBilling_zip(postal_code)
    if (country == 'CA' && state)
      SalesTax.getSalesTax('CA', state).then(provinceSalesTax => setSalesTaxes(provinceSalesTax))
    if (user && user.email) setEmail(user.email)
    if (user && user.first_name) setFirst_name(user.first_name)
    if (user && user.last_name) setLast_name(user.last_name)
    if (user && user.phone_number) setPhone_number(user.phone_number)
    setError(false)
    setActiveStep(1)
  }

  const onChangeAutocomplete = () => {
    setValue(event.target.value)
    setShipping_address_line1(event.target.value)
  }

  var defaultAddress = false
  if (stripeCustomer && stripeCustomer?.shipping?.address) {
    defaultAddress =
      !stripeCustomer?.shipping?.address?.line1 ||
      !stripeCustomer?.shipping?.address?.line2 ||
      !stripeCustomer?.shipping?.address?.city ||
      !stripeCustomer?.shipping?.address?.state ||
      !stripeCustomer?.shipping?.address?.postal_code
    var { line1, line2, city, state, postal_code } = stripeCustomer?.shipping?.address
  }

  if (confirm)
    return (
      <div>
        <Typography variant="h5">Verify your address</Typography>
        <br></br>
        <Typography variant="subtitle1">There's a problem with the address provided:</Typography>
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
        <br />
        <br />
        <Typography variant="subtitle1">Here's our suggestion:</Typography>
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
      </div>
    )

  return (
    <Grid onClick={() => clearSuggestions()} className={classes.root} container spacing={2}>
      {defaultAddress && (
        <Grid className={classes.marginBottom} item xs={12} xs={6} align="center">
          <Typography variant="subtitle1">{user.first_name + ' ' + user.last_name}</Typography>
          <Typography variant="subtitle2">{line1 + ', ' + line2}</Typography>
          <Typography variant="subtitle2">
            {city + ', ' + state + ', ' + country + ', ' + postal_code}
          </Typography>
        </Grid>
      )}

      {defaultAddress && (
        <Grid className={classes.marginBottom} item xs={12} xs={6} align="center">
          <Button
            onClick={() => useDefaultAddress()}
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Use default address
          </Button>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography variant="subtitle1">Shipping Address:</Typography>
      </Grid>
      <Grid item xs={12} sm={9} align="center">
        <TextField
          required
          id="address"
          name="address"
          label="Address"
          fullWidth
          onChange={event => onChangeAutocomplete(event.target.value)}
          value={value}
          variant="outlined"
        />
        {status === 'OK' && (
          <ul className={classes.suggestionsList}>
            {data.map(suggestion => {
              const {
                place_id,
                structured_formatting: { main_text, secondary_text },
              } = suggestion

              return (
                <li
                  className={classes.suggestionListItem}
                  key={place_id}
                  onClick={() => handleSelect(suggestion)}
                >
                  <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
              )
            })}
          </ul>
        )}
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          id="address2"
          name="address2"
          label="Apt"
          fullWidth
          autoComplete="shipping address-line2"
          onChange={event => setShipping_address_line2(event.target.value)}
          value={shipping_address_line2 ? shipping_address_line2 : ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          onChange={event => setShipping_city(event.target.value)}
          value={shipping_city ? shipping_city : ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>{shipping_country == 'CA' ? 'Province*' : 'State*'}</InputLabel>
          {country == 'CA' ? (
            <Select
              required
              value={shipping_state ? shipping_state : ''}
              onChange={event => getTaxInfo(event.target.value)}
              variant="outlined"
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
          ) : country == 'US' ? (
            <Select
              required
              fullWidth
              value={shipping_state ? shipping_state : ''}
              onChange={event => setShipping_state(event.target.value)}
              label="State*"
              variant="outlined"
              className={classes.select}
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
          ) : null}
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          required
          id="country"
          name="country"
          label="Country"
          fullWidth
          autoComplete="shipping country"
          disabled
          onChange={event => setShipping_country(event.target.value)}
          value={shipping_country ? shipping_country : ''}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          required
          id="zip"
          name="zip"
          label={country == 'CA' ? 'Postal code' : 'Zip'}
          fullWidth
          autoComplete="shipping postal-code"
          onChange={event => setShipping_zip(event.target.value)}
          value={shipping_zip ? shipping_zip : ''}
          variant="outlined"
        />
      </Grid>
      {user && Object.keys(user).length === 0 && (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              onChange={event => setFirst_name(event.target.value)}
              value={first_name ? first_name : ''}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              onChange={event => setLast_name(event.target.value)}
              value={last_name ? last_name : ''}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="E-mail"
              fullWidth
              autoComplete="first-name"
              onChange={event => validateEmail(event.target.value)}
              value={email ? email : ''}
              helperText={emailIsValid ? '' : 'Your email is invalid!'}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone_number"
              name="phone_number"
              label="Phone #"
              fullWidth
              autoComplete="phone_number"
              onChange={event => setPhone_number(event.target.value)}
              value={phone_number ? phone_number : ''}
              variant="outlined"
            />
          </Grid>
        </>
      )}

      {Object.keys(user).length !== 0 && (
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Checkbox
                color="primary"
                name="saveDefaultAddress"
                checked={useAsDefaultAddress}
                onChange={event => setUseAsDefaultAddress(!useAsDefaultAddress)}
              />
            }
            label="Use as my default address"
          />
        </Grid>
      )}

      <Grid item xs={12} sm={6}>
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Checkbox
              color="primary"
              name="saveAddress"
              checked={billingSameAsShipping}
              onChange={event => setBillingSameAsShipping(!billingSameAsShipping)}
            />
          }
          label="Same address for billing"
        />
      </Grid>

      {!billingSameAsShipping && (
        <>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Billing address:</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address"
              fullWidth
              onChange={event => setBilling_address_line1(event.target.value)}
              value={billing_address_line1 ? billing_address_line1 : ''}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="address2"
              name="address2"
              label="Apt"
              fullWidth
              onChange={event => setBilling_address_line2(event.target.value)}
              value={billing_address_line2 ? billing_address_line2 : ''}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              onChange={event => setBilling_city(event.target.value)}
              value={billing_city ? billing_city : ''}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel shrink>{billing_country == 'CA' ? 'Province*' : 'State*'}</InputLabel>
              {country == 'CA' ? (
                <Select
                  required
                  fullWidth
                  value={billing_state ? billing_state : ''}
                  onChange={event => setBilling_state(event.target.value)}
                  label="Province"
                  variant="outlined"
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
              ) : country == 'US' ? (
                <Select
                  required
                  fullWidth
                  value={billing_state ? billing_state : ''}
                  onChange={event => setBilling_state(event.target.value)}
                  label="State"
                  variant="outlined"
                  className={classes.select}
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
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              disabled
              onChange={event => setBilling_country(event.target.value)}
              value={billing_country ? billing_country : ''}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label={country == 'CA' ? 'Postal code' : 'Zip'}
              fullWidth
              onChange={event => setBilling_zip(event.target.value)}
              value={billing_zip ? billing_zip : ''}
              variant="outlined"
            />
          </Grid>
        </>
      )}
    </Grid>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
  stripeCustomer: state.session.stripeCustomer,
  country: state.session.country,
})

export default connect(mapStateToProps, null)(AddressForm)
