import PrivacyPolicy from 'views/PrivacyPolicy'
import Main from 'layouts/Main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const privacyPolicyPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Your privacy is important to us." />
      </Head>
      <Main>
        <PrivacyPolicy />
      </Main>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'privacyPolicy'])),
    },
  }
}

export default privacyPolicyPage
