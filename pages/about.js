import About from 'views/About'
import Main from 'layouts/Main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

const AboutPage = () => {
  return (
    <div className="container">
      <Head>
        <title>About Us</title>
      </Head>
      <Main>
        <About />
      </Main>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  }
}

export default AboutPage
