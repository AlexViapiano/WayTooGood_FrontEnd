import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Section, SectionAlternate } from 'components/organisms'
import { Hero, Story } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  sectionPartners: {
    boxShadow: '0 5px 20px 0 rgba(90, 202, 157, 0.05)',
    backgroundColor: theme.palette.text.primary,
    '& .section-alternate__content': {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },
}))

const About = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* <Hero /> */}
      <Section>
        <Story />
      </Section>
    </div>
  )
}

export default About
