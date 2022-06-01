import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button, useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    background: theme.palette.grey.main,
    filter: 'drop-shadow(1px 2px 2px #eeeeee)',
    position: '-webkit-sticky',
    position: 'sticky',
    bottom: 0,
  },
  toolbar: {
    maxWidth: 800,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    minHeight: 60,
    display: 'flex',
    justifyContent: 'space-around',
  },
}))

const CookiesConsent = props => {
  const { user, ...rest } = props
  const classes = useStyles()
  const router = useRouter()
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(true)

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    var cookieConsentAccepted = localStorage.getItem('cookieConsentAccepted')
    if (!cookieConsentAccepted) setCookieConsentAccepted(true)
  }, [])

  const handleConsent = () => {
    setCookieConsentAccepted(true)
    localStorage.setItem('cookieConsentAccepted', true)
  }

  return (
    <AppBar {...rest} position="relative" className={classes.root}>
      {!cookieConsentAccepted && (
        <Toolbar disableGutters className={classes.toolbar}>
          <div>This website uses cookies to ensure you get the best experience on our website.</div>
          <Button
            onClick={() => handleConsent()}
            className={classes.button}
            variant="contained"
            color="primary"
            // size="large"
          >
            {isSm ? 'Accept Cookies' : 'Accept'}
          </Button>
        </Toolbar>
      )}
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user: state.session?.user,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CookiesConsent)
