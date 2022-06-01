import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Section } from 'components/organisms'
import { InfluencersList, Hero } from './components'

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

  var filteredInfluencers = props.influencers.filter(influencer =>
    influencer.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className={classes.root}>
      {/* <Hero searchText={searchText} setSearchText={setSearchText} /> */}
      <Section>
        <InfluencersList influencers={filteredInfluencers} />
      </Section>
    </div>
  )
}

export default Brands
