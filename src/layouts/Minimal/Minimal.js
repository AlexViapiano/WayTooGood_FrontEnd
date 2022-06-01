import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Topbar } from './components'
import { connect } from 'react-redux'
import { getCart } from '../../../redux/orders/action'
import { getUser, changeCountry } from '../../../redux/session/action'
import ReactNotification from 'react-notifications-component'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('lg')]: {
      paddingTop: 64,
    },
  },
  content: {
    height: '100%',
  },
}))

const Minimal = props => {
  const { user, cart, getUser, getCart, children, className, ...rest } = props
  const classes = useStyles()
  const [cartFetched, setCartFetched] = useState(false)
  const [userFetched, setUserFetched] = useState(false)
  const [displayCountryModal, setDisplayCountryModal] = useState(false)

  useEffect(() => {
    if (!cartFetched) {
      getCart()
      setCartFetched(true)
    }
    if (
      !userFetched &&
      user &&
      Object.keys(user).length === 0 &&
      localStorage.getItem('jwt') != null &&
      localStorage.getItem('jwt').length > 0
    ) {
      getUser()
      setUserFetched(true)
    }
    var country = localStorage.getItem('country')
    if (country) changeCountry(country)
    else setDisplayCountryModal(true)
  }, [user, cart])

  return (
    <div className={clsx(classes.root, className)}>
      <ReactNotification />
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session?.user,
  cart: state.orders?.cart,
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    getUser: () => dispatch(getUser()),
    country: country => {
      return dispatch(changeCountry(country))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Minimal)
