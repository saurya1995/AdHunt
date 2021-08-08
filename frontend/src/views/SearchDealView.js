import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import NavigationBar from "../components/search/NavigationBar";
import Footer from "../components/search/Footer";
import DealCard from "../components/search/DealCard";
import { Card } from "semantic-ui-react";
import DealsTabBar from "../components/search/DealsTabBar";
import Filter from "../components/search/Filter";
import Loading from "../components/Loading";
import { Grid } from "semantic-ui-react";
import OfferService from "../services/OfferService";
import { getCategories } from "../redux/actions/categoryActions";

function SearchDealView(props) {

    const user = useSelector((state) => state.user);
    const activeDealItem = useSelector((state) => state.tabReducer.activeDealItem);
    const category = useSelector((state) => state.categoryReducer.category);
    const [deals, setDeals] = useState([]);
    let actions = ["priceHtoL", "priceLtoH", "dateNtoO", "nameZ-A", "nameA-Z"];
    const [sortAction, setSortAction] = useState("priceLtoH");
    const ASC = 'ascending';
    const DSC = 'descending';
    const dealtabvalues = ['Businesses', 'Content Creators'];
    let unpromoted_deal_cards = null;
    let promoted_deal_cards = null;
    let offers = null;

    useEffect(() => {
        if (!category) {
            loadSubCategories();
        }
    }, [category]);

    useEffect(() => {
        if (activeDealItem == "Content Creators") {
            loadCompanyOffers();
        } else {
            loadBusinessOffers();
        }
        console.log(activeDealItem);
    }, [activeDealItem]);

    const loadSubCategories = async () => {
        props.dispatch(getCategories());
    };
    const loadBusinessOffers = async () => {
        const resp = await OfferService.getFilteredOffers("business");
        setDeals(resp);
    };
    const loadCompanyOffers = async () => {
        const resp = await OfferService.getFilteredOffers("contentcreator");
        setDeals(resp);
    };
    const sortByPrice = (offers, order) => {
        if (order === DSC) {
            return offers.sort((offera, offerb) => {
                return parseInt(offerb.price) - parseInt(offera.price);
            })
        }
        else if (order === ASC) {
            return offers = offers.sort((offera, offerb) => {
                return parseInt(offera.price) - parseInt(offerb.price);
            })
        }
    }

    if (deals) {
        if (deals !== 'undefined') {
            //data for search in navigation bar
            offers = deals;
            if (sortAction == actions[0]) {
                offers = sortByPrice(deals, DSC)
            }
            else if (sortAction == actions[1]) {
                offers = sortByPrice(deals, ASC)
            }
            else if (sortAction == actions[2]) {
                offers = deals.sort((offera, offerb) => new Date(...offerb.createdAt.split('/').reverse()) - new Date(...offera.createdAt.split('/').reverse()));
            }
            else if (sortAction == actions[3]) {
                offers = deals.sort((offera, offerb) => offerb.title.localeCompare(offera.title));
            }
            else if (sortAction == actions[4]) {
                offers = deals.sort((offera, offerb) => offera.title.localeCompare(offerb.title));
            }
            unpromoted_deal_cards = offers.map((offer) => {
                if (!offer.promoted) {
                    return <DealCard user={user} offer={offer} />;
                }
            })
            promoted_deal_cards = offers.map((offer) => {
                if (offer.promoted) {
                    return <DealCard user={user} offer={offer} />;
                }
            })
        }
    }

    return !deals & !sortAction ? (
        // loading icon displayed if no deals are loaded
        <section>
            <Loading />
        </section>
    ) : (
        <section>
            <div style={{ margin: 1 }}>
                <NavigationBar props={offers} />
            </div>
            <div className="tab-container">
                <div className="header-bp">
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column width={13}>
                                <h1
                                    className="header-h1"
                                    style={{
                                        marginLeft: "2px",
                                        color: "#2f4f4f",
                                    }}
                                >
                                    Deals
                                </h1>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Filter sortAction={setSortAction} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>{" "}
                <DealsTabBar data={dealtabvalues} />
                <Card.Group itemsPerRow={2} stackable={true}>
                    {promoted_deal_cards}
                    {unpromoted_deal_cards}
                </Card.Group>
                <Footer />
            </div>
        </section>
    );

}
export default connect()(SearchDealView);
