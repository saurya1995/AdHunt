import React from "react";
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
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import EditOpenOffer from "../profile/edit/EditOpenOffer";

import {
    apply,
    getOfferApplications,
} from "../../redux/actions/applicationActions";
import { useDispatch } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";

export default function DescriptionContainer({ labels, descriptions }) {
    return (
        <Container>
            {labels.map((label, index) => {
                return (
                    <Row key={index}>
                        <Col xs="3">
                            <Typography
                                paragraph
                                variant="body2"
                                component="p"
                            >
                                <br />
                                {label}:
                            </Typography>
                        </Col>
                        <Col>
                            <Typography
                                paragraph
                                variant="body2"
                                component="p"
                            >
                                <br />
                                {descriptions[index]}
                            </Typography>
                        </Col>
                    </Row>
                );
            })}
        </Container>
    );
}
