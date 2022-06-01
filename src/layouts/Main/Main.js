import React, { useEffect, useState } from 'react'
import { Navbar, Footer, Sidebar, CountryModal, CookiesConsent } from './components'
import { connect } from 'react-redux'
import { getCart } from '../../../redux/orders/action'
import { getUser, getGoogleUser, changeCountry } from '../../../redux/session/action'
import { useRouter } from 'next/router'
import ReactNotification from 'react-notifications-component'
import { makeStyles } from '@material-ui/core/styles'
import { Breadcrumbs } from 'nextjs-breadcrumbs'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  pageSize: {
    minHeight: 1050,
  },
  breadcrumbs: {
    position: 'absolute',
    zIndex: 1,
    fontSize: 10,
    width: '100%',
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    '& nav': {
      display: 'flex',
      alignItems: 'flex-end',
      paddingTop: 8,
    },
    '& .breadcrumb': {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'rgba(255, 255, 255, .15)',
      backdropFilter: 'blur(5px)',
      borderRadius: 5,
      height: '100%',
      maxWidth: 450,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '& li': {
        paddingLeft: 7,
        listStyle: 'none',
        '&::after': {
          content: '">"',
          paddingLeft: 7,
          color: '#7b7b7b',
        },
        '& a': {
          color: '#7b7b7b',
        },
      },
      '& li:last-child': {
        '&::after': {
          content: '""',
        },
      },
    },
  },
}))

const Main = props => {
  const {
    user,
    cart,
    diets,
    getUser,
    getGoogleUser,
    getCart,
    changeCountry,
    children,
    ...rest
  } = props
  const router = useRouter()
  const classes = useStyles()
  const [openSidebar, setOpenSidebar] = useState(false)
  const [cartFetched, setCartFetched] = useState(false)
  const [userFetched, setUserFetched] = useState(false)
  const [displayCountryModal, setDisplayCountryModal] = useState(false)

  useEffect(() => {
    var query = router.query
    var access_token = router.query.access_token
    if (!userFetched && access_token != null) {
      getGoogleUser(access_token)
      setUserFetched(true)
    }

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
    // else setDisplayCountryModal(true)
  }, [user, cart])

  useEffect(() => {
    const affiliate = router?.query?.a
    if (affiliate) {
      const existingAffiliate = localStorage.getItem('affiliate')
      if (existingAffiliate) {
        const affiliateCookie = JSON.parse(existingAffiliate)
        if (moment(affiliateCookie.expiry).isBefore()) {
          localStorage.removeItem('affiliate')
          var expiry = moment().add(1, 'M')
          localStorage.setItem(
            'affiliate',
            JSON.stringify({
              value: affiliate,
              expiry: expiry,
            })
          )
        }
      } else {
        var expiry = moment().add(1, 'M')
        localStorage.setItem(
          'affiliate',
          JSON.stringify({
            value: affiliate,
            expiry: expiry,
          })
        )
      }
    }
  }, [router?.query])

  const handleSidebarOpen = () => {
    setOpenSidebar(true)
  }

  const handleSidebarClose = () => {
    setOpenSidebar(false)
  }

  const breadcrumbs = Breadcrumbs()
  return (
    <div>
      <ReactNotification />
      {/* {router.route != '/' ? null : <TopbarPromotion />} */}
      <Navbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar onClose={handleSidebarClose} open={openSidebar} variant="temporary" />
      <main>
        {router.route != '/' && router.route != '/products' && (
          <div className={classes.breadcrumbs}>{breadcrumbs}</div>
        )}
        <span className={classes.pageSize}>{children}</span>
      </main>
      <CookiesConsent />
      <Footer />
      <CountryModal open={displayCountryModal} setDisplayCountryModal={setDisplayCountryModal} />
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session?.user,
  cart: state.orders?.cart,
  diets: state.products?.diets,
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    getUser: () => dispatch(getUser()),
    getGoogleUser: access_token => dispatch(getGoogleUser(access_token)),
    changeCountry: country => {
      return dispatch(changeCountry(country))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
