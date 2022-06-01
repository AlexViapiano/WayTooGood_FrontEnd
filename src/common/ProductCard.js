import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { CardBase } from 'components/organisms'
import { connect } from 'react-redux'
import { addToCart, updateCart } from '../../redux/orders/action'
import { updateUser } from '../../redux/session/action'
import { addToWishlist } from '../../redux/products/action'
import { diets as _diets } from './data'
import Link from 'next/link'
import { store } from 'react-notifications-component'
import { getProductPrice } from '../utils/getProductPrice'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import Rating from '@material-ui/lab/Rating'
import {
  Button,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import * as pixels from '../utils/pixels'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    width: '100%',
  },
  cardBase: {
    position: 'relative',
    maxWidth: 275,
    minWidth: 150,
    '& .card-base__content': {
      padding: 0,
    },
  },
  cardMedia: {
    position: 'relative',
    background: '#fff',
    height: 225,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 140,
    },
  },
  image: {
    padding: '10px !important',
    [theme.breakpoints.down('sm')]: {
      padding: '3px !important',
    },
  },
  cardContent: {
    padding: '0px !important',
    background: theme.palette.grey.light,
    height: 200,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      height: 175,
    },
  },
  cardContentDirect: {
    padding: '0px !important',
    background: theme.palette.grey.main,
    height: 200,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      height: 175,
    },
  },
  cardContentInfo: {
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
    // [theme.breakpoints.down('sm')]: {
    //   height: 185,
    // },
  },
  productTitle: {
    textAlign: 'center',
    color: '#7e817f',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '20px',
    overflow: 'hidden',
    padding: 4,
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
      lineHeight: '15px',
    },
  },
  fontPrice: {
    fontSize: 14,
    fontWeight: 700,
    overflow: 'hidden',
  },
  outOfStockTag: {
    zIndex: 1,
    position: 'absolute',
    left: 1,
    background: theme.palette.secondary.light,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontWeight: 900,
    color: '#fff',
    padding: 5,
  },
  saleTag: {
    zIndex: 1,
    position: 'absolute',
    left: 1,
    background: '#ff3737',
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontWeight: 900,
    color: '#fff',
    padding: 5,
  },
  salePrice: {
    color: '#ff3737',
    fontSize: 14,
    fontWeight: 700,
    overflow: 'hidden',
  },
  listPrice: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 700,
    overflow: 'hidden',
  },
  fontUnits: {
    fontSize: 12,
    fontWeight: 700,
    color: '#7e817f',
    lineHeight: '22px',
    overflow: 'hidden',
    paddingLeft: 5,
  },
  unitPack: {
    background: theme.palette.primary.main,
    color: '#FFF',
    padding: '2px 10px',
    borderRadius: theme.spacing(2),
    whiteSpace: 'nowrap',
    margin: 1,
    fontSize: 12,
  },
  shippingMessage: {
    margin: '0px 15px',
    fontSize: 12,
    textAlign: 'center',
    color: '#7e817f',
    '& span': {
      whiteSpace: 'nowrap',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 11,
      margin: '0px 5px',
      lineHeight: '11px',
    },
  },
  heartIconContainer: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: 'pointer',
  },
  favoriteIcon: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: '#ade9b0',
    },
  },
  nonFavoriteIcon: {
    color: '#f3f3f3',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  priceContainer: {
    display: 'flex',
    alignContent: 'center',
  },
  btnAdd: {
    display: 'flex',
    justifyContent: 'center',
    height: 30,
    borderRadius: 0,
    width: '100%',
    fontWeight: 700,
    background: theme.palette.secondary.main,
  },
  btnWish: {
    display: 'flex',
    justifyContent: 'center',
    height: 30,
    borderRadius: 0,
    width: '100%',
    fontWeight: 700,
    background: theme.palette.secondary.light,
    color: 'white',
  },

  btnFavoriteContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      marginLeft: 5,
    },
  },
  btnAddContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      marginLeft: 5,
    },
  },
  btnUpdate: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    borderRadius: 0,
    width: '100%',
    fontWeight: 700,
    background: theme.palette.secondary.main,
    color: '#FFF',
    '& svg': {
      color: '#FFF',
      transition: 'all .1s ease-in-out',
      '&:hover': {
        transform: 'scale(1.7)',
        transition: 'all .1s ease-in-out',
      },
    },
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '100%',
    padding: 4,
  },
  centerDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

