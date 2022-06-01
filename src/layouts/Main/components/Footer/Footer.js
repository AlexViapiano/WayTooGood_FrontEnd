import React, { forwardRef, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Typography,
  IconButton,
  Grid,
  List,
  ListItem,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  useMediaQuery,
} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import PinterestIcon from '@material-ui/icons/Pinterest'
import { API_URL } from '../../../../../redux/api'
import Link from 'next/link'
import Image from 'next/image'
import { changeLocale } from '../../../../../redux/session/action'
import { useTranslation } from 'next-i18next'
import NewsletterPopup from '../../../../common/NewsletterPopup'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
    background: 'rgb(48,57,71)',
    background: 'radial-gradient(circle, rgba(48,57,71,1) 0%, rgba(62,71,85,1) 90%)',
    '& a': {
      '&:hover': {
        transform: 'translate(-2px, -2px)',
        color: '#fff',
      },
    },
    '& svg': {
      '&:hover': {
        color: '#fff',
      },
    },
  },
  topContainer: {
    margin: '30px 0px',
  },
  topLeftContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0px',
  },
  logoContainerItem: {
    paddingTop: 0,
    maxWidth: 150,
  },
  listItem: {
    marginLeft: 20,
  },
  groupTitle: {
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
  socialIconContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  socialIcon: {
    padding: 0,
    marginRight: theme.spacing(1),
    color: 'rgba(255,255,255,.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      background: 'transparent',
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 24,
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    margin: theme.spacing(2),
  },
  menuGroupItem: {
    paddingTop: 0,
    paddingBottom: theme.spacing(1 / 2),
    '& a': {
      padding: '3px 0px',
      width: '100%',
    },
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
    color: 'white',
  },
  divider: {
    width: '100%',
  },
  navLink: {
    color: 'rgba(255,255,255,.6)',
  },
  contactContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    padding: 8,
    '& div': {
      margin: '0px 10px',
    },
    '& a': {
      margin: '0px 10px',
      color: '#a29fa0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      marginRight: 20,
      marginLeft: 20,
    },
    '& svg': {
      marginRight: 5,
    },
  },
  legalContainer: {
    borderTop: '#5e5e5e 1px solid',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    padding: 8,
    '& div': {
      margin: '0px 10px',
    },
    '& a': {
      margin: '0px 10px',
      color: '#a29fa0',
    },
  },
  containerBottom: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 250,
    height: 125,
  },
  formControl: {
    width: 150,
    margin: 5,
    '& label': {
      color: '#fff',
    },
    '& .MuiInputBase-root': {
      color: '#fff',
    },
    '& fieldset': {
      borderColor: '#5f5f5f',
    },
    '& svg': {
      color: '#a29fa0',
    },
    '& input': {
      color: '#fff',
    },
  },
  newsletterTitle: {
    color: '#FFF',
    marginBottom: 5,
    fontSize: 14,
  },
  buttonIcon: {
    fontSize: 12,
    marginLeft: 7,
  },
}))

