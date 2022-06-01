import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import Image from 'next/image'
import { SectionHeader } from 'components/molecules'
import { Section } from 'components/organisms'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    background: 'url(/images/illustrations/cover-dark-mask-bg.svg) no-repeat bottom center',
    backgroundSize: 'cover',
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 470,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  btnWhite: {
    background: theme.palette.white,
  },
  section: {
    paddingTop: 0,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    maxWidth: 220,
    marginRight: 15,
  },
  logoText: {
    maxWidth: 220,
    marginLeft: 10,
    marginBottom: 20,
    color: '#ffffff',
  },
  sectionHeader: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
      width: 'calc(100vw - 625px)',
    },
  },
  description: {
    color: 'white',
    fontWeight: 800,
  },
  image: {
    position: 'relative',
    alignSelf: 'flex-end',
    maxWidth: 625,
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '50%',
      right: 0,
      width: 'auto',
      transform: 'translateY(-50%) !important',
    },
  },
}))

const Hero = props => {
  const { setFocusForm, className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('becomeSupplier')

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.hero}>
        <Section className={classes.section} disablePadding>
          <div className={classes.sectionHeader}>
            <SectionHeader
              titleVariant="h4"
              title={<span className={classes.description}>{t('become-supplier')}</span>}
              subtitle={<span className={classes.description}>{t('portal-info')}</span>}
              ctaGroup={[
                <Button
                  variant="contained"
                  size="large"
                  className={classes.btnWhite}
                  onClick={() => setFocusForm(true)}
                >
                  {t('get-started')}
                </Button>,
              ]}
              align="left"
              data-aos="fade-up"
            />
          </div>
        </Section>
        <div className={classes.image}>
          <Image
            src="/images/illustrations/macbook.png"
            alt="dashboard"
            loading="lazy"
            width={650}
            height={351}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
