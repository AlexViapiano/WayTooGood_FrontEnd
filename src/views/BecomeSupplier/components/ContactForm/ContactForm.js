import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { API_URL } from '../../../../../redux/api'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiOutlinedInput-root': {
      background: '#fff',
    },
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    color: 'white',
  },
  textWhite: {
    color: 'white',
  },
  btnWhite: {
    background: theme.palette.white,
  },
  message: {
    background: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    width: '100%',
    textAlign: 'center',
  },
  pagePaddingTop: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
  },
  appBarBottom: {
    top: 'auto',
    bottom: 0,
    background: 'transparent',
    boxShadow: 'none',
  },
  toolbarBottom: {
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
  },
  chatIconButton: {
    position: 'absolute',
    right: theme.spacing(3),
    left: 'auto',
    top: theme.spacing(-3),
    background: theme.palette.primary.main,
    width: 55,
    height: 55,
    boxShadow: '0 2px 10px 0 rgba(23,70,161,.11)',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  forumIcon: {
    color: 'white',
    width: 25,
    height: 25,
  },
  contactForm: {
    padding: theme.spacing(3, 2),
    maxWidth: 800,
    margin: '0 auto',
  },
  background: {
    backgroundImage: `linear-gradient(117deg, rgb(255 231 253) 0%, rgb(223 233 255) 35%, rgb(243 255 245) 60%, rgb(252 255 225) 100%)`,
  },
}))

const ContactForm = props => {
  const { setFocusForm, className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('becomeSupplier')

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [tellUsMore, setTellUsMore] = useState('')

  const handleSubmit = async event => {
    setLoading(true)
    const data = {
      companyName: companyName,
      phoneNumber: phoneNumber,
      email: email,
      website: website,
      description: description,
      tellUsMore: tellUsMore,
    }

    return fetch(`${API_URL}/become-supplier`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.textWhite}>
            {t('contact-title')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={companyName ? companyName : ''}
            onChange={event => setCompanyName(event.target.value)}
            placeholder={t('company-name-placeholder')}
            variant="outlined"
            size={isSm ? 'medium' : 'small'}
            label={t('company-name')}
            name="companyName"
            fullWidth
            type="text"
            disabled={loading || sent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={phoneNumber ? phoneNumber : ''}
            onChange={event => setPhoneNumber(event.target.value)}
            placeholder={t('phone-number-placeholder')}
            variant="outlined"
            size={isSm ? 'medium' : 'small'}
            label={t('phone-number')}
            name="phoneNumber"
            fullWidth
            type="text"
            disabled={loading || sent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={email ? email : ''}
            onChange={event => setEmail(event.target.value)}
            placeholder={t('e-mail-placeholder')}
            variant="outlined"
            size={isSm ? 'medium' : 'small'}
            label={t('e-mail')}
            name="email"
            fullWidth
            type="text"
            disabled={loading || sent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={website ? website : ''}
            onChange={event => setWebsite(event.target.value)}
            placeholder={t('website-placeholder')}
            variant="outlined"
            size={isSm ? 'medium' : 'small'}
            label={t('website')}
            name="website"
            fullWidth
            type="text"
            disabled={loading || sent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={description ? description : ''}
            onChange={event => setDescription(event.target.value)}
            placeholder={t('company-description-placeholder')}
            variant="outlined"
            size={isSm ? 'medium' : 'small'}
            label={t('company-description')}
            name="companyDescription"
            fullWidth
            type="text"
            multiline
            rows={4}
            disabled={loading || sent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={tellUsMore ? tellUsMore : ''}
            onChange={event => setTellUsMore(event.target.value)}
            placeholder={t('tell-us-placeholder')}
            variant="outlined"
            size={isSm ? 'medium' : 'small'}
            label={t('tell-us')}
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

export default connect(null, null)(ContactForm)
