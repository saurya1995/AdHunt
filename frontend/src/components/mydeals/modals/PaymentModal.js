import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import {
    Button,
    Modal,
    Form,
    FormGroup,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { Input } from "@material-ui/core";
import { Label } from "reactstrap";
import Divider from "material-ui/Divider";
import { pay } from "../../../redux/actions/paymentActions";
function PaymentModal({ show, onHide, onSubmit }) {
    const isLoading = useSelector((state) => state.checkoutSessionReducer.isLoading);
    // const [isLoading, setLoading] = useState(false);
    const handleClick = () => {
        onSubmit();
    }
    return (
        <div>
            <Modal
                style={{ maxHeight: "95vh", overflow: "hidden" }}
                show={show}
                onHide={onHide}
                backdrop="static"
                size={"lg"}
                centered
            >
                <Modal.Header closeButton>
                    <h5 style={{ fontWeight: "bold" }}>Payment</h5>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "70vh", overflow: "scroll" }}>
                    <h5>
                        You will be redirected to Stripe checkout page for
                        payment.
                    </h5>
                    <p>
                        (The payment will be eld by Stripe until the deal is
                        done.)
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-primary"
                        disabled={isLoading}
                        onClick={!isLoading ? handleClick : null}
                        size={"lg"}
                    >
                        {isLoading ? 'Loading…' : 'To payment'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default connect()(PaymentModal);
