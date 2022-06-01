import Products from 'views/Products'
import Main from 'layouts/Main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
// import { FacebookMessenger } from '../src/common/FacebookMessenger'

const products = () => {
  return (
    <div className="container">
      <Head>
        <title>Way Too Good</title>
        <meta
          name="description"
          content="Way Too Good is a next-generation health food marketplace that goes beyond your average e-commerce or grocery store. Our focus is on making vegan, gluten-free, organic, and keto food among other specialties available to everyone."
        ></meta>
        <meta
          name="keywords"
          content="Way Too Good, way too good, waytoogood, vegan, gluten free, keto, keto diet, gluten, keto diet plan"
        ></meta>
        <meta property="og:image" content="https://waytoogood.com/social.png" />
      </Head>
      <Main>
        <Products />
      </Main>
      {/* <FacebookMessenger /> */}
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'products'])),
    },
  }
}

export default products
