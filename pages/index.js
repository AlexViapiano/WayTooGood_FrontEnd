import React from 'react'
import Home from 'views/Home'
import Main from 'layouts/Main'
import { API_URL } from '../redux/api'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { FacebookMessenger } from '../src/common/FacebookMessenger'

const HomePage = props => {
  return (
    <div className="home-container">
      <Head>
        <title>Way Too Good</title>
        <meta
          name="description"
          content="Way Too Good is a next-generation health food marketplace that goes beyond your average e-commerce or grocery store. Our focus is on making vegan, gluten-free, organic, and keto food among other specialties available to everyone."
        ></meta>
        <meta
          name="keywords"
          content="Way Too Good, way too good, waytoogood, health food, vegan, gluten free, keto, organic, discover, healthy snacks"
        ></meta>
      </Head>
      <Main>
        <Home products={props.products} />
      </Main>
      {/* <FacebookMessenger /> */}
    </div>
  )
}

export async function getStaticProps({ locale }) {
  try {
    const resSponsoredProducts = await fetch(`${API_URL}/sponsored-products?_locale=` + locale, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const sponsoredProducts = await resSponsoredProducts.json()

    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'home'])),
        products: sponsoredProducts,
      },
      revalidate: 60,
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'home'])),
        products: [],
      },
      revalidate: 60,
    }
  }
}

export default HomePage
