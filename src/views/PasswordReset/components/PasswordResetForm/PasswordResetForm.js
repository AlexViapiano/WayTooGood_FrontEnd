import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button, TextField } from '@material-ui/core'
import validate from 'validate.js'
import { connect } from 'react-redux'
import { resetPassword } from '../../../../../redux/session/action'
import Link from 'next/link'
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
}))

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
}

const PasswordResetForm = ({ resetPassword, user, setView }) => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation('passwordReset')

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState(false)
  const [atleastOneLetter, setAtleastOneLetter] = useState(false)
  const [atleastOneNumb, setAtleastOneNumb] = useState(false)
  const [sixCharsMin, setSixCharsMin] = useState('')
  const [passwordEqualsConfirm, setPasswordEqualsConfirm] = useState(false)
  const [requestError, setRequestError] = useState(false)

  const handleChange = event => {
    var password = event.target.value
    setPassword(password)

    if (/[a-zA-Z]/.test(password)) setAtleastOneLetter(true)
    else setAtleastOneLetter(false)

    if (/\d/.test(password)) setAtleastOneNumb(true)
    else setAtleastOneNumb(false)

    if (password.length >= 6) setSixCharsMin(true)
    else setSixCharsMin(false)
  }

  const handleChangeConfirmation = event => {
    var confirmation = event.target.value
    setPasswordConfirmation(confirmation)
    if (password == confirmation) setPasswordEqualsConfirm(true)
    else setPasswordEqualsConfirm(false)
  }

  const handleSubmit = event => {
    event.preventDefault()

    setError(false)
    if (
      router.query.code == null ||
      !atleastOneLetter ||
      !atleastOneNumb ||
      !sixCharsMin ||
      !passwordEqualsConfirm
    )
      setError(true)
    else {
      resetPassword(router.query.code, password, passwordConfirmation).then(res => {
        if (res.error) setRequestError(true)
        else router.push('/')
      })
    }
  }

  return (
    <div className={classes.root}>
      {!requestError ? (
        <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                placeholder={t('new-password')}
                label="New Password *"
                variant="outlined"
                size="medium"
                name="password"
                fullWidth
                helperText={
                  !atleastOneLetter
                    ? t('req-1')
                    : !atleastOneNumb
                    ? t('req-2')
                    : !sixCharsMin
                    ? t('req-3')
                    : null
                }
                error={error}
                onChange={handleChange}
                type="password"
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder={t('confirm-password')}
                label="Confirm Password *"
                variant="outlined"
                size="medium"
                name="password"
                fullWidth
                helperText={
                  atleastOneLetter && atleastOneNumb && sixCharsMin && !passwordEqualsConfirm
                    ? t('req-4')
                    : null
                }
                error={error}
                onChange={handleChangeConfirmation}
                type="password"
                value={passwordConfirmation}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={
                  !atleastOneLetter || !atleastOneNumb || !sixCharsMin || !passwordEqualsConfirm
                }
                size="large"
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                {t('send')}
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Typography variant="subtitle1" color="textSecondary" align="center">
          {t('error')}
          <br></br>
          <Link href="/">
            <a className={classes.a}>{t('home')}</a>
          </Link>
        </Typography>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
})

const mapDispatchToProps = dispatch => ({
  resetPassword: (code, password, passwordConfirmation) => {
    return dispatch(resetPassword(code, password, passwordConfirmation))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm)
