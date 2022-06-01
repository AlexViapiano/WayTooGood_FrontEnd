import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { getProductPrice } from '../../../utils/getProductPrice'
import { useTranslation } from 'next-i18next'
import { subtotal } from '../../../utils/subtotal'
import { shippingFeeIncluded, calcPromoCode } from '../../../utils/subtotal'

const useStyles = makeStyles(theme => ({
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 'initial',
    padding: 4,
  },
  amountBreakdown: {
    color: '#a4a4a4',
    fontSize: 14,
  },
  amount: {
    whiteSpace: 'nowrap',
  },
  amountTotal: {
    fontWeight: 600,
  },
}))

const ReviewOrder = props => {
  const classes = useStyles()

  const {
    shipping_address_line1,
    shipping_address_line2,
    shipping_city,
    shipping_country,
    shipping_state,
    shipping_zip,
    cart,
    country,
    salesTaxes,
    promoCode,
  } = props
  const { t } = useTranslation('cart')

  var _subtotal = 0
  var invoiceSubtotal = subtotal(cart, country, false)
  var invoiceSubtotalForTaxes = subtotal(cart, country, true)
  const shipping_fee_included = shippingFeeIncluded(cart, country)
  if (shipping_fee_included) {
    invoiceSubtotal = invoiceSubtotal + 15
    invoiceSubtotalForTaxes = invoiceSubtotalForTaxes + 15
  }

  if (promoCode) _subtotal = calcPromoCode(invoiceSubtotal, promoCode)
  else _subtotal = invoiceSubtotal

  //Calculate sales taxes
  var invoiceTaxes = 0
  if (salesTaxes?.details) {
    salesTaxes?.details.forEach(salesTaxe => {
      var currentSalesTax = salesTaxe.rate * invoiceSubtotalForTaxes
      invoiceTaxes = invoiceTaxes + currentSalesTax
    })
  }
  var invoiceTotal = invoiceTaxes + _subtotal

  return (
    <>
      <br></br>
      <Divider />
      <br></br>
      <Typography variant="h6" gutterBottom>
        {t('order-summary')}
      </Typography>
      <List disablePadding>
        {cart.map(product => {
          var price = getProductPrice(product, country)
          var quantity = product.quantity
          return (
            <ListItem key={product.id} className={classes.listItem}>
              <div>
                {product.name} <br></br>
                <span className={classes.amountBreakdown}>
                  (${price?.toFixed(2)}$ x ${quantity})
                </span>
              </div>
              <div className={classes.amount}>{`${(price * quantity)?.toFixed(2)} $`}</div>
            </ListItem>
          )
        })}
        <br></br>
        {shipping_fee_included ? (
          <ListItem className={classes.listItem}>
            <div>Shipping Fee</div>
            <div>15.00 $</div>
          </ListItem>
        ) : (
          <ListItem className={classes.listItem}>
            <div>Shipping Fee</div>
            <div>0.00 $</div>
          </ListItem>
        )}
        <ListItem className={classes.listItem}>
          <div>{t('subtotal')}</div>
          <div>{invoiceSubtotal.toFixed(2)} $</div>
        </ListItem>

        {promoCode?.coupon?.amount_off != null && (
          <ListItem className={classes.listItem}>
            <div>Discount: {promoCode?.code}</div>
            <div>-{(promoCode?.coupon?.amount_off / 100).toFixed(2)} $</div>
          </ListItem>
        )}
        {promoCode?.coupon?.percent_off != null && (
          <ListItem className={classes.listItem}>
            <div>Discount: {promoCode?.code}</div>
            <div>
              ({promoCode?.coupon?.percent_off}%) -
              {((promoCode?.coupon?.percent_off / 100) * invoiceSubtotal).toFixed(2)}$
            </div>
          </ListItem>
        )}
        {promoCode?.coupon && (
          <ListItem className={classes.listItem}>
            <div></div>
            <div>{_subtotal.toFixed(2)} $</div>
          </ListItem>
        )}

        {salesTaxes?.details &&
          salesTaxes?.details.length > 0 &&
          salesTaxes?.details.map(tax => {
            return (
              <ListItem key={tax.type} className={classes.listItem}>
                <div>
                  {tax.type.toUpperCase()}{' '}
                  <span className={classes.amountBreakdown}>({tax.rate})</span>
                </div>
                <div>{(tax.rate * invoiceSubtotalForTaxes).toFixed(2)} $</div>
              </ListItem>
            )
          })}
        <ListItem className={classes.listItem}>
          <div>{t('total')}</div>
          <div className={classes.amountTotal}>{invoiceTotal.toFixed(2)} $</div>
        </ListItem>
      </List>
      <br></br>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {t('shipping')}
          </Typography>
          <ListItem className={classes.listItem}>
            <Typography gutterBottom>
              {shipping_address_line1}
              <br />
              {shipping_address_line2 && (
                <span>
                  {shipping_address_line2}
                  <br />
                </span>
              )}
              {shipping_city}, {shipping_country}, {shipping_state}, {shipping_zip}
            </Typography>
          </ListItem>
        </Grid>
      </Grid>
    </>
  )
}
export default ReviewOrder
