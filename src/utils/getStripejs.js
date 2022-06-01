/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { loadStripe } from '@stripe/stripe-js'

// let stripePromise: Promise<Stripe | null>
let stripePromise = null
const getStripe = () => {
  if (!stripePromise) stripePromise = loadStripe(process.env.STRIPE_KEY)
  return stripePromise
}

export default getStripe
