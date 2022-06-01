import Brand from 'views/Brand'
import Main from 'layouts/Main'
import { API_URL } from '../../../redux/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const BrandPage = props => {
  const logo = props?.brand?.logo[0]
  var imageUrl = ''
  if (logo && logo?.url) imageUrl = logo.url
  return (
    <div className="container">
      <Head>
        <title>{props?.brand?.name}</title>
        <meta
          name="keywords"
          content="Way Too Good, way too good, waytoogood, health food, vegan, gluten free, keto, organic"
        ></meta>
        <meta property="og:image" content={imageUrl} />
        <meta name="description" content={props?.brand?.description} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <Main>
        <Brand brand={props.brand} />
      </Main>
    </div>
  )
}

export async function getStaticPaths({ locales }) {
  const res_en = await fetch(`${API_URL}/brands?_locale=en`)
  const brands_en = await res_en.json()
  const paths_en = brands_en.map(brand => ({
    params: { id: brand.id.toString(), locale: 'en' },
  }))

  const res_fr = await fetch(`${API_URL}/brands?_locale=fr`)
  const brands_fr = await res_fr.json()
  const paths_fr = brands_fr.map(brand => ({
    params: { id: brand.id.toString(), locale: 'fr' },
  }))

  const paths = paths_en.concat(paths_fr)

  return { paths, fallback: true }
}

export async function getStaticProps(ctx) {
  try {
    const res = await fetch(`${API_URL}/brands/${ctx.params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const brand = await res.json()

    return {
      props: {
        ...(await serverSideTranslations(ctx.locale, ['common', 'brand'])),
        brand: brand,
      },
      revalidate: 60,
    }
  } catch (err) {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale, ['common', 'brand'])),
        brand: null,
      },
      revalidate: 60,
    }
  }
}

export default BrandPage
