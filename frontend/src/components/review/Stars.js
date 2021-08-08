import React, { Component } from 'react';
import { connect } from "react-redux";
import ReactStars from "react-rating-stars-component";

class Stars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: this.props.children.rate
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <div style={{ display: this.props.children.rate === 0 ? "block" : "none" }}>
                    <ReactStars
                        count={5}
                        edit={false}
                        value={0}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star" />}
                        halfIcon={<i className="fa fa-star-half-alt" />}
                        fullIcon={<i className="fa fa-star" />}
                        activeColor="#ffd700"
                    />
                </div>

                <div style={{ display: this.props.children.rate === 1 ? "block" : "none" }}>
                    <ReactStars
                        count={5}
                        edit={false}
                        value={1}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star" />}
                        halfIcon={<i className="fa fa-star-half-alt" />}
                        fullIcon={<i className="fa fa-star" />}
                        activeColor="#ffd700"
                    />
                </div>
                <div style={{ display: this.props.children.rate === 2 ? "block" : "none" }}>
                    <ReactStars
                        count={5}
                        edit={false}
                        value={2}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star" />}
                        halfIcon={<i className="fa fa-star-half-alt" />}
                        fullIcon={<i className="fa fa-star" />}
                        activeColor="#ffd700"
                    />
                </div>
                <div style={{ display: this.props.children.rate === 3 ? "block" : "none" }}>
                    <ReactStars
                        count={5}
                        edit={false}
                        value={3}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star" />}
                        halfIcon={<i className="fa fa-star-half-alt" />}
                        fullIcon={<i className="fa fa-star" />}
                        activeColor="#ffd700"
                    />
                </div>
                <div style={{ display: this.props.children.rate === 4 ? "block" : "none" }}>
                    <ReactStars
                        count={5}
                        edit={false}
                        value={4}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star" />}
                        halfIcon={<i className="fa fa-star-half-alt" />}
                        fullIcon={<i className="fa fa-star" />}
                        activeColor="#ffd700"
                    />
                </div>
                <div style={{ display: this.props.children.rate === 5 ? "block" : "none" }}>
                    <ReactStars
                        count={5}
                        edit={false}
                        value={5}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star" />}
                        halfIcon={<i className="fa fa-star-half-alt" />}
                        fullIcon={<i className="fa fa-star" />}
                        activeColor="#ffd700"
                    />
                </div>
            </div>
        );
    }
}
export default connect(
)(Stars);
