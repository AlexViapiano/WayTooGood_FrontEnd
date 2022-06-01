import React from 'react'
import { useRouter } from 'next/router'
import { APP_URL } from '../../../../../redux/api'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public'
import EmailIcon from '@material-ui/icons/Email'
import { diets } from '../../../../common/data'
import { getProducts, setDiet } from '../../../../../redux/products/action'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkIcon from '@material-ui/icons/Link'
import LoyaltyIcon from '@material-ui/icons/Loyalty'
import Image from 'next/image'
import { connect } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { store } from 'react-notifications-component'

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    padding: theme.spacing(3, 2),
    background: '#fbfbfb',
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
    borderRadius: 8,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },
  gridItem: {
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: `2px solid #dcdcdc`,
    '&:last-child': {
      marginBottom: 0,
      borderBottom: 0,
      paddingBottom: 0,
    },
  },
  gridText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    color: '#000',
    '&:hover': {
      color: theme.palette.primary.dark,
      cursor: 'pointer',
    },
    '&:active': {
      color: '#fff',
      cursor: 'pointer',
    },
    '& svg': {
      color: '#8d8d8d',
      marginRight: 10,
    },
  },
  tiktokName: {
    marginLeft: 14,
  },
  socialIcon: {
    marginRight: theme.spacing(3),
    marginTop: 4,
    color: theme.palette.secondary.main + '!important',
    transition: 'all .1s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .1s ease-in-out',
    },
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(3),
    },
  },
  section: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  videoIframe: {
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
    borderRadius: 8,
    maxWidth: 600,
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
      maxWidth: 400,
      maxHeight: 200,
    },
  },
  video: {
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
    borderRadius: 8,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
      maxWidth: 400,
      maxHeight: 200,
    },
  },
  dietsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dietImage: {
    width: 100,
    cursor: 'pointer',
    transform: 'scale(1.0)',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all .2s ease-in-out',
    },
  },
}))

const SidebarInfo = props => {
  const { influencer, product, setDiet, className, ...rest } = props
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('common')
  const pageUrl = APP_URL + router.asPath

  const onClickDiet = diet => {
    setDiet(diet.id, true)
    getProducts()
    router.push('/products', undefined, { shallow: true })
  }

  const copyToClipboard = text => {
    const ta = document.createElement('textarea')
    ta.innerText = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()

    store.addNotification({
      title: 'Copied',
      message: text,
      type: 'success',
      insert: 'top',
      container: 'bottom-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
    })
  }
  console.log(influencer)

  return (
    <div className={classes.root}>
      <div className={classes.paper} {...rest}>
        {influencer.website == null && influencer.email == null ? null : (
          <Typography
            variant="h6"
            color="textPrimary"
            align="center"
            gutterBottom
            className={classes.sectionTitle}
          >
            {t('about')}
          </Typography>
        )}

        <Grid container spacing={0}>
          {influencer.website && (
            <Grid item xs={12} className={classes.gridItem}>
              <Typography color="textPrimary" variant="h6" className={classes.gridText}>
                <a href={influencer.website} className={classes.linkContainer}>
                  <PublicIcon />
                  {influencer.website}
                </a>
              </Typography>
            </Grid>
          )}
          {influencer.email && (
            <Grid item xs={12} className={classes.gridItem}>
              <Typography color="textPrimary" variant="h6" className={classes.gridText}>
                <a href={`mailto:${influencer.email}`} className={classes.linkContainer}>
                  <EmailIcon />
                  {influencer.email}
                </a>
              </Typography>
            </Grid>
          )}
          {influencer.instagram && (
            <Grid item xs={12} className={classes.gridItem}>
              <Typography color="textPrimary" variant="h6" className={classes.gridText}>
                <a
                  href={`https://www.instagram.com/${influencer.instagram}`}
                  className={classes.linkContainer}
                  target="_blank"
                >
                  <InstagramIcon />
                  {influencer.instagram}
                </a>
              </Typography>
            </Grid>
          )}
          {influencer.tiktok && (
            <Grid item xs={12} className={classes.gridItem}>
              <Typography color="textPrimary" variant="h6" className={classes.gridText}>
                <a
                  href={`https://www.tiktok.com/@${influencer.tiktok}`}
                  className={classes.linkContainer}
                  target="_blank"
                >
                  <Image src="/images/photos/tiktok.svg" alt="tiktok" width={20} height={20} />
                  <span className={classes.tiktokName}>{influencer.tiktok}</span>
                </a>
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} className={classes.gridItem}>
            <Typography color="textPrimary" variant="h6" className={classes.gridText}>
              <div
                className={classes.linkContainer}
                onClick={() => copyToClipboard(`https://www.waytoogood.com/?a=${influencer.url}`)}
                value={`https://www.waytoogood.com/?a=${influencer.url}`}
              >
                <LinkIcon />
                Refferal Link
              </div>
            </Typography>
          </Grid>
          {influencer.promocode && (
            <Grid item xs={12} className={classes.gridItem}>
              <Typography color="textPrimary" variant="h6" className={classes.gridText}>
                <div
                  className={classes.linkContainer}
                  onClick={() => copyToClipboard(influencer.promocode)}
                >
                  <LoyaltyIcon />
                  {influencer.promocode}
                </div>
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
      <div className={classes.section}>
        {influencer.video && (
          <center>
            <br />
            {/* <iframe
              className={classes.videoIframe}
              title="video"
              width="100%"
              height="315"
              src={influencer?.video?.url}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            /> */}
            <video controls className={classes.video}>
              <source src={influencer?.video?.url} type="video/mp4" />
              <source src={influencer?.video?.url} type="video/mov" />
            </video>
          </center>
        )}
      </div>
      <div className={classes.section}>
        {influencer.video_link && (
          <center>
            <iframe
              className={classes.videoIframe}
              title="video"
              width="100%"
              height="315"
              src={influencer.video_link}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            />
          </center>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    setDiet: diet => {
      return dispatch(setDiet(diet))
    },
    getProducts: searchText => {
      return dispatch(getProducts(searchText))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SidebarInfo)
