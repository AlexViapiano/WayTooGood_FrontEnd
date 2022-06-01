import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { colors, FormControl, OutlinedInput, InputAdornment, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Image from 'next/image'
import { SectionHeader } from 'components/molecules'
import { Section } from 'components/organisms'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    position: 'relative',
    background: 'white',
    overflow: 'hidden',
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
  textWhite: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
    textShadow: `3px 4px 7px rgb(81 67 21 / 80%)`,
  },
  section: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: 0,
    paddingBottom: 0,
  },
  searchInputContainer: {
    background: 'white',
    padding: theme.spacing(2),
    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.11)',
    borderRadius: theme.spacing(1),
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '0 !important',
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: theme.spacing(2),
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 0,
    },
    '& .MuiOutlinedInput-input': {
      padding: 0,
    },
  },
  input: {
    background: 'white',
  },
  searchButton: {
    maxHeight: 45,
    minWidth: 135,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
}))

const Hero = props => {
  const { className, searchText, setSearchText, ...rest } = props
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Image
        className={classes.image}
        src="/images/hero/hero-brands.jpg"
        alt="Privacy Policy"
        loading="lazy"
        layout="fill"
        objectFit="cover"
      />
      <Section className={classes.section}>
        <SectionHeader
          title={'Influencers'}
          // subtitle="What brands are you looking for?"
          align="left"
          data-aos="fade-up"
          titleProps={{
            className: clsx(classes.title, classes.textWhite),
            variant: 'h3',
          }}
          subtitleProps={{
            className: classes.textWhite,
          }}
        />
        <div className={classes.searchInputContainer} data-aos="fade-up">
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              className={classes.input}
              size="large"
              value={searchText}
              onChange={event => setSearchText(event.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              placeholder={t('brands-placeholder')}
            />
          </FormControl>
          {/* <Button color="primary" variant="contained" size="large" className={classes.searchButton}>
            Search
          </Button> */}
        </div>
      </Section>
    </div>
  )
}

export default Hero
