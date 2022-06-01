import React from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { colors, AppBar, Toolbar, Avatar } from '@material-ui/core'
import Image from 'next/image'
import Link from 'next/link'
import { API_URL } from '../../../../../redux/api'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    background: theme.palette.white,
    borderBottom: `1px solid ${colors.grey[200]}`,
    filter: 'drop-shadow(1px 2px 2px #eeeeee)',
  },
  toolbar: {
    maxWidth: 1300,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 150,
    },
  },
  logoImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: '100%',
    maxWidth: 300,
    cursor: 'pointer',
    display: 'flex',
    '&:hover': {
      transform: 'scale(0.95)',
      transition: 'all .2s ease-in-out',
    },
  },
}))

const Topbar = props => {
  const { user, onSidebarOpen, className, ...rest } = props

  const classes = useStyles()

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <Link href={'/'}>
          <a className={classes.logoContainer}>
            <Image
              className={classes.logoImage}
              src="/images/photos/wtg.png"
              alt="WayTooGood_Logo"
              width={175}
              height={45}
            />
          </a>
        </Link>
        {user && Object.keys(user).length !== 0 && (
          <Avatar
            alt={user?.username ? user.username : 'profile-pic'}
            src={
              user?.profile_pic?.formats?.thumbnail?.url
                ? user?.profile_pic?.formats?.thumbnail?.url
                : null
            }
          />
        )}
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user: state.session?.user,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
