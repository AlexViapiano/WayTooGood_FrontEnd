import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography, Grid, Button, TextField, IconButton, DialogContent } from '@material-ui/core'
import validate from 'validate.js'
import { connect } from 'react-redux'
import { forgotPassword } from '../../../../../redux/session/action'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'
import { useMediaQuery } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'

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
  dialogContainer: {
    '& .MuiDialogContent-root': {
      padding: 20,
      width: 500,
      textAlign: 'center',
      overflow: 'hidden',
    },
  },
  dialogContainerSmall: {
    '& .MuiDialogContent-root': {
      padding: 10,
      overflow: 'hidden',
    },
  },
  headerContainer: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    padding: 8,
    color: '#FFF',
  },
  title: {
    margin: 'auto',
    fontSize: '24px',
    color: 'white',
    paddingRight: 15,
  },

  homeButton: {
    marginTop: 10,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ForgotPasswordForm = ({ onClose, forgotPassword, user, setView }) => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation('forgotPassword')
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))

  const [emailSent, setEmailSent] = useState(false)
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
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

  const handleSubmit = async () => {
    event.preventDefault()

    if (formState.isValid) {
      const res = await forgotPassword(formState.values.email)
      setEmailSent(true)
    }
  }

  const hasError = field => (formState.touched[field] && formState.errors[field] ? true : false)

  return (
    <div className={classes.root}>
      {!emailSent ? (
        <form name="forgot-password-form" method="post" onSubmit={handleSubmit}>
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
              <Button
                onClick={() => setOpen(true)}
                size="large"
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                {t('send')}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textSecondary" align="center">
                {t('remember-password')}{' '}
                <Link href="/signin">
                  <a className={classes.a}>{t('sign-in')}</a>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className={isSm ? classes.dialogContainer : classes.dialogContainerSmall}
        >
          <div className={classes.headerContainer}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon className={classes.close} />
            </IconButton>
            <Typography variant="h8" className={classes.title}>
              {t('reset-password')}
            </Typography>
          </div>
          <DialogContent>
            <Typography variant="subtitle1" color="textSecondary" align="center">
              {t('confirmation')}
              <br></br>
              <Link href="/">
                <Button
                  className={classes.homeButton}
                  size="samll"
                  variant="contained"
                  color="primairy"
                >
                  <span>{t('home')}</span>
                </Button>
              </Link>
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
})

const mapDispatchToProps = dispatch => ({
  forgotPassword: email => {
    return dispatch(forgotPassword(email))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm)
