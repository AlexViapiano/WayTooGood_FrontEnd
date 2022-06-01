import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@material-ui/core'
import { getUserOrders } from '../../../../../redux/orders/action'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import OrderRow from './OrderRow'
import ContactForm from './ContactForm'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 650,
    '& th': {
      paddingLeft: 8,
      paddingRight: 8,
    },
    '& td': {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  firstColumn: {
    width: 1,
  },
  dateColumn: {
    minWidth: 100,
  },
  amountColumn: {
    width: 70,
  },
  orderRow: {
    width: '100%',
  },
  dialogContactForm: {
    background: theme.palette.primary.main,
    background: `linear-gradient(165deg, #a0c037 0%, #799e00 100%)`,
    minHeight: 700,
    filter: 'drop-shadow(5px 4px 10px black)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Orders = props => {
  const { user, orders, getUserOrders, className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('account')

  const [loading, setLoading] = useState(false)
  const [focusForm, setFocusForm] = useState(false)
  const [productDetails, setProductDetails] = useState(false)
  const [requestType, setRequestType] = useState(false)

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    if (user?.id && orders.length == 0) {
      setLoading(false)
      getUserOrders(user.id).then(() => {
        setLoading(false)
      })
    }
  }, [user])

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Typography variant="h5" color="textPrimary">
        {t('order-history')}
      </Typography>
      <br></br>
      {!loading && orders.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.firstColumn}></TableCell>
                <TableCell>{t('order-number')}</TableCell>
                <TableCell className={classes.dateColumn} align="right">
                  Date
                </TableCell>
                <TableCell className={classes.amountColumn} align="right">
                  {t('subtotal')}
                </TableCell>
                <TableCell className={classes.amountColumn} align="right">
                  {t('taxes')}
                </TableCell>
                <TableCell className={classes.amountColumn} align="right">
                  {t('shipping')}
                </TableCell>
                <TableCell className={classes.amountColumn} align="right">
                  {t('total')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.orderBy(orders, 'id', 'desc').map(order => {
                return (
                  <OrderRow
                    className={classes.orderRow}
                    setFocusForm={setFocusForm}
                    setProductDetails={setProductDetails}
                    setRequestType={setRequestType}
                    key={order.id}
                    order={order}
                  />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : !loading && orders.length == 0 ? (
        <Typography variant="subtitle1" color="textPrimary">
          {t('no-orders')}
        </Typography>
      ) : loading ? (
        <center>
          <CircularProgress />
        </center>
      ) : null}

      <Dialog open={focusForm} onClose={() => setFocusForm(false)}>
        <DialogContent className={classes.dialogContactForm}>
          <ContactForm
            setFocusForm={setFocusForm}
            productDetails={productDetails}
            requestType={requestType}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
  orders: state.orders.orders,
})

const mapDispatchToProps = dispatch => ({
  getUserOrders: userId => {
    return dispatch(getUserOrders(userId))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
