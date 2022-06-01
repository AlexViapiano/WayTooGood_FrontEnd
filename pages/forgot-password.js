import React from 'react'
import ForgotPassword from 'views/ForgotPassword'
import Minimal from 'layouts/Minimal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ForgotPasswordPage = props => {
  return (
    <div className="container">
      <Minimal>
        <ForgotPassword />
      </Minimal>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forgotPassword'])),
    },
  }
}

export default ForgotPasswordPage
