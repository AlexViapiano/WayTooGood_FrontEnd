import React from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import DoneIcon from '@material-ui/icons/Done'
import { useRouter } from 'next/router'
import { Section } from 'components/organisms'

const useStyles = makeStyles(theme => ({
  '@global': {
    '@keyframes gradient': {
      '0%': {
        backgroundPosition: `0% 50%`,
      },
      '50%': {
        backgroundPosition: `100% 50%`,
      },
      '100%': {
        backgroundPosition: `0% 50%`,
      },
    },
  },
  root: {
    background: `linear-gradient(90deg, rgba(255,228,228,1) 0%, rgba(198,220,255,1) 15%, rgba(235,255,220,1) 33%, rgba(255,252,227,1) 51%, rgba(254,233,255,1) 68%, rgba(215,217,255,1) 85%, rgba(255,228,228,1) 100%)`,
    backgroundSize: `400% 400%`,
    animation: `gradient 15s ease infinite`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 1000,
    [theme.breakpoints.down('sm')]: {
      height: 800,
    },
    [theme.breakpoints.down('xs')]: {
      height: 800,
    },
  },
  heroSimpleBackground: {
    width: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundImage: `url(/images/shapes/raining_products_lg.svg)`,
    [theme.breakpoints.down('md')]: {
      backgroundImage: `url(/images/shapes/raining_products_md.svg)`,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundImage: 'none', //`url(/images/shapes/raining_products_sm.svg)`,
    },
    [theme.breakpoints.down('xs')]: {
      backgroundImage: 'none', //`url(/images/shapes/raining_products_xs.png)`,
    },
  },
  title: {
    fontWeight: 700,
    maxWidth: 700,
    lineHeight: 'normal',
  },
  buttonLarge: {
    padding: '20px 60px',
    borderRadius: 10,
    background: 'linear-gradient(328deg, rgba(188,218,91,1) 0%, rgba(170,203,61,1) 100%)',
    marginTop: 10,
    textTransform: 'none',
    '& h6': {
      fontWeight: 'bold',
    },
    marginTop: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  featuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 30,
    background: `#ffffff70`,
    padding: 20,
    borderRadius: 5,
    width: 280,
  },
  featureContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      marginRight: 5,
    },
  },
  promotionContainer: {
    marginTop: 15,
    background: '#FFF',
    border: '1px black dashed',
    borderRadius: 5,
    boxShadow: 'rgb(0 0 0 / 24%) 0px 3px 8px',
    padding: 10,
    width: 300,
  },
  freeTrialTitle: {
    fontWeight: 600,
    marginBottom: 0,
  },
  freeTrialCode: {
    fontWeight: 600,
  },
}))

const Hero = props => {
  const { executeScroll, user, stripeCustomer, className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const router = useRouter()

  var trial = router?.query.trial != null

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Section>
          <center>
            <Image
              src="/images/photos/wbox.png"
              alt="wtg"
              width={150}
              height={150}
              loading="lazy"
            />
            <Typography color="textPrimary" variant="subtitle1" align="center">
              {t('hero-1')}
            </Typography>
            <Typography
              color="textPrimary"
              variant={trial ? 'h2' : 'h1'}
              align="center"
              className={classes.title}
            >
              {t('hero-2')}
            </Typography>

            {trial && (
              <div className={classes.promotionContainer}>
                <Typography
                  color="secondary"
                  variant="h5"
                  align="center"
                  className={classes.freeTrialTitle}
                >
                  Get your first box free!
                </Typography>
                <Typography
                  color="secondary"
                  variant="h6"
                  align="center"
                  className={classes.freeTrialCode}
                >
                  Use code: <i>FREEBOX2021</i>
                </Typography>
              </div>
            )}

            <Button
              onClick={() => executeScroll()}
              className={classes.buttonLarge}
              variant="contained"
              color="primary"
            >
              <Typography variant="h6">{t('subscribe-btn')}</Typography>
            </Button>

            <div className={classes.featuresContainer}>
              <h2>$39.99 {t('billed-every')}</h2>

              <div className={classes.featureContainer}>
                <DoneIcon className={classes.checkMark} color="primary" />
                {t('bullet-1')}
              </div>
              <div className={classes.featureContainer}>
                <DoneIcon className={classes.checkMark} color="primary" />
                {t('bullet-2')}
              </div>
              <div className={classes.featureContainer}>
                <DoneIcon className={classes.checkMark} color="primary" />
                {t('bullet-3')}
              </div>
              <div className={classes.featureContainer}>
                <DoneIcon className={classes.checkMark} color="primary" />
                {t('bullet-4')}
              </div>
            </div>
          </center>
        </Section>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session?.user,
  stripeCustomer: state.session.stripeCustomer,
})

export default connect(mapStateToProps, null)(Hero)
