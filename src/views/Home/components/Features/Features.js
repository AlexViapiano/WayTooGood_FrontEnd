import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { useMediaQuery, Grid, Typography, Button, Link } from '@material-ui/core'
import Image from 'next/image'
import { SectionHeader } from 'components/molecules'
import { CardBase } from 'components/organisms'
import { connect } from 'react-redux'
import { getProducts, setVarietyPacks } from '../../../../../redux/products/action'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {},
  logo: {
    maxWidth: 50,
  },
  featureContainer: {
    maxWidth: 620,
    display: 'flex',
    flexDirection: 'column',
  },
  sectionContainer: {
    paddingTop: 20,
  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  imageContainer: {
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'all .2s ease-in-out',
    },
  },
  image: {
    maxHeight: 250,
    boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
    borderRadius: 5,
    objectFit: 'cover',
  },
  viewMoreBtn: {
    textTransform: 'none',
    whiteSpace: 'nowrap',
    marginBottom: 10,
    marginTop: 4,
    width: '100%',
  },
  viewMoreTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
  viewMoreIcon: {
    marginLeft: 10,
  },
}))

const Features = props => {
  const { data, setCategory, getProducts, setVarietyPacks, className, ...rest } = props
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('home')

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))

  const onClickVarietyPacks = () => {
    setVarietyPacks(true)
    getProducts()
    router.push('/products', undefined, { shallow: true })
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              alignItems={isSm ? 'center' : 'flex-start'}
            >
              <div className={classes.featureContainer}>
                <span className={classes.imageContainer}>
                  <Link href="/brands">
                    <Image
                      className={classes.image}
                      src="/images/photos/features-brands.jpg"
                      alt="Brands"
                      width={618}
                      height={250}
                      data-aos={'zoom-in'}
                    />
                  </Link>
                </span>
                <SectionHeader
                  title={t('brands')}
                  subtitle={t('brands-description')}
                  align="center"
                  className={classes.sectionContainer}
                  label=""
                  titleProps={{
                    variant: 'h6',
                    color: 'textPrimary',
                    className: classes.title,
                  }}
                  subtitleProps={{
                    align: 'center',
                  }}
                  disableGutter
                />
                <Link href="/brands">
                  <Button className={classes.viewMoreBtn}>
                    <Typography component="span" className={classes.viewMoreTitle} color="primary">
                      {t('view-all-brands')}
                      {/* <ArrowRightAltIcon className={classes.viewMoreIcon} /> */}
                    </Typography>
                  </Button>
                </Link>
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              justify="center"
              alignItems={isSm ? 'center' : 'flex-start'}
            >
              <div className={classes.featureContainer}>
                <span className={classes.imageContainer} onClick={() => onClickVarietyPacks()}>
                  <Image
                    className={classes.image}
                    src="/images/photos/features-varietypacks.jpg"
                    alt="Varierty Packs"
                    width={618}
                    height={250}
                    data-aos={'zoom-in'}
                  />
                </span>
                <SectionHeader
                  title={t('variety-packs')}
                  subtitle={t('variety-packs-description')}
                  align="center"
                  className={classes.sectionContainer}
                  label=""
                  titleProps={{
                    variant: 'h6',
                    color: 'textPrimary',
                    className: classes.title,
                  }}
                  subtitleProps={{
                    align: 'center',
                  }}
                  disableGutter
                />
                <Button className={classes.viewMoreBtn} onClick={() => onClickVarietyPacks()}>
                  <Typography component="span" className={classes.viewMoreTitle} color="primary">
                    {t('view-all-variety-packs')}
                    {/* <ArrowRightAltIcon className={classes.viewMoreIcon} /> */}
                  </Typography>
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => {
    return dispatch(getProducts())
  },
  setVarietyPacks: varietyPacks => {
    return dispatch(setVarietyPacks(varietyPacks))
  },
})
export default connect(null, mapDispatchToProps)(Features)
