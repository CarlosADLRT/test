import env from '../environment';

let StripeService;
if (window.Stripe) {
  StripeService = window.Stripe(env.stripe_key);
} else {
  document.querySelector('#stripe-js').addEventListener('load', () => {
    // Create Stripe instance once Stripe.js loads
    StripeService = window.Stripe(env.stripe_key);
  });
}

export default StripeService;
