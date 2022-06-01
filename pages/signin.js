import React from 'react'
import Signin from 'views/Signin'
import Minimal from 'layouts/Minimal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const SigninPage = props => {
  return (
    <div className="container">
      <Minimal>
        <Signin />
      </Minimal>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signIn'])),
    },
  }
}

export default SigninPage
