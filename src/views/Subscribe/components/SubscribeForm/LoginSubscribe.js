import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button, TextField } from '@material-ui/core'
import validate from 'validate.js'
import Link from 'next/link'
import { connect } from 'react-redux'
import { login } from '../../../../../redux/session/action'
import { useTranslation } from 'next-i18next'
import { SectionHeader } from 'components/molecules'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
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
  btn: {
    maxWidth: 500,
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

const LoginSubscribe = props => {
  const { login, setDisplaySignup } = props
  const classes = useStyles()
  const { t } = useTranslation('subscribe')

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
        if (res.error) {
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
      <form name="login-subscribe" method="post" onSubmit={handleSubmit}>
        <SectionHeader
          title={<Typography variant="h3">{t('log-in-waytoogood')}</Typography>}
          // subtitle={<Typography variant="h6"></Typography>}
          titleProps={{
            variant: 'body1',
            color: 'textPrimary',
          }}
          fadeUp
        />

        <Grid container spacing={4}>
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

          <Grid align="center" item xs={12}>
            <Button
              className={classes.btn}
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              {t('sign-in')}
            </Button>
          </Grid>
          <Grid align="center" item xs={12}>
            <br></br>
            <Typography variant="subtitle1" color="textSecondary" align="center">
              {t('no-account')}
            </Typography>
            <Button
              className={classes.btn}
              onClick={() => setDisplaySignup(true)}
              size="large"
              variant="contained"
              type="submit"
              color="secondary"
              fullWidth
            >
              {t('sign-up')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary" align="center">
              {t('forgot-password')}
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

export default connect(null, mapDispatchToProps)(LoginSubscribe)
