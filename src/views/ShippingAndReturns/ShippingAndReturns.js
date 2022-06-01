import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Section, SectionAlternate } from 'components/organisms'
import { Content, Hero } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
}))

const ShippingAndReturns = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Hero />
      <Section>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Content />
          </Grid>
        </Grid>
      </Section>
    </div>
  )
}

export default ShippingAndReturns
