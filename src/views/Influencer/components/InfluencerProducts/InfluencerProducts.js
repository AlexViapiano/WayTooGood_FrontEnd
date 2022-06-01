import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, useMediaQuery } from '@material-ui/core'
import { SectionHeader } from 'components/molecules'
import { connect } from 'react-redux'
import ProductCard from '../../../../common/ProductCard'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const InfluencerProducts = props => {
  const { name, products, className, ...rest } = props
  const classes = useStyles()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <div className={clsx(classes.root, className)}>
      <SectionHeader
        title={name}
        // subtitle="Products related to this item"
        subtitleColor="textPrimary"
        align="left"
        subtitleVariant="body1"
        data-aos="fade-up"
      />
      <Grid container justify="center" alignItems="center" spacing={isSm ? 4 : 2}>
        {products.map((item, index) => (
          <Grid item xs={6} sm={4} key={index} align="center" data-aos="fade-up">
            <ProductCard item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default connect(null, null)(InfluencerProducts)
