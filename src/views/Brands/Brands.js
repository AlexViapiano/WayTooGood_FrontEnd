import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Section, SectionAlternate } from 'components/organisms'
import { BrandsList, Hero } from './components'

import { faq } from './data'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    minHeight: '75vh',
  },
}))

const Brands = props => {
  const classes = useStyles()
  const [searchText, setSearchText] = useState('')

  var filteredBrands = props.brands.filter(brand =>
    brand.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className={classes.root}>
      <Hero searchText={searchText} setSearchText={setSearchText} />
      <Section>
        <BrandsList brands={filteredBrands} />
      </Section>
    </div>
  )
}

export default Brands
