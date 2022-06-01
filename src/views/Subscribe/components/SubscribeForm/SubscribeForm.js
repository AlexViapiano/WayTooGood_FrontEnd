import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import CheckoutSubscribe from './CheckoutSubscribe'
import SignupSubscribe from './SignupSubscribe'
import LoginSubscribe from './LoginSubscribe'
import { CircularProgress, Typography } from '@material-ui/core'
import { Section } from 'components/organisms'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 0,
    '& input': {
      background: '#FFF',
    },
    '& .MuiSelect-select': {
      background: '#FFF',
    },
  },
  container: {
    maxWidth: 1000,
    borderRadius: 25,
  },
}))

const SubscribeForm = props => {
  const { user, price } = props
  const classes = useStyles()
  const { t } = useTranslation('subscribe')
  const theme = useTheme()
  const [displaySignup, setDisplaySignup] = useState(true)

  var isLoggedIn = user && Object.keys(user).length !== 0

  return (
    <Section className={classes.root}>
      <div className={classes.container}>
        {!isLoggedIn && displaySignup ? (
          <SignupSubscribe setDisplaySignup={setDisplaySignup} />
        ) : !isLoggedIn ? (
          <LoginSubscribe setDisplaySignup={setDisplaySignup} />
        ) : isLoggedIn ? (
          <CheckoutSubscribe price={price} />
        ) : (
          <CircularProgress />
        )}
      </div>
    </Section>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
})

export default connect(mapStateToProps, null)(SubscribeForm)
