import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, Grid, Button, Typography, Divider } from '@material-ui/core'
import { SectionHeader } from 'components/molecules'
import { CardBase, CardPricingStandard } from 'components/organisms'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { Section } from 'components/organisms'

const useStyles = makeStyles(theme => ({
  root: {},
  center: {
    display: 'flex',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
    [theme.breakpoints.down('sm')]: {
      minHeight: 200,
    },
  },
}))

const Integrations = props => {
  const { setFocusForm, className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('becomeSupplier')

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  const pricings = [
    {
      title: t('basic'),
      price: '10% ' + t('fee'),
      features: [
        t('control-over-brand'),
        t('have-products-featured'),
        t('interact-with-customer'),
        t('assist-in-managing'),
        t('shipped-from-supplier'),
      ],
      isHighlighted: false,
    },
    {
      title: t('Convenience'),
      price: '30% ' + t('fee'),
      features: [
        t('control-over-brand'),
        t('have-products-featured'),
        t('interact-with-customer'),
        t('fulfilled-by-waytoogood'),
        t('inventory-management'),
        t('waytoogood-processes'),
        t('participate-in-pomotional'),
      ],
      isHighlighted: true,
    },
  ]

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid item xs={12} md={6} className={classes.center}>
              <SectionHeader
                title={t('control-over-your-brand')}
                subtitle={t('control-over-your-brand-subtext')}
                align="left"
                label="CONTROL"
                ctaGroup={[
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => setFocusForm(true)}
                  >
                    {t('get-started')}
                  </Button>,
                ]}
                disableGutter
                data-aos="fade-up"
              />
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-up">
              <div className={classes.imageContainer}>
                <Image
                  src="/images/illustrations/undraw_Personal_settings.svg"
                  alt="Control"
                  loading="lazy"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Section>
          <Divider />
        </Section>
        <Grid item xs={12}>
          <Grid container spacing={isMd ? 4 : 2} direction={isMd ? 'row' : 'column-reverse'}>
            <Grid item xs={12} md={6} data-aos="fade-up">
              <div className={classes.imageContainer}>
                <Image
                  src="/images/illustrations/undraw_Gift_box.svg"
                  alt="Subscription Box"
                  loading="lazy"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-up" className={classes.center}>
              <SectionHeader
                title={t('participate')}
                subtitle={t('participate-subtext')}
                align="left"
                label="PARTICIPATE"
                ctaGroup={[
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => setFocusForm(true)}
                  >
                    {t('get-started')}
                  </Button>,
                ]}
                disableGutter
              />
            </Grid>
          </Grid>
        </Grid>
        <Section>
          <Divider />
        </Section>
        {isMd && (
          <>
            <Grid item xs={12}>
              <Grid container spacing={isMd ? 4 : 2} direction={isMd ? 'row' : 'column-reverse'}>
                <Grid item xs={12} md={6} data-aos="fade-up" className={classes.center}>
                  <SectionHeader
                    title={t('new-marketplace')}
                    subtitle={t('new-marketplace-subtext')}
                    align="left"
                    label="BE PART OF THE MOVEMENT"
                    ctaGroup={[
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => setFocusForm(true)}
                      >
                        {t('get-started')}
                      </Button>,
                    ]}
                    disableGutter
                  />
                </Grid>
                <Grid item xs={12} md={6} data-aos="fade-up">
                  <div className={classes.imageContainer}>
                    <Image
                      src="/images/illustrations/businesswomen.svg"
                      alt="Business Women"
                      loading="lazy"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Section>
              <Divider />
            </Section>
          </>
        )}

        <Grid item xs={12}>
          <Grid container spacing={isMd ? 4 : 2} direction={isMd ? 'row' : 'column-reverse'}>
            <Grid item xs={12} md={6}>
              <div className={classes.imageContainer}>
                <Image
                  src="/images/illustrations/undraw_review.svg"
                  alt="Reviews"
                  loading="lazy"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.center}>
              <SectionHeader
                title={t('engaging-review')}
                subtitle={t('engaging-review-subtext')}
                align="left"
                label="REVIEWS"
                ctaGroup={[
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => setFocusForm(true)}
                  >
                    {t('get-started')}
                  </Button>,
                ]}
                disableGutter
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Integrations
