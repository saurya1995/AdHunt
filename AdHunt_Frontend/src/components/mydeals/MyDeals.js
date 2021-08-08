import React from "react";
import { connect, useSelector } from "react-redux";

import Loading from "../Loading";
import MyOffer from "./MyOffer";
import MyApplication from "./MyApplication";
import "./MyDealsStyle.css";

function MyDeals({ deals, isLoading, tab, loadOffers }) {
    const user = useSelector((state) => state.user);

    return (
        <React.Fragment>
            {isLoading ? (
                // if no deals are loaded, the above useEffect should be triggered
                <Loading />
            ) : !Array.isArray(deals) ? (
                // apparently something went wrong, usually there should be some kind of error handling
                <div>error</div>
            ) : deals.length === 0 ?(
                <div style={{textAlign:"center", width:"100%"}}>
            <br />
            <p >You still have no {tab}.</p> 
            </div>):
            (
                // everyhing is fine an the list can be displayed
                <div className="div-cards">
                    {tab=="offers"?(
                        deals.map((offer) => {
                            return (
                                <MyOffer key ={offer._id} className="mycard" offer={offer} user={user.user} loadOffers={loadOffers}/>
                            );
                        })
                    ):(
                        deals.map((application) => {
                            return (
                                <MyApplication key ={application._id} className="mydealcard" application={application} user={user.user} />
                            );
                        })
                    )
                }
                </div>
            )}
        </React.Fragment>
    );
}
export default connect()(MyDeals);
