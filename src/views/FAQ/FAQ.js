import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Section, SectionAlternate } from 'components/organisms'
import { Faq, Hero } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
}))

const HelpCenter = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* <Hero /> */}
      <Section>
        <Faq />
      </Section>
    </div>
  )
}

export default HelpCenter
