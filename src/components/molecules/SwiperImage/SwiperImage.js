import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import Swiper from 'swiper'
import { useRouter } from 'next/router'
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 'auto',
  },
  swiperSlideWide: {},
  swiperImageContainerWide: {
    objectFit: 'cover',
  },

  swiperSlide: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    [theme.breakpoints.up('1300')]: {
      '& > div': {
        height: `400px !important`,
      },
    },
  },
  swiperNav: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: 88,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 4,
    '& .swiper-button-prev, & .swiper-button-next': {
      width: theme.spacing(2),
      height: theme.spacing(2),
      padding: theme.spacing(2),
      background: theme.palette.grey.light,
      borderRadius: '100%',
      position: 'relative',
      boxShadow: '0 2px 10px 0 rgba(23,70,161,.11)',
      border: `2px solid #d3d3d3`,
      '&:after': {
        fontSize: 'initial',
        color: '#d3d3d3',
      },
      '&:hover': {
        transform: 'scale(1.1)',
        transition: 'all .2s ease-in-out',
      },
    },
    '& .swiper-button-prev': {
      left: 0,
    },
    '& .swiper-button-next': {
      right: 0,
    },
  },
}))

/**
 * Component to display the image swiper
 *
 * @param {Object} props
 */
const SwiperImage = props => {
  const {
    width,
    height,
    items,
    navigationButtonStyle,
    imageClassName,
    className,
    imageProps,
    ...rest
  } = props
  const theme = useTheme()
  const classes = useStyles()
  const router = useRouter()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: true })

  React.useEffect(() => {
    isSm
      ? new Swiper('.swiper-container', {
          autoplay: {
            delay: 8000,
          },
          effect: 'fade',
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      : new Swiper('.swiper-container', {
          autoplay: {
            delay: 8000,
          },
          slidesPerView: 1,
          spaceBetween: 0,
          navigation: {
            nextEl: '.swiper-container .swiper-button-next',
            prevEl: '.swiper-container .swiper-button-prev',
          },
        })
  })

  const onClickBanner = href => {
    router.push(href, undefined, { shallow: true })
  }

  return (
    <div className={clsx('swiper-container', 'swiper-image', classes.root, className)} {...rest}>
      <div className="swiper-image__wrapper, swiper-wrapper">
        {items.map((item, index) => {
          return (
            <div
              className={clsx('swiper-image__slide', 'swiper-slide', classes.swiperSlide)}
              key={index}
              onClick={() => onClickBanner(item.href)}
            >
              {item.src.endsWith('.mp4') ? (
                <video autoPlay loop className={classes.swiperVideoItem}>
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  srcSet={item.srcSet}
                  width={width}
                  height={height}
                  className={classes.swiperImageContainerWide}
                  priority={index == 0 ? true : false}
                  // className={clsx(
                  //   'swiper-image__item',
                  //   classes.image,
                  //   imageClassName ? classes[imageClassName] : {}
                  // )}
                />
              )}
            </div>
          )
        })}
      </div>
      {items.lenght > 1 && (
        <div className={clsx('swiper-image__navigation', classes.swiperNav)}>
          <div
            className={clsx(
              'swiper-image__navigation-button',
              'swiper-image__navigation-button--prev',
              'swiper-button-prev',
              navigationButtonStyle || {}
            )}
          />
          <div
            className={clsx(
              'swiper-image__navigation-button',
              'swiper-image__navigation-button--next',
              'swiper-button-next',
              navigationButtonStyle || {}
            )}
          />
        </div>
      )}
    </div>
  )
}

export default SwiperImage
