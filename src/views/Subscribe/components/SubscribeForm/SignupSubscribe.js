import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Button, Typography, Grid, TextField, useMediaQuery } from '@material-ui/core'
import { useTranslation } from 'next-i18next'
import validate from 'validate.js'
import { signup } from '../../../../../redux/session/action'
import { SectionHeader } from 'components/molecules'

import ReCAPTCHA from 'react-google-recaptcha'
const recaptchaRef = React.createRef()

const useStyles = makeStyles(theme => ({
  overflowHidden: {
    overflow: 'hidden',
  },
  btn: {
    maxWidth: 500,
  },
}))

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 100,
    },
  },
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 50,
    },
  },
  first_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 50,
    },
  },
  last_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 50,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 7,
    },
  },
  phone_number: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 7,
    },
  },
}

const SignupSubscribe = props => {
  const { signup, setDisplaySignup } = props
  const classes = useStyles()
  const { t } = useTranslation('subscribe')
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))

  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState(null)

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  })

  React.useEffect(() => {
    const errors = validate(formState.values, schema)

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }))
  }, [formState.values])

  const handleChange = event => {
    event.persist()

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (formState.isValid) {
      if (!isVerified) {
        alert('Please verify that you are a human!')
        return
      }
      signup(formState.values).then(res => {
        if (res.error) setError(res)
      })
    }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }))
  }

  const hasError = field => (formState.touched[field] && formState.errors[field] ? true : false)

  return (
    <form name="signup-subscribe" method="post" onSubmit={handleSubmit}>
      <SectionHeader
        title={<Typography variant="h3">{t('get-sign-up')}</Typography>}
        subtitle={<Typography variant="h6">{t('get-sign-up-subtitle')}</Typography>}
        titleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        fadeUp
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            placeholder={t('first-name')}
            label={t('first-name-1')}
            variant="outlined"
            size="medium"
            name="first_name"
            fullWidth
            helperText={hasError('first_name') ? formState.errors.first_name[0] : null}
            error={hasError('first_name')}
            onChange={handleChange}
            type="first_name"
            value={formState.values.first_name || ''}
            size={isSm ? 'large' : 'small'}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder={t('last-name')}
            label={t('last-name-1')}
            variant="outlined"
            size="medium"
            name="last_name"
            fullWidth
            helperText={hasError('last_name') ? formState.errors.last_name[0] : null}
            error={hasError('last_name')}
            onChange={handleChange}
            type="last_name"
            value={formState.values.last_name || ''}
            size={isSm ? 'large' : 'small'}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder={t('phone-number')}
            label={t('phone-number')}
            variant="outlined"
            size="medium"
            name="phone_number"
            fullWidth
            helperText={hasError('phone_number') ? formState.errors.phone_number[0] : null}
            error={hasError('phone_number')}
            onChange={handleChange}
            type="number"
            value={formState.values.phone_number || ''}
            size={isSm ? 'large' : 'small'}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder={t('username')}
            label={t('username-1')}
            variant="outlined"
            size="medium"
            name="username"
            fullWidth
            helperText={hasError('username') ? formState.errors.username[0] : null}
            error={hasError('username')}
            onChange={handleChange}
            type="username"
            value={formState.values.username || ''}
            size={isSm ? 'large' : 'small'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            placeholder={t('e-mail')}
            label={t('e-mail-1')}
            variant="outlined"
            size="medium"
            name="email"
            fullWidth
            helperText={hasError('email') ? formState.errors.email[0] : null}
            error={hasError('email')}
            onChange={handleChange}
            type="email"
            value={formState.values.email || ''}
            size={isSm ? 'large' : 'small'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            placeholder={t('password')}
            label={t('password-1')}
            variant="outlined"
            size="medium"
            name="password"
            fullWidth
            helperText={hasError('password') ? formState.errors.password[0] : null}
            error={hasError('password')}
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            size={isSm ? 'large' : 'small'}
          />
        </Grid>
        <Grid item xs={12}>
          <i>
            <Typography variant="subtitle2">{t('required-fields')}</Typography>
          </i>
        </Grid>

        <Grid align="center" item xs={12} className={classes.overflowHidden}>
          <ReCAPTCHA
            ref={recaptchaRef}
            onChange={() => setIsVerified(true)}
            sitekey="6LfZvv8ZAAAAALnt9R8q0J7p8JrE7iUgy3uorGVA"
          />
        </Grid>

        {error && (
          <Grid align="center" item xs={12}>
            <Typography variant="subtitle2" className={classes.error}>
              {error?.message[0]?.messages[0].message
                ? error?.message[0]?.messages[0].message
                : t('error')}
            </Typography>
          </Grid>
        )}

        <Grid align="center" item xs={12}>
          <Button
            className={classes.btn}
            size="large"
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >
            {t('sign-up')}
          </Button>
        </Grid>
        <Grid align="center" item xs={12}>
          <br></br>
          <Typography variant="subtitle1" color="textSecondary" align="center">
            {t('already-account')}
          </Typography>
          <Button
            className={classes.btn}
            onClick={() => setDisplaySignup(false)}
            size="large"
            variant="contained"
            type="submit"
            color="secondary"
            fullWidth
          >
            {t('sign-in')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  signup: creds => {
    return dispatch(signup(creds))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupSubscribe)
