import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import _ from 'lodash'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartTwoTone'
import MenuIcon from '@material-ui/icons/Menu'
import Image from 'next/image'
import { diets, categories } from '../../../../common/data'
import { store } from 'react-notifications-component'
import SearchBar from './SearchBar'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import { useTranslation } from 'next-i18next'
import {
  getProducts,
  setDiet,
  setCategory,
  setVarietyPacks,
  setSale,
  refreshProducts,
} from '../../../../../redux/products/action'
import { API_URL } from '../../../../../redux/api'
import { createBillingPortalSession, logout } from '../../../../../redux/session/action'
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  Popover,
  Typography,
  IconButton,
  Button,
  colors,
  Badge,
  useMediaQuery,
  Avatar,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: -1,
    boxShadow: 'none',
    background: theme.palette.white,
    borderBottom: `1px solid ${colors.grey[200]}`,
    filter: 'drop-shadow(1px 2px 2px #eeeeee)',
    // position: '-webkit-sticky',
    // position: 'sticky',
    top: 0,
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconsContainer: {
    display: 'flex',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
    color: '#fff',
    padding: 8,
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .2s ease-in-out',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 4,
      paddingRight: 4,
    },
  },
  iconButton: {
    '& .MuiIconButton-label': {
      margin: 6,
    },
  },
  badge: {
    '& .MuiBadge-anchorOriginTopRightRectangle': {
      color: '#FFF',
      margin: -2,
    },
  },
  listItemAvatar: {
    padding: 8,
    cursor: 'pointer',
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .1s ease-in-out',
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    width: 300,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: 250,
      marginLeft: 30,
      marginRight: 20,
    },
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },
  toolbar: {
    maxWidth: 1300,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    minHeight: 70,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1, 0, 2),
    },
  },
  listItem: {
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .2s ease-in-out',
    },
    marginLeft: 5,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  marketplaceButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  active: {
    color: theme.palette.primary.main,
  },
  listItemText: {
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    fontSize: '15px',
    fontWeight: 800,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  listItemTextSmall: {
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    fontSize: '13px',
    fontWeight: 800,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  listItemMarketplace: {
    padding: '3px 0px 3px 0px',
    marginRight: 20,
    '& svg': {
      width: '1.2em',
      height: '1.2em',
      [theme.breakpoints.down('sm')]: {
        width: '1em',
        height: '1em',
      },
    },
  },
  listItemShopBy: {
    padding: '3px 0px 3px 0px',
    marginRight: 10,
    '& svg': {
      width: '1.2em',
      height: '1.2em',
      [theme.breakpoints.down('sm')]: {
        width: '1em',
        height: '1em',
      },
    },
  },
  listItemShopByLessMargin: {
    padding: '3px 0px 3px 0px',
    marginRight: 2,
    '& svg': {
      width: 20,
      height: 20,
    },
  },
  saleIcon: {
    color: '#f77070',
    marginLeft: 5,
  },
  popover: {
    padding: theme.spacing(2),
    border: theme.spacing(2),
    boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
    marginTop: theme.spacing(1),
    border: '1px solid #c4c4c4',
    background: theme.palette.grey.light,
  },
  submenuItem: {
    fontSize: 18,
    marginLeft: 15,
    display: 'flex',
    cursor: 'pointer',
    '& svg': {
      marginLeft: 5,
      color: theme.palette.primary.main,
    },
  },
  submenuSaleItem: {
    fontSize: 18,
    marginLeft: 15,
    display: 'flex',
    cursor: 'pointer',
    color: 'red',
    '& svg': {
      marginLeft: 5,
      color: 'red',
    },
  },
  submenuHeader: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 700,
    height: 27,
    marginTop: 4,
    marginBottom: 4,
    textDecoration: 'underline',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 150,
    marginRight: 20,
  },
  logoImage: {
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(0.95)',
      transition: 'all .2s ease-in-out',
    },
  },
  stgStamp: {
    fontWeight: 600,
    fontSize: 10,
    color: theme.palette.secondary.main,
  },
  subscribeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  btnIconContainer: {
    marginLeft: 5,
    display: 'flex',
    width: 25,
  },
  cartContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      '& span': {
        marginRight: 8,
      },
    },
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  menuGroupItem: {
    paddingTop: 4,
    paddingBottom: 4,
    minWidth: 125,
    transition: 'all .2s ease-in-out',
    '& a': {
      '&:hover': {
        transform: 'scale(1.1)',
        transition: 'all .2s ease-in-out',
      },
    },
  },
  menuGroupDiets: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 400,
  },
  menuGroupItemDiets: {
    width: 100,
    paddingTop: 4,
    paddingBottom: 4,
    transition: 'all .2s ease-in-out',
    '& a': {
      '&:hover': {
        transform: 'scale(1.1)',
        transition: 'all .2s ease-in-out',
      },
    },
  },
  searchInputContainer: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: 8,
      marginRight: 24,
      maxWidth: 500,
    },
  },
  toolbarSmall: {
    maxWidth: 1300,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    minHeight: 50,
    display: 'flex',
    padding: theme.spacing(0, 1, 0, 1),
  },
  toolbarSmallContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },
  filtersContainer: {
    display: 'flex',
    padding: 0,
    maxHeight: 40,
  },
  toolbarMobile: {
    padding: theme.spacing(0, 1),
  },
  mobileLogoContainer: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 150,
    marginTop: 10,
  },
  mobileContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },
  toolbarMobileSearch: {
    padding: `0px 16px`,
    minHeight: 50,
  },
  boxText: {
    fontWeight: 600,
  },
}))

