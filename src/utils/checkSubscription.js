export const checkSubscription = (subscriptions, prices) => {
  var isMember = false
  subscriptions.forEach(subscription => {
    if (subscription?.plan?.active) {
      prices.forEach(price => {
        if (subscription?.plan?.id == price.id) isMember = true
      })
    }
  })
  return isMember
}
