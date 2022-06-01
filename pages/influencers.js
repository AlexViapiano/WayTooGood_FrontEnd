import React from 'react'
import Infuencers from 'views/Influencers'
import Main from 'layouts/Main'
import { API_URL } from '../redux/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const BrandsPage = props => {
  return (
    <div className="container">
      <Head>
        <title>Influencers</title>
        <meta
          name="keywords"
          content="Way Too Good, way too good, waytoogood, health food, vegan, gluten free, keto, organic, discover, healthy snacks"
        ></meta>
        <meta
          name="description"
          content="We are a health food marketplace that exposes many new brands and products for you to discover!"
        />
      </Head>

      <Main>
        <Infuencers influencers={props.influencers} />
      </Main>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  try {
    const res = await fetch(`${API_URL}/influencers?_locale=` + locale, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const response = await res.json()
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        influencers: response,
      },
      revalidate: 60,
    }
  } catch (err) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
        influencers: [],
      },
      revalidate: 60,
    }
  }
}

export default BrandsPage
