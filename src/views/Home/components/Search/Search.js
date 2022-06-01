import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, Grid, Typography, Button } from '@material-ui/core'
import { SectionHeader } from 'components/molecules'

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    fontWeight: 'bold',
  },
  image: {
    height: 151,
    maxWidth: 140,
  },
  gridCard: {
    padding: theme.spacing(2),
    background: theme.palette.grey.main,
    border: '1px solid #e9eaf6',
    borderRadius: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  },
  gridCardItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  subtitle: {
    margin: theme.spacing(2, 0),
  },
}))

const Search = props => {
  const { className, ...rest } = props
  const classes = useStyles()

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title="Join our community"
        // subtitle="After 3 days all of your offers will arrive and you will have another 7 days to select your new company."
        data-aos="fade-up"
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Grid container className={classes.gridCard} data-aos="fade-up" spacing={2}>
            <Grid
              item
              container
              className={classes.gridCardItem}
              justify={isMd ? 'flex-start' : 'center'}
              alignItems="center"
              xs={12}
              md={6}
            >
              {/* <Image src="/images/illustrations/relax-working.svg" className={classes.image} /> */}
            </Grid>
            <Grid
              item
              container
              justify="space-between"
              alignItems={isMd ? 'flex-start' : 'center'}
              xs={12}
              md={6}
              direction="column"
            >
              <Typography
                variant="h6"
                className={classes.title}
                color="textPrimary"
                align={isMd ? 'left' : 'center'}
              >
                Recipes
              </Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                align={isMd ? 'left' : 'center'}
                className={classes.subtitle}
              >
                Find healthy lifestyle recipes here
              </Typography>
              <Button color="primary" variant="contained">
                search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container className={classes.gridCard} data-aos="fade-up" spacing={2}>
            <Grid
              item
              container
              className={classes.gridCardItem}
              justify={isMd ? 'flex-start' : 'center'}
              alignItems="center"
              xs={12}
              md={6}
            >
              {/* <Image src="/images/illustrations/travelers.svg" className={classes.image} /> */}
            </Grid>
            <Grid
              item
              container
              justify="space-between"
              alignItems={isMd ? 'flex-start' : 'center'}
              xs={12}
              md={6}
              direction="column"
            >
              <Typography
                variant="h6"
                className={classes.title}
                color="textPrimary"
                align={isMd ? 'left' : 'center'}
              >
                Foodies
              </Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                align={isMd ? 'left' : 'center'}
                className={classes.subtitle}
              >
                Search for our top rated foodies
              </Typography>
              <Button color="primary" variant="contained">
                search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Search
