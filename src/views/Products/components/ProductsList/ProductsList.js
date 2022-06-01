import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  useMediaQuery,
  Typography,
  Grid,
  Button,
  Checkbox,
  Radio,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import { Accordion } from 'components/organisms'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import ProductCard from '../../../../common/ProductCard'
import {
  getProducts,
  setDiet,
  removeDiet,
  setCategory,
  setSale,
  setVarietyPacks,
  resetFilters,
  setSort,
  setSortDirection,
} from '../../../../../redux/products/action'
import { diets as _diets, categories, brands } from '../../../../common/data'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  root: {
    '& .accordion__collapsable-link-wrapper': {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      },
    },
  },
  btnLoadmore: {
    marginTop: 20,
    borderColor: '#c6c6c6',
    color: '#5f5f5f',
  },
  noMarginTop: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '0px !important',
    },
  },
  btnContainer: {
    background: '#FFF',
    justifyContent: 'center',
    padding: 8,
    boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
    width: '100%',
    margin: 0,
    margin: '10px 0px 0px 0px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      margin: '0px 0px 0px 0px',
    },
    '& h6': {
      textAlign: 'left',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
        textAlign: 'center',
      },
    },
  },
  activeBtnContainer: {
    background: theme.palette.primary.light,
    justifyContent: 'center',
    padding: 8,
    boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
    width: '100%',
    margin: 0,
    margin: '10px 0px 0px 0px',
    textTransform: 'capitalize',
    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& h6': {
      textAlign: 'left',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
        textAlign: 'center',
      },
    },
  },
  formControl: {
    width: '100%',
  },
  selectContainer: {
    background: '#FFF',
    justifyContent: 'center',
    boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 3%), 0px 1px 1px 0px rgb(0 0 0 / 3%), 0px 1px 3px 0px rgb(0 0 0 / 3%)`,
    width: '100%',
    margin: 0,
    marginTop: 10,
    textTransform: 'capitalize',
    borderRadius: 4,
    textAlign: 'left',
    '& .MuiSelect-select': {
      fontSize: 20,
    },
  },
  accordion: {
    marginBottom: 10,
    '& .MuiAccordionDetails-root': {
      padding: 0,
    },
    [theme.breakpoints.down('xs')]: {
      '& .MuiButtonBase-root': {
        height: 40,
        minHeight: 40,
      },
    },
  },
  accordionListItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '2px 0px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      width: 125,
    },
  },
  accordionListItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '1px 0px',
    fontSize: 13,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      width: 125,
    },
  },
}))

const Products = props => {
  const {
    products,
    isLoading,
    canLoadMore,
    selectedDiets,
    category,
    brand,
    sale,
    varietyPacks,
    sort,
    sortDirection,
    view,
    getProducts,
    setDiet,
    removeDiet,
    setCategory,
    setSale,
    setVarietyPacks,
    resetFilters,
    setSort,
    setSortDirection,
    className,
    ...rest
  } = props
  const classes = useStyles()
  const router = useRouter()

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation('products')

  const onClickFilter = (filterType, name) => {
    if (filterType == 'diet') setDiet(name)
    if (filterType == 'category') setCategory(name)
    getProducts()
  }

  const onClickRemoveFilter = item => {
    removeDiet(item)
    getProducts()
  }
  const onClickSale = () => {
    setSale(!sale)
    getProducts()
  }
  const onClickVarietyPacks = () => {
    setVarietyPacks(!varietyPacks)
    getProducts()
  }

  const handleChangeSort = event => {
    if (event.target.value == 'price') setSort('price_CAD')
    else setSort(event.target.value)
    getProducts()
  }

  const handleChangeSortDirection = event => {
    setSortDirection(event.target.value)
    getProducts()
  }

  var dietsList = _diets.map((item, index) => {
    var selectedDiet = selectedDiets.find(diet => diet == item.id)
    return (
      <div
        key={index}
        className={classes.accordionListItem}
        onClick={() =>
          selectedDiet != null ? onClickRemoveFilter(item) : onClickFilter('diet', item.id)
        }
      >
        <Checkbox checked={selectedDiet != null} color="primary" />
        <div>{item.title}</div>
      </div>
    )
  })

  var categoriesList = categories.map((item, index) => {
    return (
      <div
        key={index}
        className={classes.accordionListItem}
        onClick={() => {
          item.name == category
            ? onClickFilter('category', '')
            : onClickFilter('category', item.name)
        }}
      >
        <Radio checked={item.name == category} color="primary" />
        <div>{item.title}</div>
      </div>
    )
  })

  var AccordionDetailsDesktop = [
    {
      id: 'categories',
      title: 'Categories',
      children: categoriesList,
    },
    {
      id: 'diets',
      title: 'Diets',
      children: dietsList,
    },
  ]

  var AccordionDetailsMobile = [
    {
      id: 'categories',
      title: 'Categories',
      children: categoriesList,
    },
    {
      id: 'diets',
      title: 'Diets',
      children: dietsList,
    },
  ]

  var AccordionDetails = isSm ? AccordionDetailsDesktop : AccordionDetailsMobile

  const onClickRemoveFilters = () => {
    resetFilters()
    getProducts()
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={2}>
          <Accordion items={AccordionDetails} className={classes.accordion} />
          <Grid container spacing={isSm ? 0 : 1}>
            <Grid item xs={4} sm={12}>
              <Button
                size="small"
                onClick={() => onClickSale()}
                className={
                  sale
                    ? clsx(classes.activeBtnContainer, classes.noMarginTop)
                    : clsx(classes.btnContainer, classes.noMarginTop)
                }
              >
                <Typography color="textPrimary" variant="h6">
                  On Sale
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={4} sm={12}>
              <Button
                size="small"
                onClick={() => onClickVarietyPacks()}
                className={varietyPacks ? classes.activeBtnContainer : classes.btnContainer}
              >
                <Typography color="textPrimary" variant="h6">
                  {t('variety-packs')}
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={4} sm={12}>
              <Link href="/brands">
                <a>
                  <Button size="small" className={classes.btnContainer}>
                    <Typography color="textPrimary" variant="h6">
                      {t('brands')}
                    </Typography>
                  </Button>
                </a>
              </Link>
            </Grid>
            {isSm && (
              <>
                <Grid item align="center" xs={4} sm={12}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel>{t('sort')}</InputLabel>
                    <Select
                      value={sort}
                      onChange={handleChangeSort}
                      label="Sort"
                      className={classes.selectContainer}
                    >
                      <MenuItem value={'priority'}>---</MenuItem>
                      <MenuItem value={'name'}>{t('name')}</MenuItem>
                      <MenuItem value={'price_CAD'}>{t('price')}</MenuItem>
                      <MenuItem value={'rating'}>{t('rating')}</MenuItem>
                      <MenuItem value={'created_at'}>{t('newArrivals')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item align="center" xs={4} sm={12}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel>{t('order')}</InputLabel>
                    <Select
                      value={sortDirection}
                      onChange={handleChangeSortDirection}
                      label="Order"
                      className={classes.selectContainer}
                    >
                      <MenuItem value={'ASC'}>{t('ascend')}</MenuItem>
                      <MenuItem value={'DESC'}>{t('descend')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9} md={10}>
          {products.length > 0 ? (
            <Grid container spacing={isSm ? 4 : 2}>
              {products.map((item, index) => (
                <Grid item align="center" xs={6} sm={4} md={3} key={index}>
                  <ProductCard item={item} />
                </Grid>
              ))}
              {canLoadMore && (
                <Grid item xs={12} container justify="center" data-aos="fade-up">
                  <Button
                    className={classes.btnLoadmore}
                    variant="outlined"
                    onClick={() => getProducts()}
                  >
                    {t('load-more')}
                  </Button>
                </Grid>
              )}
            </Grid>
          ) : isLoading ? (
            <center>
              <CircularProgress />
            </center>
          ) : (
            <center>
              <Typography color="textPrimary" variant="h6">
                {t('change-filters')}
              </Typography>
              <br></br>
              <Button variant="contained" color="primary" onClick={() => onClickRemoveFilters()}>
                {t('remove-filters')}
              </Button>
            </center>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.products.isLoading,
  canLoadMore: state.products.canLoadMore,
  products: state.products.products,
  selectedDiets: state.products.selectedDiets,
  category: state.products.category,
  brand: state.products.brand,
  varietyPacks: state.products.varietyPacks,
  sale: state.products.sale,
  sort: state.products.sort,
  sortDirection: state.products.sortDirection,
  view: state.products.view,
})

const mapDispatchToProps = dispatch => ({
  setDiet: diet => {
    return dispatch(setDiet(diet))
  },
  removeDiet: diet => {
    return dispatch(removeDiet(diet))
  },
  setCategory: category => {
    return dispatch(setCategory(category))
  },
  setSale: sale => {
    return dispatch(setSale(sale))
  },
  setVarietyPacks: varietyPacks => {
    return dispatch(setVarietyPacks(varietyPacks))
  },
  resetFilters: () => {
    return dispatch(resetFilters())
  },
  getProducts: () => {
    return dispatch(getProducts())
  },
  setSort: sort => {
    return dispatch(setSort(sort))
  },
  setSortDirection: sortDirection => {
    return dispatch(setSortDirection(sortDirection))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
