import React, { Component, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Rating } from "@material-ui/lab";
import EditGeneralInformation from "./edit/EditGeneralInformation";
import Modal from "react-modal";
import { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { Popup, List } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import AvgStars from "../review/AvgStars";

const useStyles = makeStyles({
  avatar: {
    "vertical-align": "middle",
    width: "100px",
    height: "100px",
    "border-radius": "10%",
    margin: "20px 20px 20px 20px",
    float: "left",
  },
  info: {
    "vertical-align": "center",
    width: "100px",
    height: "100px",
    margin: "20px 20px 20px 20px",
    float: "left",
    paddingTop: "20px",
  },
  links: {
    display: "inline",
    "font-family": "Arial",
    margin: "20px 20px 20px 20px",
    float: "right",
  },

  edit_button: {
    float: "right",
  },
});

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "60%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

/**
 * header cells for sortable table columns
 * @param {props} props
 */

function GeneralInformation(props) {
  const { username, name, image, communicationDetails, platformLinks } =
    props.profile[0];
  const classes = useStyles();
  const [popup, setPopup] = useState(0);
  const userAuthenticated = props.userAuthenticated;

  useEffect(() => {
    if (!props.profile) {
      props.loadProfile();
    }
  }, [props.profile]);

  return (
    <div>
      <img
        src={image}
        className={classes.avatar}
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />
      <h3 className={classes.info}>
        {name} <br /> @{username} <br />
        <AvgStars partnerName={props.profile[0].username}></AvgStars>
      </h3>
      {userAuthenticated && (
        <Popup
          content="Edit profile information"
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

      <a className={classes.links} href={communicationDetails}>
        {communicationDetails}
      </a>
      <List>
        {platformLinks.map((item, index) => {
          return (
            <List.Item key={index} className={classes.links} href={item}>
              {item}
            </List.Item>
          );
        })}
      </List>

      {userAuthenticated && (
        <Modal isOpen={popup == 1} size="sm" style={modalStyle}>
          <EditGeneralInformation
            profile={props.profile[0]}
            loadProfile={props.loadProfile}
            setPopup={setPopup}
          ></EditGeneralInformation>
        </Modal>
      )}
    </div>
  );
}

export default GeneralInformation;
