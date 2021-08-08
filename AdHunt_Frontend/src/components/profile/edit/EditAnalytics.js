import React, { Component } from "react";
import ProfileService from "../../../services/ProfileService";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import "semantic-ui-css/semantic.min.css";
import { Input } from "semantic-ui-react";
import { Form, TextArea } from 'semantic-ui-react'
import { Image } from 'semantic-ui-react'


class EditAnalytics extends Component {
  constructor(props) {
    super(props);
    this.analytics = { ...props.analytics };
    this.setPopup = props.setPopup;
    this.loadAnalytics = props.loadAnalytics;
    this.newAnalytics = props.newAnalytics;
    //antipatern
    this.state = {
      metricName: props.analytics.metricName,
      metric_image: props.analytics.metric_image,
      description: props.analytics.description,
      errormessage: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      metricName: nextProps.analytics.metricName,
      image: nextProps.analytics.image,
      metric_image: nextProps.analytics.metric_image,
      errormessage: "",
    });
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    this.analytics.metricName = this.state.metricName;
    this.analytics.metric_image = this.state.metric_image;
    this.analytics.description = this.state.description;
    this.analytics.user_id = this.props.user_id;

    if (this.newAnalytics) {
      let analytics = ProfileService.addAnalytics(this.analytics);
    } else {
      let analytics = ProfileService.updateAnalytics(this.analytics);
    }
    this.loadAnalytics();
    this.setPopup(false);
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = "";
    this.setState({ [nam]: val });
  };

  render() {
    return (
      <div>
        <br/>
           <Button onClick={() => this.setPopup(false)} style={{float: "right"}} color="primary"  endIcon={<CloseIcon/>}></Button>
           <br/>

        <Form onSubmit={this.mySubmitHandler}>
          <h1>Edit analytics</h1>
          <Image src={this.state.metric_image} size='large' style={{  marginLeft: "auto", marginRight: "auto"}}/>

          <p>Image link:</p>
         

        <Input
            placeholder="Image link"
            name="metric_image"
            value={this.state.metric_image}
            onChange={this.myChangeHandler}
            style={{width: "80%"}}
          />

          <p>Metric Name:</p>
       
          <Input
            placeholder="Name"
            name="metricName"
            value={this.state.metricName}
            onChange={this.myChangeHandler}
            style={{width: "80%"}}
          />

          <p>Description:</p>
          <TextArea
            type="text"
            name="description"
            row="10"
            cols="50"
            maxlength="501"
            value={this.state.description}
            onChange={this.myChangeHandler}
          />
          

          <br />
          <br />

          <Button
            onClick={() => {
              this.mySubmitHandler;
            }}
            style={{ float: "right" }}
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

export default EditAnalytics;
