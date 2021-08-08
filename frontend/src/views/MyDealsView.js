import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import MyDeals from "../components/mydeals/MyDeals";
import NavigationBar from "../components/search/NavigationBar";
import Footer from "../components/search/Footer";
import { Col, Container, Row } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { myApplications } from "../redux/actions/applicationActions";
import { myOffers } from "../redux/actions/offerActions";
import EditOpenOffer from "../components/profile/edit/EditOpenOffer";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import Modal from "react-modal";
import "./MyDealsViewStyle.css";

function MyDealsView(props) {
    const dealTypes = ["offers", "applications"];
    const dealStatuses = ["past", "active", "pending"];

    const [dealType, setDealType] = useState(dealTypes[0]);
    const [dealStatus, setDealStatus] = useState(dealStatuses[0]);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const onChangeDealType = (e, newType) => {
        if (newType) setDealType(newType);
    };
    const onChangeStatus = (e, newStatus) => {
        setDealStatus(newStatus);
    };

    const applications = useSelector(
        (state) => state.myApplicationsReducer.myapplications
    );
    const offers = useSelector((state) => state.myOffersReducer.offers);
    const applicationsLoading = useSelector(
        (state) => state.myApplicationsReducer.isLoading
    );
    const offersLoading = useSelector(
        (state) => state.myOffersReducer.isLoading
    );

    useEffect(() => {
        // load applications when the page is loaded or the applications have changed.
        if (dealType == "applications" && !applications) {
            loadApplications();
        }
        if (dealType == "offers" && !offers) {
            loadOffers();
        }
    }, [applications, offers, dealType]);

    const loadApplications = async () => {
        // trigger the redux action getMyApplication
        props.dispatch(myApplications());
    };

    const loadOffers = async () => {
        // trigger the redux action getMyOffers
        props.dispatch(myOffers());
    };

    return (
        <div>
            <NavigationBar path={"BothProfiles"} />
            <Container style={{ maxWidth: "720px" }}>
                <Row>
                    <Col>
                        <ToggleButtonGroup
                            value={dealType}
                            exclusive
                            onChange={onChangeDealType}
                        >
                            {dealTypes.map((type) => (
                                <ToggleButton key={type} value={type}>
                                    {type}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Col>
                    <Col
                        style={{
                            alignItems: "flex-end",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Button
                            className="addbutton"
                            variant="contained" color="primary"
                            style={{
                                marginTop: "5px",
                                marginBottom: "5px",
                            }}
                            onClick={() => {
                                setAddModalOpen(true);
                            }}
                        >
                            <AddIcon />New Offer
                        </Button>
                        <Modal
                            isOpen={addModalOpen}
                            size="sm"
                            className="editmodalstyle"
                        >
                            <EditOpenOffer
                                offer={new Object()}
                                loadOffers={loadOffers}
                                index={0}
                                modifyingOffer={false}
                                user_id={props.user}
                                HandleClosePopup={() => {
                                    setAddModalOpen(false);
                                }}
                            ></EditOpenOffer>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    {dealType === "offers" ? (
                        <MyDeals
                            deals={offers}
                            isLoading={offersLoading}
                            tab={dealType}
                            loadOffers={loadOffers}
                        />
                    ) : (
                        <MyDeals
                            deals={applications}
                            isLoading={applicationsLoading}
                            tab={dealType}
                        />
                    )}
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

// connect() establishes the connection to the redux functionalities
export default connect()(MyDealsView);
