import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import { Toolbar, Hidden } from '@material-ui/core'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  toolbar: {
    width: '100%',
    padding: theme.spacing(0, 2),
    minHeight: 40,
    background: theme.palette.primary.main,
    background: 'radial-gradient(circle, #c9e165 0%, rgb(250 250 250) 100%)',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'center',
    '& svg': {
      marginLeft: 10,
      height: 18,
    },
    '& div': {
      fontWeight: 900,
      fontSize: 18,
      textShadow: '2px 3px 5px #a3a9ae',
    },
  },
}))

const TopbarPromotion = props => {
  const {} = props
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <Hidden smDown>
      <Toolbar disableGutters className={classes.toolbar}>
        <div>{t('free-shipping-on-orders-over-50')}</div>
        {/* <ThumbUpIcon></ThumbUpIcon> */}
      </Toolbar>
    </Hidden>
  )
}

export default TopbarPromotion
