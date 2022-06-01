import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, colors, GridList, GridListTile } from '@material-ui/core'
var Carousel = require('react-responsive-carousel').Carousel
import ImageMagnify from './ImageMagnify'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {},
  carousel: {
    '& .thumbs': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& .thumb': {
      border: '3px solid #eee',
      borderRadius: 5,
    },
    '& .thumb.selected': {
      border: '3px solid ' + theme.palette.primary.main,
    },
    '& .slide': {
      background: '#fff',
      display: 'grid',
    },
    '& img': {
      maxHeight: 300,
      background: '#fff',
      objectFit: 'contain',
      [theme.breakpoints.up('md')]: {
        maxHeight: 600,
      },
    },
  },
  carouselSmallContainer: {
    position: 'relative',
    height: 400,
    width: '100%',
    minHeight: '100%',
    minWidth: '100%',
  },
  thumbnailContainer: {
    position: 'relative',
    height: 100,
    [theme.breakpoints.down('sm')]: {
      height: 50,
    },
  },
}))

const ContentLeft = props => {
  const { data, product, className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('product')

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))
  const isNotSm = useMediaQuery(theme.breakpoints.down('sm'))
  const medias = product?.media
    ? product.media.map(media => {
        return {
          original:
            isNotSm && media?.formats?.small?.url
              ? media?.formats?.small?.url
              : media?.formats?.large?.url
              ? media?.formats?.large?.url
              : media?.url
              ? media.url
              : media,
          thumbnail: media?.formats?.thumbnail?.url
            ? media?.formats?.thumbnail?.url
            : media?.url
            ? media.url
            : media,
          alt: media.alternativeText,
          srcSet: '',
          ext: media.ext,
        }
      })
    : []

  const customRenderThumb = () =>
    medias.map((media, i) => {
      return (
        <div key={i} className={classes.thumbnailContainer}>
          <Image
            key={media.thumbnail}
            alt={media.thumbnail}
            src={media.thumbnail}
            layout="fill"
            loading="lazy"
            objectFit="contain"
          />
        </div>
      )
    })

  if (medias.length == 0) return <div>{t('no-images')}</div>

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Carousel
        className={classes.carousel}
        renderThumbs={customRenderThumb}
        showThumbs={true}
        showArrows={true}
      >
        {isSm
          ? medias.map((media, index) => <ImageMagnify key={index} media={media} />)
          : medias.map((media, index) => {
              return (
                <div className={classes.carouselSmallContainer}>
                  <Image
                    key={media.original}
                    alt={media.alt}
                    src={media.original}
                    layout="fill"
                    loading="lazy"
                    objectFit="contain"
                  />
                </div>
              )
            })}
      </Carousel>
    </div>
  )
}

export default ContentLeft
