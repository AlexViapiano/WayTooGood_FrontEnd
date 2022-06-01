import React, { useRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography, Button, useMediaQuery } from '@material-ui/core'
import { Hero, HowItWorks, CorporateForm } from './components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
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
  fingerPrintSection: {
    background: `linear-gradient(0deg, rgba(246,255,245,1) 1%, rgba(255,255,247,1) 58%, rgba(255,255,255,1) 100%)`,
  },
  buttonContainers: {
    display: 'flex',
    justifyContent: 'center',
    '& a': {
      marginRight: 5,
      marginLeft: 5,
    },
  },
}))

const Corporate = props => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const myRef = useRef(null)
  const theme = useTheme()

  const executeScroll = () =>
    myRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

  return (
    <div>
      <Hero executeScroll={executeScroll} />

      <HowItWorks />

      <div ref={myRef} className={classes.fingerPrintSection}>
        <Section>
          <CorporateForm />
          <br />
          <br />
          <br />
          <br />

          <Typography
            color="textPrimary"
            variant="subtitle1"
            align="center"
            className={classes.stepTitle}
          >
            {t('still-have-question')}
          </Typography>
          <div className={classes.buttonContainers}>
            <Link href={'/faq'}>
              <a>
                <Button variant="outlined">FAQ</Button>
              </a>
            </Link>
            <Link href={'/contact'}>
              <a>
                <Button variant="outlined">{t('contact-us')}</Button>
              </a>
            </Link>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default Corporate
