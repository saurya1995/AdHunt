import React, { Component } from "react";
import ProfileService from "../../../services/ProfileService";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { Form, TextArea } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class EditAbout extends Component {
  constructor(props) {
    super(props);
    this.profile = { ...props.profile };
    this.setPopup = props.setPopup;
    this.loadProfile = props.loadProfile;
    
    if(! ("description" in this.profile)){
    this.profile["description"] = "";}

    this.state = {
      description: this.profile.description,
      numCharactersLeft: 500 - this.profile.description.length,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      description: nextProps.profile.description,
      numCharactersLeft: "",
    });
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    this.profile.description = this.state.description;
    let profile = ProfileService.updateCreatorProfile(this.profile);
    this.loadProfile();
    this.setPopup(false);
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let numCharactersLeft = 500 - this.state.description.length;

    this.setState({ numCharactersLeft: numCharactersLeft.toString() });
    this.setState({ [nam]: val });
  };

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setPopup(false)}
          style={{ float: "right" }}
          color="primary"
          endIcon={<CloseIcon />}
        ></Button>
        <br />
        <Form onSubmit={this.mySubmitHandler}>
          <h1>Edit about me</h1>

          <br />
          <TextArea
            type="text"
            name="description"
            row="10"
            cols="50"
            maxlength="501"
            value={this.state.description}
            onChange={this.myChangeHandler}
          />
          <h5 style={{ float: "right" }}>
            {this.state.numCharactersLeft} characters left
          </h5>
          <br />
          <br />
          <Button
            onClick={() => {
              this.mySubmitHandler;
            }}
            style={{ float: "left" }}
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          {this.state.errormessage}
        </Form>
      </div>
    );
  }
}

export default EditAbout;
