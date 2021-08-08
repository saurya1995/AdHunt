import React, { Component } from 'react';
import { Button, Modal, Form, FormGroup, Container, Row, Col } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import { Input } from "@material-ui/core";
import { Label } from "reactstrap";
import { connect } from "react-redux";
import ProcessTags from "./tags/Process/ProcessTags";
import PartnerTags from "./tags/Partner/PartnerTags";
import ReviewService from '../../services/ReviewService';

class ReviewModal extends Component {
    emptyItem = {
        commentPartner: '',
        commentProcess: '',
        ratePartner:0,
        rateProcess:0,
        partnerName:"",
        username: "",
        tagsPartner:[],
        tagsProcess:[],
        applicationId:"",
    }
    constructor(props) {
        super(props);
        this.emptyItem.username = props.username;
        this.emptyItem.partnerName = props.partnerName;
        this.emptyItem.applicationId = props.applicationId;
        this.state = {
            isLoading: true,
            item: this.emptyItem,
            isSuccess: false,
            isError: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        let item = { ...this.state.item };
        item['tagsPartner'] = this.props.partnerTags;
        item['tagsProcess'] = this.props.processTags;

        this.props.onSubmit();
        let review = await ReviewService.createReview(item);
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }
    render() {
        const ratingChangedPartner = (newRating) => {
            let item = { ...this.state.item };
            item['ratePartner'] = newRating;
            this.setState({ item });
        };
        const ratingChangedProcess = (newRating) => {
            let item = { ...this.state.item };
            item['rateProcess'] = newRating;
            this.setState({ item });
        };
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide} backdrop="static" size={'lg'} >
                    <Modal.Header closeButton>
                        <h5 style={{ fontWeight: 'bold' }}>Review</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col >
                                    <h3 style={{ marginTop: 10,marginBottom: 10 }}>Rate general experience :</h3>
                                </Col>
                                <Col >
                                    <div style={{ marginTop: 10, marginLeft: "-50%" }}>
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChangedProcess}
                                            size={27}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star" />}
                                            halfIcon={<i className="fa fa-star-half-alt" />}
                                            fullIcon={<i className="fa fa-star" />}
                                            activeColor="#ffd700" />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ProcessTags children={{ rate: this.state.item.rateProcess }} />
                                </Col>
                            </Row>
                            <Row>
                                <div style={{ margin: 10 }}></div>
                            </Row>
                            <Row >
                                <Col >
                                    <h3 style={{ marginTop: 10,marginBottom: 10 }}> Rate business partner: </h3>
                                </Col>
                                <Col >
                                    <div style={{ marginTop: 10, marginLeft: "-50%" }}>
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChangedPartner}
                                            size={27}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star" />}
                                            halfIcon={<i className="fa fa-star-half-alt" />}
                                            fullIcon={<i className="fa fa-star" />}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm>
                                    <PartnerTags children={{ rate: this.state.item.ratePartner }} />
                                </Col>
                            </Row>
                            <Row>
                                <div style={{ margin: 10 }}></div>
                            </Row>
                            <Row>
                                <Col sm><Label style={{ marginTop:"2%" }} for="commentProcess">Comments about general experience :</Label></Col>
                                <Col sm><Input type="text" name="commentProcess" id="commentProcess" value={this.state.item.commentProcess}
                                    onChange={this.handleChange} placeholder="Comments about process :" style={{ marginBottom:"2%" ,marginLeft: "-40%", width:"130%" }}/></Col>
                            </Row>
                            <Row>
                                <div style={{ margin: 10 }}></div>
                            </Row>
                            <Row>
                                <Col sm><Label style={{ marginTop:"2%" }} for="commentPartner">Comments about business partner :</Label></Col>
                                <Col sm><Input type="text" name="commentPartner" id="commentPartner" value={this.state.item.commentPartner}
                                    onChange={this.handleChange} placeholder="Comments about partner :" style={{ marginBottom:"2%" ,marginLeft: "-40%", width:"130%" }} /></Col>
                            </Row>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup className={"text-center"} style={{ marginTop: '2%' }}>
                                    <Button variant="primary" type="submit" size={'lg'}>Submit</Button>
                                </FormGroup>
                            </Form>
                        </Container>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        backgroundColor: state.tagReducer.backgroundColor,
        color: state.tagReducer.color,
        partnerTags: state.tagReducer.partnerTags,
        processTags: state.tagReducer.processTags
    }
}

export default connect(
    mapStateToProps
)(ReviewModal);