import PaymentService from "../../services/PaymentService";

export const payout = (amount, receiver, applicationId) => {
  function onRequest() {
    return { type: "PAYOUT_REQUEST" };
  }
  function onSuccess(paymentStatus) {
    return { type: "PAYOUT_SUCCESS", paymentStatus: paymentStatus };
  }
  function onFailure(error) {
    console.log("post payment failed", error);
    return { type: "PAYOUT_FAILURE" };

  }

  return async (dispatch, getState) => {
    dispatch(onRequest());
    try {
      let paymentStatus = await PaymentService.payout(amount, receiver, applicationId);
      dispatch(onSuccess(paymentStatus));
    } catch (e) {
      dispatch(onFailure());
    }
  };
};

export const getStripeAccount = () => {
  function onSuccess(account) {
    return { type: "GETSTRIPEACCOUNT_SUCCESS", account: account };
  }
  function onFailure(error) {
    console.log(error);
    return { type: "GETSTRIPEACCOUNT_FAIL" };
  }

  return async (dispatch, getState) => {
    try {
      let account = await PaymentService.setupStripeAccount();
      dispatch(onSuccess(account));
    } catch (e) {
      onFailure(e);
    }
  };
};

export const setupStripeAccount = () => {
  function onSuccess(data) {
    return {
      type: "SETUPSTRIPEACCOUNT_SUCCESS",
      account: data.account,
      redirect: data.redirect,
      stripeRedirectUrl: data.stripeRedirectUrl,
    };
  }
  function onFailure(error) {
    console.log(error);
    return { type: "SETUPSTRIPEACCOUNT_FAIL" };
  }
  return async (dispatch, getState) => {
    try {
      let data = await PaymentService.setupStripeAccount();
      dispatch(onSuccess(data));
    } catch (e) {
      onFailure(e);
    }
  };
};

export const checkout = (amount, applicationId, offerPromoted) => {
  function onRequest() {
    return { type: "CHECKOUT_REQUEST" };
  }
  function onSuccess(checkoutUrl, paymentStatus) {
    return { type: "CHECKOUT_SUCCESS", checkoutUrl: checkoutUrl };
  }
  function onFailure(error) {
    console.log("post payment failed", error);
    return { type: "CHECKOUT_FAILURE" };

  }

  return async (dispatch, getState) => {
    dispatch(onRequest());
    try {
      let resp = await PaymentService.checkout(amount, applicationId, offerPromoted);
      dispatch(onSuccess(resp.checkoutUrl, resp.paymentStatus));
    } catch (e) {
      onFailure(e);
    }
  };
};
