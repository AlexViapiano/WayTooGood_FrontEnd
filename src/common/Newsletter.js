import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { SectionHeader } from 'components/molecules'
import { useTranslation } from 'next-i18next'
import NewsletterPopup from './NewsletterPopup'
import { connect } from 'react-redux'
import { setPopupTriggered } from '../../redux/session/action'

const useStyles = makeStyles(theme => ({
  root: {
    background: 'url(/images/illustrations/circled-background.svg) no-repeat',
    backgroundSize: 'cover',
    borderRadius: theme.spacing(1),
    boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 12px',
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontWeight: 400,
  },
  buttonIcon: {
    marginLeft: 5,
  },
}))

const Newsletter = props => {
  const { popupTriggered, setPopupTriggered, data, className, ...rest } = props
  const classes = useStyles()
  const theme = useTheme()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    var popupTriggeredCookie = localStorage.getItem('popupTriggered', true)
    if (!popupTriggered && !popupTriggeredCookie) {
      setTimeout(() => {
        setPopupTriggered()
        setShowModal(true)
      }, 10000)
    }
  }, [])

  const { t } = useTranslation('common')

  return (
    <div className={classes.root} {...rest}>
      {showModal ? <NewsletterPopup /> : null}

      <SectionHeader
        title={<span className={classes.title}>{t('newsletter-title')}</span>}
        subtitle={<span className={classes.subtitle}>{t('newsletter-subtitle')}</span>}
        titleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        fadeUp
      />

      <Button
        onClick={() => setShowModal(!showModal)}
        size="large"
        variant="contained"
        color="primary"
      >
        {t('signup')}
        <SendIcon className={classes.buttonIcon} aria-hidden="true" />
      </Button>
    </div>
  )
}

const mapStateToProps = state => ({
  popupTriggered: state.session.popupTriggered,
})

const mapDispatchToProps = dispatch => ({
  setPopupTriggered: () => {
    return dispatch(setPopupTriggered())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Newsletter)
