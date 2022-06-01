import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { API_URL } from '../../../../../redux/api'
import Link from 'next/link'
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  MenuItem,
} from '@material-ui/core'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiOutlinedInput-root': {
      background: '#fff',
    },
    '& .MuiFormHelperText-contained': {
      color: '#FFF',
    },
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    color: 'white',
  },
  title: {
    color: 'white',
    marginBottom: 15,
  },
  btnWhite: {
    background: theme.palette.white,
  },
  message: {
    background: '#d2ffd6',
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    width: '100%',
    textAlign: 'center',
  },
}))

const ContactForm = props => {
  const { setFocusForm, user, productDetails, requestType, className, ...rest } = props
  const classes = useStyles()
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation('account')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [amount, setAmount] = useState(1)
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    const data = {
      requestType: requestType,
      product_qty: productDetails.product_qty,
      purchaseOrder: productDetails.purchaseOrder,
      amount: amount,
      reason: reason,
      details: details,
    }
    var jwt = JSON.parse(localStorage.getItem('jwt'))
    var bearerToken = 'Bearer ' + jwt
    return fetch(`${API_URL}/request-return?user=` + user.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(res => {
        setLoading(false)
        if (res.sent) {
          setSent(true)
        } else if (res.error) {
          console.error(res.error)
          setError(true)
        }
        return res
      })
  }

  const reasons = [
    {
      value: 'mistake',
      label: 'Bought by mistake',
    },
    {
      value: 'betterPrice',
      label: 'Better price available',
    },
    {
      value: 'quality',
      label: 'Quality not adequate',
    },
    {
      value: 'productDamaged',
      label: 'Product damaged',
    },
    {
      value: 'arrivedLate',
      label: 'Item arrived late',
    },
    {
      value: 'noLongerNeeded',
      label: 'No longer needed',
    },
    {
      value: 'inaccurateDescription',
      label: 'Inaccurate web description',
    },
  ]

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography align="center" variant="h4" className={classes.title}>
            {t('details')}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={9}>
          <TextField
            id="outlined-basic"
            value={productDetails?.product_qty?.name}
            variant="outlined"
            size="small"
            helperText="Product"
            disabled={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            // className={classes.amountToAdd}
            onChange={event => setAmount(event.target.value)}
            InputProps={{ inputProps: { min: 1, max: productDetails?.product_qty?.qty } }}
            type="number"
            id="outlined-basic"
            value={amount}
            variant="outlined"
            size="small"
            helperText="Amount"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
            {t('why-are-you')}{' '}
            {requestType == 'return' ? 'returning' : requestType == 'cancel' ? 'cancelling' : null}{' '}
            {t('this-order')}
          </Typography>
          <TextField
            select
            value={reason}
            onChange={event => setReason(event.target.value)}
            disabled={loading || sent}
            fullWidth
            variant="outlined"
          >
            {reasons.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
            {t('provide-details')}
          </Typography>
          <TextField
            value={details ? details : ''}
            onChange={event => setDetails(event.target.value)}
            placeholder={t('tell-us-more')}
            variant="outlined"
            size="medium"
            name="tellUsMore"
            fullWidth
            type="text"
            multiline
            rows={4}
            disabled={loading || sent}
          />
        </Grid>
        <Grid item container justify="flex-start" xs={12}>
          {loading ? (
            <center>
              <CircularProgress />
            </center>
          ) : sent ? (
            <>
              <p className={classes.message}>
                {t('confirmation')}
                <br></br>
                {t('confirmation-2')}
              </p>
              <p>
                <Button
                  onClick={() => setFocusForm(false)}
                  className={classes.btnWhite}
                  variant="contained"
                  type="submit"
                  size="large"
                >
                  {t('close')}
                </Button>
              </p>
            </>
          ) : error ? (
            <p className={classes.message}>{t('error')}</p>
          ) : (
            <Button
              onClick={() => handleSubmit()}
              className={classes.btnWhite}
              variant="contained"
              type="submit"
              size="large"
            >
              {t('send')}
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
})

export default connect(mapStateToProps, null)(ContactForm)
