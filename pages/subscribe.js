import Subscribe from 'views/Subscribe'
import Main from 'layouts/Main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
// import { FacebookMessenger } from '../src/common/FacebookMessenger'
import { API_URL } from '../redux/api'

const SubscribePage = props => {
  return (
    <div className="container">
      <Head>
        <title>Subscribe</title>
        <meta name="description" content="Explore new brands. Enjoy the food. Repeat!"></meta>
        <meta name="keywords" content="health food, vegan, gluten free, keto, organic"></meta>
        <meta property="og:image" content="https://waytoogood.com/social.png" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB06hmcc0UFMntfie3r6XBzT-kLfANQvyY&libraries=places"></script>
      </Head>
      <Main>
        <Subscribe products={props.products} />
      </Main>
      {/* <FacebookMessenger /> */}
    </div>
  )
}

export async function getStaticProps({ locale }) {
  try {
    const resSponsoredProducts = await fetch(`${API_URL}/wbox-page`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const sponsoredProducts = await resSponsoredProducts.json()
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'box', 'subscribe'])),
        products: sponsoredProducts,
      },
      revalidate: 60,
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'box', 'subscribe'])),
        products: [],
      },
      revalidate: 60,
    }
  }
}

export default SubscribePage
