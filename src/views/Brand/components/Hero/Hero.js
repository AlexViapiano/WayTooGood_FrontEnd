import React from 'react'
import clsx from 'clsx'
import { Section } from 'components/organisms'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    background: 'white',
  },
  sectionWrapper: {
    height: 350,
    display: 'flex',
    justifyContent: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginBottom: 25,
    },
  },
  coverContainer: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 150,
    border: '2px solid #fbfbfb',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `radial-gradient(circle, rgba(242,242,242,1) 40%, rgb(210 210 210) 80%)`,
    position: 'absolute',
    bottom: -75,
    [theme.breakpoints.down('sm')]: {
      width: 125,
      height: 125,
      borderRadius: 125,
      border: '2px solid #fbfbfb',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: `radial-gradient(circle, rgba(242,242,242,1) 40%, rgb(210 210 210) 80%)`,
      position: 'absolute',
      bottom: -50,
    },
  },
}))

const Hero = props => {
  const { className, brand, ...rest } = props
  const classes = useStyles()
  const theme = useTheme()

  var mediaUrl = brand?.logo?.formats?.small?.url
    ? brand.logo.formats.small.url
    : brand?.logo?.url
    ? brand.logo.url
    : '/images/photos/defaultBrandLogo.jpg'

  var cover = brand?.cover?.url ? brand.cover.url : '/images/photos/defaultBrandBanner.jpg'

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.sectionWrapper}>
        <Image
          className={classes.coverContainer}
          alt={brand.name}
          src={cover}
          layout="fill"
          objectFit="cover"
        />
        <div className={classes.imageContainer}>
          <Image alt={brand.name} src={mediaUrl} layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  )
}

export default Hero
