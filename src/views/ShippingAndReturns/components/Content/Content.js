import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, colors, Typography, GridList, GridListTile } from '@material-ui/core'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {},
  section: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  image: {
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
  },
  displayLineBreak: {
    whiteSpace: 'pre-line',
  },
}))

const Content = props => {
  const { className, ...rest } = props
  const classes = useStyles()

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.section}>
        <Typography component="p" variant="h5" color="textPrimary" align="left">
          <b>Shipping Area and Rates</b>
          <br></br> <br></br>
          WayTooGood.com ships only within Canada and only to Canadian Provinces. The shipping rate
          is a flat 15$ unless the order is over 50$. Also, shipping is free for products that are
          shipped directly by our third party suppliers.
          <br></br> <br></br>
          <b>Free Shipping</b>
          <br></br> <br></br>
          Orders over $50 (before sales tax and after any promotion or discount) are eligible for
          free shipping to Quebec & Ontario addresses. We are sorry, we do not provide service to
          these areas at this moment. Should you place an order, we would not be, unfortunately,
          able to address any issues related to your order delivery or product spoilage related to
          weather conditions (such as freezing of liquids in the winter or melting of chocolate in
          the summer). All orders from excluded areas would be placed at customer's risk. Please
          note that your order may also be cancelled if we are unable to ship it.
          <br></br> <br></br>
          <b>Order Processing Times & Order Tracking</b>
          <br></br> <br></br>
          Once an order has been processed, we are unable to upgrade or change shipping methods. We
          are also unable to add a product, modify or cancel the items on your order once it has
          been confirmed.
          <br></br> <br></br>
          Orders typically take 1-2 business days to process before they ship – excluding weekends
          and holidays. However, we do reserve 3 to 5 business days to fulfill your order in case
          any of the items are out of stock due to delayed shipments from our suppliers, or during
          busy seasons. You will receive an email confirmation with your order tracking number when
          your order ships. Please read the shipping notification email carefully.
          <br></br> <br></br>
          We currently use two delivery services – Purolator and Canada Post. For the Puralator 1-3
          Day (to Major Cities Only) or Expedited Canada Post shipping option, we retain the
          discretion to choose the courier, based on a number of factors, including shipment size /
          weight, shipping distance, as well as available service within your area. Currently,
          Puralator service is only available for Major Cities, and cannot be used to ship to rural
          and remote areas, or Canada Post PO boxes.
          <br></br> <br></br>
          Note that delivery date is always an estimate only, delivery times may vary depending on
          your location, weather conditions and other factors. It is a customer's responsibility to
          track the package and pick it up on time from the community box, at the door or Post
          Office, as your package may be delivered sooner than ETA and/or left at your door. Any
          spoilage of temperature sensitive products resulted due to prolonged pick up time will not
          be refunded. Products ordered and delivered to any remote location, YT, NT, NU, NF and
          affected by extreme weather conditions cannot be refunded.
          <br></br> <br></br>
          If your order is returned to us for any of the following reasons we will refund your
          payment method for the product returned minus the original shipping fees and any
          additional fees incurred to return the products to our warehouse (including return
          postage, handling).
          <br></br> <br></br>- Incorrect / Incomplete / Undeliverable address - No one available to
          accept the delivery - Order refused by the customer for any reason including damaged
          product/products
          <br></br> <br></br>
          Please do not reject the whole order if it contains a damaged item. It will be re-shipped
          or refunded. Should you reject the order, it will be refunded upon return only in the
          amount of its total less the return shipping fee.
          <br></br> <br></br>
          Should any corrections need to be made to any incorrect shipping information at the fault
          of the customer, and delivery re-attempted, a standard fee of $14.50 + HST (as charged by
          the courier) may be added to your payment and charged to the method used for the purchase.
          <br></br> <br></br>
          <b>Damaged or Missing Products</b>
          <br></br> <br></br>
          Please inspect all items carefully upon delivery. Any product damages or missing items
          must be communicated to us within 24 hours after the parcel is delivered. A damaged
          product has to be returned to us in order for a refund to be processed. Please contact
          customer support to request a return label. Once received, we will inspect the product and
          issue a refund as applicable. In some cases, a photo confirmation may be requested
          instead, if a product is damaged severely and cannot be shipped back. Please send a clear
          photo of the contents of each product to support@waytoogood.com. DO NOT DISPOSE / CONSUME
          of the damaged product before the issue with it is resolved. Note, that if the product is
          not available, we will not be able to offer a refund/credit or re-ship it.
          <br></br> <br></br>
          <b>Returns and Refunds</b>
          <br></br> <br></br>
          We accept all returns on applicable products within 14 days from shipping date. Returned
          products should be shipped to 6832 Rue Jarry E Saint-Léonard, QC H1P 1W3. WayTooGood.com
          will ONLY pay for a return label if a product arrived damaged or was shipped in error.
          Otherwise, the customer is responsible for the shipping costs. We recommend consulting
          with us prior to shipping back any products and getting a tracking number for your return
          so you can follow its arrival back to us. Please note that a product is required to be
          returned in order for a refund to be issued. Sometimes we might be able to issue a refund
          based on a photo confirmation of a product damage.
          <br></br> <br></br>
          WayTooGood.com doesn't accept returns of the following items:
          <br></br> <br></br>- Any opened items - All grocery and food products - Health and
          personal care items - Baby care products - We guarantee that we will not ship any product
          with less than 15 days remaining before its best before date.
          <br></br> <br></br>
          <b>Sold Out or Discontinued Items</b>
          <br></br> <br></br>
          Occasionally an item sells out or may be back ordered and we may need to issue a refund or
          cancel your order. Once your order is shipped, you will receive a Credit Memo confirming
          the refund. Thus, your credit card will not be charged for sold out or discontinued items.
          Note that we are not responsible for any out of stock items and cannot guarantee product
          availability on the website at all times. If an item comes back in stock after your order
          was placed and shipped we will not be able to honour any shipping fee refund requests.
          <br></br> <br></br>
          <b>Subscriptions</b>
          <br></br> <br></br>
          If you have an active subscription at the end of the month, we ship your box in the
          following the month. We usually ship the subscription boxes after the first week of the
          following month and the expected arrival date depends on your location. Once your
          subscription box has shipped you'll receive an email with tracking so you can follow its
          movement! You can cancel your subscriptions anytime in Account Settings > Subscription >
          Manage Subscriptions. Your plan will be canceled, but will still available until the end
          of your billing period. If you change your mind, you can renew your subscription.
        </Typography>
      </div>
    </div>
  )
}

export default Content
