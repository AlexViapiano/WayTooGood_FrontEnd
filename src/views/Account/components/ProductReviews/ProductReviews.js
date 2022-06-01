import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  MenuItem,
} from '@material-ui/core'
import { getUserReviews, getUserOrders } from '../../../../../redux/orders/action'
import { createReview, deleteReview } from '../../../../../redux/products/action'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import moment from 'moment'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import Rating from '@material-ui/lab/Rating'
import { store } from 'react-notifications-component'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlSmall: {
    margin: theme.spacing(0.5),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  cardHighlighted: {
    background: theme.palette.primary.main,
  },
  checkBox: {
    background: 'transparent',
    borderRadius: 0,
  },
  list: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  whiteText: {
    color: '#fff',
  },
  whiteInput: {
    color: '#fff',
    border: '1px solid #fff',
    borderRadius: 5,
  },
  ratingSelectContainer: {
    display: 'flex',
  },
  ratingIcon: {
    color: '#f7da00',
  },
  ratingContainer: {
    width: '100%',
    background: '#fff',
    border: '1px solid #eee',
    padding: 10,
    borderBottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:last-child': {
      borderBottom: '1px solid #eee',
    },
  },
  ratingDeleteBtn: {
    background: theme.palette.error.light,
    color: 'white',
  },
  ratingSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  starsContainer: {
    minWidth: 100,
  },
}))

const ProductReviews = props => {
  const {
    user,
    orders,
    userReviews,
    getUserReviews,
    getUserOrders,
    createReview,
    deleteReview,
    className,
    ...rest
  } = props
  const classes = useStyles()
  const { t } = useTranslation('account')

  const [loading, setLoading] = useState(false)
  const [productToReview, setProductToReview] = useState(null)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(3)
  const [error, setError] = useState(null)
  const [hover, setHover] = React.useState(-1)

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    if (user?.id && userReviews.length == 0) {
      setLoading(false)
      getUserReviews(user.id).then(() => {
        setLoading(false)
      })
    }
    if (user?.id && orders.length == 0) {
      setLoading(false)
      getUserOrders(user.id).then(() => {
        setLoading(false)
      })
    }
  }, [user])

  const submitReview = async () => {
    setLoading(true)
    const data = {
      rating: rating,
      comment: comment,
      product: productToReview.id,
      user: user.id,
    }
    createReview(data).then(res => {
      if (res.error != null) {
        setError(res.message)
      }
      store.addNotification({
        title: 'Review Submitted!',
        message: 'Your review was sent to our team for approval.',
        type: 'success',
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 4000,
          onScreen: true,
        },
      })
      setProductToReview(null)
      setComment('')
      setRating(3)
      setLoading(false)
    })
  }

  const removeReview = async review => {
    setLoading(true)
    deleteReview(review).then(res => {
      getUserReviews(user.id).then(() => {
        setLoading(false)
      })
    })
  }

  var productsPurchased = []
  orders.forEach(order => {
    order.products.forEach(product => {
      if (!productsPurchased.includes(product)) {
        productsPurchased.push(product)
      }
    })
  })
  var uniqPurchasedProducts = _.uniqBy(productsPurchased, function(product) {
    return product.id
  })
  var reviewedProducts = []
  userReviews.forEach(review => {
    if (!reviewedProducts.includes(review.product)) {
      reviewedProducts.push(review.product)
    }
  })

  var unreviewedProducts = _.difference(uniqPurchasedProducts, reviewedProducts)

  var unreviewedProductsMenuItems =
    unreviewedProducts &&
    unreviewedProducts.map(product => {
      return (
        <MenuItem key={product.id} onClick={() => setProductToReview(product)} value={product.id}>
          {product.name}
        </MenuItem>
      )
    })

  if (loading) {
    return (
      <center>
        <CircularProgress />
      </center>
    )
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        {unreviewedProducts.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary">
                Review a Product
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
                Previously Purchased Products
              </Typography>

              <TextField
                variant="outlined"
                size="medium"
                fullWidth
                type="text"
                select
                SelectProps={{
                  value: productToReview?.name,
                }}
              >
                {unreviewedProductsMenuItems}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
                Comment
              </Typography>

              <TextField
                placeholder="What did you think of this product?"
                variant="outlined"
                size="medium"
                name="comment"
                fullWidth
                type="text"
                onChange={event => setComment(event.target.value)}
                multiline
                rows={4}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
                Rating
              </Typography>

              <Rating
                name="hover-feedback"
                value={rating}
                precision={1}
                onChange={(event, newValue) => {
                  setRating(newValue)
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover)
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={() => submitReview()}
                disabled={comment?.length == 0 || productToReview == null}
                variant="contained"
                type="submit"
                color="primary"
                size="large"
              >
                Publish
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Typography variant="h5" color="textPrimary">
            {t('review-history')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {userReviews?.length > 0 ? (
            userReviews.map(review => {
              return (
                <div className={classes.ratingContainer} key={review?.id}>
                  <div className={classes.ratingSection}>
                    <div>{review?.product?.name}</div>
                    <Rating size="small" value={review?.rating} precision={0.5} readOnly />
                    <div>{moment(review?.created_at).fromNow()}</div>
                    <div>{review?.comment}</div>
                  </div>
                  <Button
                    onClick={() => removeReview(review)}
                    className={classes.ratingDeleteBtn}
                    variant="contained"
                    type="submit"
                    size="large"
                  >
                    Delete
                  </Button>
                </div>
              )
            })
          ) : (
            <Typography variant="subtitle1" color="textPrimary">
              {t('no-comments')}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
  userReviews: state.orders.userReviews,
  orders: state.orders.orders,
})

const mapDispatchToProps = dispatch => ({
  getUserReviews: userId => {
    return dispatch(getUserReviews(userId))
  },
  getUserOrders: userId => {
    return dispatch(getUserOrders(userId))
  },
  createReview: data => {
    return dispatch(createReview(data))
  },
  deleteReview: review => {
    return dispatch(deleteReview(review))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews)
