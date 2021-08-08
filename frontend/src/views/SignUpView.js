import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import SignUpComponent from "../components/SignUpComponent";
import adhunt_logo from "../image/ADhunt1.png";

import { register } from "../redux/actions/userActions";

/**
 * For register new users
 * @param {props} props
 */
function SignUpView(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            props.history.push("/");
        }
    }, [user, props.history]);

    const onRegister = (username, password, email, kind) => {
        props.dispatch(register(username, password, email, kind));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <div class="loginParent" style={{
            backgroundColor: "#7dc2af",
            height: "400px",
            width: "100%",
        }}>
            <Link to="/">
                    <img
                        alt="AdHunt"
                        src={adhunt_logo}
                        style={{
                            position: "absolute",
                            transform: "translate(-50%, 0%)",
                            top: "5%",
                            left: "50%",
                        }}
                    />
            </Link>
            <div class="registeration" style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
            }}>
                <SignUpComponent
                    user={user}
                    onRegister={onRegister}
                    onCancel={onCancel}
                />
            </div>
        </div>
    );
}

export default connect()(withRouter(SignUpView));