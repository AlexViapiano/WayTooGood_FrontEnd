import React, { useEffect, useRef, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography, Button, Grid, useMediaQuery } from '@material-ui/core'
import { Hero, HowItWorks, SubscribeForm, Pricing } from './components'
import * as pixels from '../../utils/pixels'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Section } from 'components/organisms'
import { SectionHeader } from 'components/molecules'
import SwiperProducts from 'components/molecules/SwiperProducts/SwiperProducts'

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
  root: {},
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
  noPaddingBottom: {
    paddingBottom: 0,
  },
  lastMonthsBoxContainer: {
    maxWidth: 1000,
    width: '100%',
  },
  sectionPaddingReduced: {
    paddingTop: 48,
  },
  video: {
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
    borderRadius: 8,
    width: '100%',
    maxHeight: 375,
    maxWidth: 375,
  },
}))

const Subscription = props => {
  const { products } = props
  const classes = useStyles()
  const { t } = useTranslation('common')
  const myRef = useRef(null)
  const router = useRouter()
  const [price, setPrice] = useState(null)
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    pixels.viewSubscribe({})
  })

  const executeScroll = () =>
    myRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

  var lastMonthsSponsored = products?.products ? products.products : []

  var video = products?.video

  return (
    <div>
      <Hero executeScroll={executeScroll} />

      <Section className={classes.noPaddingBottom}>
        <center>
          <video controls className={classes.video}>
            {/* poster="/images/photos/wboxPoster.jpg"  */}
            <source src={'/videos/wboxAd.mp4'} type="video/mp4" />
            {/* <source src={"/videos/wboxAd.mob"} type="video/mov" /> */}
          </video>
        </center>
      </Section>

      <HowItWorks />

      {lastMonthsSponsored?.length > 0 && (
        <Section className={classes.sectionPaddingReduced}>
          <SectionHeader
            title={<Typography variant="h3">Last Months Box</Typography>}
            // subtitle={}
            titleProps={{
              variant: 'body1',
              color: 'textPrimary',
            }}
            fadeUp
          />
          <SwiperProducts items={lastMonthsSponsored} />
        </Section>
      )}

      <div ref={myRef} className={classes.fingerPrintSection}>
        <Section>
          <Pricing price={price} setPrice={setPrice} />
          <SubscribeForm price={price} />
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

export default Subscription
