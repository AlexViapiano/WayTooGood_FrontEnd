import Product from 'views/Product'
import Main from 'layouts/Main'
import { API_URL } from '../../../redux/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const ProductPage = props => {
  const media = props?.product?.media[0]
  var imageUrl = ''
  if (media && media?.url) imageUrl = media.url
  return (
    <div className="container">
      <Head>
        <title>{props?.product?.name}</title>
        <meta property="og:type" content="website" />
        <meta name="description" content={props?.product?.description} />
        <meta name="keywords" content={props?.product?.name} />
        <meta property="og:title" content={props?.product?.name} />
        <meta property="og:description" content={props?.product?.description} />
        <meta
          property="og:url"
          content={`https://waytoogood.com/products/` + props?.product?.url}
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="product:brand" content={props?.product?.brand?.name} />
        <meta
          property="product:availability"
          content={props?.product?.inventory != 0 ? 'in stock' : 'out of stock'}
        />
        <meta property="product:quantity_to_sell_on_facebook" content={props?.product?.inventory} />
        <meta property="product:condition" content="new" />
        <meta property="product:price:amount" content={props?.product?.price_CAD} />
        <meta property="product:price:currency" content="CAD" />
        <meta property="product:retailer_item_id" content={props?.product?.id} />
        <meta
          property="product:item_group_id"
          content={props?.product?.google_category?.category_id}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: `${props?.product?.name}`,
              image: `${imageUrl}`,
              description: `${
                props?.product?.description_short
                  ? props?.product?.description_short
                  : props?.product?.description
              }`,
              brand: {
                '@type': 'Brand',
                name: `${props?.product?.brand?.name}`,
              },
              category: `${
                props.product?.google_category
                  ? props.product?.google_category
                  : props.product?.category
              }`,
              sku: `${props?.product?.sku}`,
              gtin12: `${props?.product?.UPC}`,
              gtin14: `${props?.product?.UPC}`,
              offers: {
                '@type': 'Offer',
                priceCurrency: 'CAD',
                price: `${props?.product?.price_CAD}`,
                priceValidUntil: '2023-12-31',
                availability: `${props?.product?.inventory != 0 ? 'InStock' : 'OutOfStock'}`,
                url: `${'https://waytoogood.com/products/' + props?.product?.url}`,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: `${props?.product?.rating}`,
                ratingCount: `${props?.product?.rating_count}`,
              },
            }),
          }}
        />
      </Head>
      <Main>
        <Product product={props?.product} />
      </Main>
    </div>
  )
}

export async function getStaticPaths({ locales }) {
  const res_en = await fetch(`${API_URL}/products?_locale=en`)
  const products_en = await res_en.json()
  const paths_en = products_en.map(product => ({
    params: { url: product.url.toString(), locale: 'en' },
  }))

  const res_fr = await fetch(`${API_URL}/products?_locale=fr`)
  const products_fr = await res_fr.json()
  const paths_fr = products_fr.map(product => ({
    params: { url: product.url.toString(), locale: 'fr' },
  }))

  const paths = paths_en.concat(paths_fr)

  return { paths, fallback: true }
}

export async function getStaticProps(ctx) {
  try {
    const res = await fetch(`${API_URL}/products/${ctx.params.url}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const product = await res.json()

    return {
      props: {
        ...(await serverSideTranslations(ctx.locale, ['common', 'product'])),
        product: product,
      },
      revalidate: 60,
    }
  } catch (err) {
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale, ['common', 'product'])),
        product: null,
      },
      revalidate: 60,
    }
  }
}

export default ProductPage
