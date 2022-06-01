import BecomeSupplier from 'views/BecomeSupplier'
import Main from 'layouts/Main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const BecomeSupplierPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Become A Supplier</title>
        <meta
          name="keywords"
          content="Way Too Good, way too good, waytoogood, health food, vegan, gluten free, keto, organic"
        ></meta>
        <meta
          name="description"
          content="Our family is always growing! Forward thinking businesses use our platform as a service to gain marketshare, increase brand recognition, and receive valuable feedback from shoppers when selling their lifestyle products. Our vendors have access to a back-end portal in order to manage their products, orders, invoices and more."
        />
        <meta property="og:image" content="https://waytoogood.com/social.png" />
      </Head>
      <Main>
        <BecomeSupplier />
      </Main>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'becomeSupplier'])),
    },
  }
}

export default BecomeSupplierPage
