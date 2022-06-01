import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { SectionHeader } from 'components/molecules'
import { Section } from 'components/organisms'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    background: theme.palette.primary.main,
  },
  textWhite: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
}))

const Hero = props => {
  const { className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('account')
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Section className={classes.section}>
        <SectionHeader
          title={t('account-settings')}
          subtitle={t('change-account-settings')}
          align="left"
          disableGutter
          titleProps={{
            className: clsx(classes.title, classes.textWhite),
            variant: 'h3',
          }}
          subtitleProps={{
            className: classes.textWhite,
          }}
        />
      </Section>
    </div>
  )
}

export default Hero
