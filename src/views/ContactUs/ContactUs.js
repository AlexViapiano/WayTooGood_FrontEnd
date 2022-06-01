import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SectionAlternate } from 'components/organisms'
import { ContactUsForm } from './components'
import Newsletter from '../../common/Newsletter'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  noPaddingTop: {
    '& .section-alternate__content': {
      paddingTop: 0,
    },
  },
}))

const ContactUs = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* <Hero /> */}
      <SectionAlternate>
        <ContactUsForm />
      </SectionAlternate>
      <SectionAlternate className={classes.noPaddingTop}>
        <Newsletter />
      </SectionAlternate>
    </div>
  )
}

export default ContactUs
