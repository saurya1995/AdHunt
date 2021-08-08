import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { Button } from "semantic-ui-react";

import { updateApplication } from "../../redux/actions/applicationActions";
import { checkout, payout } from "../../redux/actions/paymentActions";
import { Row } from "react-bootstrap";
import { applicationStatus } from "./applicationStatus";
import TermsModal from "./modals/TermsModal";
import PaymentModal from "./modals/PaymentModal";
import DoneModal from "./modals/DoneModal";
import ReviewModal from "../review/ReviewModal";
import DeclineModal from "./modals/DeclineModal";

function ApplicationActionComponent({
    price,
    application,
    role,
    handleShowOfferClick,
    handleShowReviewClick,
    offerPromoted
}) {
    const user = useSelector((state) => state.user);
    const [termsModalOpen, setTermsModalOpen] = useState(false);
    const [declineModalOpen, setDeclineModalOpen] = useState(false);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [doneModalOpen, setDoneModalOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(
        applicationStatus[application.status]
    );
    const [userRole, setUserRole] = useState(
        currentStatus.backendStatus == "review_1"
            ? application.myReview
                ? "didReview"
                : "didNotReview"
            : currentStatus.backendStatus == "confirmed" ||
                currentStatus.backendStatus == "paid"
                ? user.user.kind
                : role
    );
    const [redirectToPayment, setRedirectToPayment] = useState(false);
    const checkoutUrl = useSelector(
        (state) => state.checkoutSessionReducer.checkoutUrl
    );
    const dispatch = useDispatch();
    useEffect(() => {
        setCurrentStatus(applicationStatus[application.status]);
        setUserRole(
            applicationStatus[application.status].backendStatus == "review_1"
            ? application.myReview
            ? "didReview"
            : "didNotReview"
            : applicationStatus[application.status].backendStatus ==
            "confirmed" ||
            applicationStatus[application.status].backendStatus == "paid"
            ? user.user.kind
            : role
            );
        }, [application.status]);
        
    useEffect(() => {
        if (checkoutUrl && redirectToPayment) {
            window.location.href = checkoutUrl;
        }
    }, [checkoutUrl]);

    const update = () => {
        modals[currentStatus.backendStatus](false);
        application.status = currentStatus.next;
        dispatch(updateApplication(application));
    };
    const onClickActionButton = () => {
        modals[currentStatus.backendStatus](true);
    };
    const onClickDeclineButton = () => {
        setDeclineModalOpen(true);
    };
    const onSubmitDeclined = () => { 
        setDeclineModalOpen(false);
        application.status = applicationStatus.declined.backendStatus;
        dispatch(updateApplication(application));
    };
    const onSubmitPayment = () => {
        dispatch(checkout(price, application._id, offerPromoted));
        setRedirectToPayment(true);
    };
    const onSubmitReview = () => {
        update();
        if(currentStatus.backendStatus === "review_1" && application.partnerReview) {
            update();
        }
        application.myReview = new Object();
        if (user.user.kind === "business") {
            dispatch(payout(price, application.userId, application._id));
        }

    };
    const modals = {
        pending: setTermsModalOpen,
        accepted: setTermsModalOpen,
        confirmed: setPaymentModalOpen,
        paid: setDoneModalOpen,
        review: setReviewModalOpen,
        review_1: setReviewModalOpen,
    };

    return (
        <div>
             <Row>
                <Button
                    className="deal-actions"
                    color={currentStatus.color}
                    // color="green"
                    style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                    }}
                    disabled
                // onClick={handleEditOpen}
                >
                    Status: {currentStatus.text}
                </Button>
            </Row> 
            {handleShowOfferClick === undefined ? null : (
                <Row>
                    <Button
                        className="deal-actions"
                        style={{
                            marginTop: "5px",
                            marginBottom: "5px",
                        }}
                        onClick={handleShowOfferClick}
                    >
                        Show Offer
                    </Button>
                </Row>
            )}
            {((currentStatus.text === "review_1" && userRole == "didReview")||(currentStatus.text === "done" )) ? (
                <Row>
                    <Button
                        className="deal-actions"
                        style={{
                            marginTop: "5px",
                            marginBottom: "5px",
                        }}
                        basic
                        // color="red"
                        onClick={handleShowReviewClick}
                    >
                        Show Review
                    </Button>
                </Row>
            ) : null}
            {(currentStatus.action) ? (

            <Row>
                <Button
                    className="deal-actions"
                    style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                    }}
                    onClick={onClickActionButton}
                    disabled={currentStatus.action[userRole].disabled}
                >
                    {currentStatus.action[userRole].action}
                </Button>
                <TermsModal
                    show={termsModalOpen}
                    onHide={() => setTermsModalOpen(false)}
                    onSubmit={update}
                />
                <PaymentModal
                    show={paymentModalOpen}
                    onHide={() => setPaymentModalOpen(false)}
                    onSubmit={onSubmitPayment}
                />
                <DoneModal
                    show={doneModalOpen}
                    onHide={() => setDoneModalOpen(false)}
                    onSubmit={update}
                />
                <ReviewModal
                    show={reviewModalOpen}
                    onHide={() => setReviewModalOpen(false)}
                    onSubmit={onSubmitReview}
                    username={user.user.username}
                    partnerName={role == "applier"? application.offer.user.username : application.user.username}
                    applicationId={application._id}
                />
            </Row>
                        ) : null}
            {(currentStatus.text === "pending" && userRole === "offerer") ? (
                <Row>
                    <Button
                        className="deal-actions"
                        style={{
                            marginTop: "5px",
                            marginBottom: "5px",
                        }}
                        color="red"
                    onClick={onClickDeclineButton}
                    >
                        Decline
                    </Button>
                    <DeclineModal
                show={declineModalOpen}
                onHide={() => setDeclineModalOpen(false)}
                onSubmit={onSubmitDeclined}
            />
                </Row>
            ) : null}
        </div>
    );
}
export default connect()(ApplicationActionComponent);
