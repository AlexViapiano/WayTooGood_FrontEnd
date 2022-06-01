import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 20,
    maxWidth: 750,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& td': {
      padding: 8,
    },
  },
  container: {
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'relative',
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  firstColumn: {
    width: 300,
  },
}))

const PackingSlip = () => {
  const router = useRouter()
  const classes = useStyles()

  var product_qty
  var stringified = router?.query?.product_qty_string?.replace(/_/g, ' ')
  if (stringified != null) {
    try {
      var data = JSON.parse(stringified)
      product_qty = data['product qty']
    } catch (e) {
      console.error(stringified)
      alert(e)
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.logoContainer}>
        <Image
          alt={'WayTooGood_Logo'}
          src="/images/photos/wtg.png"
          layout="fill"
          loading="lazy"
          objectFit="contain"
        />
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          {/* <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {router.query.orderNumber && (
              <TableRow>
                <TableCell className={classes.firstColumn}>Order #</TableCell>
                <TableCell>{router.query.orderNumber}</TableCell>
              </TableRow>
            )}
            {router.query.number && (
              <TableRow>
                <TableCell>Purchase Order #</TableCell>
                <TableCell>{router.query.number}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell>{moment(router.query.created_at).format('MM-DD-YY')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipped From</TableCell>
              <TableCell>{router.query.supplier_address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>
                {router.query.first_name} {router.query.last_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Customer Email</TableCell>
              <TableCell>{router.query.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipped To</TableCell>
              <TableCell>{router?.query?.shipping_address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Billed To</TableCell>
              <TableCell>{router?.query?.billing_address}</TableCell>
            </TableRow>
            {router?.query?.shipping_company != null && (
              <TableRow>
                <TableCell>Shipping Company</TableCell>
                <TableCell>{router.query.shipping_company}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>${router.query.subtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Taxes</TableCell>
              <TableCell>${router.query.taxes}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total ({router.query.currency})</TableCell>
              <TableCell>${router.query.total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell></TableCell>
            </TableRow>
            {product_qty &&
              product_qty.map(product => {
                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell> {/*product.id*/}
                    <TableCell>
                      ${product.price} {product.qty > 1 ? ' (x' + product.qty + ')' : ''}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.container}>
        Thank you for your purchase. If you ordered additional items they will arrive separeately.
        <br></br>
        If you have any other questions, please contact Way Too Good customer service.
      </div>
      <div className={classes.container}>
        <Button onClick={() => window.print()} size="small" variant="outlined">
          Print
        </Button>
      </div>
    </div>
  )
}

export default PackingSlip
