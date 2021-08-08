import React, { useState } from "react";
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
import { Button, Icon } from "semantic-ui-react";
import { Button as MuiButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { apply } from "../../redux/actions/applicationActions";
import { connect, useDispatch } from "react-redux";
import "./DealCardStyle.css";
import ConfirmModal from "./ConfirmModal";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        minWidth: 500,
        marginRight: "5%",
        marginBottom: "2%",
        padding: "5px 20px 5px 10px",
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function DealCard({ user, offer }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [applied, setApplied] = useState(offer.application ? true : false);
    const tab = useSelector((state) => state.tabReducer.activeDealItem);
    const [isLoggedIn, setIsLoggedIn] = useState(!!user.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [showApply, setShowApply] = useState(
        isLoggedIn
            ? (user.user.kind === "business" && tab === "Content Creators") ||
            (user.user.kind === "contentcreator" && tab === "Businesses")
            : false
    );

    useEffect(() => {
        setApplied(offer.application ? true : false);
    }, [offer]);

    useEffect(() => {
        setIsLoggedIn(!!user.user);
        if(!!user.user){
            if(typeof user.user.user !== 'undefined'){
                setShowApply(
                    isLoggedIn
                        ? (user.user.user.kind === "business" &&
                        tab === "Content Creators") ||
                        (user.user.user.kind === "contentcreator" &&
                            tab === "Businesses")
                        : false
                );
            }else{
                setShowApply(
                    isLoggedIn
                        ? (user.user.kind === "business" &&
                        tab === "Content Creators") ||
                        (user.user.kind === "contentcreator" &&
                            tab === "Businesses")
                        : false
                );
            }
        }
    }, [user, tab]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let name = offer.user.username;
    let title = "Company Name:";
    if (tab == "ContentCreators") {
        title = "Creator Name:";
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

    //Setting colors to deals card Promotional/Non-Promotional
    let deal_card_color = "white";
    if (offer.promoted) {
        deal_card_color = "#fed0b2";
    }

    const onClickApply = () => {
        isLoggedIn ?
            setConfirmOpen(true) :
            history.push("/login");
    };

    const handleConfirmApplication = () => {
        dispatch(apply(offer._id));
        setConfirmOpen(false);
        setApplied(true);
    };

    const handleCancelApplication = () => {
        setConfirmOpen(false);
    };
    return (
        <Card className={classes.root} style={{ backgroundColor: deal_card_color }}>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column width={11}>
                        <CardHeader
                            titleTypographyProps={{ variant: "h5" }}
                            title={offer.title}
                            subheader={offer.createdAt.substr(0, 10)}
                            avatar={
                                <Avatar
                                    component={Link}
                                    to={"/users/" + name}
                                    src={
                                        offer.user.image
                                            ? offer.user.image
                                            : null
                                    }
                                >
                                    {offer.user.image
                                        ? null
                                        : name.substr(0, 1)}
                                </Avatar>
                            }
                        />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        {/* TODO Make this with dispatcher */}
                        {isLoggedIn ? (
                            showApply ? (
                                <Link to="/">
                                    <MuiButton
                                        variant="contained"
                                        color="primary"
                                        style={{
                                            marginTop: "10%",
                                            marginLeft: "40%",
                                        }}
                                        onClick={onClickApply}
                                        disabled={applied}
                                    >
                                        {applied ? "Already applied" : "APPLY"}
                                    </MuiButton>
                                </Link>
                            ) : null
                        ) : (
                            <MuiButton
                                variant="contained"
                                color="primary"
                                style={{
                                    marginTop: "10%",
                                    marginLeft: "40%",
                                }}
                                onClick={onClickApply}
                                disabled
                            >
                                Login to apply
                            </MuiButton>
                        )}
                        <div>
                            {/* todo make it better */}
                            <ConfirmModal
                                show={confirmOpen}
                                header="Confirm application"
                                onHide={handleCancelApplication}
                                onSubmit={handleConfirmApplication}
                            />
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <CardContent>
                <Typography component="p">
                    {title} <strong>{name}</strong>
                </Typography>
                <Typography component="p">
                    <br />
                    Price: <strong>{offer.price}€</strong>
                </Typography>
                <Typography component="p">
                    <br />
                    Description: {offer.description}
                </Typography>
            </CardContent>

            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column width={5}></Grid.Column>
                    <Grid.Column width={6}>
                        <CardActions disableSpacing>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expand]: expanded,
                                })}
                                onClick={handleExpandClick}
                            >
                                <MuiButton
                                    variant="contained"
                                    color="secondary"
                                    size={"tiny"}
                                >
                                    Show More
                                </MuiButton>
                            </IconButton>
                        </CardActions>
                    </Grid.Column>
                    <Grid.Column width={5}></Grid.Column>
                </Grid.Row>
            </Grid>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph component="p">
                        Platform: {platform}
                    </Typography>
                    <Typography paragraph component="p">
                        Tags: &nbsp;&nbsp;&nbsp;{tags}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
export default connect()(DealCard);
