import React from 'react';
import { Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { connect, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

function DropdownComp(props) {
    const user = useSelector((state) => state.user);
    const onClickProfile = () => {
        let token = window.localStorage["jwtToken"];
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace("-", "+").replace("_", "/");
        let userJson = JSON.parse(window.atob(base64));
        let a = {
            user: {
                _id: userJson._id,
                username: userJson.username,
                kind: userJson.kind,
            },
        };
        let url = "/users/" + userJson.username;
        props.history.push(url);
    };
    let myDealsUrl = "/mydeals";
    let settingUrl = "/payment-settings";
    const onClickLogout = () => {
        // trigger redux logout action

        props.dispatch(logout());
        props.history.push("/login");
    };

    return (
        <Dropdown
            icon={null}
            pointing="top right"
            trigger={
                user.user.image ? (
                    <Avatar src={user.user.image} />
                ) : (
                    <Icon
                        style={{ fontSize: "3em" }}
                        size="big"
                        disabled
                        name="user circle"
                    />
                )
            }
        >
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={onClickProfile}
                    item="profile"
                >
                    <Icon name="user" size="large" />
                    Profile
                </Dropdown.Item>
                <Dropdown.Item
                    as={Link}
                    to={{ pathname: myDealsUrl }}
                    item="mydeals"
                >
                    <Icon name="arrow down cart" size="large" />
                    My Deals
                </Dropdown.Item>
                <Dropdown.Item
                    as={Link}
                    to={{ pathname: settingUrl }}
                    item="settings"
                >
                    <Icon name="setting" size="large" />
                    Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={onClickLogout} item="logout">
                    <Icon name="sign-out alternate" size="large" />
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
export default connect()(withRouter(DropdownComp));
