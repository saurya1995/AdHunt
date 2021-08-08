"use-strict";

import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import ProfileService from "../services/ProfileService";
import NavigationBar from "../components/search/NavigationBar";
import Footer from "../components/search/Footer";
import TabularBar from "../components/search/ProfilesTabBar";
import Loading from "../components/Loading";
import { getCategories } from "../redux/actions/categoryActions";

function CreatorProfilesView(props) {

    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingCategory, setLoadCategory] = useState(false);
    const [tab, setTab] = useState([]);
    const [profile, setProfile] = useState([]);
    const category = useSelector((state) => state.categoryReducer.category);
    const activeNav = useSelector((state) => state.navBarReducer.activeItem);

    useEffect(() => {
        if (!category) {
            loadSubCategories();
        }
    }, [category]);

    useEffect(() => {
        loadProfile();
        //setting active tab subcategories
        if (category !== undefined) {
            for (let i = 0; i < category.length; i++) {
                if (category[i].category == activeNav) {
                    setTab(category[i].subCategory);
                    break;
                }
            }
        }
    }, [activeNav]);

    const loadProfile = async () => {
        setLoadingProfile(true);
        const resp = await ProfileService.getCreatorProfiles();
        setProfile(resp);
        setLoadingProfile(false);
    };

    const loadSubCategories = async () => {
        setLoadCategory(true);
        props.dispatch(getCategories());
        setLoadCategory(false);
    };


    return loadingProfile && loadingCategory ? (
        <section>
            <Loading />
        </section>
    ) : (
        <section>
            <NavigationBar path={"Creator"} />
            <div className="tab-container">
                <div className="header-bp">
                    <h1
                        className="header-h1"
                        style={{
                            fontFamily: "'Upwork Rza',sans-serif",
                            marginLeft: "2px",
                            color: "#2f4f4f",
                        }}
                    >
                        Content Creators
                    </h1>
                </div>
                <TabularBar tab_data={tab} profile_info={profile} />
            </div>
            <Footer />
        </section>
    );
}
export default connect()(CreatorProfilesView);
