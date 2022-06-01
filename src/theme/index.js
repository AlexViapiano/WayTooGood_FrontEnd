import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

import palette from './palette'

const theme = responsiveFontSizes(
  createMuiTheme({
    palette,
    typography: {
      // fontFamily: 'Work Sans',
      // fontFamily: 'Roboto',
      // fontFamily: 'Lato',
      // fontFamily: 'Romper',
      fontFamily: 'Helvetica',
    },
    zIndex: {
      appBar: 1200,
      drawer: 1300,
    },
    overrides: {
      MuiButton: {
        containedPrimary: {
          color: 'white',
        },
        containedSecondary: {
          color: 'white',
        },
      },
    },
  })
)

export default theme
