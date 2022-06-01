import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  TextField,
  Avatar,
  CircularProgress,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core'
import { DescriptionCta, SectionHeader } from 'components/molecules'
import { CardBase } from 'components/organisms'
import { connect } from 'react-redux'
import Link from 'next/link'
import { getReviews, createReview, deleteReview } from '../../../../../redux/products/action'
import moment from 'moment'
import _ from 'lodash'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { useTranslation } from 'next-i18next'
import Rating from '@material-ui/lab/Rating'

const labels = {
  1: '',
  2: '',
  3: '(Good)',
  4: '(Too Good)',
  5: '(Way Too Good)',
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .description-cta__button-group': {
      flexWrap: 'nowrap',
    },
  },
  title: {
    fontWeight: 'bold',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  ratingSelectContainer: {
    display: 'flex',
  },
  ratingIcon: {
    color: '#f7da00',
  },
  reviewContainer: {
    background: '#fff',
    border: '1px solid #eee',
    padding: 10,
    borderBottom: 0,
    '&:last-child': {
      borderBottom: '1px solid #eee',
    },
  },
  ratingDeleteBtn: {
    marginTop: 10,
    maxHeight: 20,
  },
  ratingSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  starsContainer: {
    display: 'flex',
  },
  userContainer: {
    display: 'flex',
    alignContent: 'center',
    marginBottom: 5,
  },
  avatar: {
    height: 35,
    width: 35,
  },
  userName: {
    marginLeft: 10,
    marginTop: 5,
  },
  foodieStatusContainer: {
    padding: '1px 7px 1px 7px',
    marginLeft: 10,
    marginTop: 5,
    background: '#88ca82',
    color: '#ffffff',
    borderRadius: 10,
    height: 22,
  },
  verifiedContainer: {
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.primary.main,
    borderRadius: 15,
    color: '#fff',
    padding: '0px 10px',
  },
  descriptionCta: {
    marginTop: theme.spacing(4),
  },
  commentBox: {
    background: '#fff',
  },
}))