const Navbar = props => {
  const {
    user,
    cart,
    className,
    onSidebarOpen,
    logout,
    getProducts,
    sort,
    sortDirection,
    view,
    setDiet,
    setCategory,
    setSale,
    setVarietyPacks,
    stripeCustomer,
    subscriptions,
    createBillingPortalSession,
    refreshProducts,
    ...rest
  } = props
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('common')
  const [anchorEl, setAnchorEl] = useState(null)
  const [openedPopoverId, setOpenedPopoverId] = useState(null)
  const [categoriesSection, setCategoriesSection] = useState([[], [], []])

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.up('xs'), { defaultMatches: false })
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: false })
  const isMd = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: false })

  useEffect(() => {
    let chunkCount = 1
    let chunks = []
    var categoriesClone = [...categories]
    while (categoriesClone.length) {
      let chunkSize = Math.ceil(categoriesClone.length / chunkCount--)
      let chunk = categoriesClone.slice(0, chunkSize)
      chunks.push(chunk)
      categoriesClone = categoriesClone.slice(chunkSize)
    }
    setCategoriesSection(chunks)
  }, [categories])

  const handleClick = (event, popoverId) => {
    setAnchorEl(event.target)
    setOpenedPopoverId(popoverId)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenedPopoverId(null)
  }

  const onClickAccount = view => {
    if (view == 'subscription' && user?.id && stripeCustomer) {
      createBillingPortalSession(user.id).then(res => {
        var url = res.url.replace('http:', '').replace('https:', '')
        if (!res.error) router.push(url)
      })
    } else router.push('/account/' + view)
  }

  const calculateCartCount = () => {
    var count = 0
    if (cart) {
      cart.forEach(product => {
        if (product.quantity) count = count + product.quantity
        else count = count + 1
      })
    }
    return count
  }

  const onClickFilter = (filterType, name) => {
    if (filterType == 'sale') setSale(true)
    if (filterType == 'varietyPacks') setVarietyPacks(true)
    if (filterType == 'diet') setDiet(name, true)
    if (filterType == 'category') setCategory(name, true)
    refreshProducts()
    handleClose()
    router.push('/products', undefined, { shallow: true })
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

  const popoverAccount = () => {
    return (
      <Popover
        elevation={1}
        id={'account'}
        open={openedPopoverId === 'account'}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: classes.popover }}
      >
        <div className={classes.menu}>
          <div className={classes.menuItem}>
            <List disablePadding>
              {user?.username && (
                <Typography variant="body1" color="primary" className={classes.submenuHeader}>
                  {user.username}
                </Typography>
              )}

              <ListItem disableGutters className={classes.menuGroupItem}>
                <a onClick={() => onClickAccount('general')}>
                  <Typography
                    variant="body1"
                    className={classes.submenuItem}
                    color="textSecondary"
                    onClick={handleClose}
                  >
                    {t('general')}
                  </Typography>
                </a>
              </ListItem>
              <ListItem disableGutters className={classes.menuGroupItem}>
                <a onClick={() => onClickAccount('subscriptions')}>
                  <Typography
                    variant="body1"
                    className={classes.submenuItem}
                    color="textSecondary"
                    onClick={handleClose}
                  >
                    {t('subscriptions')}
                  </Typography>
                </a>
              </ListItem>
              <ListItem disableGutters className={classes.menuGroupItem}>
                <a onClick={() => onClickAccount('orders')}>
                  <Typography
                    variant="body1"
                    className={classes.submenuItem}
                    color="textSecondary"
                    onClick={handleClose}
                  >
                    {t('orders')}
                  </Typography>
                </a>
              </ListItem>
              <ListItem disableGutters className={classes.menuGroupItem}>
                <a onClick={() => onClickAccount('productReviews')}>
                  <Typography
                    variant="body1"
                    className={classes.submenuItem}
                    color="textSecondary"
                    onClick={handleClose}
                  >
                    {t('reviews')}
                  </Typography>
                </a>
              </ListItem>
              <ListItem disableGutters className={classes.menuGroupItem}>
                <a onClick={() => onClickAccount('favorites')}>
                  <Typography
                    variant="body1"
                    className={classes.submenuItem}
                    color="textSecondary"
                    onClick={handleClose}
                  >
                    {t('favorites')}
                  </Typography>
                </a>
              </ListItem>
              <ListItem onClick={() => logout()} disableGutters className={classes.menuGroupItem}>
                <Typography
                  variant="body1"
                  className={classes.submenuItem}
                  color="textSecondary"
                  onClick={handleClose}
                >
                  {t('logout')}
                </Typography>
              </ListItem>
            </List>
          </div>
        </div>
      </Popover>
    )
  }

  const popoverDiet = () => {
    return (
      <Popover
        elevation={1}
        id={'diet'}
        open={openedPopoverId === 'diet'}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: classes.popover }}
      >
        <List disablePadding className={classes.menuGroupDiets}>
          {diets.length > 0 &&
            diets.map(diet => {
              if (diet.navbar) {
                return (
                  <ListItem key={diet.id} disableGutters className={classes.menuGroupItemDiets}>
                    <a onClick={() => onClickFilter('diet', diet.id)}>
                      <Image
                        className={classes.logoImage}
                        src={diet.src}
                        alt={diet.name}
                        width={100}
                        height={100}
                        priority={true}
                      />
                    </a>
                  </ListItem>
                )
              }
            })}
        </List>
      </Popover>
    )
  }

  const popoverCategory = () => {
    return (
      <Popover
        elevation={1}
        id={'category'}
        open={openedPopoverId === 'category'}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: classes.popover }}
      >
        <div className={classes.menu}>
          <div className={classes.menuItem}>
            <Typography variant="body1" color="primary" className={classes.submenuHeader}>
              {t('categories')}
            </Typography>
            <List disablePadding>
              {categoriesSection[0].length > 0 &&
                categoriesSection[0].map(category => {
                  return (
                    <ListItem key={category.name} disableGutters className={classes.menuGroupItem}>
                      <a onClick={() => onClickFilter('category', category.name)}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.submenuItem}
                        >
                          {t(category.name)}
                        </Typography>
                      </a>
                    </ListItem>
                  )
                })}
              <ListItem disableGutters className={classes.menuGroupItem}>
                <a onClick={() => onClickFilter('varietyPacks', '')}>
                  <Typography variant="body1" color="textSecondary" className={classes.submenuItem}>
                    {t('variety-packs')} <CardGiftcardIcon />
                  </Typography>
                </a>
              </ListItem>
            </List>
          </div>
        </div>
      </Popover>
    )
  }

  if (isSm)
    return (
      <AppBar {...rest} position="relative" className={clsx(classes.root, className)}>
        <Toolbar disableGutters className={classes.toolbar}>
          <div className={classes.navbarContainer}>
            <div className={classes.logoContainer}>
              <Link href={'/'}>
                <a>
                  <Image
                    className={classes.logoImage}
                    src="/images/photos/wtg-com.png"
                    alt="WayTooGood_Logo"
                    width={200}
                    height={45}
                    priority={true}
                  />
                </a>
              </Link>
              {API_URL == 'https://stg-api.waytoogood.com' && (
                <div className={classes.stgStamp}>STG</div>
              )}
            </div>

            <List className={classes.iconsContainer}>
              {router.route != '/subscribe' && (
                <ListItem className={classes.listItem}>
                  <Link href={'/subscribe'}>
                    <a>
                      <Button variant="outlined" className={classes.subscribeContainer}>
                        <Typography color="textSecondary" className={classes.listItemText}>
                          {t('get-the')}
                        </Typography>
                        <div className={classes.btnIconContainer}>
                          <Image
                            src="/images/photos/w.png"
                            alt="WayTooGood_Symbol"
                            width={25}
                            height={22}
                          />
                        </div>
                        <Typography color="textSecondary" className={classes.listItemText}>
                          {t('box')}
                        </Typography>
                      </Button>
                    </a>
                  </Link>
                </ListItem>
              )}

              <ListItem className={classes.listItemButton}>
                <Button onClick={() => onClickCart()}>
                  <div className={classes.cartContainer}>
                    <Badge
                      badgeContent={calculateCartCount()}
                      color="primary"
                      className={classes.badge}
                    >
                      <ShoppingCartIcon />
                    </Badge>
                    <Typography color="textSecondary" className={classes.listItemText}>
                      {t('cart')}
                    </Typography>
                  </div>
                </Button>
              </ListItem>

              {isSm && user && Object.keys(user).length === 0 && (
                <ListItem className={classes.listItemButton}>
                  <Link href={'/signin'}>
                    <a>
                      <Button>
                        <Typography color="textSecondary" className={classes.listItemText}>
                          {t('login')}
                        </Typography>
                      </Button>
                    </a>
                  </Link>
                </ListItem>
              )}
              {user && Object.keys(user).length === 0 ? (
                <></>
              ) : (
                <ListItem
                  aria-describedby={'account'}
                  onClick={e => handleClick(e, 'account')}
                  className={classes.listItemAvatar}
                >
                  <Avatar
                    alt={user?.username ? user.username : 'profile-pic'}
                    src={
                      user?.profile_pic?.formats?.thumbnail?.url
                        ? user?.profile_pic?.formats?.thumbnail?.url
                        : null
                    }
                  />
                </ListItem>
              )}
            </List>
          </div>
        </Toolbar>
        <Toolbar disableGutters className={classes.toolbarSmall}>
          <div className={classes.toolbarSmallContainer}>
            <List className={classes.filtersContainer}>
              <ListItem className={clsx(classes.listItem, classes.listItemShopBy)}>
                <Link href={'/products'}>
                  <a>
                    <Button>
                      <Typography color="textSecondary" className={classes.listItemTextSmall}>
                        {t('shop-now')}
                      </Typography>
                    </Button>
                  </a>
                </Link>
              </ListItem>

              <ListItem className={clsx(classes.listItem, classes.listItemShopByLessMargin)}>
                <Button onClick={e => handleClick(e, 'diet')}>
                  <Typography color="textSecondary" className={classes.listItemTextSmall}>
                    {t('shop-diets')}
                  </Typography>
                  <ExpandMoreIcon color="primary" />
                </Button>
              </ListItem>

              <ListItem className={clsx(classes.listItem, classes.listItemShopByLessMargin)}>
                <Button onClick={e => handleClick(e, 'category')}>
                  <Typography color="textSecondary" className={classes.listItemTextSmall}>
                    {t('shop-categories')}
                  </Typography>
                  <ExpandMoreIcon color="primary" />
                </Button>
              </ListItem>

              {isMd && (
                <ListItem className={clsx(classes.listItem, classes.listItemShopBy)}>
                  <Link href={'/brands'}>
                    <a>
                      <Button onClick={e => handleClick(e, 'brand')}>
                        <Typography
                          color="textSecondary"
                          className={
                            router.route.includes('/brands')
                              ? clsx(classes.listItemTextSmall, classes.active)
                              : classes.listItemTextSmall
                          }
                        >
                          {t('brands')}
                        </Typography>
                      </Button>
                    </a>
                  </Link>
                </ListItem>
              )}

              {isMd && (
                <ListItem className={clsx(classes.listItem, classes.listItemShopBy)}>
                  <a onClick={() => onClickFilter('sale', '')}>
                    <Button>
                      <Typography color="textSecondary" className={classes.listItemTextSmall}>
                        {t('sales')}
                      </Typography>
                      <LocalOfferIcon className={classes.saleIcon} />
                    </Button>
                  </a>
                </ListItem>
              )}
            </List>
            <div className={classes.searchInputContainer}>
              <SearchBar />
            </div>
          </div>
        </Toolbar>

        {popoverAccount()}
        {popoverDiet()}
        {popoverCategory()}
      </AppBar>
    )
  if (isXs) {
    return (
      <AppBar {...rest} position="relative" className={clsx(classes.root, className)}>
        <Toolbar disableGutters className={classes.toolbarMobile}>
          <div className={classes.mobileContainer}>
            <IconButton onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>

            <div className={classes.mobileLogoContainer}>
              <Link href={'/'}>
                <a>
                  <Image
                    className={classes.logoImage}
                    src="/images/photos/wtg.png"
                    alt="WayTooGood_Logo"
                    width={150}
                    height={40}
                    priority={true}
                  />
                </a>
              </Link>
              {API_URL == 'https://stg-api.waytoogood.com' && (
                <div className={classes.stgStamp}>STG</div>
              )}
            </div>

            <IconButton onClick={() => onClickCart()}>
              <Badge badgeContent={calculateCartCount()} color="primary" className={classes.badge}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
        <Toolbar disableGutters className={classes.toolbarMobileSearch}>
          <div className={classes.searchInputContainer}>
            <SearchBar />
          </div>
        </Toolbar>
      </AppBar>
    )
  }
  return (
    <AppBar className={classes.root}>
      <Toolbar></Toolbar>
      <Toolbar></Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user: state.session?.user,
  stripeCustomer: state.session.stripeCustomer,
  subscriptions: state.session.subscriptions,
  cart: state.orders?.cart,
  sort: state.products.sort,
  sortDirection: state.products.sortDirection,
  view: state.products.view,
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
  setVarietyPacks: varietyPacks => {
    return dispatch(setVarietyPacks(varietyPacks))
  },
  refreshProducts: () => {
    return dispatch(refreshProducts())
  },
  getProducts: searchText => {
    return dispatch(getProducts(searchText))
  },
  createBillingPortalSession: userId => {
    return dispatch(createBillingPortalSession(userId))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
