import React, { Component } from "react";
import { connect } from "react-redux";
import Review from "../components/review/Review";
import ReviewService from "../services/ReviewService";

class ReviewsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
        };
    }

    async componentDidMount() {
        const partnerName = this.props.partnerName;
        let workHistory = await ReviewService.getWorkHistory(partnerName);
        this.setState({reviews:workHistory});
    }
    render() {

        return (
            <div class="ReviewsView">
                <h1>Reviews</h1>
                <br />
                <br />
                {this.state.reviews.map((review) => (
                    <div key={review._id}>
                        <Review
                            children={{
                                commentPartner: review.commentPartner,
                                ratePartner: review.ratePartner,
                                tagsPartner: review.tagsPartner,
                                createdAt: review.createdAt.slice(0, 10),
                                username: review.username,
                            }}
                        />
                        <br />
                    </div>
                ))}
            </div>
        );
    }
}

export default connect()(ReviewsView);
