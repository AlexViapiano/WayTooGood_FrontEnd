import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Typography, TableCell, TableRow, Button, CircularProgress } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import moment from 'moment'
import _ from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {},
  expand: {
    padding: 0,
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  poContainer: {
    background: '#F9F9F9',
    '& td': {
      paddingTop: 8,
      paddingBottom: 8,
      borderBottom: 'none',
    },
  },
  poContainerAlternate: {
    background: '#F1F1F1',
    '& td': {
      paddingTop: 8,
      paddingBottom: 8,
      borderBottom: 'none',
    },
  },
  noPaddingHorizontal: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
}))

const Orders = props => {
  const { order, setFocusForm, setRequestType, setProductDetails, className, ...rest } = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const [productLoading, setProductLoading] = useState(null)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const onClickReturn = async (purchaseOrder, product_qty) => {
    var productDetails = {
      purchaseOrder,
      product_qty,
    }
    setFocusForm(true)
    setProductDetails(productDetails)
    setRequestType('return')
  }

  const onClickCancel = async (order, purchaseOrder, product_qty) => {
    var productDetails = {
      purchaseOrder,
      product_qty,
    }
    setFocusForm(true)
    setProductDetails(productDetails)
    setRequestType('cancel')
  }

  return (
    <>
      <TableRow key={order.id}>
        <TableCell>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell align="right">{moment(order?.created_at).format('MM-DD-YY')}</TableCell>
        <TableCell align="right">${order?.subtotal?.toFixed(2)}</TableCell>
        <TableCell align="right">${order?.taxes?.toFixed(2)}</TableCell>
        <TableCell align="right">${order?.shipping_fee?.toFixed(2)}</TableCell>
        <TableCell align="right">${order?.total?.toFixed(2)}</TableCell>
      </TableRow>
      {expanded && order.tracking_number && (
        <TableRow className={classes.poContainer}>
          <TableCell></TableCell>
          <TableCell>
            <a href={'https://parcelsapp.com/en/tracking/' + order.tracking_number}>
              {`Tracking #: ` + order.tracking_number}
            </a>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      )}
      {expanded && (
        <React.Fragment key={order.id}>
          {order?.product_qty?.length > 0 &&
            order?.product_qty?.map(product_qty => {
              var price = product_qty.price
              if (product_qty.qty > 1) price = product_qty.price * product_qty.qty
              return (
                <TableRow key={product_qty.id} className={classes.poContainer}>
                  <TableCell className={classes.noPaddingHorizontal}></TableCell>
                  <TableCell>
                    {product_qty.name}
                    {product_qty.qty > 1 && ' (x' + product_qty.qty + ')'}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">${price}</TableCell>
                </TableRow>
              )
            })}
        </React.Fragment>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
})

export default connect(mapStateToProps, null)(Orders)
