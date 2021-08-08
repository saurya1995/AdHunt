import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Container, Form, FormGroup, Label } from "reactstrap";
import Select from "react-select";
import RadioGroup from "@material-ui/core/RadioGroup";

import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  usersignUpRoot: {
    margin: "auto",
  },
  signUpPaper: {
    width: "500px",
    padding: theme.spacing(2),
  },
  signUpRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "&:last-child": {
      paddingBottom: theme.spacing(0),
    },
    "&:first-child": {
      paddingTop: theme.spacing(0),
    },
  },
  signUpButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  signUpButton: {
    marginLeft: theme.spacing(1),
  },
}));

/**
 * For register new users
 * @param {props} props
 */
function SignUpComponent(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [kind, setKind] = useState("Business");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [invalidEmailError, setInvalidEmailError] = useState("");

  useEffect(() => {
    if (props.user.error) {
      setRegisterError(props.user.error);
    } else {
      setRegisterError("");
    }
  }, [props.user]);

  const onRegister = (e) => {
    e.preventDefault();
    props.onRegister(username, password, email, kind);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setRegisterError("");
  };

  const onChangeEmail = (e) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmail(e.target.value);
    if (re.test(e.target.value)) {
        setInvalidEmailError("");
    } else {
        setInvalidEmailError("Invalid email");
    }
  };
  const onKindChange = (e) => {
    setKind(e.target.value);
    setRegisterError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setRegisterError("");
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
    setRegisterError("");
  };

  const onBlurPassword = (e) => {
    if (password !== "" && password2 !== "") {
      if (password !== password2) {
        setRegisterError("Passwords do not match.");
      } else {
        setRegisterError("");
      }
    }
  };
  const options_kind = [
    { value: "ContenctCreator", label: "Content Creator" },
    { value: "Business", label: "Business" },
  ];
  return (
    <div className={classes.usersignUpRoot}>
      <Paper className={classes.signUpPaper} component="form">
        <div className={classes.signUpRow}>
          <Typography variant="h4" align="center">
            Ad-Hunt Registration
          </Typography>
        </div>

        <div className={classes.signUpRow}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            error={invalidEmailError !== ""}
            onChange={onChangeEmail}
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Password"
            fullWidth
            value={password}
            onChange={onChangePassword}
            error={registerError !== ""}
            onBlur={onBlurPassword}
            type="password"
          />
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Repeat Password"
            fullWidth
            value={password2}
            onChange={onChangePassword2}
            error={registerError !== ""}
            onBlur={onBlurPassword}
            type="password"
          />
        </div>
        <div className={classes.signUpRow}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              style={{ marginRight: "15%", width: "130%" }}
              aria-label="usertype"
              name="usertype"
              onChange={onKindChange}
            >
              <FormControlLabel
                value="ContentCreator"
                color="primary"
                control={<BlueRadio />}
                label="Content Creator"
                checked={kind === "ContentCreator"}
              />
              <FormControlLabel
                value="Business"
                color="primary"
                control={<BlueRadio />}
                label="Business"
                checked={kind === "Business"}
              />
            </RadioGroup>
          </FormControl>
        </div>
        {registerError !== "" || invalidEmailError !== "" ? (
          <div className={classes.signUpRow}>
            <Typography color="error">{registerError}</Typography>
            <Typography color="error">{invalidEmailError}</Typography>
          </div>
        ) : null}
        <div className={classes.signUpRow + " " + classes.signUpButtons}>
          <Button
            className={classes.signUpButton}
            variant="contained"
            color="primary"
            onClick={onRegister}
            disabled={
              username === "" ||
              password === "" ||
              password2 === "" ||
              registerError !== "" ||
              invalidEmailError !== "" ||
              password !== password2
            }
            type="submit"
          >
            Register
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default SignUpComponent;
