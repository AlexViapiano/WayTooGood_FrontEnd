import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { IconButton, Typography, Box } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import Image from 'next/image'
import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles(theme => ({
  root: {},
  buttonIcon: {
    marginRight: 10,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
    height: 75,
    width: 75,
    borderRadius: '100%',
    padding: 0,
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.10)',
      transition: 'all .2s ease-in-out',
    },
  },
  dialogContainer: {
    '& .MuiDialog-paper': {
      margin: 0,
      borderRadius: 25,
      [theme.breakpoints.down('xs')]: {
        margin: 10,
      },
    },
    '& .MuiDialogContent-root': {
      width: 590,
      height: 550,
      overflow: 'hidden',
      padding: 0,
      background: `rgb(227,245,116)`,
      background: `linear-gradient(0deg, rgb(204 236 255) 20%, rgb(248 255 228) 100%)`,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        overflow: 'hidden',
      },
    },
  },
  appBar: {
    position: 'relative',
    paddingRight: '0px !important',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  closeIcon: {
    cursor: 'pointer',
  },
  closeIcon2: {
    color: 'transparent',
  },
  wtgLogo: {
    marginTop: 20,
  },
  title: {
    color: 'white',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
    padding: '0 20px',
  },
  logoContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },

  iframe: {
    border: 'none',
    height: 700,
    width: 320,
    [theme.breakpoints.down('xs')]: {
      '-ms-zoom': 0.95,
      '-moz-transform': 'scale(0.95)',
      '-moz-transform-origin': '0 0',
      '-o-transform': 'scale(0.95)',
      '-o-transform-origin': '0 0',
      '-webkit-transform': 'scale(0.95)',
      '-webkit-transform-origin': '0 0',
    },
    [theme.breakpoints.down(300)]: {
      width: 280,
    },
    [theme.breakpoints.down(320)]: {
      width: 300,
    },
    [theme.breakpoints.down(340)]: {
      width: 320,
    },
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const NewsletterPopup = props => {
  const { promotion, data, className, ...rest } = props
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const theme = useTheme()

  return (
    <div className={classes.root} {...rest}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // fullScreen={isXs ? true : false}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={classes.dialogContainer}
      >
        <DialogContent>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
            <div className={classes.wtgLogo}>
              <Image src="/images/photos/wtg.png" width={190} height={45} />
            </div>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon className={classes.closeIcon2} />
            </IconButton>
          </Toolbar>
          <div className={classes.contentContainer}>
            <Typography component="div" variant="subtitle1" color="secondary">
              Subscribe today and receive a{' '}
              <Box fontWeight="fontWeightBold" display="inline">
                15% coupon code
              </Box>{' '}
              off your first order with us!
            </Typography>
            <iframe
              className={classes.iframe}
              src="https://cdn.forms-content.sg-form.com/59ba8e2f-3a4a-11eb-9aac-ce25f605c580"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewsletterPopup
