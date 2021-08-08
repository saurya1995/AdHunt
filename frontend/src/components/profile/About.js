import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import Modal from "react-modal";
import EditAbout from "./edit/EditAbout";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { Popup } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const useStyles = makeStyles({
  text: {
    "vertical-align": "middle",
    margin: "20px 0 0 0 ",
    float: "bottom",
  },
  edit_button: {
    float: "right",
  },
});
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

/**
 * header cells for sortable table columns
 * @param {props} props
 */

function About(props) {
  const { description } = props.profile[0];
  const classes = useStyles();
  const [popup, setPopup] = useState(0);
  const userAuthenticated = props.userAuthenticated;

  return (
    <div className={classes.text}>
      {userAuthenticated && (
        <Popup
          content="Edit about me"
          trigger={
            <Button
              onClick={() => setPopup(true)}
              className={classes.edit_button}
              color="primary"
              endIcon={<EditIcon />}
            ></Button>
          }
        />
      )}
      <h1 style={{ marginLeft: "40%" }}>About Me</h1>

      <h4>{description}</h4>
      {userAuthenticated && (
        <Modal isOpen={popup == 1} size="sm" style={modalStyle}>
          <EditAbout
            profile={props.profile[0]}
            loadProfile={props.loadProfile}
            setPopup={setPopup}
          ></EditAbout>
        </Modal>
      )}
    </div>
  );
}

export default About;
