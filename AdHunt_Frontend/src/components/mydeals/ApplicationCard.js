import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import {
    makeStyles,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";
import { Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import EditOpenOffer from "../profile/edit/EditOpenOffer";

import {
    apply,
    getOfferApplications,
} from "../../redux/actions/applicationActions";
import { Row, Col, Container } from "react-bootstrap";
import DescriptionContainer from "./DescriptionContainer";
import ApplicationActionComponent from "./ApplicationActionComponent";
import Review from "../review/Review";

function ApplicationCard({
    price,
    application,
    applier,
    role,
    handleShowOfferClick,
    tab,
    offerPromoted,
}) {
    const [expanded, setExpanded] = useState(false);
    
    const applierProfileUrl = "/users/" + applier.username;

    return (
        <Card key={application._id} className="offerapplicationcard">
            <Container>
                <Row>
                    <Col style={{ padding: "0" }}>
                        <CardHeader
                            titleTypographyProps={{ variant: "h5" }}
                            title={
                                tab === "applications" ? (
                                    application.offer.title
                                ) : (
                                    <Link to={applierProfileUrl}>
                                        {applier.username}
                                    </Link>
                                )
                            }
                            subheader={
                                <div>
                                    applied on{" "}
                                    {application.createdAt.substr(0, 10)}
                                </div>
                            }
                            avatar={
                                <Avatar
                                    component={Link}
                                    to={applierProfileUrl}
                                    src={applier.image ? applier.image : null}
                                >
                                    {applier.image
                                        ? null
                                        : applier.username.substr(0, 1)}
                                </Avatar>
                            }
                        />
                    </Col>
                    <Col xs="3">
                        <ApplicationActionComponent
                            price={price}
                            application={application}
                            role={role}
                            handleShowOfferClick={handleShowOfferClick}
                            handleShowReviewClick={() => setExpanded(!expanded)}
                            offerPromoted={offerPromoted}
                        />
                    </Col>
                </Row>
            </Container>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {application.myReview ? (
                        <div>
                            <Typography paragraph component="p">
                                Thank you for taking the time to review.
                                <br />
                                You reviewed:
                            </Typography>
                            <Review
                                children={{
                                    commentPartner:
                                        application.myReview.commentPartner,
                                    ratePartner:
                                        application.myReview.ratePartner,
                                    tagsPartner:
                                        application.myReview.tagsPartner,
                                    createdAt:
                                        application.myReview.createdAt.slice(
                                            0,
                                            10
                                        ),
                                    username: application.myReview.username,
                                }}
                            />
                            {application.partnerReview ? (
                                <div>
                                    <Typography paragraph component="p">
                                        <br />
                                        Your partner reviewed:
                                    </Typography>

                                    <Review
                                        children={{
                                            commentPartner:
                                                application.partnerReview
                                                    .commentPartner,
                                            ratePartner:
                                                application.partnerReview
                                                    .ratePartner,
                                            tagsPartner:
                                                application.partnerReview
                                                    .tagsPartner,
                                            createdAt:
                                                application.partnerReview.createdAt.slice(
                                                    0,
                                                    10
                                                ),
                                            username:
                                                application.partnerReview
                                                    .username,
                                        }}
                                    />
                                </div>
                            ) : (
                                <Typography paragraph component="p">
                                    <br />
                                    Waiting for partner review.
                                </Typography>
                            )}
                        </div>
                    ) : null}
                </CardContent>
            </Collapse>
        </Card>
    );
}
export default ApplicationCard;
