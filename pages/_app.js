import React from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'theme'
import { APP_URL } from '../redux/api'
import AOS from 'aos'
import 'theme/index.scss'
import 'swiper/css/swiper.min.css'
import 'aos/dist/aos.css'
import { hotjar } from 'react-hotjar'
const marked = require('marked')
import { wrapper } from '../redux/store'
import { appWithTranslation } from 'next-i18next'
import { changeLocale } from '../redux/session/action'

function MyApp({ Component, pageProps, locale, changeLocale }) {
  const router = useRouter()

  React.useEffect(() => {
    if (router.locale != locale) changeLocale(router.locale)

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
    })

    // ------------------------ Marked Parser ----------------------
    marked.setOptions({ breaks: true })

    if (APP_URL == 'https://waytoogood.com') {
      setTimeout(function() {
        hotjar.initialize(2334004, 6)
      }, 10000)
    }
  }, [router.events])

  return (
    <React.Fragment>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#a0c037" />
        <title>Way Too Good</title>
        <meta
          name="keywords"
          content="Way Too Good, way too good, waytoogood, health food, vegan, gluten free, keto, organic"
        ></meta>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta
          name="description"
          content="Health food marketplace: Vegan, Gluten-Free, Keto, Organic"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="google-site-verification"
          content="jOog9-4ykWdxaSRmjnrYIMbUPai7pYAkvkSyp2HNKf0"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  locale: state?.session?.locale,
})

const mapDispatchToProps = dispatch => ({
  changeLocale: newLocale => {
    return dispatch(changeLocale(newLocale))
  },
})

export default wrapper.withRedux(
  appWithTranslation(connect(mapStateToProps, mapDispatchToProps)(MyApp))
)
