import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    userLoginRoot: {
        margin: "auto",
    },
    loginPaper: {
        width: "500px",
        padding: theme.spacing(2),
    },
    loginRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(0),
        },
        "&:first-child": {
            paddingTop: theme.spacing(0),
        },
    },
    loginButtons: {
        display: "flex",
        justifyContent: "space-between",
    },
    loginButton: {
        marginLeft: theme.spacing(1),
    },
}));

/**
 * For user login
 * @param {props} props
 */
function LoginComponent(props) {
    const classes = useStyles();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [loginError, setLoginError] = React.useState("");

    useEffect(() => {
        if (props.user.error) {
            setLoginError(props.user.error);
        } else {
            setLoginError("");
        }
    }, [props.user]);

    const onLogin = (e) => {
        e.preventDefault();
        props.onLogin(email, password);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setLoginError("");
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setLoginError("");
    };

    return (
        <div className={classes.userLoginRoot}>
            <Paper className={classes.loginPaper} component="form">
                <h2 style={{
                    textAlign: "center"
                }}>Ad-Hunt Login</h2>
                <div className={classes.loginRow}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={onChangeEmail}
                        error={loginError !== ""}
                    />
                </div>
                <div className={classes.loginRow}>
                    <TextField
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                        error={loginError !== ""}
                        type="password"
                    />
                </div>
                {loginError !== "" ? (
                    <div className={classes.loginRow}>
                        <Typography color="error">{loginError}</Typography>
                    </div>
                ) : null}
                <div className={classes.loginRow + " " + classes.loginButtons}>
                    <Button onClick={props.onSignUp}>
                        Not Registered yet?
                    </Button>
                    <div>

                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            color="primary"
                            onClick={onLogin}
                            disabled={email === "" || password === ""}
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default LoginComponent;