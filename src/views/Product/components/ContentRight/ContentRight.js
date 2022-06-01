import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, Typography, Button, IconButton } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import PinterestIcon from '@material-ui/icons/Pinterest'
import RedditIcon from '@material-ui/icons/Reddit'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import { Accordion } from 'components/organisms'
import { connect } from 'react-redux'
import { addToCart, updateCart } from '../../../../../redux/orders/action'
import { updateUser } from '../../../../../redux/session/action'
import { getProducts, setDiet } from '../../../../../redux/products/action'
import Link from 'next/link'
import { APP_URL } from '../../../../../redux/api'
import { useRouter } from 'next/router'
import { addToWishlist } from '../../../../../redux/products/action'
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
  WhatsappShareButton,
} from 'react-share'
import { diets } from '../../../../common/data'
import { getProductPrice } from '../../../../utils/getProductPrice'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { store } from 'react-notifications-component'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import Rating from '@material-ui/lab/Rating'
import clsx from 'clsx'
import Tooltip from '@material-ui/core/Tooltip'
import * as pixels from '../../../../utils/pixels'

const marked = require('marked')

const useStyles = makeStyles(theme => ({
  root: {},
  textGrey: {
    color: '#556e7a',
  },
  section: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  descriptionSection: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 7,
    '-webkit-box-orient': 'vertical',
  },
  showButton: {
    width: '100%',
  },
  ratingContainer: {
    margin: theme.spacing(1, 0),
    minHeight: 20,
    cursor: 'grabbing',
    width: 250,
    transition: 'all .1s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'all .1s ease-in-out',
    },
  },
  priceContainer: {
    display: 'flex',
  },
  salePrice: {
    color: '#ff3737',
  },
  listPrice: {
    marginLeft: 10,
  },
  percentageSaved: {
    marginLeft: 10,
    color: '#ff3737',
  },
  shippingMessage: {
    background: 'linear-gradient(37deg, rgb(255 229 180) 0%, rgb(255 223 176) 100%)',
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    fontWeight: 700,
    boxShadow: 'rgb(0 0 0 / 6%) 0px 2px 4px 0px inset',
  },
  unitPackContainer: {
    background: theme.palette.primary.main,
    color: '#FFF',
    padding: '4px 8px',
    borderRadius: theme.spacing(2),
    maxWidth: 75,
    display: 'flex',
    justifyContent: 'center',
    margin: '5px 0px',
  },
  unitPrice: {
    marginLeft: 5,
  },
  marked: {
    fontSize: 16,
    '& img': {
      //     display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '500px',
      width: '100%',
    },
  },
  amountToAdd: {
    marginRight: '10px',
    '& .MuiOutlinedInput-input': {
      padding: '12px 0px',
      width: '50px',
      textAlign: 'center',
    },
  },
  btnAddSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  badge: {
    marginRight: 20,
    '& .MuiBadge-badge': {
      background: theme.palette.primary.main,
      color: '#ffffff',
      cursor: 'no-drop',
      '&:hover': {
        background: '#ff9000',
      },
    },
  },
  dietsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dietImage: {
    width: 100,
    cursor: 'pointer',
    transform: 'scale(1.0)',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .2s ease-in-out',
    },
  },
  favoriteIcon: {
    marginRight: 22,
    color: theme.palette.primary.main,
  },
  socialIcon: {
    marginRight: theme.spacing(3),
    marginTop: 4,
    color: theme.palette.secondary.main + '!important',
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .1s ease-in-out',
    },
  },
  socialMediaContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 16px',
    minHeight: 52,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    '& svg': {
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
  },
  accordionContainer: {
    '& .MuiAccordion-rounded:last-child': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.1), 0px 0px 0px 0px rgba(0,0,0,0), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
  },
  btnWish: {
    display: 'flex',
    justifyContent: 'center',
    height: 30,
    width: 250,
    marginBottom: 5,
    fontWeight: 700,
    background: theme.palette.secondary.light,
    color: 'white',
    padding: 20,
    borderRadius: 25,
  },
  btnAdd: {
    display: 'flex',
    justifyContent: 'center',
    height: 30,
    width: 250,
    marginBottom: 5,
    fontWeight: 700,
    background: theme.palette.secondary.main,
    padding: 20,
    borderRadius: 25,
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
    width: 250,
    marginBottom: 5,
    fontWeight: 700,
    background: theme.palette.secondary.main,
    padding: 20,
    borderRadius: 25,
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
}))

