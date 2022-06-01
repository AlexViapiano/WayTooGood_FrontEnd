import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { makeStyles } from '@material-ui/core/styles'
import { changeCountry } from '../../../../../redux/session/action'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {},
  countryContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  flagCA: {
    height: 50,
    width: 80,
    // backgroundImage: 'url(/images/photos/flag_CA.svg)',
    backgroundSize: '100% 100%',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    '&:hover': {
      filter: 'drop-shadow(1px 1px 4px #FAFAFA)',
    },
  },
  flagUS: {
    height: 50,
    width: 80,
    // backgroundImage: 'url(/images/photos/flag_US.svg)',
    backgroundSize: '100% 100%',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    '&:hover': {
      filter: 'drop-shadow(1px 1px 4px #FAFAFA)',
    },
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const CountryModal = props => {
  const { open, setDisplayCountryModal, changeCountry, country, className, ...rest } = props
  const classes = useStyles()

  const onClickCountry = newCountry => {
    if (country != newCountry) changeCountry(newCountry)
    setDisplayCountryModal(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setDisplayCountryModal(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle id="alert-dialog-slide-title">{'Select country to shop in!'}</DialogTitle>
        <DialogContent>
          <div className={classes.countryContainer}>
            <div onClick={() => onClickCountry('CA')} className={classes.flagCA} />
            <div onClick={() => onClickCountry('US')} className={classes.flagUS} />
          </div>
        </DialogContent> */}
        {/* <DialogActions>
          <Button onClick={() => setDisplayCountryModal(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={() => setDisplayCountryModal(false)} color="primary">
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => ({
  country: state.session.country,
})

const mapDispatchToProps = dispatch => {
  return {
    changeCountry: country => {
      return dispatch(changeCountry(country))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryModal)
