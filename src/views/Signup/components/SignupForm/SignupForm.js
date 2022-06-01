import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button, TextField } from '@material-ui/core'
import validate from 'validate.js'

import Link from 'next/link'
import { connect } from 'react-redux'
import { signup } from '../../../../../redux/session/action'
import { useTranslation } from 'next-i18next'

import ReCAPTCHA from 'react-google-recaptcha'
const recaptchaRef = React.createRef()

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  a: {
    color: '#3f51b5',
    fontWeight: 1000,
    cursor: 'pointer',
    marginLeft: 10,
  },
  error: {
    color: theme.palette.error.main,
    fontSize: 20,
    fontWeight: 700,
  },
}))

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120,
    },
  },
  first_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120,
    },
  },
  last_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 120,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
    },
  },
  phone_number: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
    },
  },
}

const SignupForm = ({ signup, user, setView }) => {
  const router = useRouter()
  const classes = useStyles()
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState(null)

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  })
  const { t } = useTranslation('signUp')

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
        if (!res.error) {
          router.push('/')
        } else {
          setError(res)
        }
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
    <div className={classes.root}>
      <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder={t('phone-number')}
              label={t('phone-number-1')}
              variant="outlined"
              size="medium"
              name="phone_number"
              fullWidth
              helperText={hasError('phone_number') ? formState.errors.phone_number[0] : null}
              error={hasError('phone_number')}
              onChange={handleChange}
              type="phone_number"
              value={formState.values.phone_number || ''}
            />
          </Grid>
          <Grid item xs={12}>
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
            />
          </Grid>
          <Grid item xs={12}>
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
            />
          </Grid>
          <Grid item xs={12}>
            <i>
              <Typography variant="subtitle2">{t('required-fields')}</Typography>
            </i>
          </Grid>

          <Grid align="center" item xs={12}>
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

          <Grid item xs={12}>
            <Button size="large" variant="contained" type="submit" color="primary" fullWidth>
              {t('sign-up')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary" align="center">
              {t('already-account')}{' '}
              <Link href="/signin">
                <a className={classes.a}>{t('sign-in')}</a>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
})

const mapDispatchToProps = dispatch => ({
  signup: creds => {
    return dispatch(signup(creds))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
