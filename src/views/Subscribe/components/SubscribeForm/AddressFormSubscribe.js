import Reac, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Select,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
} from '@material-ui/core'
import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import { SectionHeader } from 'components/molecules'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormHelperText-root': {
      color: theme.palette.error.main,
    },
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  Wbox: {
    position: 'relative',
    height: 47,
    width: 120,
    marginTop: 5,
    [theme.breakpoints.down('sm')]: {
      width: 80,
      minWidth: 80,
      height: 30,
      marginTop: 1,
    },
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
  form: {
    marginTop: 25,
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
}))

const AddressFormSubscribe = props => {
  const {
    setError,
    confirm,
    country,
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
    diet,
    setDiet,
    quantity,
    setQuantity,
    gift,
    setGift,
    giftTo,
    setGiftTo,
  } = props
  const classes = useStyles()
  const { t } = useTranslation('subscribe')
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))

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
        setShipping_city('')
        details.address_components.forEach(address_component => {
          if (
            address_component.types.includes('street_number') ||
            address_component.types.includes('route')
          )
            address_line1.push(address_component.short_name)
          if (address_component.types.includes('sublocality'))
            setShipping_city(address_component.short_name)
          if (shipping_city != '' && address_component.types.includes('locality'))
            setShipping_city(address_component.short_name)
          if (address_component.types.includes('administrative_area_level_1'))
            setShipping_state(address_component.short_name)

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

  const onChangeAutocomplete = () => {
    setValue(event.target.value)
    setShipping_address_line1(event.target.value)
  }

  if (confirm) {
    return (
      <center>
        <SectionHeader
          title={<Typography variant="h3">{t('verify-address')}</Typography>}
          titleProps={{
            variant: 'body1',
            color: 'textPrimary',
          }}
          fadeUp
        />
        {/* <Typography variant="h6">{t('verify-address-error')}</Typography>
        <Typography variant="subtitle1">
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
        <br /> */}
        <Typography variant="subtitle1">{t('address-suggestion')}</Typography>
        <Typography variant="subtitle2">
          {(confirm.verified_shipping_address_line1
            ? confirm.verified_shipping_address_line1 + ', '
            : '') +
            (shipping_address_line2 ? shipping_address_line2 + ', ' : '') +
            (confirm.verified_shipping_city ? confirm.verified_shipping_city + ', ' : '') +
            (confirm.verified_shipping_country ? confirm.verified_shipping_country + ', ' : '') +
            (confirm.verified_shipping_state ? confirm.verified_shipping_state + ', ' : '') +
            (confirm.verified_shipping_zip ? confirm.verified_shipping_zip : '')}
        </Typography>
      </center>
    )
  }

  return (
    <Grid onClick={() => clearSuggestions()} className={classes.root} container spacing={2}>
      <SectionHeader
        title={<Typography variant="h3">{t('subscribe-subtitle')}</Typography>}
        subtitle={
          <>
            <Typography variant="h6">{t('subscribe-gift')}</Typography>
            <Button
              onClick={() => setGift(!gift)}
              size="small"
              variant="outlined"
              color={gift ? 'primary' : ''}
            >
              {t('subscribe-gift-btn')}
            </Button>
          </>
        }
        titleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        fadeUp
      />

      {gift && (
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="gifTo"
            name="giftTo"
            label="Gift To"
            fullWidth
            onChange={event => setGiftTo(event.target.value)}
            value={giftTo ? giftTo : ''}
            variant="outlined"
            size={isSm ? 'large' : 'small'}
          />
        </Grid>
      )}

      <Grid item xs={8} sm={9}>
        <TextField
          required
          id="address"
          name="address"
          label="Address"
          fullWidth
          onChange={event => onChangeAutocomplete(event.target.value)}
          value={shipping_address_line1 ? shipping_address_line1 : value}
          variant="outlined"
          size={isSm ? 'large' : 'small'}
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
      <Grid item xs={4} sm={3}>
        <TextField
          id="address2"
          name="address2"
          label="Apt"
          fullWidth
          autoComplete="shipping address-line2"
          onChange={event => setShipping_address_line2(event.target.value)}
          value={shipping_address_line2 ? shipping_address_line2 : ''}
          variant="outlined"
          size={isSm ? 'large' : 'small'}
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
          size={isSm ? 'large' : 'small'}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl
          size={isSm ? 'large' : 'small'}
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel>{shipping_country == 'CA' ? 'Province*' : 'State*'}</InputLabel>

          {country == 'CA' ? (
            <Select
              required
              value={shipping_state ? shipping_state : ''}
              onChange={event => setShipping_state(event.target.value)}
              label="Province*"
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
          size={isSm ? 'large' : 'small'}
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
          size={isSm ? 'large' : 'small'}
        />
      </Grid>
      {/* <Grid item align="center" xs={12} sm={6}>
        <FormControl component="fieldset" className={classes.form}>
          <FormLabel component="legend">
            <Typography variant="subtitle1">How many boxes?</Typography>
          </FormLabel>
          <TextField
            // label="Number"
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            variant="outlined"
            size={'small'}
          />
        </FormControl>
      </Grid> */}
      <Grid item align="center" xs={12} sm={12}>
        <FormControl component="fieldset" className={classes.form}>
          <center>
            <FormLabel component="legend">
              <Typography variant="subtitle1">{t('select-diet')}</Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender1"
              value={diet}
              onChange={event => setDiet(event.target.value)}
            >
              <FormControlLabel value="Vegan" control={<Radio />} label="Vegan" />
              <FormControlLabel value="Gluten-Free" control={<Radio />} label="Gluten-Free" />
              <FormControlLabel value="" control={<Radio />} label="Neither" />
            </RadioGroup>
          </center>
        </FormControl>
        <Typography variant="subtitle2">{t('select-diet-disclaimer')}</Typography>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  stripeCustomer: state.session.stripeCustomer,
  country: state.session.country,
})

export default connect(mapStateToProps, null)(AddressFormSubscribe)
