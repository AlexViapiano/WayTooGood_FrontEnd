import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Chip } from '@material-ui/core'
import { connect } from 'react-redux'
import {
  getProducts,
  setView,
  removeDiet,
  setCategory,
  refreshProducts,
} from '../../../../../redux/products/action'
import { diets as _diets, categories, brands } from '../../../../common/data'

const useStyles = makeStyles(theme => ({
  filterChipContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    marginTop: 20,
    height: 32,
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      marginTop: 0,
    },
  },
  chip: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      margin: 4,
    },
  },
}))

const FilterChips = props => {
  const {
    products,
    selectedDiets,
    category,
    removeDiet,
    setCategory,
    getProducts,
    searchText,
    refreshProducts,
    className,
    ...rest
  } = props
  const classes = useStyles()

  const onClickRemoveFilter = (filterType, filterName) => () => {
    if (filterType == 'diet') removeDiet(filterName)
    if (filterType == 'category') setCategory('')
    getProducts()
  }

  var foundDiets = []
  selectedDiets.forEach(
    diet => {
      var foundDiet = _diets.find(_diet => _diet.id == diet)
      if (foundDiet) foundDiets.push(foundDiet)
    },
    _diets,
    foundDiets
  )

  var foundCategory = category ? categories.find(category_ => category_.name == category) : null
  return (
    <div component="ul" className={classes.filterChipContainer}>
      {foundDiets.length > 0 &&
        foundDiets.map(foundDiet => {
          return (
            <li key={foundDiet.name}>
              <Chip
                variant="outlined"
                color="primary"
                label={foundDiet.title}
                onDelete={onClickRemoveFilter('diet', foundDiet)}
                className={classes.chip}
              />
            </li>
          )
        })}
      {foundCategory && (
        <li key={foundCategory.name}>
          <Chip
            variant="outlined"
            color="primary"
            label={foundCategory.title}
            onDelete={onClickRemoveFilter('category')}
            className={classes.chip}
          />
        </li>
      )}
      {searchText && (
        <li>
          <Chip
            variant="outlined"
            color="primary"
            label={'Search: ' + searchText}
            onDelete={() => refreshProducts()}
            className={classes.chip}
          />
        </li>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  selectedDiets: state.products.selectedDiets,
  category: state.products.category,
  searchText: state.products.searchText,
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => {
    return dispatch(getProducts())
  },
  setView: view => {
    return dispatch(setView(view))
  },
  removeDiet: diet => {
    return dispatch(removeDiet(diet))
  },
  setCategory: category => {
    return dispatch(setCategory(category))
  },
  refreshProducts: () => {
    return dispatch(refreshProducts())
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(FilterChips)
