import Subscribe from 'views/Subscribe'
import Main from 'layouts/Main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const TrialPage = props => {
  return (
    <div className="container">
      <Head>
        <title>Subscribe</title>
        <meta name="description" content="Explore new brands. Enjoy the food. Repeat!"></meta>
        <meta
          name="keywords"
          content="Way Too Good, way too good, waytoogood, health food, vegan, gluten free, keto, organic"
        ></meta>
        <meta property="og:image" content="https://waytoogood.com/trial.png" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB06hmcc0UFMntfie3r6XBzT-kLfANQvyY&libraries=places"></script>
      </Head>
      <Main>
        <Subscribe />
      </Main>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'box', 'subscribe'])),
    },
  }
}

export default TrialPage
