import React, { Component} from 'react';
import {connect} from "react-redux";
import ReactStars from "react-rating-stars-component";
import Stars from "./Stars";
import ReviewService from '../../services/ReviewService';

class AvgStars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avg:0
        };
    }
    async componentDidMount() {
        const partnerName = this.props.partnerName;
        const response = await ReviewService.getAvgRate(partnerName);
        this.setState({avg:response});
    }
    render(){
        return (
                <Stars children={{rate:this.state.avg}}/>
        );
    }
}
export default connect()(AvgStars);
