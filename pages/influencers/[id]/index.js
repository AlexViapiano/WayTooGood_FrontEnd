import Influencer from 'views/Influencer'
import Main from 'layouts/Main'
import { API_URL } from '../../../redux/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const InfluencerPage = props => {
  var imageUrl = ''
  if (props?.influencer && props?.influencer?.logo) {
    const logo = props?.influencer?.logo[0]
    if (logo && logo?.url) imageUrl = logo.url
  }
  return (
    <div className="container">
      <Head>
        <title>{props?.influencer?.name}</title>
        <meta
          name="keywords"
          content="Way Too Good, way too good, waytoogood, health food, vegan, gluten free, keto, organic"
        ></meta>
        <meta property="og:image" content={imageUrl} />
        <meta name="description" content={props?.influencer?.description} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <Main>
        <Influencer influencer={props.influencer} />
      </Main>
    </div>
  )
}

export async function getStaticPaths({ locales }) {
  const res_en = await fetch(`${API_URL}/influencers?_locale=en`)
  const influencers_en = await res_en.json()
  const paths_en = influencers_en.map(influencer => ({
    params: { id: influencer.id.toString(), locale: 'en' },
  }))

  const res_fr = await fetch(`${API_URL}/influencers?_locale=fr`)
  const influencers_en_fr = await res_fr.json()
  const paths_fr = influencers_en_fr.map(influencer => ({
    params: { id: influencer.id.toString(), locale: 'fr' },
  }))

  const paths = paths_en.concat(paths_fr)

  return { paths, fallback: true }
}

export async function getStaticProps(ctx) {
  try {
    const res = await fetch(`${API_URL}/influencers/${ctx.params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const influencer = await res.json()

    return {
      props: {
        ...(await serverSideTranslations(ctx.locale, ['common'])),
        influencer: influencer,
      },
      revalidate: 60,
    }
  } catch (err) {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale, ['common'])),
        influencer: null,
      },
      revalidate: 60,
    }
  }
}

export default InfluencerPage