const ContentRight = props => {
  const {
    item,
    data,
    user,
    cart,
    product,
    scrollToBottom,
    country,
    addToCart,
    updateCart,
    updateUser,
    setDiet,
    className,
    addToWishlist,
    addToCartTiggered,
    ...rest
  } = props
  const classes = useStyles()
  const [qty, setQty] = useState('1')
  const [showText, setShowText] = useState(false)
  const { t } = useTranslation('product')
  const router = useRouter()
  const pageUrl = APP_URL + router.asPath

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  var ingredients = product?.ingredients ? product?.ingredients : ''
  var nutrition = product?.nutrition ? product?.nutrition : ''
  var allergens = product?.allergens ? product?.allergens : ''

  var AccordionDetails = [
    {
      id: 'ingrdients',
      title: t('ingredients'),
      children: (
        <div className={classes.marked} dangerouslySetInnerHTML={{ __html: marked(ingredients) }} />
      ),
      disabled: ingredients == '' ? true : false,
    },
    {
      id: 'nutrition',
      title: t('nutrition'),
      children: (
        <div className={classes.marked} dangerouslySetInnerHTML={{ __html: marked(nutrition) }} />
      ),
      disabled: nutrition == '' ? true : false,
    },
    {
      id: 'allergens',
      children: (
        <div className={classes.marked} dangerouslySetInnerHTML={{ __html: marked(allergens) }} />
      ),
      title: t('allergens'),
      disabled: allergens == '' ? true : false,
    },
  ]

  var price = getProductPrice(product, country)

  var productFavorited = false
  if (user?.products) {
    var favorites = user?.products.map(userProduct => userProduct.id)
    productFavorited = favorites.includes(product.id)
  }

  const updateFavorite = product => {
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
      if (products.includes(product.id)) {
        products = products.filter(product => product != product.id)
      } else products.push(product.id)
      var data = { products: products }
      updateUser(user.id, data)
    }
  }

  const onClickDiet = diet => {
    setDiet(diet.id, true)
    getProducts()
    router.push('/products', undefined, { shallow: true })
  }

  var itemFoundInCart = cart.find(cartProduct => cartProduct.id == product?.id)

  return (
    <div className={clsx(classes.root, className)}>
      <Typography
        className={classes.textGrey}
        component="p"
        variant="h4"
        color="primary"
        align="left"
      >
        {product?.name}
      </Typography>
      {product?.brand?.name && (
        <div className={classes.section}>
          <Typography component="p" variant="h6" align="left">
            {t('by')}{' '}
            <Link href="/brands/[url]" as={`/brands/${product?.brand?.url}`}>
              <a className={classes.textGrey}>{product?.brand.name}</a>
            </Link>
          </Typography>
        </div>
      )}
      {product?.units > 1 && (
        <div className={classes.unitPackContainer}>
          {product.units} {t('pack')}
        </div>
      )}
      {product?.rating_count > 0 && (
        <div className={classes.section} onClick={() => scrollToBottom()}>
          <Tooltip title={product?.rating + ' / 5'} placement="left">
            <div className={classes.ratingContainer}>
              <Rating value={product?.rating} precision={0.5} readOnly />
              <span>
                ({product?.rating_count} {t('review')})
              </span>
            </div>
          </Tooltip>
        </div>
      )}
      {product?.list_price ? (
        <div className={classes.section}>
          <div className={classes.priceContainer}>
            <Typography className={classes.salePrice} variant="h5" align="left">
              {price?.toFixed(2)}$
            </Typography>

            <Typography className={classes.listPrice} variant="h5" color="secondary">
              <s>{product?.list_price.toFixed(2)}$</s>
            </Typography>

            <Typography color="textSecondary" variant="h6" className={classes.unitPrice}>
              {product?.units > 1 &&
                ' / ' + product.units + ' units (' + (price / product.units).toFixed(2) + '$ each)'}
            </Typography>
          </div>
          <div className={classes.priceContainer}>
            <Typography variant="h6" color="secondary">
              You save:
            </Typography>
            <Typography className={classes.percentageSaved} variant="h6" color="primary">
              {(product?.list_price - price).toFixed(2)}$ (
              {((1 - price / product?.list_price) * 100).toFixed(2)}%)
            </Typography>
          </div>
          {(product?.direct_shipping || product?.frozen) && (
            <Typography className={classes.plusFreeShipping} variant="h6" color="textPrimary">
              + {t('free-shipping-included')}
            </Typography>
          )}
          {(product?.frozen || product?.refrigerated) && (
            <div className={classes.shippingMessage}>{t('limited-regions')}: QC, ON, NB</div>
          )}
        </div>
      ) : (
        <div className={classes.section}>
          <div className={classes.priceContainer}>
            <Typography variant="h5" color="primary" align="left">
              {price?.toFixed(2)}$
            </Typography>
            <Typography color="textSecondary" variant="h6" className={classes.unitPrice}>
              {product?.units > 1 &&
                ' / ' + product.units + ' units (' + (price / product.units).toFixed(2) + '$ each)'}
            </Typography>
          </div>
          {(product?.direct_shipping || product?.frozen) && (
            <Typography className={classes.plusFreeShipping} variant="h6" color="textPrimary">
              + {t('free-shipping-included')}
            </Typography>
          )}
          {(product?.frozen || product?.refrigerated) && (
            <div className={classes.shippingMessage}>{t('limited-regions')}: QC, ON, NB</div>
          )}
        </div>
      )}

      {product?.description && (
        <div className={showText ? null : classes.descriptionSection}>
          <div
            className={classes.marked}
            dangerouslySetInnerHTML={{ __html: marked(product?.description) }}
          />
        </div>
      )}
      <Button
        className={classes.showButton}
        onClick={() => setShowText(!showText)}
        size="small"
        color="primary"
        align="center"
      >
        {showText ? 'Show Less' : 'Show More'}
      </Button>
      <div className={clsx(classes.section, classes.btnAddSection)}>
        {itemFoundInCart?.quantity > 0 ? (
          <div className={classes.btnUpdate}>
            <IconButton
              size="small"
              onClick={() => updateCart(product, itemFoundInCart?.quantity - 1)}
            >
              <Remove color="primary" />
            </IconButton>
            {itemFoundInCart?.quantity} {t('in cart')}
            <IconButton
              size="small"
              onClick={() => updateCart(product, itemFoundInCart?.quantity + 1)}
            >
              <Add color="primary" />
            </IconButton>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={product?.inventory == 0 ? classes.btnWish : classes.btnAdd}
            onClick={
              product?.inventory == 0
                ? () => {
                    addToWishlist(product.id)
                    pixels.addToWishlist({
                      content_id: product.sku,
                      content_name: product.name,
                      value: product.id,
                      content_type: 'product',
                      currency: 'CAD',
                    })
                  }
                : e => {
                    e.stopPropagation()
                    addToCart(product)
                    if (addToCartTiggered == false) {
                      pixels.addToCart({
                        content_id: product.sku,
                        content_name: product.name,
                        value: product.id,
                        content_type: 'product',
                        currency: 'CAD',
                      })
                    }
                  }
            }
          >
            {product?.inventory == 0 ? (
              <div className={classes.btnFavoriteContent}>Add to wishlist</div>
            ) : (
              <div className={classes.btnAddContent}>
                {t('add-to-cart')} <Add />
              </div>
            )}
          </Button>
        )}

        {product?.inventory < 10 && product?.inventory != 0 && (
          <Typography component="p" variant="body1" align="left">
            {product?.inventory}
            {t('left')}
          </Typography>
        )}
      </div>
      <div className={clsx(classes.section, classes.accordionContainer)}>
        <Accordion className={classes.accordionContainer} items={AccordionDetails} />
        <div className={classes.socialMediaContainer}>
          {productFavorited ? (
            <Favorite className={classes.favoriteIcon} onClick={() => updateFavorite(product)} />
          ) : (
            <FavoriteBorder
              className={classes.favoriteIcon}
              onClick={() => updateFavorite(product)}
            />
          )}
          <FacebookShareButton
            url={pageUrl}
            quote={product?.name}
            hashtag="#waytoogood"
            className={classes.socialIcon}
          >
            <FacebookIcon />
          </FacebookShareButton>
          <TwitterShareButton
            url={pageUrl}
            title={product?.name}
            hashtag="#waytoogood"
            className={classes.socialIcon}
          >
            <TwitterIcon />
          </TwitterShareButton>
          {product?.picture && product?.picture && (
            <PinterestShareButton
              url={pageUrl}
              description={product?.name}
              media={product?.picture}
              className={classes.socialIcon}
            >
              <PinterestIcon />
            </PinterestShareButton>
          )}
          <RedditShareButton
            url={pageUrl}
            title={product?.name}
            hashtag="#waytoogood"
            className={classes.socialIcon}
          >
            <RedditIcon />
          </RedditShareButton>
          <WhatsappShareButton
            url={pageUrl}
            title={product?.name}
            hashtag="#waytoogood"
            className={classes.socialIcon}
          >
            <WhatsAppIcon />
          </WhatsappShareButton>
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.dietsContainer}>
          {product?.diets?.length > 0 &&
            product?.diets.map(diet => {
              var foundDiet = diets.find(_diet => _diet.id.includes(diet.id))
              if (foundDiet && foundDiet.src) {
                return (
                  <Image
                    onClick={() => onClickDiet(foundDiet)}
                    key={foundDiet.id}
                    src={foundDiet.src}
                    alt={foundDiet.title}
                    width={96}
                    height={96}
                    loading="lazy"
                    className={classes.dietImage}
                  />
                )
              }
            })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  country: state.session.country,
  user: state.session.user,
  cart: state.orders.cart,
  addToCartTiggered: state.orders?.addToCartTiggered,
})

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product, qty) => {
      return dispatch(addToCart(product, qty))
    },
    addToWishlist: productId => {
      return dispatch(addToWishlist(productId))
    },
    updateUser: (userId, data) => {
      return dispatch(updateUser(userId, data))
    },
    setDiet: diet => {
      return dispatch(setDiet(diet))
    },
    getProducts: searchText => {
      return dispatch(getProducts(searchText))
    },
    updateCart: (product, quantity) => {
      return dispatch(updateCart(product, quantity))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentRight)
