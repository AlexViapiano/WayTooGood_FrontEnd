import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { colors, FormControl, InputAdornment, Button } from '@material-ui/core'
import { SectionHeader } from 'components/molecules'
import { Section } from 'components/organisms'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    position: 'relative',
    background: 'white',
    overflow: 'hidden',
    filter: `drop-shadow(1px 2px 2px #eeeeee)`,
    [theme.breakpoints.down('xs')]: {
      height: 200,
    },
  },
  image: {
    height: 400,
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  title: {
    fontWeight: 'bold',
  },
  section: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: 0,
    paddingBottom: 0,
  },
}))

const Hero = props => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Image
        className={classes.image}
        src="/images/hero/hero-generic.jpg"
        alt="Shipping and Returns Policy"
        loading="lazy"
        layout="fill"
        objectFit="cover"
      />
      <Section className={classes.section}>
        <SectionHeader
          title={'Shipping and Returns Policy'}
          // subtitle="What do you need?"
          align="left"
          data-aos="fade-up"
          titleProps={{
            className: clsx(classes.title),
            variant: 'h3',
          }}
        />
      </Section>
    </div>
  )
}

export default Hero
