import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, Button, Typography } from '@material-ui/core'
import { Section, HeroSimpleBackground } from 'components/organisms'
import { withRouter, useRouter } from 'next/router'
import Newsletter from '../../common/Newsletter.js'
import Image from 'next/image'
import { getPromoCode } from '../../../redux/orders/action'
import { setUTM } from '../../../redux/session/action'
import { HomeBanner, SponsoredProducts, NewProducts, Wbox, Features } from './components'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    background: 'linear-gradient(100deg, rgba(255,255,255,1) 0%, rgba(238,238,238,1) 100%)',
  },
  bannerSmallContainer: {
    background: '#fafafa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    filter: `drop-shadow(1px 2px 2px #eeeeee)`,
    // marginBottom: 20,
  },
  bannerSmallBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 24,
    '& button': {
      padding: '10px 75px;',
      borderRadius: 25,
    },
  },
  buttonIcon: {
    marginRight: 10,
    display: 'flex',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 800,
  },
  sectionBannerReduced: {
    padding: '16px 16px 48px 16px',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
    },
  },
  sectionPaddingReduced: {
    paddingTop: 48,
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  sectionNoPaddingBottom: {
    paddingBottom: 0,
  },
  sectionNoPaddingBoth: {
    paddingBottom: 0,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 10,
    },
  },
  sectionNoPaddingHorizontal: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  sectionHeroNoPadding: {
    '& .hero-simple-background__section': {
      padding: 0,
    },
  },
}))

const Home = props => {
  const { products, getPromoCode, promoCode, setUTM, className, ...rest } = props
  const classes = useStyles()
  const theme = useTheme()
  const router = useRouter()
  const isXs = useMediaQuery(theme.breakpoints.up('xs'), { defaultMatches: false })
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: false })

  useEffect(() => {
    if (!promoCode && router?.query?.code != null) getPromoCode(router?.query?.code)

    const utm_source = router?.query?.utm_source
    const utm_medium = router?.query?.utm_medium
    const utm_campaign = router?.query?.utm_campaign

    if (utm_source || utm_medium || utm_campaign) setUTM(utm_source, utm_medium, utm_campaign)
  })

  var productsSponsored = products?.products_sponsored ? products.products_sponsored : []
  var productsSponsored2 = products?.products_sponsored_2 ? products.products_sponsored_2 : []
  var productsNew = products?.products_new ? products.products_new : []

  var bannerMobile
  const banners_mobile_media = products?.banners_mobile
  if (banners_mobile_media && banners_mobile_media[0]) bannerMobile = banners_mobile_media[0]

  if (isSm) {
    return (
      <div className={classes.root}>
        <HomeBanner
          banners={products?.banners_desktop}
          banners_wide={products?.banners_desktop_wide}
        />

        <HeroSimpleBackground
          className={classes.sectionHeroNoPadding}
          // backgroundImage="/images/shapes/banner-bg-top.svg"
        >
          <Section className={classes.sectionNoPaddingBoth}>
            <Wbox video={products.video} />
          </Section>
        </HeroSimpleBackground>
        <HeroSimpleBackground
          className={classes.sectionHeroNoPadding}
          backgroundImage="/images/shapes/banner-bg-middle.svg"
        >
          {productsSponsored?.length > 0 && (
            <Section className={classes.sectionNoPaddingBottom}>
              <SponsoredProducts title={'best-sellers'} productsSponsored={productsSponsored} />
            </Section>
          )}

          <Section className={classes.sectionNoPaddingBottom}>
            <Features />
          </Section>

          {productsSponsored2?.length > 0 && (
            <Section className={classes.sectionPaddingReduced}>
              <SponsoredProducts title={'trending'} productsSponsored={productsSponsored2} />
            </Section>
          )}
        </HeroSimpleBackground>
        <HeroSimpleBackground
          className={classes.sectionHeroNoPadding}
          backgroundImage="/images/shapes/banner-bg-bottom.svg"
        >
          {productsNew?.length > 0 && (
            <Section className={classes.sectionNoPaddingTop}>
              <NewProducts productsNew={productsNew} />
            </Section>
          )}
          <Section className={classes.sectionNoPaddingTop}>
            <Newsletter />
          </Section>
        </HeroSimpleBackground>
      </div>
    )
  }

  if (isXs) {
    return (
      <div className={classes.root}>
        {bannerMobile && (
          <Link href={bannerMobile.caption}>
            <a>
              <div className={classes.bannerSmallContainer}>
                <Image
                  src={bannerMobile?.url}
                  alt="Way Too Good Explore Marketplace"
                  width={500}
                  height={400}
                />
              </div>
            </a>
          </Link>
        )}

        <Section className={classes.sectionBannerReduced}>
          <Wbox video={products.video} />
        </Section>

        {productsSponsored?.length > 0 && (
          <Section className={classes.sectionPaddingReduced}>
            <SponsoredProducts title={'best-sellers'} productsSponsored={productsSponsored} />
          </Section>
        )}

        <Section className={classes.sectionNoPaddingBottom}>
          <Features />
        </Section>

        {productsSponsored2?.length > 0 && (
          <Section className={classes.sectionPaddingReduced}>
            <SponsoredProducts title={'trending'} productsSponsored={productsSponsored2} />
          </Section>
        )}

        <Section className={classes.sectionNoPaddingTop}>
          <Newsletter />
        </Section>
      </div>
    )
  }

  return <div></div>
}

const mapStateToProps = state => ({
  promoCode: state.orders?.promoCode,
})

const mapDispatchToProps = dispatch => ({
  getPromoCode: code => {
    return dispatch(getPromoCode(code))
  },
  setUTM: (utm_source, utm_medium, utm_campaign) => {
    return dispatch(setUTM(utm_source, utm_medium, utm_campaign))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
