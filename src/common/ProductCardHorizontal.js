import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { addToCart, updateCart } from '../../redux/orders/action'
import Image from 'next/image'
import { CardBase } from 'components/organisms'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import { getProductPrice } from '../utils/getProductPrice'
import { diets as _diets } from './data'
import { useTranslation } from 'next-i18next'
import Rating from '@material-ui/lab/Rating'
import * as pixels from '../utils/pixels'
import {
  Grid,
  colors,
  Button,
  IconButton,
  useMediaQuery,
  ListItem,
  ListItemText,
  Card,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  cardBase: {
    cursor: 'pointer',
    padding: 0,
    boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px`,
    '& .card-base__content': {
      padding: 0,
    },
  },
  listItem: {
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  leftContentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    flex: 1,
  },
  leftBottomContainer: {
    height: 36,
    width: '100%',
  },
  leftTopContainer: {
    height: 264,
    width: '100%',
    position: 'relative',
  },
  image: {
    padding: '10px !important',
    maxHeight: 260,
    objectFit: 'contain',
  },
  btnAdd: {
    borderRadius: 0,
    width: '100%',
    fontWeight: 700,
    background: theme.palette.secondary.main,
  },
  btnContent: {
    width: 170,
    display: 'flex',
    justifyContent: 'center',
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
  rightContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.grey.light,
    flex: 1,
    height: '100%',
  },
  listItemText: {
    display: 'flex',
    padding: '10px 20px',
    flexDirection: 'column',
    'overflow-y': 'hidden',
    height: 268,
    margin: 0,
  },
  title: {
    fontSize: 18,
    color: '#7e817f',
    fontWeight: 600,
  },
  description: {
    color: '#7e817f',
  },
  dietsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    '& img': {
      padding: '0px 5px !important',
    },
  },
  bottomContainerDetails_1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #e9e9e9',
    padding: '0px 7.5px',
    flexWrap: 'wrap',
    minHeight: 40,
  },
  bottomContainerDetails_2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #e9e9e9',
    padding: 5,
    flexWrap: 'wrap',
    // minHeight: 40,
    minHeight: 32,
  },
  ratingContainer: {
    minHeight: 19,
    fontWeight: 700,
    color: '#7e817f',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      marginLeft: 3,
    },
  },
  ratingIcon: {
    fontSize: 18,
    color: colors.yellow[700],
  },
  unitsDetails: {
    paddingLeft: 3,
    fontSize: 12,
    color: '#7e817f',
  },
  unitPack: {
    background: theme.palette.primary.main,
    color: '#FFF',
    padding: '2px 6px',
    borderRadius: theme.spacing(2),
    maxWidth: 100,
  },
}))

const ProductCardHorizontal = props => {
  const { item, user, cart, country, addToCart, updateCart, ...rest } = props
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('common')

  const addProductToCart = item => {
    addToCart(item)
  }

  let imageUrl = item?.media[0]?.url ? item?.media[0]?.url : item?.media

  var price = getProductPrice(item, country)

  var productFavorited = false
  if (user?.products) {
    var favorites = user?.products.map(product => product.id)
    productFavorited = favorites.includes(item.id)
  }

  var itemFoundInCart = cart.find(product => product.id == item.id)

  const rating = count => {
    const ratingArray = []
    for (let i = 1; i <= 5; i += 1) {
      i <= count
        ? ratingArray.push(<StarIcon className={classes.ratingIcon} key={i} />)
        : ratingArray.push(<StarBorderIcon className={classes.ratingIcon} key={i} />)
    }
    return ratingArray
  }

  var displayedDiets = []
  item?.diets?.forEach(diet => {
    var dietId = diet?.id ? diet.id : diet
    if (dietId == 3 || dietId == 6 || dietId == 12 || dietId == 16) {
      var foundDiet = _diets.find(_diet => {
        return _diet.id.includes(dietId)
      })
      displayedDiets.push(foundDiet)
    }
  })

  return (
    <Grid item xs={12} md={6} key={item.id} data-aos="fade-up">
      <CardBase className={classes.cardBase} liftUp>
        <ListItem disableGutters className={classes.listItem}>
          <div className={classes.leftContentContainer}>
            <div className={classes.leftTopContainer}>
              <Link href="/products/[url]" as={`/products/${item.url}`}>
                <a>
                  <Image
                    className={classes.image}
                    src={imageUrl}
                    alt={item.name}
                    loading="lazy"
                    layout="fill"
                    objectFit="contain"
                  />
                </a>
              </Link>
            </div>

            {itemFoundInCart?.quantity > 0 ? (
              <div className={classes.btnUpdate}>
                <IconButton
                  size="small"
                  onClick={() => updateCart(item, itemFoundInCart?.quantity - 1)}
                >
                  <Remove color="primary" />
                </IconButton>
                {itemFoundInCart?.quantity} {t('in cart')}
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
                className={classes.btnAdd}
                disabled={item?.inventory == 0}
                onClick={e => {
                  e.stopPropagation()
                  pixels.addToCart({
                    content_id: item.sku,
                    content_name: item.name,
                    value: item.id,
                    content_type: 'product',
                    currency: 'CAD',
                  })
                  addProductToCart(item)
                }}
              >
                <div
                  onClick={e => {
                    e.stopPropagation()
                    pixels.addToCart({
                      content_id: item.sku,
                      content_name: item.name,
                      value: item.id,
                      content_type: 'product',
                      currency: 'CAD',
                    })
                    addProductToCart(item)
                  }}
                  className={classes.btnContent}
                >
                  {item?.inventory == 0 ? (
                    <>{t('out-of-stock')}</>
                  ) : (
                    <div className={classes.btnAddContent}>
                      {t('add-to-cart')} <Add />
                    </div>
                  )}
                </div>
              </Button>
            )}
          </div>

          <div className={classes.rightContentContainer}>
            <Link href="/products/[url]" as={`/products/${item.url}`}>
              <a>
                <ListItemText
                  className={classes.listItemText}
                  primary={item.name}
                  secondary={item.description}
                  primaryTypographyProps={{
                    className: classes.title,
                    align: 'left',
                  }}
                  secondaryTypographyProps={{
                    className: classes.description,
                    varinat: 'subtitle1',
                    align: 'left',
                  }}
                />
                <div className={classes.bottomContainerDetails_2}>
                  {item?.rating_count > 0 ? (
                    <Rating size="small" value={item.rating} precision={0.5} readOnly />
                  ) : (
                    <span></span>
                  )}
                  <Typography component="span" color="primary">
                    ${price?.toFixed(2)}
                    {item?.units > 1 && (
                      <span className={classes.unitsDetails}>{`(${(price / item.units)?.toFixed(
                        2
                      )}$ ea.)`}</span>
                    )}
                  </Typography>
                </div>
              </a>
            </Link>
          </div>
        </ListItem>
      </CardBase>
    </Grid>
  )
}

const mapStateToProps = state => ({
  country: state.session.country,
  user: state.session.user,
  cart: state.orders?.cart,
})

const mapDispatchToProps = dispatch => ({
  addToCart: product => {
    return dispatch(addToCart(product))
  },
  updateCart: (product, quantity) => {
    return dispatch(updateCart(product, quantity))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardHorizontal)
