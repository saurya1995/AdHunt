import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { SettingsLayout } from "../components/SettingsLayout";
import { setupStripeAccount } from "../redux/actions/paymentActions";
import "./PaymentSettingsStyle.css";
function PaymentSettingsView(props) {
  // const account, accountNonExistant = useSelector(
  //   (state) =>
  //     state.getStripeAccountReducer

  // );
  const account = useSelector((state) => state.setupStripeAccountReducer.account);
  const redirect = useSelector((state) => state.setupStripeAccountReducer.redirect);
  const stripeRedirectUrl = useSelector((state) => state.setupStripeAccountReducer.stripeRedirectUrl);
  useEffect(() => {
    console.log(stripeRedirectUrl);
    console.log(redirect);
    if (stripeRedirectUrl && redirect) {
      window.location.href = stripeRedirectUrl;
    }
}, [stripeRedirectUrl, redirect]);
  const dispatch = useDispatch();
  const onClickConnect = function () {
    dispatch(setupStripeAccount());
  };
  return (
    <SettingsLayout current={"payment-settings"}>
      <h2>Payment Account</h2>
      <Container className="container-content">
        <Row>
          <div>
            Our payment system is hosted by{" "}
            <a href="https://stripe.com/en-de">stripe</a>. To be able to give as
            well as receive payment, a Stripe account is needed. We can assist
            you step by step in creating an account or logging into one.
          </div>
        </Row>
        <Row>
          <a onClick={onClickConnect} class="stripe-connect white">
            <span>Connect with</span>
          </a>
        </Row>
      </Container>
    </SettingsLayout>
  );
}
export default connect()(PaymentSettingsView);
