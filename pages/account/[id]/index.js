import { useRouter } from 'next/router'
import Account from 'views/Account'
import Main from 'layouts/Main'
import { API_URL } from '../../../redux/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const AccountPage = props => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <div className="container">
        <Main>
          <Account selectedView={id} />
        </Main>
      </div>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB06hmcc0UFMntfie3r6XBzT-kLfANQvyY&libraries=places"></script>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '*' } }],
    fallback: true,
  }
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'account'])),
    },
  }
}

export default AccountPage
