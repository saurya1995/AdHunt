import React, { Component } from "react";
import ProfileService from "../../../services/ProfileService";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import "semantic-ui-css/semantic.min.css";
import { Input } from "semantic-ui-react";
import { Image } from "semantic-ui-react";
import { List } from 'semantic-ui-react'


class EditGeneralInformation extends Component {
  constructor(props) {
    super(props);
    this.profile = { ...props.profile };
    this.setPopup = props.setPopup;
    this.loadProfile = props.loadProfile;
    //antipatern
    this.state = {
      name: props.profile.name,
      image: props.profile.image,
      description: props.profile.description,
      communicationDetails: props.profile.communicationDetails,
      platformLinks: props.profile.platformLinks,
      newPlatformLink: "",
      errormessage: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.profile.name,
      image: nextProps.profile.image,
      description: nextProps.profile.description,
      communicationDetails: nextProps.profile.communicationDetails,
      platformLinks: nextProps.profile.platformLinks,
      newPlatformLink: nextProps.profile.newPlatformLink,

      errormessage: "",
    });
  }

  handleAdd = (event) => {
    this.setState((state) => {
      const platformLinks = state.platformLinks.concat(
        this.state.newPlatformLink
      );

      return {
        platformLinks,
        newPlatformLink: "",
      };
    });
  };

  handleRemove(id) {
    // remove item
    this.setState((state) => {
      const platformLinks = state.platformLinks;
      platformLinks.splice(id, 1);

      return {
        platformLinks,
      };
    });

  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    
    if (this.state.errormessage == "") {
      this.profile.name = this.state.name;
      this.profile.image = this.state.image;
      this.profile.description = this.state.description;
      this.profile.communicationDetails = this.state.communicationDetails;
      this.profile.platformLinks = this.state.platformLinks;

      let profile = ProfileService.updateCreatorProfile(this.profile);
      this.loadProfile();
      this.setPopup(false);
    }
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    if (nam == "communicationDetails") {
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(val)) {
        this.setState({ errormessage: "" });
      } else {
        this.setState({ errormessage: "invalid email" });
      }
    }
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

        <form onSubmit={this.mySubmitHandler}>
          <h1>Edit profile</h1>
          <br />


          <Image src={this.state.image} size="small" centered circular />

          <br />
          <br />
          <br />
          <br />
       
          <Input
            placeholder="Image link"
            name="image"
            value={this.state.image}
            onChange={this.myChangeHandler}
            style={{width: "80%"}}
          />
          <br />
          <br />


          <Input
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.myChangeHandler}
            style={{width: "80%"}}

          />
          <br />
          <br />
         

          <Input
            placeholder="Email"
            error={this.state.errormessage != ""}
            name="communicationDetails"
            value={this.state.communicationDetails}
            onChange={this.myChangeHandler}
            style={{width: "80%"}}
          />
        <br/><br/>
          <p>Links</p>

          <List divided relaxed>
            {this.state.platformLinks.map((item, index) => (

              <List.Item>
                <List.Header as='a'>
                  {item}
                  <Button
                  onClick={() => {
                    this.handleRemove(index);
                  }}
                  style={{ float: "right" }}
                  color="primary"
                  endIcon={<RemoveIcon />}
                ></Button>
                </List.Header>


              </List.Item>
            ))}
          </List>
        

          <Input
            placeholder="New link"
            name="newPlatformLink"
            value={this.state.newPlatformLink}
            onChange={this.myChangeHandler}
            style={{width: "80%"}}
          />
          <Button
            onClick={this.handleAdd}
            style={{ float: "right" }}
            color="primary"
            endIcon={<AddIcon />}
          ></Button>


          <br />
          <br />
          <Button
            onClick={() => {
              this.mySubmitHandler;
            }}
            style={{ float: "right" }}
            color="primary"
            type="submit"
          >Submit</Button>


          
          <h4 style={{ color: "red" }}> {this.state.errormessage}</h4>
        </form>
      </div>
    );
  }
}

export default EditGeneralInformation;
