import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

export default {
  black,
  white,
  alternate: 'rgb(247, 249, 250)',
  primary: {
    main: '#a0c037',
    light: '#dae6b7',
  },
  secondary: {
    main: '#4f5b6d',
    light: '#79808c',
  },
  grey: {
    main: '#faf4e5',
    light: '#fafafa',
  },
  accent: {
    green: '#c9e265',
    yellow: '#fbe25e',
    orange: '#fc843d',
    pink: '#ffcdc2',
    blue: '#57c9b6',
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: '#5f5f5f',
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
    white: '#fff',
  },
  background: {
    default: '#FFFFFF',
    paper: white,
    offWhite: '#fafafa',
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
}
