import Cart from 'views/Cart'
import Minimal from 'layouts/Minimal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const cartPage = () => {
  return (
    <>
      <div className="container">
        <Minimal>
          <Cart />
        </Minimal>
      </div>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
        }
      `}</style>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB06hmcc0UFMntfie3r6XBzT-kLfANQvyY&libraries=places"></script>
    </>
  )
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'cart'])),
    },
  }
}
export default cartPage
