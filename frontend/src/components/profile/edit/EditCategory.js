import React, { Component } from "react";
import ProfileService from "../../../services/ProfileService";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CloseIcon from '@material-ui/icons/Close';


class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.profile = {
      ...props.profile,
    };
    this.loadProfile = props.loadProfile;
    this.category = props.profile.category;
    this.subCategory = props.profile.subCategory;
    this.setPopup = props.setPopup;

    const categories = props.categories;


    this.mainCategoryOptions = []
    this.allSubCategoryOptions = []

    for(let i = 0; i < categories.length; i++){
        this.mainCategoryOptions.push({key:categories[i].category, text: this.capitalizeFirstLetter(categories[i].category), value:categories[i].category});
        for(let j = 0; j < categories[i].subCategory.length; j++)
          this.allSubCategoryOptions.push({key: categories[i].subCategory[j], text: this.capitalizeFirstLetter(categories[i].subCategory[j]), value: categories[i].subCategory[j], category: categories[i].category});
    }



    this.state = {
        category: props.profile.category,
        selectedSubCategories: props.profile.subCategory,
        subCategoryOptions: this.allSubCategoryOptions.filter(function(x) {return x["category"]==props.profile.category}),
        errormessage: "",
      };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      category: nextProps.profile.category,
      subCategory: nextProps.profile.subCategory,
      errormessage: "",
    });
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    this.profile.category = this.state.category;
    this.profile.subCategory = []
    for(let i = 0; i < this.state.selectedSubCategories.length; i++){
      if(typeof this.allSubCategoryOptions.find( ({ key }) => key === this.state.selectedSubCategories[i])!="undefined" && this.allSubCategoryOptions.find( ({ key }) => key === this.state.selectedSubCategories[i]).category == this.state.category){
        this.profile.subCategory.push(this.state.selectedSubCategories[i]);
      }
    }

    let profile = ProfileService.updateCreatorProfile(this.profile);
    this.loadProfile();
    this.setPopup(false);
  };

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = "";

    this.setState({
      [nam]: val,
    });
  };

  handleAdd = (event, data) => {
    this.setState((state) => {
      const selectedSubCategories = data.value;
      return {
        selectedSubCategories,
      };
    });
  };

  handleSet = (event, data) => {

    this.setState((state) => {
    const category = data.value;

    const subCategoryOptions = this.allSubCategoryOptions.filter(function(x) {return x["category"]==category});
    
    return {
    category:category,
    selectedSubCategories:[],
    subCategoryOptions:subCategoryOptions
    };
    });
  };

  render() {
    return (
      <div>
    <Button onClick={() => this.setPopup(false)} style={{float: "right"}} color="primary"  endIcon={<CloseIcon/>}></Button>


        <br/><br/><br/>
        <h4> Main category </h4>
        <Dropdown
          placeholder="Main Category"
          fluid
          search
          selection
          options={this.mainCategoryOptions}
          onChange={this.handleSet}
          defaultValue={this.state.category}
        />
       
        <h4> Subcategories </h4>{" "}
        <Dropdown
          placeholder="Categories"
          fluid
          multiple
          search
          selection
          options={this.state.subCategoryOptions}
          onChange={this.handleAdd}
          defaultValue={this.state.selectedSubCategories}
           />
        <br />
        <Button onClick={this.mySubmitHandler} style={{ float: "right" }} color="primary"> Update </Button>{" "}
      </div>
    );
  }
}

export default EditCategory;
