import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import {
    Collapse,
} from "@material-ui/core";


import {
    getOfferApplications,
} from "../../redux/actions/applicationActions";
import ApplicationCard from "./ApplicationCard";
import OfferCard from "./OfferCard";
import { roles } from "./applicationStatus";
import Loading from "../Loading";

function MyOffer({ offer, user, loadOffers }) {
    const [showApplications, setShowApplications] = useState(false);
    const applications = useSelector(
        (state) => state.offerApplicationsReducer.applications[offer._id]
    );
    const dispatch = useDispatch();
    const loadApplications = async () => {
        // trigger the redux action
        dispatch(getOfferApplications(offer._id));
    };

    const handleShowApplicationsClick = () => {
        loadApplications();
        setShowApplications(!showApplications);
    };

    return (
        <div className="mydealcard-div">
            <OfferCard
                offer={offer}
                applications={applications}
                user={user}
                handleShowApplicationsClick={handleShowApplicationsClick}
                loadOffers={loadOffers}
            />

                <Collapse
                    className="offerapplicationcard-collapse"
                    in={showApplications}
                    timeout="auto"
                    style={{ backgroundColor:  "#bed7d3"}}
                >
                    {!applications ? (
                        <Loading />
                    ) : (
                        applications.map((application) => {
                            return (
                                <ApplicationCard
                                    key={application._id}
                                    application={application}
                                    role={roles.offerer}
                                    applier={application.user}
                                    price={offer.price}
                                    offerPromoted={offer.promoted}
                                />
                            );
                        })
                    )}
                </Collapse>

        </div>
    );
}
export default connect()(MyOffer);
