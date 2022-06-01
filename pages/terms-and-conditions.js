import TermsAndConditions from 'views/TermsAndConditions'
import Main from 'layouts/Main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const termsAndConditionsPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Terms & Conditions</title>
      </Head>
      <Main>
        <TermsAndConditions />
      </Main>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default termsAndConditionsPage
