import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, Grid, Button, Divider } from '@material-ui/core'
import Image from 'next/image'
import { SectionHeader } from 'components/molecules'
import { Section } from 'components/organisms'
import Link from 'next/link'
import Newsletter from '../../../../common/Newsletter.js'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    width: 300,
    height: 300,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 40,
    height: 65,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  ctaContainer: {
    margin: 20,
    '& a': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
    [theme.breakpoints.down('sm')]: {
      minHeight: 200,
    },
  },
  sectionNoPaddingBottom: {
    paddingBottom: 0,
  },
}))

const Story = props => {
  const { className, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('about')
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.logoContainer}>
        <Image src="/images/photos/wtg-com.png" alt="WayTooGood_Logo" height={75} width={300} />
      </div>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={isMd ? 4 : 2}
        direction={isMd ? 'row' : 'column'}
        className={classes.container1}
      >
        <Grid
          item
          container
          alignItems="center"
          justify="flex-start"
          xs={12}
          md={6}
          data-aos={'fade-up'}
          direction="row"
        >
          <SectionHeader
            title={t('who-are-we')}
            subtitle={t('who-are-we-info')}
            align="left"
            disableGutter
            subtitleProps={{
              color: 'textPrimary',
              variant: 'h6',
            }}
          />
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={'fade-up'}
          className={classes.imageContainer}
        >
          <Image
            src="/images/illustrations/about1.png"
            alt="WayTooGood_Logo"
            layout="fill"
            objectFit="contain"
          />
        </Grid>
      </Grid>
      <Section>
        <Divider />
      </Section>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={isMd ? 4 : 2}
        direction={isMd ? 'row' : 'column-reverse'}
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={'fade-up'}
          className={classes.imageContainer}
        >
          <Image
            src="/images/illustrations/about2.png"
            alt="WayTooGood_Logo"
            layout="fill"
            objectFit="contain"
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justify="flex-start"
          xs={12}
          md={6}
          data-aos={'fade-up'}
          direction="row"
        >
          <SectionHeader
            title={t('what-we-do')}
            subtitle={t('what-we-do-info')}
            align="left"
            disableGutter
            subtitleProps={{
              color: 'textPrimary',
              variant: 'h6',
            }}
          />
        </Grid>
      </Grid>
      <Section>
        <Divider />
      </Section>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={isMd ? 4 : 2}
        direction={isMd ? 'row' : 'column'}
      >
        <Grid
          item
          container
          alignItems="center"
          justify="flex-start"
          xs={12}
          md={6}
          data-aos={'fade-up'}
          direction="row"
        >
          <SectionHeader
            title={t('suppliers')}
            subtitle={
              <>
                {t('suppliers-info')}
                <br></br>
                <br></br>
                {t('suppliers-info2')}
                <div className={classes.ctaContainer}>
                  <Link href={'/become-supplier'}>
                    <a>
                      <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.btnSubscribe}
                      >
                        {t('learn-more')}
                      </Button>
                    </a>
                  </Link>
                </div>
              </>
            }
            align="left"
            disableGutter
            subtitleProps={{
              color: 'textPrimary',
              variant: 'h6',
            }}
          />
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={'fade-up'}
          className={classes.imageContainer}
        >
          <Image
            src="/images/illustrations/about3.png"
            alt="WayTooGood_Logo"
            layout="fill"
            objectFit="contain"
          />
        </Grid>
      </Grid>
      <Section>
        <Divider />
      </Section>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={isMd ? 4 : 2}
        direction={isMd ? 'row' : 'column-reverse'}
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={'fade-up'}
          className={classes.imageContainer}
        >
          <Image
            src="/images/illustrations/about4.png"
            alt="WayTooGood_Logo"
            layout="fill"
            objectFit="contain"
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justify="flex-start"
          xs={12}
          md={6}
          data-aos={'fade-up'}
          direction="row"
        >
          <SectionHeader
            title={t('subscribers')}
            subtitle={
              <>
                {t('subscribers-info')}
                <br></br> <br></br>
                {t('subscribers-info2')}
                <div className={classes.ctaContainer}>
                  <Link href={'signin'}>
                    <a>
                      <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.btnSubscribe}
                      >
                        {t('sign-up')}
                      </Button>
                    </a>
                  </Link>
                </div>
              </>
            }
            align="left"
            disableGutter
            subtitleProps={{
              color: 'textPrimary',
              variant: 'h6',
            }}
          />
        </Grid>
      </Grid>
      <Section className={classes.sectionNoPaddingBottom}>
        <Newsletter />
      </Section>{' '}
    </div>
  )
}

export default Story
