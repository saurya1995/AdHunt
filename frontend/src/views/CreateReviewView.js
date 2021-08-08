import React from "react";
import { connect } from "react-redux";
import ReviewModal from "../components/review/ReviewModal";

function CreateReviewView(props) {

    return (
        <ReviewModal/>
    );
}

// connect() establishes allows the usage of redux functionality
// here the function getMovie, changeMovie and addMovie are mentionend
// this is an alternative way of calling connecting them with redux
// another way is shown in MovieListView.js
export default connect()(
    CreateReviewView
);