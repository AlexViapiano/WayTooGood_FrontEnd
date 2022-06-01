import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Button, useMediaQuery } from '@material-ui/core'
import { SectionHeader } from 'components/molecules'
import { connect } from 'react-redux'
import ProductCard from '../../../../common/ProductCard'
import { DescriptionCta } from 'components/molecules'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import SwiperProducts from 'components/molecules/SwiperProducts/SwiperProducts'

const useStyles = makeStyles(theme => ({
  root: {},
  sectionHeader: {
    borderBottom: '2px solid #e0e0e0',
    marginBottom: 30,
    borderBottomStyle: 'dashed',
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  btnViewAll: {
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
  },
  sponsoredProductsContainer: {
    display: 'flex',
  },
}))

const SponsoredProducts = props => {
  const { title, productsSponsored, country, className, ...rest } = props
  const classes = useStyles()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))
  const { t } = useTranslation('home')

  return (
    <div className={classes.root}>
      <DescriptionCta
        title={t(title)}
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
      <SwiperProducts items={productsSponsored} />
    </div>
  )
}

const mapStateToProps = state => ({
  country: state.session.country,
})

export default connect(mapStateToProps, null)(SponsoredProducts)
