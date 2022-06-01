import React, { useState, useEffect } from 'react'
import { Section, SectionAlternate } from 'components/organisms'
import { CartTable } from './components'
import { makeStyles } from '@material-ui/core/styles'
import * as pixels from '../../utils/pixels'
var SalesTax = require('sales-tax')

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    '& .section-alternate__content': {
      background: 'rgb(247, 249, 250)',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0px 5px',
      '& .section-alternate__content': {
        paddingLeft: 2,
        paddingRight: 2,
      },
    },
  },
}))

const Cart = props => {
  const classes = useStyles()

  useEffect(() => {
    SalesTax.setTaxOriginCountry('CA')
    pixels.viewCart({})
  })

  return (
    <SectionAlternate className={classes.root}>
      <CartTable />
    </SectionAlternate>
  )
}

export default Cart
