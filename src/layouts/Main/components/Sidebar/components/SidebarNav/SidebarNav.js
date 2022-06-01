import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  List,
  ListItem,
  Typography,
  Button,
  Badge,
  Collapse,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { logout } from '../../../../../../../redux/session/action'
import {
  setDiet,
  setCategory,
  setSale,
  refreshProducts,
} from '../../../../../../../redux/products/action'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import Link from 'next/link'
import { store } from 'react-notifications-component'
import Image from 'next/image'
import {
  Search,
  LocalMall,
  LocalDining,
  LocalPizza,
  ShoppingCartTwoTone,
  Fastfood,
  LocalOffer,
  Person,
  PersonOutline,
  PersonAdd,
  ExitToApp,
  ExpandMore,
  ExpandLess,
  Settings,
  ShoppingBasket,
  RateReview,
  Close,
  ContactSupport,
} from '@material-ui/icons'
import { useTranslation } from 'next-i18next'
import { diets, categories } from '../../../../../../common/data'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiButton-label': {
      justifyContent: 'flex-start',
    },
    '& .MuiListItemText-root': {
      color: '#5f5f5f',
    },
    '& .MuiListItem-button': {
      borderBottom: '1px solid #eee',
    },
  },
  list: {
    paddingTop: 0,
  },
  buttonFirst: {
    borderTop: '1px solid #eee',
  },
  topSection: {
    background: '#d7e6ff',
    minHeight: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    margin: 10,
    height: 25,
  },
  avatar: {
    width: 60,
    height: 60,
    marginBottom: 10,
    boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
  },
  username: {
    maxWidth: 200,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  email: {
    maxWidth: 200,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  buttonIcon: {
    marginRight: 10,
    display: 'flex',
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& button': {
      padding: `8px 15px`,
    },
  },
  badge: {
    width: '100%',
  },
  boldText: {
    '& span': {
      fontWeight: 700,
    },
  },
  navLink: {
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItemIcon: {
    minWidth: 'auto',
    color: '#4f5b6d',
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    marginRight: theme.spacing(8),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
  divider: {
    width: '100%',
    background: '#4f5b6d',
  },
  saleIcon: {
    color: '#f77070',
  },
}))

