import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Button, useMediaQuery } from '@material-ui/core'
import { SectionHeader } from 'components/molecules'
import ProductCard from '../../../../common/ProductCard'
import { connect } from 'react-redux'
import { useTranslation } from 'next-i18next'
import SwiperProducts from 'components/molecules/SwiperProducts/SwiperProducts'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const SimilarProducts = props => {
  const { product, similarProducts, className, ...rest } = props
  const classes = useStyles()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))
  const { t } = useTranslation('product')

  return (
    <div className={clsx(classes.root, className)}>
      <SectionHeader
        title={t('similar-products')}
        subtitle={t('related-products')}
        subtitleColor="textPrimary"
        align="left"
        subtitleVariant="body1"
        data-aos="fade-up"
      />

      <SwiperProducts items={similarProducts} />
    </div>
  )
}

const mapStateToProps = state => ({
  similarProducts: state.products.similarProducts,
})

export default connect(mapStateToProps, null)(SimilarProducts)
