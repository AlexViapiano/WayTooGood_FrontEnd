import React from 'react'
import PasswordReset from 'views/PasswordReset'
import Minimal from 'layouts/Minimal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PasswordResetPage = props => {
  return (
    <div className="container">
      <Minimal>
        <PasswordReset />
      </Minimal>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'passwordReset'])),
    },
  }
}

export default PasswordResetPage
