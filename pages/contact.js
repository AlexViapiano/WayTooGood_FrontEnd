import ContactUs from 'views/ContactUs'
import Main from 'layouts/Main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const contactPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Contact Us</title>
      </Head>
      <Main>
        <ContactUs />
      </Main>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contactUsForm'])),
    },
  }
}

export default contactPage
