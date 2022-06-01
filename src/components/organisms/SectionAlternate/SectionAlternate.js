import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.alternate,
  },
  inner: {
    maxWidth: 1300,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(6, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12, 2),
    },
  },
  innerNarrowed: {
    maxWidth: 800,
  },
  fixedPadding: {
    padding: '48px 16px',
  },
}))

/**
 * Component to display the alternative sections
 *
 * @param {Object} props
 */
const SectionAlternate = props => {
  const { children, innerNarrowed, fixedPadding, className, ...rest } = props

  const classes = useStyles()

  return (
    <section className={clsx('section-alternate', classes.root, className)} {...rest}>
      <div
        className={clsx(
          'section-alternate__content',
          classes.inner,
          innerNarrowed ? classes.innerNarrowed : {},
          fixedPadding ? classes.fixedPadding : {}
        )}
      >
        {children}
      </div>
    </section>
  )
}

export default SectionAlternate
