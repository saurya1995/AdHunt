import React from "react";
import { connect } from "react-redux";
import { SettingsLayout } from "../components/SettingsLayout"

function PrivacySettingsView(props) {
  return (
    <SettingsLayout current={"privacy-settings"}>
    <h2 >Privacy and Security</h2>

  </SettingsLayout>

  );
}
export default connect()(PrivacySettingsView);
