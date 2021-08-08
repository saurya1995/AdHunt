import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import LoginComponent from "../components/UserLoginComponent";
import { login } from "../redux/actions/userActions";
import adhunt_logo from "../image/ADhunt1.png";

/**
 * For user login
 * @param {props} props
 */
function UserLoginView(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            props.history.push("/");
        }
    }, [user, props.history]);

    const onLogin = (username, password) => {
        props.dispatch(login(username, password));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    const onSignUp = () => {
        props.history.push("/register");
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
                            top: "20%",
                            left: "50%",
                        }}
                    />
            </Link>
            <div class="login" style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
            }}>
                <LoginComponent
                    user={user}
                    onCancel={onCancel}
                    onLogin={onLogin}
                    onSignUp={onSignUp}
                />
            </div >
        </div>
    );
}

export default connect()(withRouter(UserLoginView));