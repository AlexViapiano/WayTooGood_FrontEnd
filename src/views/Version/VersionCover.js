import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Image from 'next/image'
import { SectionHeader } from 'components/molecules'
import { HeroShaped } from 'components/organisms'
import packageJson from '../../../package.json'

const useStyles = makeStyles(theme => ({
  root: {
    '& .hero-shaped': {
      borderBottom: 0,
    },
    '& .hero-shaped__wrapper': {
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& .hero-shaped__cover': {
        height: 200,
      },
      '& .hero-shaped__': {
        height: 200,
      },
      '& .hero-shaped__right-side': {
        height: 200,
      },
    },
  },
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
      margin: `0 auto`,
    },
  },
  image: {
    objectFit: 'cover',
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}))

const VersionCover = () => {
  const router = useRouter()
  const classes = useStyles()

  const handleClick = () => {
    router.push('/')
  }

  return (
    <div className={classes.root}>
      <HeroShaped
        leftSide={
          <div className={classes.formContainer}>
            <SectionHeader
              label="Version"
              title={packageJson.version}
              subtitle={<span> </span>}
              titleProps={{
                variant: 'h3',
              }}
              labelProps={{
                color: 'secondary',
                className: classes.label,
                variant: 'h5',
              }}
              ctaGroup={[
                <Button size="large" variant="contained" color="primary" onClick={handleClick}>
                  Home
                </Button>,
              ]}
              disableGutter
            />
          </div>
        }
        rightSide={
          <Image
            className={classes.image}
            src="/images/hero/cover-3.jpg"
            alt="About"
            loading="lazy"
            layout="fill"
            objectFit="cover"
          />
        }
      />
    </div>
  )
}

export default VersionCover