const Reviews = props => {
  const { user, getReviews, createReview, deleteReview, className, product, ...rest } = props
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [displayReview, setDisplayReview] = useState(false)
  const [displayThanks, setDisplayThanks] = useState(false)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const [hover, setHover] = React.useState(-1)

  const [reviews, setReviews] = useState([])
  const [sort, setSort] = useState('created_at')
  const [sortDirection, setSortDirection] = useState('DESC')
  const [view, setView] = React.useState('30')
  const [start, setStart] = React.useState(0)
  const [hideLoadMore, setHideLoadMore] = React.useState(false)
  const { t } = useTranslation('product')

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    setLoading(true)
    getReviews(product.id, sort, sortDirection, view, 0)
      .then(res => {
        setReviews(res)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [product])

  const ratingSelect = count => {
    const ratingArray = []
    for (let i = 1; i <= 5; i += 1) {
      i <= count
        ? ratingArray.push(<StarIcon className={classes.ratingIcon} key={i} />)
        : ratingArray.push(<StarBorderIcon className={classes.ratingIcon} key={i} />)
    }

    return ratingArray
  }

  const submitReview = async () => {
    setLoading(true)
    const data = {
      rating: rating,
      comment: comment,
      product: product.id,
      user: user.id,
    }
    createReview(data).then(res => {
      if (res.error != null) {
        setError(res.message)
      }
      setLoading(false)
      setDisplayReview(false)
      setDisplayThanks(true)
    })
  }

  const removeReview = async review => {
    setLoading(true)
    deleteReview(review).then(res => {
      setLoading(false)
    })
  }

  const handleChangeSort = event => {
    setSort(event.target.value)
    setStart(0)
    getReviews(product.id, event.target.value, sortDirection, view, 0).then(res => {
      setReviews(res)
    })
  }

  const handleChangeSortDirection = event => {
    setSortDirection(event.target.value)
    setStart(0)
    getReviews(product.id, sort, event.target.value, view, 0).then(res => {
      setReviews(res)
    })
  }

  const handleChangeView = event => {
    setView(event.target.value)
    setStart(0)
    getReviews(product.id, sort, sortDirection, event.target.value, 0).then(res => {
      setReviews(res)
    })
  }

  const handleLoadMore = start => {
    setStart(start + parseInt(view))
    getReviews(product.id, sort, sortDirection, view, start + parseInt(view)).then(res => {
      if (res.length > 0) setReviews([...reviews, ...res])
      else setHideLoadMore(true)
    })
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <DescriptionCta
        title={t('reviews')}
        primaryCta={
          isSm && (
            <>
              <FormControl variant="outlined" size="small" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">{t('sort')}</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={sort}
                  onChange={handleChangeSort}
                  label="Sort"
                >
                  <MenuItem value={'created_at'}>{t('date')}</MenuItem>
                  <MenuItem value={'rating'}>{t('rating')}</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  {t('sort-direction')}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={sortDirection}
                  onChange={handleChangeSortDirection}
                  label="Sort Direction"
                >
                  <MenuItem value={'ASC'}>{t('ascending')}</MenuItem>
                  <MenuItem value={'DESC'}>{t('descending')}</MenuItem>
                </Select>
              </FormControl>
              {/* <FormControl variant="outlined" size="small" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">View</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={view}
                  onChange={handleChangeView}
                  label="View"
                >
                  <MenuItem value={'30'}>30</MenuItem>
                  <MenuItem value={'60'}>60</MenuItem>
                  <MenuItem value={'90'}>90</MenuItem>
                </Select>
              </FormControl> */}
            </>
          )
        }
        align={'left'}
        titleProps={{
          variant: 'h4',
          color: 'textPrimary',
        }}
        data-aos="fade-up"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          {loading ? (
            <CircularProgress />
          ) : reviews?.length > 0 ? (
            reviews.map(review => {
              var deletable = user?.id == review?.user || user?.id == review?.user?.id
              return (
                <div className={classes.reviewContainer} key={review?.id}>
                  <div className={classes.userContainer}>
                    <Avatar
                      src={review?.user?.profile_pic?.formats?.thumbnail?.url}
                      className={classes.avatar}
                    />
                    <span className={classes.userName}>{review?.name} </span>
                  </div>
                  <div className={classes.ratingSection}>
                    <div className={classes.starsContainer}>
                      <Rating size="small" value={review?.rating} precision={0.5} readOnly />
                      <span className={classes.verifiedContainer}>{t('verified-purchaser')}</span>
                    </div>
                    <div>{moment(review?.created_at).fromNow()}</div>
                    <div>{review?.comment}</div>
                  </div>
                  {deletable && (
                    <Button
                      onClick={() => removeReview(review)}
                      className={classes.ratingDeleteBtn}
                      variant="contained"
                      type="submit"
                      size="large"
                    >
                      {t('delete')}
                    </Button>
                  )}
                </div>
              )
            })
          ) : displayThanks ? (
            <div></div>
          ) : (
            <Typography variant="subtitle1" color="textPrimary">
              {t('no-comment-yet')}
            </Typography>
          )}
        </Grid>
        {!hideLoadMore && reviews?.length > 0 && (
          <Grid item container justify="center" xs={12}>
            <Button
              onClick={() => handleLoadMore(start)}
              variant="outlined"
              color="secondary"
              size="large"
            >
              {t('load-more')}
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          {displayReview ? (
            <>
              <DescriptionCta
                title={'Write a review'}
                align={'left'}
                titleProps={{
                  variant: 'h4',
                  color: 'textPrimary',
                }}
                className={classes.descriptionCta}
                data-aos="fade-up"
              />

              <Grid container spacing={isMd ? 4 : 2}>
                <Grid item xs={12}>
                  <div className={classes.form}>
                    {error != null ? (
                      <Typography variant="subtitle1" color="textPrimary">
                        {error}
                      </Typography>
                    ) : (
                      <Grid container spacing={isMd ? 4 : 2}>
                        <Grid item xs={12} data-aos="fade-up">
                          <Typography variant="subtitle1" color="textPrimary">
                            {t('message')}
                          </Typography>
                          <TextField
                            onChange={event => setComment(event.target.value)}
                            value={comment}
                            placeholder={t('message-placeholder')}
                            variant="outlined"
                            name="message"
                            fullWidth
                            multiline
                            rows={4}
                            className={classes.commentBox}
                          />
                        </Grid>
                        <Grid item xs={12} data-aos="fade-up">
                          <Typography variant="subtitle1" color="textPrimary">
                            {t('rating')}
                          </Typography>
                          <div className={classes.ratingSelectContainer}>
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
                            <div>
                              {rating !== null && (
                                <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
                              )}
                            </div>
                          </div>
                        </Grid>
                        <Grid item container justify="center" xs={12}>
                          {loading ? (
                            <CircularProgress />
                          ) : (
                            // <>
                            //   <Button
                            //     variant="contained"
                            //     color="default"
                            //     className={classes.button}
                            //     startIcon={<CloudUploadIcon />}
                            //   >
                            //     Upload
                            //   </Button>
                            <Button
                              onClick={() => submitReview()}
                              variant="contained"
                              disabled={comment.length == 0}
                              type="submit"
                              size="large"
                            >
                              {t('submit')}
                            </Button>
                            // </>
                          )}
                        </Grid>
                      </Grid>
                    )}
                  </div>
                </Grid>
              </Grid>
            </>
          ) : displayThanks ? (
            <div>{t('thanks-for-review')}</div>
          ) : (
            <Grid item container justify="center" xs={12}>
              {user && Object.keys(user).length === 0 ? (
                <Link href={'/signin'}>
                  <a>
                    <Button variant="contained" color="primary" size="large">
                      {t('login-and-review')}
                    </Button>
                  </a>
                </Link>
              ) : (
                <Button
                  onClick={() => setDisplayReview(true)}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  {t('write-review')}
                </Button>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
})

const mapDispatchToProps = dispatch => ({
  getReviews: (productId, sort, sortDirection, view, start) => {
    return dispatch(getReviews(productId, sort, sortDirection, view, start))
  },
  createReview: data => {
    return dispatch(createReview(data))
  },
  deleteReview: review => {
    return dispatch(deleteReview(review))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
