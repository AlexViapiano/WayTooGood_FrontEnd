import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, colors, Grid, Typography, TextField, Button } from '@material-ui/core'
import { SectionHeader } from 'components/molecules'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    borderRadius: theme.spacing(2),
    background: colors.blueGrey[50],
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },
  cover: {
    width: 200,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    marginBottom: theme.spacing(3),
  },
  form: {
    '& .MuiTextField-root': {
      background: 'white',
    },
    '& .MuiOutlinedInput-input': {
      background: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      border: 'solid 1px rgba(0, 0, 0, 0.2)',
    },
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}))

const Form = props => {
  const { className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('common')

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.cover}>
        {/* <Image src="/images/illustrations/want-to-work.svg" /> */}
      </div>
      <SectionHeader
        title={t('newsletter')}
        subtitle={t('newsletter-placeholder')}
        titleProps={{
          variant: 'h4',
          color: 'textPrimary',
        }}
        subtitleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        data-aos="fade-up"
        align="left"
      />
      <div className={classes.form}>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12} data-aos="fade-up">
            <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
              {t('full-name')}
            </Typography>
            <TextField
              placeholder={t('full-name-placeholder')}
              variant="outlined"
              size="medium"
              name="fullname"
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} data-aos="fade-up">
            <Typography variant="subtitle1" color="textPrimary" className={classes.inputTitle}>
              {t('e-mail')}
            </Typography>
            <TextField
              placeholder={t('e-mail-placeholder')}
              variant="outlined"
              size="medium"
              name="email"
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <Button variant="contained" type="submit" color="primary" size="large">
              {t('subscribe')}
            </Button>
          </Grid>
          <Grid item container justify="center" xs={12}>
            <Typography variant="caption" color="textSecondary">
              {t('subscribe2')}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

Form.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
}

export default Form
