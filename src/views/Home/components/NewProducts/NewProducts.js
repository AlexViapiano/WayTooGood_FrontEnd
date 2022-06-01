import React from 'react'
import ProductCardHorizontal from '../../../../common/ProductCardHorizontal'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, useMediaQuery, Button } from '@material-ui/core'
import { DescriptionCta } from 'components/molecules'
import { connect } from 'react-redux'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  sectionHeader: {
    borderBottom: '2px solid #e0e0e0',
    marginBottom: 40,
    borderBottomStyle: 'dashed',
  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  btnViewAll: {
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
  },
}))

const NewProducts = props => {
  const { productsNew, label, country, className, ...rest } = props
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation('home')

  var limitedProducts = productsNew.slice(0, 4)
  if (limitedProducts.length == 0) return <div></div>

  return (
    <div className={classes.root}>
      <DescriptionCta
        title={t('new-at-wtg')}
        primaryCta={
          <Link href={'/products'}>
            <a>
              <Button className={classes.btnViewAll} size="small">
                {t('view-all')}
              </Button>
            </a>
          </Link>
        }
        align={'left'}
        titleProps={{
          variant: 'h6',
          color: 'textPrimary',
          className: classes.title,
        }}
        className={classes.sectionHeader}
      />
      <Grid container spacing={4}>
        {limitedProducts.map((item, index) => {
          return <ProductCardHorizontal key={index} item={item} />
        })}
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  country: state.session.country,
})

export default connect(mapStateToProps, null)(NewProducts)
