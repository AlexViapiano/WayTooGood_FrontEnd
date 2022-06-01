import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import { Section } from 'components/organisms'
import { Integrations, Hero, ContactForm } from './components'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sectionAlternate: {
    backgroundImage: `linear-gradient(180deg, ${colors.grey[50]} 50%, #ffffff 0%)`,
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  dialogContactForm: {
    background: theme.palette.primary.main,
    background: `linear-gradient(165deg, #a0c037 0%, #799e00 100%)`,
    minHeight: 700,
    filter: 'drop-shadow(5px 4px 10px black)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const BecomeSupplier = () => {
  const classes = useStyles()
  const [focusForm, setFocusForm] = useState(false)

  return (
    <div className={classes.root}>
      <Hero setFocusForm={setFocusForm} />
      <Section>
        <Integrations setFocusForm={setFocusForm} />
      </Section>
      <Dialog open={focusForm} onClose={() => setFocusForm(false)}>
        <DialogContent className={classes.dialogContactForm}>
          <ContactForm setFocusForm={setFocusForm} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BecomeSupplier
