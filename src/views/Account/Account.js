import React, { useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, List, ListItem, Grid, Typography, Button, CircularProgress } from '@material-ui/core'
import { SectionAlternate, CardBase } from 'components/organisms'
import { Hero, General, Orders, UserSubscriptions, ProductReviews, Favorites } from './components'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    '& .MuiBox-root': {
      width: '100%',
    },
  },
  section: {
    '& .section-alternate__content': {
      paddingTop: 0,
      marginTop: theme.spacing(-5),
      position: 'relative',
      zIndex: 1,
      minHeight: 800,
    },
    '& .card-base__content': {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
  },
  menu: {
    height: 'auto',
  },
  list: {
    display: 'inline-flex',
    overflow: 'visible',
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(-3),
      marginLeft: theme.spacing(-3),
    },
  },
  listItem: {
    cursor: 'pointer',
    marginRight: theme.spacing(2),
    flex: 0,
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      borderLeft: '2px solid transparent',
    },
  },
  listItemActive: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    '& .menu__item': {
      color: theme.palette.text.primary,
    },
  },
}))

const subPages = [
  {
    id: 'general',
    title: 'general',
  },
  {
    id: 'orders',
    title: 'orders',
  },
  {
    id: 'subscriptions',
    title: 'subscriptions',
  },
  {
    id: 'productReviews',
    title: 'reviews',
  },
  {
    id: 'favorites',
    title: 'favorites',
  },
]

const TabPanel = props => {
  const { children, value, index, ...other } = props

  return (
    <Box component="div" hidden={value !== index} {...other}>
      {value === index && children}
    </Box>
  )
}

const Account = props => {
  const {
    className,
    selectedView,
    subview,
    user,
    locale,
    stripeCustomer,
    userLoading,
    ...rest
  } = props
  const { t } = useTranslation('account')
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CardBase withShadow align="left" className={classes.menu}>
              <List disablePadding className={classes.list}>
                {subPages.map((item, index) => (
                  <ListItem
                    key={index}
                    onClick={() => {
                      router.push('/account/' + item.id, '/account/' + item.id, {
                        locale: locale,
                      })
                    }}
                    // onClick={
                    //   item.id != 'subscription'
                    //     ? () =>
                    //         router.push('/account/' + item.id, '/account/' + item.id, {
                    //           locale: locale,
                    //         })
                    //     : null
                    // }
                    component={'a'}
                    className={clsx(
                      classes.listItem,
                      selectedView === item.id ? classes.listItemActive : {}
                    )}
                    disableGutters
                  >
                    <Typography
                      variant="subtitle1"
                      noWrap
                      color="textSecondary"
                      className="menu__item"
                    >
                      {t(item.title)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardBase>
          </Grid>
          <Grid item xs={12} md={9}>
            {userLoading ? (
              <center>
                <CircularProgress />
              </center>
            ) : user && Object.keys(user).length === 0 ? (
              <CardBase className="cardBase" withShadow align="center">
                <Typography variant="h6" color="textPrimary">
                  Please log in!
                </Typography>
                <br />
                <Link href="/signin">
                  <a>
                    <Button variant="contained" type="submit" color="primary" size="large">
                      Login
                    </Button>
                  </a>
                </Link>
              </CardBase>
            ) : (
              <CardBase className="cardBase" withShadow align="left">
                <TabPanel value={selectedView} index={'general'}>
                  <General />
                </TabPanel>
                <TabPanel value={selectedView} index={'orders'}>
                  <Orders />
                </TabPanel>
                <TabPanel value={selectedView} index={'subscriptions'}>
                  <UserSubscriptions />
                </TabPanel>
                <TabPanel value={selectedView} index={'productReviews'}>
                  <ProductReviews className={classes.root} />
                </TabPanel>
                <TabPanel value={selectedView} index={'favorites'}>
                  <Favorites />
                </TabPanel>
              </CardBase>
            )}
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
  locale: state.session.locale,
  stripeCustomer: state.session.stripeCustomer,
  currentSubView: state.session.currentSubView,
  userLoading: state.session.userLoading,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
