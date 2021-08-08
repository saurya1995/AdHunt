export default function pay(state = {}, action) {
  switch (action.type) {
    case "POSTPAYMENT_SUCCESS":
      return { analytics: action.payment };
    default:
      return state;
  }
}

export function checkoutSessionReducer(state = { isLoading: false, checkoutUrl: "" }, action) {
  switch (action.type) {
    case "CHECKOUT_REQUEST":
      return { isLoading: true, checkoutUrl: "" };
    case "CHECKOUT_SUCCESS":
      return { isLoading: true, checkoutUrl: action.checkoutUrl, paymentStatus: action.paymentStatus };
    case "CHECKOUT_FAILURE":
      return { isLoading: false, checkoutUrl: "" };
    default:
      return state;
  }
}

export function getStripeAccountReducer(
  state = { account: null, accountNonExistant: false },
  action
) {
  switch (action.type) {
    case "GETSTRIPEACCOUNT_SUCCESS":
      return {
        account: action.account,
        accountNonExistant: false,
      };
    case "GETSTRIPEACCOUNT_FAIL":
      return {
        account: null,
        accountNonExistant: true,
      };
    default:
      return state;
  }
}

export function setupStripeAccountReducer(state = {}, action) {
  switch (action.type) {
    case "SETUPSTRIPEACCOUNT_SUCCESS":
      return {
        account: action.account,
        redirect: action.redirect,
        stripeRedirectUrl: action.stripeRedirectUrl,
      };
      case "SETUPSTRIPEACCOUNT_FAIL":
      return {
        account: null,
        redirect: false,
        stripeRedirectUrl: "",
      };
    default:
      return state;
  }
}
