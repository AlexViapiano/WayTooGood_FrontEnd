import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Section, SectionAlternate } from 'components/organisms'
import { Content, Hero, SidebarInfo, SidebarNewsletter, InfluencerProducts } from './components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'next-i18next'
import * as pixels from '../../utils/pixels'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  rootEmpty: {
    width: '100%',
    height: 'calc(100vh - 567px)',
    minHeight: '300px',
    display: 'flex',
  },

  sidebarNewsletter: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  footerNewsletterSection: {
    background: theme.palette.primary.main,
  },
  noPadding: {
    padding: 0,
  },

  loadingContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const Influencer = props => {
  const { influencer } = props
  const classes = useStyles()
  const { t } = useTranslation('common')

  if (!influencer)
    return (
      <div className={classes.rootEmpty}>
        <Section>
          <div className={classes.loadingContainer}>
            <CircularProgress />
            <br></br>
            <div>{t('loading')}</div>
          </div>
        </Section>
      </div>
    )

  useEffect(() => {
    document.title = influencer?.name
    pixels.viewContent({
      content_id: influencer?.id,
      content_name: influencer?.name,
      content_type: 'product_category',
    })
  })

  return (
    <div className={classes.root}>
      <Section className={classes.noPadding}>
        <Hero influencer={influencer} />
      </Section>
      <Section>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Section>
              <Content influencer={influencer} />
            </Section>
            {influencer?.products && influencer?.products.length > 0 && (
              <InfluencerProducts products={influencer?.products} name={influencer?.name} />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <SidebarInfo influencer={influencer} />
            {/* <SidebarNewsletter className={classes.sidebarNewsletter} /> */}
          </Grid>
        </Grid>
      </Section>
    </div>
  )
}

export default Influencer
