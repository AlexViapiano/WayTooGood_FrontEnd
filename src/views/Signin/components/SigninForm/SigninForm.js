import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button, TextField } from '@material-ui/core'
import validate from 'validate.js'
import Link from 'next/link'
import { connect } from 'react-redux'
import { login } from '../../../../../redux/session/action'
import clsx from 'clsx'
import { API_URL } from '../../../../../redux/api'
import { useTranslation } from 'next-i18next'

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
  btnGoogle: {
    background: '#4285f4',
    color: theme.palette.white,
  },
  googleIcon: {
    paddingRight: 15,
    color: theme.palette.white,
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
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
    },
  },
}

const SigninForm = ({ login }) => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation('signIn')

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
      login(formState.values).then(res => {
        if (!res.error) {
          router.back() //.push('/')
        } else {
          console.error(res.error)
          var errors = {
            email: [t('e-mail-invalid')],
            password: [t('e-mail-invalid')],
          }
          setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
          }))
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
          <Grid item xs={12}>
            <TextField
              placeholder={t('e-mail')}
              label="E-mail *"
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
              label="Password *"
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
          <Grid item xs={12}>
            <Button size="large" variant="contained" type="submit" color="primary" fullWidth>
              {t('sign-in')}
            </Button>
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary" align="center">
              {t('or')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <a href={API_URL + `/connect/google/callback`}>
              <Button
                size="large"
                variant="contained"
                color="default"
                fullWidth
                className={classes.btnGoogle}
              >
                <i aria-hidden className={clsx('fa fa-google', classes.googleIcon)} />
                {t('google-sign-in')}
              </Button>
            </a>
          </Grid> */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary" align="center">
              {t('forgot-password')}{' '}
              <Link href="/forgot-password">
                <a className={classes.a}>{t('reset-password')}</a>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  login: creds => {
    return dispatch(login(creds))
  },
})

export default connect(null, mapDispatchToProps)(SigninForm)
