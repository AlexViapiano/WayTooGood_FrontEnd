import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer } from '@material-ui/core'

import { SidebarNav } from './components'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '60%',
    maxWidth: 250,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  nav: {
    marginBottom: theme.spacing(1),
  },
}))

const Sidebar = props => {
  const { pages, open, variant, onClose, className, ...rest } = props

  const classes = useStyles()

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pages} onClose={onClose} />
      </div>
    </Drawer>
  )
}

export default Sidebar
