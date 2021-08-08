import React, { useState } from "react";
import { connect } from "react-redux";

import {
    Collapse,
} from "@material-ui/core";

import ApplicationCard from "./ApplicationCard";
import OfferCard from "./OfferCard";
import { roles } from "./applicationStatus";
import Loading from "../Loading";

function MyApplication({ application, user }) {
    const [showOffer, setShowOffer] = useState(false);
   
    const handleShowOfferClick = () => {
        setShowOffer(!showOffer);
    };
    return (
        <div className="mydealcard-div">
            <ApplicationCard
                key={application._id}
                application={application}
                role={roles.applier}
                applier={application.offer.user}
                
                price={application.offer.price}
                handleShowOfferClick={handleShowOfferClick}
                tab={"applications"}
                offerPromoted={application.offer.promoted}
            />
            <Collapse
                className="offerapplicationcard-collapse"
                in={showOffer}
                timeout="auto"
            >
                {!application.offer ? (
                    <Loading />
                ) : (
                    <OfferCard
                        offer={application.offer}
                        user={application.offer.user}
                        actionsDisabled={true}
                        keepExpanded={true}
                    />
                )}
            </Collapse>
        </div>
    );
}
export default connect()(MyApplication);
