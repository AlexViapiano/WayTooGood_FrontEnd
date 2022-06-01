import React from 'react'
import { useRouter } from 'next/router'
import { APP_URL } from '../../../../../redux/api'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public'
import EmailIcon from '@material-ui/icons/Email'
import { diets } from '../../../../common/data'
import { getProducts, setDiet } from '../../../../../redux/products/action'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import PinterestIcon from '@material-ui/icons/Pinterest'
import RedditIcon from '@material-ui/icons/Reddit'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import Image from 'next/image'
import { connect } from 'react-redux'
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
  WhatsappShareButton,
} from 'react-share'
import { useTranslation } from 'next-i18next'

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
    '& svg': {
      color: '#8d8d8d',
      marginRight: 10,
    },
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
    boxShadow: `0 5px 15px 0 rgb(30 76 165 / 20%)`,
    borderRadius: 8,
    maxWidth: 600,
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
  const { brand, product, setDiet, className, ...rest } = props
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('brand')
  const pageUrl = APP_URL + router.asPath

  const onClickDiet = diet => {
    setDiet(diet.id, true)
    getProducts()
    router.push('/products', undefined, { shallow: true })
  }

  return (
    <div className={classes.root}>
      <div className={classes.paper} {...rest}>
        {brand.website == null && brand.email == null ? null : (
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
          {brand.website && (
            <Grid item xs={12} className={classes.gridItem}>
              <Typography color="textPrimary" variant="h6" className={classes.gridText}>
                <a href={brand.website} className={classes.linkContainer}>
                  <PublicIcon />
                  {brand.website}
                </a>
              </Typography>
            </Grid>
          )}
          {brand.email && (
            <Grid item xs={12} className={classes.gridItem}>
              <Typography color="textPrimary" variant="h6" className={classes.gridText}>
                <a href={`mailto:${brand.email}`} className={classes.linkContainer}>
                  <EmailIcon />
                  {brand.email}
                </a>
              </Typography>
            </Grid>
          )}
          {brand.instagram && (
            <Grid item xs={12} className={classes.gridItem}>
              <Typography color="textPrimary" variant="h6" className={classes.gridText}>
                <a
                  href={`https://www.instagram.com/${brand.instagram}`}
                  className={classes.linkContainer}
                >
                  <InstagramIcon />
                  {brand.instagram}
                </a>
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} className={classes.gridItem}>
            <FacebookShareButton
              url={pageUrl}
              quote={brand?.name}
              hashtag="#waytoogood"
              className={classes.socialIcon}
            >
              <FacebookIcon />
            </FacebookShareButton>
            <TwitterShareButton
              url={pageUrl}
              title={brand?.name}
              hashtag="#waytoogood"
              className={classes.socialIcon}
            >
              <TwitterIcon />
            </TwitterShareButton>
            {brand?.logo && (
              <PinterestShareButton
                url={pageUrl}
                description={brand?.name}
                media={brand?.logo}
                className={classes.socialIcon}
              >
                <PinterestIcon />
              </PinterestShareButton>
            )}
            <RedditShareButton
              url={pageUrl}
              title={brand?.name}
              hashtag="#waytoogood"
              className={classes.socialIcon}
            >
              <RedditIcon />
            </RedditShareButton>
            <WhatsappShareButton
              url={pageUrl}
              title={brand?.name}
              hashtag="#waytoogood"
              className={classes.socialIcon}
            >
              <WhatsAppIcon />
            </WhatsappShareButton>
          </Grid>
        </Grid>
      </div>
      <br></br> <br></br>
      <div className={classes.section}>
        {brand.video_link && (
          <center>
            <iframe
              className={classes.videoIframe}
              title="video"
              width="100%"
              height="315"
              src={brand.video_link}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            />
          </center>
        )}
      </div>
      <div className={classes.section}>
        <div className={classes.dietsContainer}>
          {brand?.diets?.length > 0 &&
            brand?.diets.map(diet => {
              var foundDiet = diets.find(_diet => _diet.id.includes(diet.id))
              if (foundDiet && foundDiet.src) {
                return (
                  <Image
                    onClick={() => onClickDiet(foundDiet)}
                    key={foundDiet.id}
                    src={foundDiet.src}
                    alt={foundDiet.title}
                    width={96}
                    height={96}
                    loading="lazy"
                    className={classes.dietImage}
                  />
                )
              }
            })}
        </div>
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
