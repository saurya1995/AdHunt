import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import OfferService from "../../../services/OfferService";
import Button from "@material-ui/core/Button";
import "semantic-ui-css/semantic.min.css";

const useStyles = makeStyles({
  text: {
    "vertical-align": "middle",
    margin: "20px 0 0 0 ",
    float: "bottom",
  },
});

/**
 * header cells for sortable table columns
 * @param {props} props
 */

function RemoveOpenOffer(props) {
  const classes = useStyles();




  const mySubmitHandler = () => {
    let profile = OfferService.removeOffer(props.offer_id);
    props.loadOffers();
    props.HandleCloseRemovePopup(props.index);
};

  return (
    <div className={classes.text}>
      <h2>Do you want to delete this offer?</h2>
      <h4>{props.offer_title}</h4>
     
      <Button onClick={() => props.HandleCloseRemovePopup(props.index)}  color="secondary">No</Button>

      <Button onClick={() => mySubmitHandler()}  color="primary">Yes</Button>

    </div>
  );
}

export default RemoveOpenOffer;
