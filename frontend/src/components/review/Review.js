import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from "@material-ui/core";

import { connect } from "react-redux";
import Stars from "./Stars";
import { Icon } from 'semantic-ui-react';

const useStyles = makeStyles(theme => ({
    light: { backgroundColor: theme.palette.secondary.light }
   }));

const Review = props => {
    const classes = useStyles();
    const [rate, setRate] = useState(0);
    useEffect(() => {
        setRate(props.children.ratePartner);

    }, [props.children.ratePartner]);
    return (
        <Container>
            <Row style={{padding:"5px"}}>
                <Col sm={2}>
                    <Icon size='huge' disabled name='user circle' />
                </Col>
                <Col style={{paddingLeft:"5px",paddingRight:"5px"}}>
                <Row><h4>{props.children.username}</h4></Row>
                <Row>Date: &nbsp; {props.children.createdAt}</Row>
                </Col>
                <Col sm={4}>
                    <h4>Rating:
                        <Stars children={{ rate: rate }} /></h4>
                </Col>
            </Row>
            <Row style={{paddingLeft:"20px", paddingTop:"5px"}}>
                <Col sm={8}>{props.children.commentPartner}</Col>
                <Col sm={8}>
                    {
                        props.children.tagsPartner.map(tag =>
                            <b key={tag}>
                                <Button className={classes.light} color="secondary" variant="contained" key={tag} style={{ margin: 10 }} >{tag}</Button>
                            </b>
                        )
                    }
                </Col>
            </Row>
            <br /><br />
        </Container>
    );
}
export default connect(
)(Review);
