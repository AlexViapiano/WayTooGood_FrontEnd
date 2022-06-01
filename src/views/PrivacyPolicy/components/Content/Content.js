import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, colors, Typography, GridList, GridListTile } from '@material-ui/core'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {},
  section: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  image: {
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
  },
  displayLineBreak: {
    whiteSpace: 'pre-line',
  },
  videoIframe: {
    boxShadow: `0 5px 15px 0 rgb(30 76 165 / 20%)`,
    borderRadius: 8,
  },
}))

const Content = props => {
  const { className, ...rest } = props
  const classes = useStyles()

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  const { t } = useTranslation('privacyPolicy')

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.section}>
        <Typography component="p" variant="h5" color="textPrimary" align="left">
          {t('privacy-policy-1')}
          <br></br>
          <br></br>
          {t('privacy-policy-2')}
          <br></br>
          <br></br>
          {t('privacy-policy-3')}
          <br></br>
          <br></br>
          {t('privacy-policy-4')}
          <br></br>
          <br></br>
          {t('privacy-policy-5')}
          <br></br>
          <br></br>
          {t('privacy-policy-6')}
          <br></br>
          <br></br>
          {t('privacy-policy-7')}
          <br></br>
          <br></br>
          {t('privacy-policy-8')}
          <br></br>
          <br></br>
          {t('privacy-policy-9')}
          <br></br>
          <br></br>
          {t('privacy-policy-10')}
          <br></br>
          <br></br>
          {t('privacy-policy-11')}
          <br></br>
          <br></br>
          {t('privacy-policy-12')}
          <br></br>
          <br></br>
          {t('privacy-policy-13')}
          <br></br>
          <br></br>
          {t('privacy-policy-14')}
          <br></br>
          <br></br>
          {t('privacy-policy-15')}
          <br></br>
          <br></br>
          {t('privacy-policy-16')}
          <br></br>
          <br></br>
          {t('privacy-policy-17')}
          <br></br>
          <br></br>
          {t('privacy-policy-18')}
          <br></br>
          <br></br>
          {t('privacy-policy-19')}
          <br></br>
          <br></br>
          {t('privacy-policy-20')}
          <br></br>
          <br></br>
          {t('privacy-policy-21')}
          <br></br>
          <br></br>
          {t('privacy-policy-22')}
          <br></br>
          <br></br>
          {t('privacy-policy-23')}
          <br></br>
          <br></br>
          {t('privacy-policy-24')}
          <br></br>
          <br></br>
          {t('privacy-policy-25')}
          <br></br>
          <br></br>
          {t('privacy-policy-26')}
          <br></br>
          <br></br>
          {t('privacy-policy-27')}
          <br></br>
          <br></br>
          {t('privacy-policy-28')}
          <br></br>
          <br></br>
          {t('privacy-policy-29')}
          <br></br>
          <br></br>
          {t('privacy-policy-30')}
          <br></br>
          <br></br>
          {t('privacy-policy-31')}
          <br></br>
          <br></br>
          {t('privacy-policy-32')}
          <br></br>
          <br></br>
          {t('privacy-policy-33')}
          <br></br>
          <br></br>
          {t('privacy-policy-34')}
          <br></br>
          <br></br>
          {t('privacy-policy-35')}
          <br></br>
          <br></br>
          {t('privacy-policy-36')}
          <br></br>
          <br></br>
          {t('privacy-policy-37')}
        </Typography>
      </div>
    </div>
  )
}

export default Content
