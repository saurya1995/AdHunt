import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import Modal from "react-modal";
import EditAnalytics from "./edit/EditAnalytics";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { Popup } from 'semantic-ui-react'
import "semantic-ui-css/semantic.min.css";
import "./Analytics.css";

const useStyles = makeStyles({
  text: {
    "vertical-align": "middle",
    margin: "20px 20px 20px 20px",
  },
  image: {
    "vertical-align": "middle",
    margin: "20px 20px 20px 20px",
    width: 500,
    height: 300,
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

function Analytics(props) {
  const classes = useStyles();
  const [popup, setPopup] = useState(0);
  const userAuthenticated = props.userAuthenticated;

  if (!props.analytics[0]) {
    return (
      <div class="analytics">
        {userAuthenticated && (

          <Popup content='Edit analytics' trigger={<Button
            onClick={() => setPopup(true)}
            className={classes.edit_button}
            color="primary"
            endIcon={<EditIcon />}
          />} />
        )}
        <h1 style={{ marginLeft: "38%" }}>Analytics</h1>
        {userAuthenticated && (

          <Modal isOpen={popup == 1} size="sm" style={modalStyle}>
            <EditAnalytics
              analytics={{ metricName: "", description: "", metric_image: "" }}
              loadAnalytics={props.loadAnalytics}
              setPopup={setPopup}
              newAnalytics={true}
              user_id={props.user_id}
            ></EditAnalytics>
          </Modal>)}
      </div>
    );
  }

  const { metricName, description, metric_image } = props.analytics[0];

  return (
    <div class="ind_analytic">
      {userAuthenticated && (

        <Popup content='Edit analytics' trigger={<Button
          onClick={() => setPopup(true)}
          className={classes.edit_button}
          color="primary"
          endIcon={<EditIcon />}
        ></Button>
        } />)}


      <h1 style={{ marginLeft: "20%" }}>Analytics</h1>
      <h3 className={classes.text}>{metricName}</h3>
      <h5 className={classes.text}>{description}</h5>
      <img className={classes.image} src={metric_image} />
      {userAuthenticated && (

        <Modal isOpen={popup == 1} size="sm" style={modalStyle}>
          <EditAnalytics
            analytics={props.analytics[0]}
            loadAnalytics={props.loadAnalytics}
            setPopup={setPopup}
            newAnalytics={false}
            user_id={props.user_id}
          ></EditAnalytics>
        </Modal>)}
    </div>
  );
}

export default Analytics;
