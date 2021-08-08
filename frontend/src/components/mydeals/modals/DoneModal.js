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

export default function DoneModal({ show, onHide, onSubmit }) {
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
                    <h5 style={{ fontWeight: "bold" }}>Done?</h5>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "70vh", overflow: "scroll" }}>
                Are you sure you want to confirm that the content is already created? This can't be undone.
                </Modal.Body>
                <Modal.Footer>

                            <Button variant="outline-primary" onClick={onSubmit} size={"lg"}>
                                Done !
                            </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
}
