import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { Card, CardHeader, CardContent, Collapse } from "@material-ui/core";

import { Button, Icon } from "semantic-ui-react";
import { Button as MuiButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import Modal from "react-modal";
import EditOpenOffer from "../profile/edit/EditOpenOffer";

import { Row, Col, Container } from "react-bootstrap";
import DescriptionContainer from "./DescriptionContainer";

function OfferCard({
    offer,
    user,
    actionsDisabled = false,
    handleShowApplicationsClick,
    keepExpanded,
    loadOffers,
}) {
    const [expanded, setExpanded] = React.useState(keepExpanded ? true : false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleExpandClick = () => {
        setExpanded(keepExpanded ? true : !expanded);
    };
    const handleEditOpen = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    let deal_card_color = "white";
    if (offer.promoted) {
        deal_card_color = "#fed0b2";
    }
    let platform = offer.platform.map((platform) => {
        if (platform == "Instagram") {
            return (
                <Button circular color="instagram" size={"mini"}>
                    <Icon name="instagram" /> Instagram
                </Button>
            );
        } else if (platform == "YouTube") {
            return (
                <Button circular color="youtube" icon="youtube" size={"mini"}>
                    <Icon name="youtube" /> YouTube
                </Button>
            );
        } else if (platform == "Facebook") {
            return (
                <Button circular color="facebook" size={"mini"}>
                    Facebook
                </Button>
            );
        }
    });

    let color = ["teal", "green", "grey", "blue", "pink", "orange"];
    let ran = -1;
    let tags = offer.tags.map((tag) => {
        ran = (ran + 1) % 4;
        return (
            <Button color={color[ran]} circular size={"mini"} id={tag}>
                {tag}
            </Button>
        );
    });
    offer.promoted;
    return (
        <Card
            className="mydealcard"
            style={{ backgroundColor: deal_card_color }}
        >
            <Container className="details">
                <Row>
                    <Col onClick={handleExpandClick}>
                        <CardHeader
                            titleTypographyProps={{ variant: "h5" }}
                            title={offer.title}
                            subheader={
                                <div>
                                    posted on {offer.createdAt.substr(0, 10)}
                                </div>
                            }
                            // avatar={
                            // <Avatar
                            //     component={Link}
                            //     to={userProfileUrl}
                            //     variant={"rounded"}
                            //     src={user.image ? user.image : null}
                            // >
                            //     {user.image ? null : user.username.substr(0, 1)}
                            // </Avatar>
                            // }
                        />
                        <CardContent className="content">
                            <DescriptionContainer
                                labels={[
                                    // "By",
                                    "Price:",
                                    "Description",
                                ]}
                                descriptions={[
                                    // <Link to={userProfileUrl}>
                                    //     {user.username}
                                    // </Link>,
                                    <strong>{offer.price}€</strong>,
                                    offer.description,
                                ]}
                            />
                        </CardContent>
                    </Col>
                    {!actionsDisabled ? (
                        <Col xs="3">
                            <Row>
                                <MuiButton
                                    className="deal-actions"
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        marginTop: "5px",
                                        marginBottom: "5px",
                                    }}
                                    onClick={handleEditOpen}
                                >
                                    <EditIcon />
                                    Edit Offer
                                </MuiButton>
                                <Modal
                                    isOpen={modalOpen}
                                    size="sm"
                                    className="editmodalstyle"
                                >
                                    <EditOpenOffer
                                        loadOffers={loadOffers}
                                        offer={offer}
                                        modifyingOffer={true}
                                        HandleClosePopup={handleCloseModal}
                                    ></EditOpenOffer>
                                </Modal>
                            </Row>
                            <Row>
                                <MuiButton
                                    variant="contained"
                                    className="deal-actions"
                                    color="orange"
                                    style={{
                                        marginTop: "5px",
                                        marginBottom: "5px",
                                    }}
                                    onClick={handleShowApplicationsClick}
                                    disabled={
                                        offer.applicationCount ? false : true
                                    }
                                >
                                    Show Applications ({offer.applicationCount})
                                </MuiButton>
                            </Row>
                        </Col>
                    ) : null}
                </Row>
                <Row>
                    <Collapse
                        in={expanded}
                        timeout="auto"
                        unmountOnExit
                        onClick={handleExpandClick}
                    >
                        <CardContent>
                            <DescriptionContainer
                                labels={["Platforms", "Tags"]}
                                descriptions={[platform, tags]}
                            />
                        </CardContent>
                    </Collapse>
                </Row>
            </Container>
        </Card>
    );
}
export default connect()(OfferCard);
