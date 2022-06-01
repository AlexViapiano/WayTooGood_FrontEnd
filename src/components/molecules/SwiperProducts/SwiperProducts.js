import React from 'react'
import Swiper from 'swiper'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, useMediaQuery } from '@material-ui/core'
import clsx from 'clsx'
import ProductCard from '../../../common/ProductCard'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 'auto',
    overflow: 'hidden',
  },
  swiperSlide: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: 15,
    [theme.breakpoints.up('1300')]: {
      '& > div': {
        height: `425px !important`,
      },
    },
  },
  swiperNav: {
    zIndex: 1,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '100%',
    maxWidth: 1300,
    height: 1,
    marginTop: '-240px',
    marginLeft: -15,
    '& .swiper-button-prev, & .swiper-button-next': {
      width: theme.spacing(2),
      height: theme.spacing(12),
      padding: theme.spacing(2),
      background: theme.palette.secondary.main,
      opacity: '50%',
      position: 'relative',
      borderRadius: 3,
      '&:after': {
        fontSize: 'initial',
        color: '#FFF',
      },
      '&:hover': {
        transform: 'scale(1.1)',
        transition: 'all .2s ease-in-out',
      },
    },
    '& .swiper-button-prev': {
      left: 0,
      marginLeft: 3,
    },
    '& .swiper-button-next': {
      right: 0,
      marginRight: 3,
    },
    '& .swiper-button-disabled': {
      opacity: '15%',
    },
  },
  'swiper-nav-button': {
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
    padding: `${theme.spacing(2)}px !important`,
  },
}))

const SwiperProducts = props => {
  const { className, navigationButtonStyle, items, imageProps, ...rest } = props
  const theme = useTheme()
  const classes = useStyles()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: true })
  const isMd = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true })

  React.useEffect(() => {
    new Swiper('.swiper-container-products', {
      slidesPerView: isMd ? 6 : isSm ? 4 : 2,
      spaceBetween: 15,
      slidesPerGroup: 2,
      navigation: {
        nextEl: '.swiper-container-products .swiper-button-next',
        prevEl: '.swiper-container-products .swiper-button-prev',
      },
    })
  })
  if (!isSm && items.length <= 2) {
    return (
      <Grid container justify="center">
        {items.map((item, index) => (
          <Grid item xs={6} sm={3} key={index} data-aos="fade-up">
            <ProductCard className={classes.swiperSlide} item={item} />
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <div
      className={clsx('swiper-container-products', 'swiper-image', classes.root, className)}
      {...rest}
    >
      <div className="swiper-image__wrapper, swiper-wrapper">
        {items.map((item, index) => {
          return (
            <div
              className={clsx('swiper-image__slide', 'swiper-slide', classes.swiperSlide)}
              key={index}
            >
              <ProductCard item={item} />
            </div>
          )
        })}
      </div>
      <div className={classes.swiperNav}>
        <div className={clsx('swiper-button-prev', 'swiper-nav-button' || {})}></div>
        <div className={clsx('swiper-button-next', 'swiper-nav-button' || {})}></div>
      </div>
    </div>
  )
}

export default SwiperProducts
