import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Section } from 'components/organisms'
import { ProductsList, FilterChips } from './components'
import { useRouter } from 'next/router'
import {
  setSale,
  setDiet,
  getProducts,
  refreshProducts,
  resetFilters,
} from '../../../redux/products/action'
import { useMediaQuery } from '@material-ui/core'
import { diets } from '../../../src/common/data.js'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    background: theme.palette.background.offWhite,
    minHeight: '75vh',
  },
  sectionNoPaddingTop: {
    paddingTop: '0px !important',
  },
  sectionFixedPadding: {
    padding: '48px 16px',
  },
  sectionFixedPaddingSmall: {
    padding: 12,
  },
}))

const Products = props => {
  const {
    isLoading,
    selectedDiets,
    setDiet,
    sale,
    setSale,
    products,
    resetFilters,
    refreshProducts,
    ...rest
  } = props
  const classes = useStyles()
  const theme = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (router?.query?.diet != null && selectedDiets.length == 0) {
      var foundDiet = diets.find(diet => diet.name == router?.query?.diet)
      router.replace('/products', undefined, { shallow: true })
      setDiet(foundDiet?.id)
      refreshProducts()
    } else if (router?.query?.sale != null && sale == false) {
      router.replace('/products', undefined, { shallow: true })
      setSale(true)
      refreshProducts()
    } else if (
      router?.query &&
      Object.keys(router?.query).length === 0 &&
      products.length == 0 &&
      !isLoading
    ) {
      refreshProducts()
    }
  })

  return (
    <div className={classes.root}>
      <Section className={classes.sectionFixedPaddingSmall}>
        <FilterChips />
      </Section>
      <Section className={classes.sectionNoPaddingTop}>
        <ProductsList />
      </Section>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedDiets: state.products.selectedDiets,
  sale: state.products?.sale,
  products: state.products?.products,
  isLoading: state.products.isLoading,
})

const mapDispatchToProps = dispatch => ({
  setDiet: diet => {
    return dispatch(setDiet(diet))
  },
  setSale: sale => {
    return dispatch(setSale(sale))
  },
  getProducts: () => {
    return dispatch(getProducts())
  },
  refreshProducts: () => {
    return dispatch(refreshProducts())
  },
  resetFilters: () => {
    return dispatch(resetFilters())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