const Footer = props => {
  const { className, locale, changeLocale } = props
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.up('xs'), { defaultMatches: false })

  const pages = {
    landings: {
      title: 'Landings',
      id: 'landing-pages',
      children: {
        services: {
          groupTitle: 'pages',
          pages: [
            {
              title: 'marketplace',
              href: '/products',
            },
            {
              title: 'subscribe',
              href: '/subscribe',
            },
            {
              title: 'corporate-program',
              href: '/corporate',
            },
          ],
        },
        web: {
          groupTitle: 'info',
          pages: [
            {
              title: 'contact-us',
              href: '/contact',
            },
            {
              title: 'faq',
              href: '/faq',
            },
            {
              title: 'shipping-and-returns',
              href: '/shipping-and-returns',
            },
          ],
        },
        supplier: {
          groupTitle: 'suppliers',
          pages: [
            {
              title: 'about-us',
              href: '/about',
            },
            {
              title: 'brands',
              href: '/brands',
            },
            {
              title: 'become-a-supplier',
              href: '/become-supplier',
            },
          ],
        },
      },
    },
  }

  const classes = useStyles()

  const landings = pages.landings

  const MenuGroup = props => {
    const { item } = props
    return (
      <List disablePadding className={classes.menuItem}>
        <ListItem disableGutters className={classes.menuGroupItem}>
          <Typography variant="body2" className={classes.menuGroupTitle}>
            {t(item.groupTitle)}
          </Typography>
        </ListItem>
        {item.pages.map((page, i) => (
          <ListItem disableGutters key={i} className={classes.menuGroupItem}>
            <Link href={page.title == 'WTG Admin' ? API_URL + '/admin' : page.href}>
              <a>
                <Typography variant="body2" className={clsx(classes.navLink, 'submenu-item')}>
                  {t(page.title)}
                </Typography>
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    )
  }

  const LandingPages = () => {
    const { services, web, supplier } = landings.children
    return (
      <div className={classes.menu}>
        <div>
          <MenuGroup item={services} />
        </div>
        <div>
          <MenuGroup item={supplier} />
        </div>
        <div>
          <MenuGroup item={web} />
        </div>
      </div>
    )
  }

  const onChangeLocale = newLocale => {
    router.push('/', '/', { locale: newLocale })
    changeLocale(newLocale)
  }

  if (isXs) {
    return (
      <div className={classes.root}>
        <Grid container align="center" justify="center" className={classes.topContainer}>
          <List className={classes.topLeftContainer}>
            <ListItem disableGutters className={classes.logoContainerItem}>
              <div className={classes.logoContainer}>
                <Link href="/">
                  <a>
                    <Image
                      src="/images/photos/wtg-green-white.png"
                      alt="wtg"
                      width={150}
                      height={37}
                      loading="lazy"
                    />
                  </a>
                </Link>
              </div>
            </ListItem>
            <ListItem disableGutters className={classes.socialIconContainer}>
              <a
                href="https://www.facebook.com/Waytoogoodcom-104295958140575"
                className={classes.socialIcon}
                target="_blank"
                rel="noopener"
              >
                <FacebookIcon className={classes.icon} />
              </a>
              <a
                href="https://www.instagram.com/waytoogoodofficial/"
                className={classes.socialIcon}
                target="_blank"
                rel="noopener"
              >
                <InstagramIcon className={classes.icon} />
              </a>
              <a
                href="https://www.pinterest.com/waytoogoodofficial"
                className={classes.socialIcon}
                target="_blank"
                rel="noopener"
              >
                <IconButton className={classes.socialIcon}>
                  <PinterestIcon className={classes.icon} />
                </IconButton>
              </a>
              <a
                href="https://www.tiktok.com/@waytoogood.com"
                className={classes.socialIcon}
                target="_blank"
                rel="noopener"
              >
                <IconButton className={classes.socialIcon}>
                  <Image src="/images/photos/tiktok.svg" alt="tiktok" width={18} height={18} />
                </IconButton>
              </a>
            </ListItem>
          </List>

          <Grid item className={classes.listItem}>
            <LandingPages />
          </Grid>

          <Grid
            item
            align="center"
            justify="center"
            direction="column"
            className={classes.containerBottom}
          >
            <FormControl size="small" variant="outlined" className={classes.formControl}>
              {/* <InputLabel>{t('language')}</InputLabel> */}
              <Select
                value={locale ? locale : 'en'}
                onChange={event => onChangeLocale(event.target.value)}
                // label="Language"
              >
                <MenuItem value={'en'}>{t('english')}</MenuItem>
                <MenuItem value={'fr'}>{t('french')}</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={() => setShowModal(!showModal)}
              variant="contained"
              color="primary"
              className={classes.newsletterBtn}
            >
              {t('footer-subscribe')}
            </Button>
          </Grid>
        </Grid>

        <div className={classes.contactContainer}>
          <a href={`tel:514-360-2236`}>
            <PhoneIcon />
            <span>514-360-2236</span>
          </a>

          <a href={`mailto:support@waytoogood.com`}>
            <EmailIcon />
            <span>support@waytoogood.com</span>
          </a>
        </div>
        <div className={classes.legalContainer}>
          <div>{t('all-rights-reserved')}</div>
          <div>
            <Link href={'/privacy-policy'}>
              <a>{t('privacy-policy')}</a>
            </Link>

            <Link href={'/terms-and-conditions'}>
              <a>{t('terms-and-conditions')}</a>
            </Link>
          </div>
        </div>

        {showModal ? <NewsletterPopup /> : null}
      </div>
    )
  }

  return <div></div>
}

const mapStateToProps = state => ({
  locale: state?.session?.locale,
})

const mapDispatchToProps = dispatch => ({
  changeLocale: newLocale => {
    return dispatch(changeLocale(newLocale))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
