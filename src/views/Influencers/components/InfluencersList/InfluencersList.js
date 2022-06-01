import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Link from 'next/link'
import _ from 'lodash'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 500,
    '& h6': {
      color: theme.palette.secondary.main,
    },
  },
  brandContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `solid 1px rgba(43, 41, 45, 0.2)`,
    borderRadius: theme.spacing(1),
    padding: '0px 15px 0px 30px',
    height: 75,
    background: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.primary.main,
      boxShadow: '0 11px 55px 10px rgba(0, 0, 0, 0.07), 0 13px 18px -8px rgba(0, 0, 0, 0.15)',
      '& h6': {
        color: 'white !important',
      },
    },
  },
  logoContainer: {
    position: 'relative',
    height: 73,
    width: 115,
  },
  image: {},
}))

const InfluencersList = props => {
  const { influencers, className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('common')
  var sortedInfluencers = _.orderBy(influencers, 'name', 'asc')
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={2}>
        {sortedInfluencers.length > 0 ? (
          sortedInfluencers.map((influencer, index) => {
            var imageUrl = influencer?.logo?.formats?.thumbnail?.url
              ? influencer.logo.formats.thumbnail.url
              : influencer?.logo?.url
              ? influencer.logo.url
              : '/images/photos/w-brand.png'
            return (
              <Grid item xs={12} md={6} key={index} data-aos="fade-up">
                <Link href="/influencers/[url]" as={`/influencers/${influencer?.url}`}>
                  <a>
                    <div className={classes.brandContainer}>
                      <Typography color="textPrimary" variant="h6">
                        {influencer.name}
                      </Typography>
                      <div className={classes.logoContainer}>
                        {imageUrl && (
                          <Image
                            className={classes.image}
                            src={imageUrl}
                            alt={influencer.name}
                            loading="lazy"
                            layout="fill"
                            objectFit="contain"
                          />
                        )}
                      </div>
                    </div>
                  </a>
                </Link>
              </Grid>
            )
          })
        ) : (
          <div>{t('no-results-found')}</div>
        )}
      </Grid>
    </div>
  )
}

export default InfluencersList
