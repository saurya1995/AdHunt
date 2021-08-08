import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import OfferService from "../../../services/OfferService";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import "semantic-ui-css/semantic.min.css";
import { Input } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import { Radio } from "semantic-ui-react";
import { Collapse } from "@material-ui/core";

class EditOpenOffer extends Component {
  constructor(props) {
    super(props);
    this.offer = {
      ...props.offer,
    };
    this.HandleClosePopup = props.HandleClosePopup;
    this.loadOffers = props.loadOffers;
    this.index = props.index;
    this.modifyingOffer = props.modifyingOffer;
    this.state = {
      title: "",
      description: "",
      tags: new Array(),
      platform: new Array(),
      newTag: "",
      price: "",
      promoted: false,
      errormessage: "",
      expanded: false,
    };
    this.tagEnabled = {};

    this.platformOptions = [
      {
        key: "Facebook",
        text: "Facebook",
        value: "Facebook",
      },
      {
        key: "TikTok",
        text: "TikTok",
        value: "TikTok",
      },
      {
        key: "YouTube",
        text: "YouTube",
        value: "YouTube",
      },
      {
        key: "Instagram",
        text: "Instagram",
        value: "Instagram",
      },
    ];

    if (this.modifyingOffer) {
      this.state = {
        title: props.offer.title,
        description: props.offer.description,
        tags: props.offer.tags,
        platform: props.offer.platform,
        newTag: "",
        price: props.offer.price,
        promoted: props.offer.promoted,
        errormessage: "",
      };
      this.offer.tags.forEach((x, i) => (this.tagEnabled[x] = "primary"));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.offer.title,
      description: nextProps.offer.description,
      tags: nextProps.offer.tags,
      platform: nextProps.offer.platform,
      newTag: "",
      price: nextProps.offer.price,
      promoted: nextProps.offer.promoted,
      errormessage: "",
    });
  }

  changeButtonState(item) {
    this.setState((state) => {
      const tags = state.tags;
      if (this.tagEnabled[item] === "primary")
        this.tagEnabled[item] = "default";
      else this.tagEnabled[item] = "primary";
      return {
        tags,
      };
    });
  }

  handleAdd = (event) => {
    this.setState((state) => {
      const tags = state.tags.concat(this.state.newTag);
      this.tagEnabled[this.state.newTag] = "primary";
      return {
        tags,
        newTag: "",
      };
    });
  };

  handlePlatformAdd = (event, data) => {
    this.setState((state) => {
      const platform = data.value;
      return {
        platform,
      };
    });
  };

  handleRadioChange = (event) => {
    this.setState((state) => {
      const promoted = !this.state.promoted;
      return {
        promoted,
      };
    });
  };
  mySubmitHandler = (event) => {
    event.preventDefault();

    this.offer.title = this.state.title;
    this.offer.description = this.state.description;
    this.offer.tags = this.state.tags.filter(
      (item) => this.tagEnabled[item] === "primary"
    );
    this.offer.platform = this.state.platform;
    this.offer.price = this.state.price;
    this.offer.promoted = this.state.promoted;

    this.offer.user_id = this.props.user_id;

    if (this.modifyingOffer) {
      let offer = OfferService.updateOffer(this.offer);
    } else {
      let offer = OfferService.addOffer(this.offer);
    }
    this.loadOffers();
    this.HandleClosePopup(this.index);
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = "";

    this.setState({
      [nam]: val,
    });
  };

  render() {
    return (
      <div>
        <Button
          onClick={() => this.HandleClosePopup(this.index)}
          style={{
            float: "right",
          }}
          color="primary"
          endIcon={<CloseIcon />}
        ></Button>
        <form onSubmit={this.mySubmitHandler}>
          <h1> {this.modifyingOffer ? "Edit deal" : "Create a new deal"} </h1>
          <Input
            placeholder="Title"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.myChangeHandler}
            style={{
              width: "80%",
            }}
          />
          <br />
          <br />
          <Input
            placeholder="Description"
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.myChangeHandler}
            style={{
              width: "80%",
            }}
          />
          <br />
          <br />
          <Input
            placeholder="Price"
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.myChangeHandler}
            style={{
              width: "80%",
            }}
          />
          <br />
          <br />
          <Dropdown
            placeholder="Platforms"
            fluid
            multiple
            search
            selection
            options={this.platformOptions}
            onChange={this.handlePlatformAdd}
            defaultValue={this.state.platform}
            style={{
              width: "80%",
            }}
          />
          <br />
          <br />
          <p> Tags: </p>
          {this.state.tags
            ? this.state.tags.map((item, index) => {
              return (
                <Button
                  onClick={() => this.changeButtonState(item)}
                  key={index}
                  variant="contained"
                  color={this.tagEnabled[item]}
                  style={{
                    margin: "5pt",
                    marginBottom: "5pt",
                  }}
                >
                  {item}
                </Button>
              );
            })
            : ""}
          <br />
          <br />
          <Input
            placeholder="New tag"
            type="text"
            name="newTag"
            value={this.state.newTag}
            onChange={this.myChangeHandler}
            style={{
              width: "80%",
            }}
          />
          <Button
            type="button"
            color="primary"
            onClick={this.handleAdd}
            endIcon={<AddIcon />}
          />
          <br />
          <br />

          <Radio
            toggle
            label="Make this offer promoted"
            name="radioGroup"
            checked={this.state.promoted}
            onChange={this.handleRadioChange}
          />
          <Button
            type="button"
            color="primary"
            onClick={()=> this.setState({expanded: !this.state.expanded})}
            endIcon={<HelpOutlineIcon/>}
          />    
          <Collapse in={this.state.expanded}>
          <p>A promoted offer's highlighted design and positioning in the list of offers provides it much more visibility. <br/>
            For each contract signed pay an extra fee of 0.02% of the offer's price to promote your offer.</p>
          </Collapse>
          <br />
          <br />
          <Button
            type="submit"
            value={this.modifyingOffer ? "Edit" : "Add"}
            style={{
              float: "right",
            }}
            color="primary"
          >
            Submit{" "}
          </Button>
          {this.state.errormessage}{" "}
        </form>{" "}
      </div>
    );
  }
}

export default EditOpenOffer;