const ProductCard = props => {
  const {
    item,
    user,
    cart,
    country,
    className,
    addToCart,
    updateCart,
    addToWishlist,
    updateUser,
    product,
    addToCartTiggered,
    ...rest
  } = props
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('common')
  const isMd = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: null })
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: null })

  const updateFavorite = item => {
    if (user && Object.keys(user).length === 0) {
      store.addNotification({
        title: t('login-first'),
        message: t('login-first-message'),
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
    } else {
      var products = user.products.map(product => product.id)
      if (products.includes(item.id)) {
        products = products.filter(product => product != item.id)
      } else products.push(item.id)
      var data = { products: products }
      updateUser(user.id, data)
    }
  }

  var price = getProductPrice(item, country)

  var productFavorited = false
  if (user?.products) {
    var favorites = user?.products.map(product => product.id)
    productFavorited = favorites.includes(item.id)
  }

  var itemFoundInCart = cart.find(product => product.id == item.id)

  let imageUrl =
    isMd && item?.media[0]?.formats?.small?.url
      ? item.media[0].formats.small.url
      : item?.media[0]?.formats?.thumbnail?.url
      ? item.media[0].formats.thumbnail.url
      : item?.media[0]?.url
      ? item.media[0].url
      : item?.media

  return (
    <CardBase className={classes.cardBase} liftUp>
      {item?.inventory == 0 ? (
        <div className={classes.outOfStockTag}>Out of Stock</div>
      ) : item.list_price != null ? (
        <div className={classes.saleTag}>SALE</div>
      ) : null}
      <Link href="/products/[url]" as={`/products/${item.url}`}>
        <a style={{ width: '100%' }}>
          <CardMedia className={classes.cardMedia}>
            {isMd != null && (
              <Image
                className={classes.image}
                src={imageUrl}
                alt={item.name}
                priority={true}
                // layout="fill"
                objectFit="contain"
                width={isSm ? 240 : 156}
                height={isSm ? 240 : 156}
              />
            )}
          </CardMedia>
        </a>
      </Link>
      <div
        className={classes.heartIconContainer}
        onClick={e => {
          e.stopPropagation()
          updateFavorite(item)
        }}
      >
        {productFavorited ? (
          <Favorite className={classes.favoriteIcon} />
        ) : (
          <FavoriteBorder className={classes.nonFavoriteIcon} />
        )}
      </div>
      <CardContent
        className={item?.direct_shipping ? classes.cardContentDirect : classes.cardContent}
      >
        <Link href="/products/[url]" as={`/products/${item.url}`}>
          <a className={classes.cardContentInfo}>
            <Typography color="textPrimary" variant="h6" className={classes.productTitle}>
              {item.name}
            </Typography>

            <div className={classes.detailsContainer}>
              {item?.units > 1 && (
                <div className={classes.unitPack}>
                  {item?.units}
                  {t('pack')}
                </div>
              )}
              {item?.list_price ? (
                <div className={classes.priceContainer}>
                  <Typography className={classes.salePrice} variant="h6">
                    {price?.toFixed(2)}$
                  </Typography>
                  <Typography className={classes.listPrice} variant="h6" color="secondary">
                    <s>{item?.list_price.toFixed(2)}$</s>
                  </Typography>
                  <Typography color="textSecondary" variant="h6" className={classes.fontUnits}>
                    {item?.units > 1 && `(${(price / item.units)?.toFixed(2)}$ ea.)`}
                  </Typography>
                </div>
              ) : (
                <div className={classes.priceContainer}>
                  <Typography color="primary" variant="h6" className={classes.fontPrice}>
                    {price?.toFixed(2)}$
                  </Typography>

                  <Typography color="textSecondary" variant="h6" className={classes.fontUnits}>
                    {item?.units > 1 && `(${(price / item.units)?.toFixed(2)}$ ea.)`}
                  </Typography>
                </div>
              )}
              {item?.rating_count > 0 && (
                <Rating size="small" value={item.rating} precision={0.5} readOnly />
              )}

              <div className={classes.shippingMessage}>
                {item?.direct_shipping || item?.frozen
                  ? t('free-shipping-included')
                  : t('eligible-free-shipping')}
                {(item?.refrigerated || item?.frozen) && (
                  <>
                    <br />({t('limited-regions')})
                  </>
                )}
              </div>
            </div>
          </a>
        </Link>

        {itemFoundInCart?.quantity > 0 ? (
          <div className={classes.btnUpdate}>
            <IconButton
              size="small"
              onClick={() => updateCart(item, itemFoundInCart?.quantity - 1)}
            >
              <Remove color="primary" />
            </IconButton>
            {itemFoundInCart?.quantity} {t('in-cart')}
            <IconButton
              size="small"
              onClick={() => updateCart(item, itemFoundInCart?.quantity + 1)}
            >
              <Add color="primary" />
            </IconButton>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={item?.inventory == 0 ? classes.btnWish : classes.btnAdd}
            onClick={
              item?.inventory == 0
                ? () => {
                    pixels.addToWishlist({
                      content_id: item.sku,
                      content_name: item.name,
                      value: item.id,
                      content_type: 'product',
                      currency: 'CAD',
                    })
                    addToWishlist(item.id)
                  }
                : e => {
                    e.stopPropagation()
                    addToCart(item)
                    if (addToCartTiggered == false) {
                      pixels.addToCart({
                        content_id: item.sku,
                        content_name: item.name,
                        value: item.id,
                        content_type: 'product',
                        currency: 'CAD',
                      })
                    }
                  }
            }
          >
            {item?.inventory == 0 ? (
              <div className={classes.btnFavoriteContent}>Add to wishlist</div>
            ) : (
              <div className={classes.btnAddContent}>
                {t('add-to-cart')} <Add />
              </div>
            )}
          </Button>
        )}
      </CardContent>
    </CardBase>
  )
}

const mapStateToProps = state => ({
  country: state.session.country,
  user: state.session.user,
  cart: state.orders?.cart,
  addToCartTiggered: state.orders?.addToCartTiggered,
})

const mapDispatchToProps = dispatch => ({
  addToWishlist: productId => {
    return dispatch(addToWishlist(productId))
  },
  addToCart: product => {
    return dispatch(addToCart(product))
  },
  updateUser: (userId, data) => {
    return dispatch(updateUser(userId, data))
  },
  updateCart: (product, quantity) => {
    return dispatch(updateCart(product, quantity))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
