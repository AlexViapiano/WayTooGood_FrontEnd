import React, { useState } from 'react'
import clsx from 'clsx'
import {
  makeStyles,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  Slide,
  IconButton,
  Button,
} from '@material-ui/core'
import { DescriptionListIcon, CardJobMinimal } from 'components/organisms'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@material-ui/icons/Close'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from 'components/molecules'

const useStyles = makeStyles(theme => ({
  root: {},
  descriptionListIcon: {
    marginBottom: theme.spacing(2),
  },
  marginTop: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5),
    },
    justifyContent: 'center',
  },
  dialog: {
    '& MuiDialogContent-root': {
      marginBottom: 20,
    },
  },
  headerContainer: {
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    padding: 16,
  },
  title: {
    margin: 'auto',
    fontSize: '24px',
    color: 'white',
  },
  answer: {
    padding: '10px 0px',
  },
  answerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    minWidth: '100%',
    minHeight: 500,
    margin: '10px 0px',
    borderRadius: 8,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      minHeight: 250,
    },
  },
  image: {
    boxShadow: '0 5px 15px 0 rgb(30 76 165 / 20%)',
    borderRadius: 8,
  },
  close: {
    color: 'white',
  },
  contactContainer: {
    marginTop: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Faq = props => {
  const { products, className, ...rest } = props
  const classes = useStyles()
  const [question, setQuestion] = useState(false)
  const { t } = useTranslation('faq')

  const data = {
    general: {
      title: t('general-questions'),
      subtitle: t('general-questions-subtext'),
      icon: 'fas fa-user',
      items: [
        {
          title: t('general-question-1'),
          answer: t('general-answer-1'),
          screenshot: '/images/faq/home-office.jpg',
        },
        {
          title: t('general-question-2'),
          answer: t('general-answer-2'),
          screenshot: '/images/faq/forgot-password.jpg',
          cta: '/forgot-password',
        },
        {
          title: t('general-question-3'),
          answer: t('general-answer-3'),
          screenshot: '/images/faq/order-tracking.jpg',
          cta: '/account/orders',
        },
        {
          title: t('general-question-4'),
          answer: t('general-answer-4'),
          screenshot: '/images/faq/review.jpg',
          cta: '/account/reviews',
        },
      ],
    },
    checkout: {
      title: t('subscribe-issues'),
      subtitle: t('subscribe-issues-subtext'),
      icon: 'fas fa-dollar-sign',
      items: [
        {
          title: t('subscribe-question-1'),
          answer: t('subscribe-answer-1'),
          screenshot: '/images/faq/subscribe-shipments.jpg',
          // cta: '/account/reviews',
        },
        {
          title: t('subscribe-question-2'),
          answer: t('subscribe-answer-2'),
          screenshot: '/images/faq/subscribe-address.jpg',
          cta: '/account/subscriptions',
        },
        {
          title: t('subscribe-question-3'),
          answer: t('subscribe-answer-3'),
          screenshot: '/images/faq/contact-us.jpg',
          cta: '/contact',
        },
        {
          title: t('subscribe-question-4'),
          answer: t('subscribe-answer-4'),
          screenshot: '/images/faq/subscribe-cancel.jpg',
          cta: '/account/subscriptions',
        },
      ],
    },
    product: {
      title: t('product-questions'),
      subtitle: t('product-questions-subtext'),
      icon: 'fas fa-users',
      items: [
        {
          title: t('product-question-1'),
          answer: t('product-answer-1'),
          screenshot: '/images/faq/order-return.jpg',
          cta: '/account/orders',
        },
        {
          title: t('product-question-2'),
          answer: t('product-answer-2'),
          screenshot: '/images/faq/order-return.jpg',
          cta: '/account/orders',
        },
        {
          title: t('product-question-3'),
          answer: t('product-answer-3'),
          screenshot: '/images/faq/review.jpg',
          cta: '/account/reviews',
        },
        {
          title: t('product-question-4'),
          answer: t('product-answer-4'),
          screenshot: '/images/faq/order-return.jpg',
          cta: '/account/orders',
        },
      ],
    },
    shipping: {
      title: t('shipping-questions'),
      subtitle: t('shipping-questions-subtext'),
      icon: 'fas fa-puzzle-piece',
      items: [
        {
          title: t('shipping-question-1'),
          answer: t('shipping-answer-1'),
          screenshot: '/images/faq/order-tracking.jpg',
          cta: '/account/orders',
        },
        {
          title: t('shipping-question-2'),
          answer: t('shipping-answer-2'),
          screenshot: '/images/faq/logistics.jpg',
        },
        {
          title: t('shipping-question-3'),
          answer: t('shipping-answer-3'),
          screenshot: '/images/faq/logistics.jpg',
        },
        {
          title: t('shipping-question-4'),
          answer: t('shipping-answer-4'),
          screenshot: '/images/faq/order-tracking.jpg',
          cta: '/contact',
        },
      ],
    },
  }
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Dialog
        // fullScreen
        className={classes.dialog}
        open={question ? true : false}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setQuestion(null)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.headerContainer}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setQuestion(null)}
            aria-label="close"
          >
            <CloseIcon className={classes.close} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {question?.title}
          </Typography>
        </div>

        <DialogContent className={classes.answerContainer}>
          <Typography className={classes.answer}>{question?.answer}</Typography>
          <div>
            {question?.cta && (
              <Link href={question?.cta}>
                <a>
                  <Button size="large" variant="contained" color="primary">
                    {t('go')}
                  </Button>
                </a>
              </Link>
            )}
          </div>

          <div className={classes.imageContainer}>
            {question?.screenshot && (
              <Image
                className={classes.image}
                src={question?.screenshot}
                alt="Way Too Good Explore Marketplace"
                loading="lazy"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <SectionHeader
        title={'FAQ'}
        subtitle={t('faq1')}
        subtitleColor="textPrimary"
        align="center"
        titleVariant="h3"
        subtitleVariant="h6"
        data-aos="fade-up"
      />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <DescriptionListIcon
            title={data.checkout.title}
            subtitle={data.checkout.subtitle}
            align="center"
            className={classes.descriptionListIcon}
          />
          <Grid container spacing={2}>
            {data.checkout.items.map((item, index) => (
              <Grid item xs={12} key={index} data-aos="fade-up">
                <CardJobMinimal
                  onClick={() => setQuestion(item)}
                  title={item.title}
                  subtitle={''}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <DescriptionListIcon
            title={data.general.title}
            subtitle={data.general.subtitle}
            align="center"
            className={classes.descriptionListIcon}
          />
          <Grid container spacing={2}>
            {data.general.items.map((item, index) => (
              <Grid item xs={12} key={index} data-aos="fade-up">
                <CardJobMinimal
                  onClick={() => setQuestion(item)}
                  title={item.title}
                  subtitle={''}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.marginTop}>
          <DescriptionListIcon
            title={data.product.title}
            subtitle={data.product.subtitle}
            align="center"
            className={classes.descriptionListIcon}
          />
          <Grid container spacing={2}>
            {data.product.items.map((item, index) => (
              <Grid item xs={12} key={index} data-aos="fade-up">
                <CardJobMinimal
                  onClick={() => setQuestion(item)}
                  title={item.title}
                  subtitle={''}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.marginTop}>
          <DescriptionListIcon
            title={data.shipping.title}
            subtitle={data.shipping.subtitle}
            align="center"
            className={classes.descriptionListIcon}
          />
          <Grid container spacing={2}>
            {data.shipping.items.map((item, index) => (
              <Grid item xs={12} key={index} data-aos="fade-up">
                <CardJobMinimal
                  onClick={() => setQuestion(item)}
                  title={item.title}
                  subtitle={''}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.contactContainer}>
        <Typography variant="h5">{t('contact1')}</Typography>
        <Link href={'/contact'}>
          <a>
            <Button className={classes.input} size="large" variant="contained" color="primary">
              {t('contact2')}
            </Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Faq
