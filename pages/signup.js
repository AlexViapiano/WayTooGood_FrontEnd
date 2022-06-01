import React from 'react'
import Signup from 'views/Signup'
import Minimal from 'layouts/Minimal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const SignupPage = props => {
  return (
    <div className="container">
      <Minimal>
        <Signup />
      </Minimal>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signUp'])),
    },
  }
}

export default SignupPage
