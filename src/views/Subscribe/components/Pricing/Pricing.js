import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { Section } from 'components/organisms'
import { SectionHeader } from 'components/molecules'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import { getPrices } from '../../../../../redux/orders/action'
import { connect } from 'react-redux'
import clsx from 'clsx'
import DoneIcon from '@material-ui/icons/Done'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 0,
  },
  pricesContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 25,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row-reverse',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: '10px 0px',
  },
  planSelected: {
    background: '#fdadae',
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 20,
  },
  priceBtn: {
    margin: '0px 10px',
    background: '#fff',
    textTransform: 'none',
    width: 350,
    height: 300,
    '&:hover': {
      background: theme.palette.grey.main,
    },
  },
  priceBtnSelected: {
    border: '10px solid #fdadae',
  },
  price: {
    fontSize: 42,
    marginRight: 5,
  },
  featuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 10,
  },
  featureContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      marginRight: 5,
    },
  },
  subscriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

const Pricing = props => {
  const { price, setPrice, prices, getPrices } = props
  const classes = useStyles()
  // const { t } = useTranslation('common')
  const { t } = useTranslation('subscribe')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getPrices().then(res => {
      var foundMonthlyPrice = res?.data?.find(
        price =>
          price.id == 'price_1K2J1kLQ3xHrCGemJF7o8hao' ||
          price.id == 'price_1K2Iv3LQ3xHrCGemHrPl1f8B'
      )

      // AUTO SELECT MONTHLY PRICE
      if (foundMonthlyPrice) setPrice(foundMonthlyPrice.id)
      // OTHERWISE SELECT FIRST PLAN IN LIST
      else if (res?.data) res?.data[0] && setPrice(res?.data[0].id)

      setLoading(false)
    })
  }, [])

  return <div></div>

  return (
    <div className={classes.root}>
      <SectionHeader
        title={<Typography variant="h3">{t('choose-plan')}</Typography>}
        subtitle={<Typography variant="h6">{t('choose-plan-subtext')}</Typography>}
        titleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        fadeUp
      />

      {loading && <CircularProgress />}

      {prices?.length > 0 && (
        <div className={classes.pricesContainer}>
          {prices.map(_price => {
            return (
              <div className={classes.priceContainer}>
                {_price.id == price && prices?.length > 1 && (
                  <span className={classes.planSelected}>{t('plan-selected')}</span>
                )}
                <Button
                  key={_price.id}
                  className={clsx(classes.priceBtn, _price.id == price && classes.priceBtnSelected)}
                  onClick={() => setPrice(_price.id)}
                  variant="contained"
                  size="large"
                >
                  <div className={classes.subscriptionContainer}>
                    <div>
                      <span className={classes.price}>
                        {(_price.unit_amount / 100).toFixed(2)}$
                      </span>
                      <span>CAD</span>
                    </div>
                    <span>39.99$ {t('billed-every')}</span>
                    <hr />
                    <br />
                    <div className={classes.featuresContainer}>
                      <div className={classes.featureContainer}>
                        <DoneIcon className={classes.checkMark} color="primary" />
                        {t('bullet-1')}
                      </div>
                      <div className={classes.featureContainer}>
                        <DoneIcon className={classes.checkMark} color="primary" />
                        {t('bullet-2')}
                      </div>
                      <div className={classes.featureContainer}>
                        <DoneIcon className={classes.checkMark} color="primary" />
                        {t('bullet-3')}
                      </div>
                      <div className={classes.featureContainer}>
                        <DoneIcon className={classes.checkMark} color="primary" />
                        {t('bullet-4')}
                      </div>
                    </div>
                  </div>
                </Button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  prices: state.orders.prices,
})

const mapDispatchToProps = dispatch => ({
  getPrices: () => {
    return dispatch(getPrices())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Pricing)
