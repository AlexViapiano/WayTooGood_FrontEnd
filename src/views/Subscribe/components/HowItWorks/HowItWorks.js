import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography, Grid, useMediaQuery } from '@material-ui/core'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { Section } from 'components/organisms'
import { SectionHeader } from 'components/molecules'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 0,
    '& .section-header': {
      marginBottom: 0,
    },
  },
  title: {
    margin: 30,
  },
  stepsContainer: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  step: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    margin: 30,
    maxWidth: 350,
    [theme.breakpoints.down('sm')]: {
      margin: 16,
    },
  },
  stepPicture: {
    width: 150,
    height: 150,
    margin: '0 auto 15px',
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepText: {},
  buttonContainers: {
    display: 'flex',
    '& a': {
      marginRight: 5,
      marginLeft: 5,
    },
  },
  videoContainer: {
    marginTop: 20,
    position: 'relative',
    width: 550,
    height: 272,
    [theme.breakpoints.down('xs')]: {
      width: 250,
      height: 445,
    },
  },
  // videoIframe: {
  //   boxShadow: '0 5px 15px 0 rgba(30,76,165,.2)',
  //   borderRadius: theme.spacing(1),
  // },
}))

const HowItWorks = props => {
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('common')
  const isXs = useMediaQuery(theme.breakpoints.up('xs'), { noSsr: true })
  return (
    <Section className={classes.root}>
      <SectionHeader
        title={<Typography variant="h3">{t('how-it-works')}</Typography>}
        // subtitle={<Typography variant="h6"></Typography>}
        titleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        fadeUp
      />

      {/* <Grid container justify="center" align="center" data-aos={'fade-up'}>
        {isXs && (
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
        )}

        {!isXs && (
          <div className={classes.videoContainer}>
            <iframe
              width={'100%'}
              height={'100%'}
              src={'https://www.youtube.com/embed/ylupNMPTIQA'}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={classes.videoIframe}
            ></iframe>
          </div>
        )}
      </Grid> */}

      <div className={classes.stepsContainer}>
        <div className={classes.step}>
          <div className={classes.stepPicture}>
            <Image
              src="/images/illustrations/howitworks-1.png"
              alt="wtg"
              width={200}
              height={200}
              loading="lazy"
            />
          </div>
          <Typography color="textPrimary" variant="h6" align="center" className={classes.stepTitle}>
            {t('how-step-1-1')}
          </Typography>
          <Typography color="textPrimary" variant="subtitle1" align="center">
            {t('how-step-1-2')}
          </Typography>
        </div>
        <div className={classes.step}>
          <div className={classes.stepPicture}>
            <Image
              src="/images/illustrations/howitworks-2.png"
              alt="wtg"
              width={200}
              height={200}
              loading="lazy"
            />
          </div>

          <Typography color="textPrimary" variant="h6" align="center" className={classes.stepTitle}>
            {t('how-step-2-1')}
          </Typography>
          <Typography color="textPrimary" variant="subtitle1" align="center">
            {t('how-step-2-2')}
          </Typography>
        </div>
        <div className={classes.step}>
          <div className={classes.stepPicture}>
            <Image
              src="/images/illustrations/howitworks-3.png"
              alt="wtg"
              width={200}
              height={200}
              loading="lazy"
            />
          </div>
          <Typography color="textPrimary" variant="h6" align="center" className={classes.stepTitle}>
            {t('how-step-3-1')}
          </Typography>
          <Typography color="textPrimary" variant="subtitle1" align="center">
            {t('how-step-3-2')}
          </Typography>
        </div>
      </div>
    </Section>
  )
}

export default HowItWorks