const SidebarNav = props => {
  const {
    user,
    cart,
    setDiet,
    setCategory,
    setSale,
    logout,
    pages,
    onClose,
    className,
    ...rest
  } = props
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('common')
  const [shopOpen, setShopOpen] = useState(true)
  const [dietOpen, setDietOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const navigate = view => {
    router.push('/' + view, undefined, { shallow: true })
    onClose()
  }

  const onClickLogout = () => {
    logout()
    onClose()
  }

  const onClickCart = () => {
    if (cart.length == 0) {
      store.addNotification({
        title: 'Cart Empty!',
        message: 'Add a product before entering checkout.',
        type: 'warning',
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      })
    } else router.push('/cart', undefined, { shallow: true })
  }

  const onClickFilter = (filterType, name) => {
    if (filterType == 'sale') setSale(true)
    if (filterType == 'varietyPacks') setVarietyPacks(true)
    if (filterType == 'diet') setDiet(name, true)
    if (filterType == 'category') setCategory(name, true)
    if (filterType == 'brand') setBrand(name)
    refreshProducts()
    onClose()
    router.push('/products', undefined, { shallow: true })
  }

  return (
    <>
      <div className={classes.topSection}>
        <div className={classes.closeBtn} onClick={() => onClose()}>
          <Close />
        </div>

        {user && Object.keys(user).length === 0 ? (
          <div>
            <Image
              src="/images/photos/wbox.png"
              alt="wtg"
              width={125}
              height={125}
              loading="lazy"
            />
          </div>
        ) : (
          <>
            <Avatar
              alt={user?.username ? user.username : 'profile-pic'}
              src={
                user?.profile_pic?.formats?.thumbnail?.url
                  ? user?.profile_pic?.formats?.thumbnail?.url
                  : null
              }
              className={classes.avatar}
            />
            {user.username && (
              <Typography
                onClick={onClose}
                color="secondary"
                variant="h6"
                className={classes.username}
              >
                {user.username}
              </Typography>
            )}
            {user.email && (
              <Typography
                onClick={onClose}
                color="secondary"
                variant="body2"
                className={classes.email}
              >
                {user.email}
              </Typography>
            )}
          </>
        )}
      </div>
      <List {...rest} className={clsx(classes.root, classes.list)}>
        <Link href="/subscribe">
          <a>
            <ListItem button className={classes.buttonFirst}>
              <ListItemIcon>
                <Image
                  className={classes.buttonIcon}
                  src={'/images/photos/w.png'}
                  alt={'waytoogood'}
                  loading="lazy"
                  width={24}
                  height={21}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <Typography color="textSecondary" className={classes.listItemText}>
                      {t('get-the')} {t('box')}
                    </Typography>
                  </>
                }
                className={classes.boldText}
              />
            </ListItem>
          </a>
        </Link>

        <Link href="/products">
          <a>
            <ListItem button>
              <ListItemIcon>
                <ListItemIcon>
                  <LocalMall />
                </ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={t('shop-now')} />
            </ListItem>
          </a>
        </Link>

        {/* <ListItem button onClick={() => onClickCart()}>
          <ListItemIcon>
            <Badge
              className={classes.badge}
              badgeContent={cart?.length}
              color="primary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <ShoppingCartTwoTone />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={t('cart')} />
        </ListItem> */}

        <List onClick={() => onClickFilter('sale', '')} component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <LocalOffer className={classes.saleIcon} />
            </ListItemIcon>
            <ListItemText primary={t('sales')} />
          </ListItem>
        </List>

        {/* <ListItem button onClick={() => setShopOpen(!shopOpen)}>
          <ListItemIcon>
            <ListItemIcon>
              <Search />
            </ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={t('filters')} />
          {shopOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem> */}

        <Collapse in={shopOpen} timeout="auto" unmountOnExit>
          <ListItem button onClick={() => setDietOpen(!dietOpen)}>
            <ListItemIcon>
              <LocalDining />
            </ListItemIcon>
            <ListItemText primary={t('diets')} />
            {dietOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          {diets.length > 0 &&
            diets.map(diet => {
              if (diet.navbar) {
                return (
                  <Collapse in={dietOpen} timeout="auto" unmountOnExit>
                    <List
                      onClick={() => onClickFilter('diet', diet.id)}
                      component="div"
                      disablePadding
                    >
                      <ListItem button className={classes.nested}>
                        <ListItemText primary={t(diet.name)} />
                      </ListItem>
                    </List>
                  </Collapse>
                )
              }
            })}

          <ListItem button onClick={() => setCategoryOpen(!categoryOpen)}>
            <ListItemIcon>
              <LocalPizza />
            </ListItemIcon>
            <ListItemText primary={t('categories')} />
            {categoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          {categories.length > 0 &&
            categories.map(category => {
              return (
                <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                  <List
                    onClick={() => onClickFilter('category', category.name)}
                    component="div"
                    disablePadding
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemText primary={t(category.name)} />
                    </ListItem>
                  </List>
                </Collapse>
              )
            })}

          <Link href="/brands">
            <a>
              <ListItem button onClick={() => navigate('brands')}>
                <ListItemIcon>
                  <Fastfood />
                </ListItemIcon>
                <ListItemText primary={t('brands')} />
              </ListItem>
            </a>
          </Link>
        </Collapse>

        <Link href="/contact">
          <a>
            <ListItem button>
              <ListItemIcon>
                <ContactSupport className={classes.buttonIcon} />
              </ListItemIcon>
              <ListItemText primary={t('contact-us')} />
            </ListItem>
          </a>
        </Link>

        {user && Object.keys(user).length === 0 ? (
          <>
            {/* <Link href="/signup">
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <PersonAdd />
                  </ListItemIcon>
                  <ListItemText primary={t('signup')} />
                </ListItem>
              </a>
            </Link> */}

            <Link href="/signin">
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <Person className={classes.buttonIcon} />
                  </ListItemIcon>
                  <ListItemText primary={t('login')} />
                </ListItem>
              </a>
            </Link>
          </>
        ) : (
          <>
            <ListItem button onClick={() => setAccountOpen(!accountOpen)}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary={t('settings')} />
              {accountOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={accountOpen} timeout="auto" unmountOnExit>
              <List
                // onClick={() => onClickFilter('category', category.name)}
                component="div"
                disablePadding
              >
                <Link href="/account/general">
                  <a>
                    <ListItem button>
                      {/* <ListItemIcon>
                        <PersonOutline />
                      </ListItemIcon> */}
                      <ListItemText primary={t('account')} />
                    </ListItem>
                  </a>
                </Link>

                <Link href="/account/orders">
                  <a>
                    <ListItem button>
                      {/* <ListItemIcon>
                        <ShoppingBasket />
                      </ListItemIcon> */}
                      <ListItemText primary={t('orders')} />
                    </ListItem>
                  </a>
                </Link>

                <Link href="/account/subscriptions">
                  <a>
                    <ListItem button>
                      {/* <ListItemIcon>
                        <Image
                          className={classes.buttonIcon}
                          src={'/images/photos/w.png'}
                          alt={'waytoogood'}
                          loading="lazy"
                          width={24}
                          height={21}
                        />
                      </ListItemIcon> */}
                      <ListItemText primary={t('subscriptions')} />
                    </ListItem>
                  </a>
                </Link>

                <Link href="/account/productReviews">
                  <a>
                    <ListItem button>
                      {/* <ListItemIcon>
                        <RateReview />
                      </ListItemIcon> */}
                      <ListItemText primary={t('reviews')} />
                    </ListItem>
                  </a>
                </Link>

                <ListItem onClick={() => onClickLogout()} button>
                  {/* <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon> */}
                  <ListItemText primary={t('logout')} />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}
      </List>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.session?.user,
  cart: state.orders?.cart,
})

const mapDispatchToProps = dispatch => ({
  logout: () => {
    return dispatch(logout())
  },
  setDiet: (diet, reset) => {
    return dispatch(setDiet(diet, reset))
  },
  setCategory: (category, reset) => {
    return dispatch(setCategory(category, reset))
  },
  setSale: sale => {
    return dispatch(setSale(sale))
  },
  refreshProducts: () => {
    return dispatch(refreshProducts())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav)
