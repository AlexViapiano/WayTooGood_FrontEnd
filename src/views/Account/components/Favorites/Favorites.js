import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@material-ui/core'
import Favorite from '@material-ui/icons/Favorite'
import { updateUser } from '../../../../../redux/session/action'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 650,
    [theme.breakpoints.down('sm')]: {
      minWidth: 250,
    },
    '& tr': {
      '&:hover': {
        background: theme.palette.grey.light,
      },
    },
  },
  productContainer: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  productImageContainer: {
    position: 'relative',
    height: 50,
    width: 50,
    '& img': {
      paddingRight: '10px !important',
    },
  },
  favoriteIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}))

const Favorites = props => {
  const { user, updateUser, className, ...rest } = props
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('account')

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  const removeFavorite = favorite => {
    var filteredFavorites = favorites.filter(favoriteProduct => favoriteProduct.id != favorite.id)
    var products = filteredFavorites.map(favorite => favorite.id)
    var data = { products: products }
    updateUser(user.id, data)
  }

  var favorites = user?.products || []

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Typography variant="h6" color="textPrimary">
        {t('favorite-products')}
      </Typography>
      <br></br>

      {!loading && favorites.length > 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            {/* <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead> */}
            <TableBody>
              {favorites.map(favorite => {
                var media = favorite?.media[0]

                var thumbnail = media?.formats?.thumbnail?.url
                  ? media?.formats?.thumbnail?.url
                  : media?.url
                  ? media.url
                  : media

                return (
                  <TableRow key={favorite.id}>
                    <TableCell component="th" scope="row">
                      <Link href="/products/[url]" as={`/products/${favorite.url}`}>
                        <div className={classes.productContainer}>
                          <div className={classes.productImageContainer}>
                            <Image
                              src={thumbnail}
                              layout="fill"
                              loading="lazy"
                              objectFit="contain"
                            />
                          </div>
                          <div>{favorite.name}</div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Favorite
                        onClick={() => removeFavorite(favorite)}
                        className={classes.favoriteIcon}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : !loading && favorites.length == 0 ? (
        <Typography variant="subtitle1" color="textPrimary">
          {t('favorite-products-not-selected')}
        </Typography>
      ) : loading ? (
        <center>
          <CircularProgress />
        </center>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user,
})

const mapDispatchToProps = dispatch => ({
  updateUser: (userId, data) => {
    return dispatch(updateUser(userId, data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
