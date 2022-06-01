import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, Typography, Grid, Button, TextField } from '@material-ui/core'
import { SectionHeader, SwiperImage } from 'components/molecules'
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
  root: {
    // background: '#fafafa',
    // filter: 'drop-shadow(1px 2px 2px #eeeeee)',
    // marginTop: 48,
  },
  banner: {
    maxHeight: 400,
    maxWidth: 1300,
    filter: 'drop-shadow(1px 2px 2px #eeeeee)',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
  },
  bannerWide: {
    maxHeight: 400,
    maxWidth: 2600,
    filter: 'drop-shadow(1px 2px 2px #eeeeee)',
    [theme.breakpoints.up('2600')]: {
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
    },
  },
  swiperNavButton: {
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
    padding: `${theme.spacing(2)}px !important`,
  },
}))

const HomeBanner = props => {
  const { banners, banners_wide, className, ...rest } = props
  const classes = useStyles()

  const theme = useTheme()
  const isLg = useMediaQuery(theme.breakpoints.up(1300))

  if (!banners) {
    return <div></div>
  }

  const swiperBanners = banners.map(banner => {
    return {
      src: banner?.url,
      alt: banner?.alternativeText,
      href: banner?.caption,
    }
  })

  // const swiperBannersWide = banners_wide.map(banner => {
  //   return {
  //     src: banner?.url,
  //     alt: banner?.alternativeText,
  //     href: banner?.caption,
  //   }
  // })

  return (
    <div className={classes.root}>
      {/* {!isLg ? ( */}
      <SwiperImage
        className={classes.banner}
        navigationButtonStyle={classes.swiperNavButton}
        width={1300}
        height={400}
        items={swiperBanners}
      />
      {/* ) : (
        <SwiperImage
          className={classes.bannerWide}
          navigationButtonStyle={classes.swiperNavButton}
          width={2600}
          height={400}
          items={swiperBannersWide}
        />
      )} */}
    </div>
  )
}

export default HomeBanner
