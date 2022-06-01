import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, colors, Typography, GridList, GridListTile } from '@material-ui/core'
const marked = require('marked')

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
    maxWidth: 600,
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
      maxWidth: 400,
      maxHeight: 200,
    },
  },
  marked: {
    fontSize: 16,
    '& img': {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '500px',
      width: '100%',
      boxShadow: `0 5px 15px 0 rgb(30 76 165 / 20%)`,
      borderRadius: 8,
    },
  },
}))

const Content = props => {
  const { data, brand, className, ...rest } = props
  const classes = useStyles()

  const theme = useTheme()

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {/* {brand.name && (
        <div className={classes.section}>
          <Typography component="p" variant="h3" color="textPrimary" align="left">
            {brand.name}
          </Typography>
        </div>
      )} */}
      {brand.header && (
        <div className={classes.section}>
          <Typography component="p" variant="h5" color="textPrimary" align="left">
            {brand.header}
          </Typography>
        </div>
      )}
      {brand.description && (
        <div className={classes.section}>
          <div
            className={classes.marked}
            dangerouslySetInnerHTML={{ __html: marked(brand.description) }}
          />
        </div>
      )}
    </div>
  )
}

export default Content
