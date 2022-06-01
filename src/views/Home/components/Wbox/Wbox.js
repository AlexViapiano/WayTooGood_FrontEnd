import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, Grid, Button, Typography } from '@material-ui/core'
import { SectionHeader } from 'components/molecules'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {},
  ctaContainer: {
    // boxShadow: 'rgb(0 0 0 / 8%) 0px 4px 12px',
    padding: 20,
    maxWidth: 500,
    borderRadius: 8,
    // background: '#FFF',
    '& div': {
      marginBottom: 0,
    },
    '& .section-header__title-wrapper': {
      paddingBottom: 0,
    },
    // [theme.breakpoints.down('md')]: {
    //   boxShadow: 'none',
    //   background: 'none',
    // },
  },
  price: {
    color: theme.palette.text.primary,
    fontSize: 32,
    fontWeight: 'normal',
    [theme.breakpoints.up('md')]: {
      fontSize: 48,
    },
  },
  title: {
    fontWeight: 'bold',
  },
  disclaimer: {
    maxWidth: 400,
    padding: 0,
    display: 'inline-block',
  },
  videoContainer: {
    position: 'relative',
    width: 550,
    height: 272,
    [theme.breakpoints.down('xs')]: {
      width: 250,
      height: 445,
    },
  },
  bigButton: {
    background: 'linear-gradient(328deg, rgba(188,218,91,1) 0%, rgba(170,203,61,1) 100%)',
    padding: '15px 40px',
    borderRadius: 10,
    textTransform: 'none',
    fontWeight: 900,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    width: 300,
  },
  bigButtonSecondary: {
    background: 'linear-gradient(328deg, rgba(128,146,173,1) 0%, rgba(90,106,129,1) 100%)',
    padding: '15px 40px',
    borderRadius: 10,
    textTransform: 'none',
    fontWeight: 900,
    fontSize: 18,
    marginTop: 10,
    // marginBottom: 10,
    width: 300,
  },
  videoIframe: {
    boxShadow: '0 5px 15px 0 rgba(30,76,165,.2)',
    borderRadius: theme.spacing(1),
  },
  video: {
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
    borderRadius: 8,
    width: '100%',
    maxHeight: 350,
  },
}))

const Wbox = props => {
  const { video, className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('home')

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: false })
  const isXs = useMediaQuery(theme.breakpoints.up('xs'))

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={isMd ? 4 : 2}
        direction={isMd ? 'row' : 'column'}
      >
        <Grid item align="center" xs={12} md={6} data-aos={'fade-up'}>
          <div className={classes.ctaContainer}>
            <SectionHeader
              title={
                <Typography variant="h4" color="textPrimary" className={classes.title}>
                  {t('wbox-title')}
                </Typography>
              }
              subtitle={
                <Typography variant="h6" color="textPrimary" className={classes.disclaimer}>
                  {t('wbox-text')}
                </Typography>
              }
              ctaGroup={[
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={4}
                  direction={'column'}
                >
                  <Link href={'/subscribe'}>
                    <a>
                      <Button variant="contained" color="primary" className={classes.bigButton}>
                        {t('subscribe-btn')}
                      </Button>
                    </a>
                  </Link>
                  <Typography variant="h5" color="textPrimary">
                    {t('or')}
                  </Typography>
                  <Link href={'/products'}>
                    <a>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.bigButtonSecondary}
                      >
                        {t('shop-marketplace')}
                      </Button>
                    </a>
                  </Link>
                </Grid>,
              ]}
              align="center"
              data-aos="fade-up"
            />
          </div>
        </Grid>
        <Grid item container justify="center" align="center" xs={12} md={6} data-aos={'fade-up'}>
          {/* {isSm && (
            <div className={classes.videoContainer}>
              <iframe
                width={'100%'}
                height={'100%'}
                src={'https://www.youtube.com/embed/Er49tlp_Mr4'}
                frameBorder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={classes.videoIframe}
              ></iframe>
            </div>
          )} */}

          <center>
            <video controls className={classes.video}>
              <source src={'/videos/wboxAd.mp4'} type="video/mp4" />
            </video>
          </center>
        </Grid>
      </Grid>
    </div>
  )
}

export default Wbox
