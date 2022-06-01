import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { searchProducts, getProducts, resetFilters } from '../../../../../redux/products/action'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, IconButton, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import _ from 'lodash'
import Image from 'next/image'
import * as pixels from '../../../../utils/pixels'
import debounce from 'lodash.debounce'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  autocomplete: {
    width: '100%',
  },
  searchInputContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchBorder: {
    boxShadow: `rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;`,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingRight: 8,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      marginLeft: 0,
    },
  },
  searchInput: {
    borderRadius: 4,
    padding: 0,
    '& .MuiInputBase-root': {
      background: '#fff',
      margin: 0,
      '& input': {
        padding: '6px !important',
      },
    },
    '& .MuiAutocomplete-inputRoot': {
      height: 36,
    },
    '& .MuiInput-underline:before': {
      border: 'none',
      '&:hover': {
        border: 'none',
      },
    },
    '& .MuiAutocomplete-clearIndicator': {
      visibility: 'visible',
      marginRight: 4,
    },
  },
  searchButton: {
    padding: `0px 10px`,
    background: `#a0bf38`,
    borderRadius: `4px 0px 0px 4px`,
    color: `#FFF`,
    boxShadow: `rgb(0 0 0 / 15%) 0px 1px 3px, rgb(0 0 0 / 15%) 0px 1px 3px`,
  },
  productImageContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    minWidth: 40,
    minHeight: 40,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    maxWidth: 30,
    width: 'auto',
    height: 30,
    marginRight: 10,
  },
  highlight: {
    color: theme.palette.primary.light,
    transform: 'scale(1.4)',
    transition: 'all .2s ease-in-out',
  },
}))

const SearchBar = props => {
  const { getProducts, searchProducts, resetFilters } = props
  const router = useRouter()
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState('')

  const searchOnEnter = event => {
    console.log(event.keyCode)
  }

  const debounceLoadData = useCallback(debounce(fetchData, 1000), [])

  const search = async searchText => {
    setSearchText(searchText)
    if (searchText.length > 2) {
      setLoading(true)
      debounceLoadData(searchText)
    }
  }

  async function fetchData(searchText) {
    pixels.search({ search: searchText, content_id: searchText })
    const options = await searchProducts(searchText)
    if (!_.isArray(options?.products)) return
    if (options?.products.length >= 10) {
      options?.products?.unshift({
        id: 0,
        name: searchText,
        value: 0,
      })
    }
    setOptions(options?.products)
    setLoading(false)
  }

  const selectProduct = product => {
    setOpen(false)
    if (product?.id == 0) onClickSearch()
    else if (product?.url) router.push(`/products/${product.url}`)
    else return
  }

  const onClickSearch = () => {
    if (searchText.length > 2) {
      resetFilters()
      getProducts(searchText)
      setOpen(false)
      if (router.route != '/products') router.push('/products', undefined, { shallow: true })
    }
  }

  var viewResults = false
  if (searchText.length > 2) viewResults = true

  return (
    <Autocomplete
      freeSolo
      className={classes.autocomplete}
      open={open}
      onOpen={() => setOpen(true)}
      // onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={viewResults ? options : []}
      filterOptions={x => x}
      onKeyPress={searchOnEnter}
      renderOption={option => {
        if (option.id == 0) {
          return (
            <Typography onClick={() => onClickSearch()} color="textSecondary" variant="body2">
              View all results for "{searchText}"
            </Typography>
          )
        }
        return (
          <React.Fragment>
            <div className={classes.productImageContainer}>
              {option?.thumbnail && (
                <Image
                  src={option?.thumbnail}
                  alt={option.name ? option.name : 'Product'}
                  loading="lazy"
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
            <Typography color="textSecondary" variant="body2">
              {option.name}
            </Typography>
          </React.Fragment>
        )
      }}
      loading={open && options?.products?.length === 0}
      onChange={(event, value) => selectProduct(value)}
      loading={loading}
      renderInput={params => (
        <div className={classes.searchInputContainer}>
          <div className={classes.searchBorder}>
            <IconButton
              size="small"
              className={classes.searchButton}
              onClick={() => onClickSearch()}
            >
              <SearchIcon className={searchText.length > 1 ? classes.highlight : null} />
            </IconButton>
            <TextField
              {...params}
              // inputRef={input => input && input.focus()}
              className={classes.searchInput}
              onChange={event => search(event.target.value)}
              value={searchText}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    <span
                      onClick={() => {
                        setSearchText('')
                        setOptions([])
                        setOpen(false)
                      }}
                    >
                      {params.InputProps.endAdornment}
                    </span>
                  </React.Fragment>
                ),
              }}
            />
          </div>
        </div>
      )}
    />
  )
}

const mapStateToProps = state => ({
  country: state.session.country,
})

const mapDispatchToProps = dispatch => ({
  searchProducts: searchText => {
    return dispatch(searchProducts(searchText))
  },
  getProducts: searchText => {
    return dispatch(getProducts(searchText))
  },
  resetFilters: () => {
    return dispatch(resetFilters())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
