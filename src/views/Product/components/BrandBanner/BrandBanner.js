import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, Typography } from '@material-ui/core'
import { Grid, Button } from '@material-ui/core'
import Image from 'next/image'
import { SectionHeader } from 'components/molecules'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const marked = require('marked')

const useStyles = makeStyles(theme => ({
  root: {},
  videoIframe: {
    boxShadow: '0 5px 15px 0 rgba(30,76,165,.2)',
    borderRadius: theme.spacing(1),
    maxWidth: 600,
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
      maxWidth: 400,
      maxHeight: 200,
    },
  },
  brandContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logoContainer: {
    width: '50%',
    height: 150,
    maxWidth: 200,
    position: 'relative',
  },
  brandDefaultContainer: {
    width: '100%',
    height: 250,
    maxWidth: 300,
    position: 'relative',
  },
  descriptionContainer: {
    marginBottom: 20,
    fontSize: 16,
    // maxHeight: 192,
    textAlign: 'center',
    // overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 5,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
  },
  defaultBrandImage: {
    height: '100%',
    maxHeight: 350,
    [theme.breakpoints.down('sm')]: {
      maxHeight: 150,
    },
  },
}))

const BrandBanner = props => {
  const { brand, className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('product')

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  const logoUrl = brand?.logo && brand.logo?.url ? brand.logo.url : null

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container justify="space-between" spacing={4}>
        <Grid item xs={12} md={6} className={classes.brandContainer}>
          {logoUrl && (
            <div className={classes.logoContainer}>
              <Image
                className={classes.image}
                src={logoUrl}
                alt={brand.name ? brand.name : 'Brand'}
                loading="lazy"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}

          {brand?.header && (
            <div className={classes.descriptionContainer}>
              <Typography color="textPrimary" variant="h6">
                {brand?.header}
              </Typography>
            </div>
          )}

          <Link href="/brands/[url]" as={`/brands/${brand?.url}`}>
            <Button variant="contained" color="primary" size={isMd ? 'large' : 'medium'}>
              {t('view-profile')}
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12} md={6} className={classes.brandContainer}>
          {brand.video_link ? (
            <iframe
              className={classes.videoIframe}
              title="video"
              width="100%"
              height="315"
              src={brand.video_link}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className={classes.brandDefaultContainer}>
              <Image
                className={classes.image}
                src="/images/illustrations/default-shopping.png"
                alt={brand.name ? brand.name : 'Brand'}
                loading="lazy"
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default BrandBanner
