import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Section, SectionAlternate } from 'components/organisms'
import { ContentLeft, ContentRight, Reviews, SimilarProducts, BrandBanner } from './components'
import { colors } from '@material-ui/core'
import { connect } from 'react-redux'
import { findSimilar } from '../../../redux/products/action'
import { useTranslation } from 'next-i18next'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as pixels from '../../utils/pixels'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  rootEmpty: {
    width: '100%',
    height: 'calc(100vh - 567px)',
    minHeight: '300px',
    display: 'flex',
  },
  pagePaddingTop: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  sectionAlternate: {
    backgroundColor: colors.indigo[50],
  },
  fixedPadding: {
    '& .section-alternate__content': {
      padding: '48px 16px',
    },
  },
  promoSection: {
    padding: theme.spacing(6, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12, 2),
    },
  },
  loadingContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const Product = props => {
  const { product, findSimilar, similarProducts, ...rest } = props
  const classes = useStyles()
  const reviewsRef = useRef(null)
  const [isFetched, setIsFetched] = useState(false)
  const { t } = useTranslation('product')

  useEffect(() => {
    if (!isFetched) {
      setIsFetched(true)
      findSimilar(product?.id)
      pixels.viewContent({
        content_id: product?.id,
        content_name: product?.name,
        content_type: 'product',
      })
    }
    document.title = product?.name
  })

  const scrollToBottom = () => {
    reviewsRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  if (!product)
    return (
      <div className={classes.rootEmpty}>
        <Section>
          <div className={classes.loadingContainer}>
            <CircularProgress />
            <br></br>
            <div>Loading</div>
          </div>
        </Section>
      </div>
    )

  return (
    <div className={classes.root}>
      <Section>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ContentLeft product={product} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContentRight product={product} scrollToBottom={scrollToBottom} />
          </Grid>
        </Grid>
      </Section>
      {product.brand && (
        <SectionAlternate className={classes.fixedPadding}>
          <BrandBanner brand={product.brand} />
        </SectionAlternate>
      )}
      {similarProducts.length > 0 && (
        <Section>
          <SimilarProducts product={product} />
        </Section>
      )}
      <SectionAlternate>
        <div ref={reviewsRef}></div>
        <Reviews product={product} />
      </SectionAlternate>
    </div>
  )
}

const mapStateToProps = state => ({
  country: state.session.country,
  similarProducts: state.products.similarProducts,
})

const mapDispatchToProps = dispatch => ({
  findSimilar: productId => {
    return dispatch(findSimilar(productId))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
