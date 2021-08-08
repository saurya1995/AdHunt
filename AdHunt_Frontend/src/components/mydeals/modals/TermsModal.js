import React, { useState, useEffect } from "react";
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

export default function TermsModal({ show, onHide, onSubmit }) {
    const contract = (
        <div>
            <h4>I. INTRODUCTION</h4>
            <br />
            <p>
                This contract is between the content creator and the advertiser.
            </p>
            <h4>II. ACKNOWLEDGMENT</h4>
            <p>
                The advertiser and the content creator acknowledge the terms of
                this Contract and will comply.
            </p>
            <h4>III. TERMS</h4>
            <p>
                This contract will begin on the day this contract is signed by
                both parties. A new contract will be created for renewal of
                term.
            </p>
            <h4>IV. PAYMENT FEES</h4>
            <p>
                A. The total payment will be the amount decided by the offerer
                of the deal. <br />
                B. Payment will be made by the advertiser. C. The payment should
                be made at the start of the campaign.
            </p>
            <h4>V. CONTENT REQUIREMENTS</h4>
            <p>
                A. The content creator should create original content which is
                decent, honest, and factual. <br />
                B. An approval from the advertiser is required before making the
                content public. <br />
                C. The approved created ontent will be shared by the content
                creator to his/her social media accounts on the agreed on
                platforms. D. The advertiser can request to the content creator
                to add tags, links, or titles in the description of the uploaded
                media. <br />
                E. The content should be compliant with the terms and conditions
                of the social media platform being used. <br />
                F. The content should not contain any vulgar language and should
                be suited for everyone.
            </p>
            <h4>VI. COPYRIGHT</h4>
            <p>
                The content creator will own the copyright of the uploaded
                media. However, both parties are allowed to share it to their
                own respective channels.
            </p>
            <h4>VII. CONFIDENTIALITY</h4>
            <p>
                This contract is strictly confidential and only authorized
                persons are allowed to see.
            </p>
            <h4>VIII. AMENDMENT</h4>
            <p>
                This contract can only be changed or modified through the
                written consent of both parties (Advertiser and content
                creator).
            </p>
            <h4>IX. GOVERNING LAW</h4>
            <p>
                This contract shall be governed under the laws of Germany
                (State/Country).
            </p>
        </div>
    );
    return (
        <div>
            <Modal
                style={{maxHeight:"95vh", overflow:"hidden"}}
                show={show}
                onHide={onHide}
                backdrop="static"
                size={"lg"}
                centered
            >
                <Modal.Header closeButton>
                    <h5 style={{ fontWeight: "bold" }}>Terms of Agreement :</h5>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "70vh", overflow: "scroll" }}>
                    {contract}
                </Modal.Body>
                <Modal.Footer>

                            <Button variant="outline-primary" onClick={onSubmit} size={"lg"}>
                                Accept Terms of Agreement
                            </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
}
