import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SigninForm } from './components'
import Image from 'next/image'
import { SectionHeader } from 'components/molecules'
import { HeroShaped } from 'components/organisms'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    '& .hero-shaped': {
      borderBottom: 0,
    },
    '& .hero-shaped__wrapper': {
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& .hero-shaped__cover': {
        height: 200,
      },
      '& .hero-shaped__': {
        height: 200,
      },
      '& .hero-shaped__right-side': {
        height: 200,
      },
    },
  },
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
      margin: `0 auto`,
    },
  },
  image: {
    objectFit: 'cover',
  },
  a: {
    color: '#3f51b5',
    fontWeight: 1000,
    cursor: 'pointer',
  },
}))

const Signin = props => {
  const classes = useStyles()
  const { t } = useTranslation('signIn')

  return (
    <div className={classes.root}>
      <HeroShaped
        leftSide={
          <div className={classes.formContainer}>
            <SectionHeader
              title={t('sign-in')}
              subtitle={
                <span>
                  {t('no-account')}{' '}
                  <Link href="/signup">
                    <a className={classes.a}>{t('sign-up')}</a>
                  </Link>
                </span>
              }
              titleProps={{
                variant: 'h3',
              }}
            />
            <SigninForm />
          </div>
        }
        rightSide={
          <Image
            className={classes.image}
            src="/images/hero/cover-1.jpg"
            alt="Signin"
            loading="lazy"
            layout="fill"
            objectFit="cover"
          />
        }
      />
    </div>
  )
}

export default Signin
