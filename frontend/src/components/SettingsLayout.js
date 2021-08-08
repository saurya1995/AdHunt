import React, { useState } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import NavigationBar from "./search/NavigationBar";
import Footer from "./search/Footer";

export const SettingsLayout = ({ children, current }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div>
      <NavigationBar />
      <React.Fragment>
        <SideNav
          expanded={false}
          onSelect={(selected) => {
            const to = "/" + selected;
            if (location.pathname !== to) {
              history.push(to);
            }
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected={current}>
            <NavItem eventKey="payment-settings">
              <NavIcon>
                <RiBankFill />
              </NavIcon>
              <NavText>Payment</NavText>
            </NavItem>
            <NavItem eventKey="privacy-settings">
              <NavIcon>
                <MdSecurity />
              </NavIcon>
              <NavText>Security and privacy</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        <main
          style={{
            marginLeft: "60px",
            padding: "15px 20px 0px",
          }}
        >
          {children}
        </main>
      </React.Fragment>
      <Footer />
    </div>
  );
};
