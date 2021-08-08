import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import EditOpenOffer from "./edit/EditOpenOffer";
import RemoveOpenOffer from "./edit/RemoveOpenOffer";
import Modal from "react-modal";
import { useState } from "react";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Accordion, Icon, Label, Popup } from "semantic-ui-react";
import "./OpenOffers.css";

const useStyles = makeStyles({
  tags: {
    float: "left",
    marginBottom: "2px",
  },
  edit_button: {
    float: "right",
  },
  offers_border: {
    "border-bottom": "1px dotted black",
    padding: "10pt",
    marginTop: "40pt",
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

function OpenOffers(props) {
  const offers = props.offers;

  const [popups, setPopups] = useState(new Array(offers.length + 1).fill(0));

  const [popups_remove, setPopups_remove] = useState(
    new Array(offers.length).fill(0)
  );

  //for accordion
  const [activeIndex, setActiveIndex] = useState(-1);

  const userAuthenticated = props.userAuthenticated;

  const handleClick = (e, titleProps) => {
    if (titleProps.index === activeIndex) setActiveIndex(-1);
    else setActiveIndex(titleProps.index);
  };

  const HandleOpenPopup = (index) => {
    setPopups((prevState) =>
      prevState.map((item, idx) => (idx === index ? true : item))
    );
  };

  const HandleClosePopup = (index) => {
    setPopups((prevState) =>
      prevState.map((item, idx) => (idx === index ? false : item))
    );
  };

  const HandleOpenRemovePopup = (index) => {
    setPopups_remove((prevState) =>
      prevState.map((item, idx) => (idx === index ? true : item))
    );
  };

  const HandleCloseRemovePopup = (index) => {
    setPopups_remove((prevState) =>
      prevState.map((item, idx) => (idx === index ? false : item))
    );
  };

  const classes = useStyles();

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
      {userAuthenticated && (
        <Popup
          content="Create a deal"
          trigger={
            <Button
              onClick={() => HandleOpenPopup(0)}
              className={classes.edit_button}
              color="primary"
              endIcon={<AddIcon />}
            />
          }
        />
      )}
      <div class="opendeals">
        <h1 style={{ marginLeft: "38%" }}>Open Deals</h1>
        {userAuthenticated && (
          <Modal isOpen={popups[0] == 1} size="sm" style={modalStyle}>
            <EditOpenOffer
              offer={new Object()}
              loadOffers={props.loadOffers}
              index={0}
              modifyingOffer={false}
              user_id={props.user_id}
              HandleClosePopup={HandleClosePopup}
            ></EditOpenOffer>
          </Modal>
        )}
      </div>
      <br />
      <br />
      <Accordion styled fluid>
        {offers.map((item, index) => {
          return (
            <div class="individualoffer">
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={handleClick}
              >
                {userAuthenticated && (
                  <Button
                    onClick={() => HandleOpenRemovePopup(index)}
                    className={classes.edit_button}
                    color="primary"
                    endIcon={<DeleteIcon></DeleteIcon>}
                  ></Button>
                )}
                {userAuthenticated && (
                  <Button
                    onClick={() => HandleOpenPopup(index + 1)}
                    className={classes.edit_button}
                    color="primary"
                    endIcon={<EditIcon />}
                  ></Button>
                )}
                <Icon name="dropdown" />
                {item.title}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <h6>{item.description}</h6>
                <h6>
                  Price of the promotion: <b>{item.price}€</b>
                </h6>
                <br />
                {item.tags.map((item, index) => {
                  return (
                    <div>
                      <Label
                        as="a"
                        color="teal"
                        tag
                        key={index}
                        className={classes.tags}
                        style={{ margin: "10pt" }}
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
                <br /> <br />
                <br />
                <br />
                {item.platform.map((item, index) => {
                  return (
                    <div>
                      <Label
                        as="a"
                        color="blue"
                        key={index}
                        className={classes.tags}
                        style={{ marginRight: "10pt" }}
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
                <br />
                <br />
                <br />
                <h6 style={{ float: "right" }}>
                  Posted {moment(item.createdAt).fromNow()}
                </h6>
                <br />
                {userAuthenticated && (
                  <Modal
                    isOpen={popups[index + 1] == 1}
                    size="sm"
                    style={modalStyle}
                  >
                    <EditOpenOffer
                      offer={item}
                      loadOffers={props.loadOffers}
                      index={index + 1}
                      modifyingOffer={true}
                      user_id={props.user_id}
                      HandleClosePopup={HandleClosePopup}
                    ></EditOpenOffer>
                  </Modal>
                )}
                {userAuthenticated && (
                  <Modal
                    isOpen={popups_remove[index] == 1}
                    size="sm"
                    style={modalStyle}
                  >
                    <RemoveOpenOffer
                      loadOffers={props.loadOffers}
                      offer_id={item._id}
                      index={index}
                      offer_title={item.title}
                      HandleCloseRemovePopup={HandleCloseRemovePopup}
                    ></RemoveOpenOffer>
                  </Modal>
                )}
              </Accordion.Content>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
}

export default OpenOffers;
