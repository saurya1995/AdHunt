import React from "react";
import { Dropdown, Menu, Image, Grid } from "semantic-ui-react";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";
import { Link, useHistory } from "react-router-dom";
import adhunt_logo from "../../image/ADhunt2.png";
import { connect, useDispatch, useSelector } from "react-redux";
import DropdownComp from "../DropdownComp";
import { Button } from "@material-ui/core";
function NavigationBar({ path }) {
    const user = useSelector((state) => state.user);
    const history = useHistory();

    const dispatch = useDispatch();
    const handleClick = (e, { item }) =>
        dispatch({ type: "ACTIVE_NAV_TAB", activeItem: item });

    return (
        <Menu
            borderless="true"
            pointing
            openOnFocus={true}
            size="huge"
        >
            {" "}
            <Menu.Item>
                <Link to="/">
                    <img
                        alt="AdHunt"
                        src={adhunt_logo}
                        style={{ height: "50px", width: "100px" }}
                    />
                </Link>
            </Menu.Item>
            <Dropdown text="Deals" className="link item">
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={"/"}>
                        All Deals
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"/"}>
                        Creators Deals
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"/"}>
                        Businesses Deals
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown text="Content Creators" className="link item">
                <Dropdown.Menu>
                    <Dropdown.Item
                        as={Link}
                        to={{ pathname: "/creators/music" }}
                        item="music"
                        onClick={handleClick}
                    >
                        Music
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/creators/fashion"}
                        item="fashion"
                        onClick={handleClick}
                    >
                        Fashion
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/creators/automobile"}
                        item="automobile"
                        onClick={handleClick}
                    >
                        Automobile
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/creators/gadgets"}
                        item="gadgets"
                        onClick={handleClick}
                    >
                        Gadgets
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/creators/education"}
                        item="education"
                        onClick={handleClick}
                    >
                        Education
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/creators/entertainment"}
                        item="entertainment"
                        onClick={handleClick}
                    >
                        Entertainment
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/creators/foodandbeverages"}
                        item="foodandbeverages"
                        onClick={handleClick}
                    >
                        Food and Beverages
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/creators/sports"}
                        item="sports"
                        onClick={handleClick}
                    >
                        Sports
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown text="Business" className="link item">
                <Dropdown.Menu>
                    <Dropdown.Item
                        as={Link}
                        to={{ pathname: "/businesses/gaming" }}
                        item="gaming"
                        onClick={handleClick}
                    >
                        Gaming
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/businesses/education"}
                        item="education"
                        onClick={handleClick}
                    >
                        Education
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/businesses/automobile"}
                        item="automobile"
                        onClick={handleClick}
                    >
                        Automobile
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/businesses/entertainment"}
                        item="entertainment"
                        onClick={handleClick}
                    >
                        Entertainment
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/businesses/Food&Beverages"}
                        item="foodandbeverages"
                        onClick={handleClick}
                    >
                        Food and Beverages
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/businesses/fashion"}
                        item="fashion"
                        onClick={handleClick}
                    >
                        Fashion
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/businesses/sports"}
                        item="sports"
                        onClick={handleClick}
                    >
                        Sports
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/businesses/banking"}
                        item="banking"
                        onClick={handleClick}
                    >
                        Banking
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={"/businesses/consultancy"}
                        item="consultancy"
                        onClick={handleClick}
                    >
                        Consultancy
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Item position="right">
                <SearchDropdown path={path} />
            </Menu.Item>
            {!!user.user ? (
                <DropdownComp />
            ) : (
                <Button
                    color="primary"
                    style={{ fontSize: "large", marginRight: "10px" }}
                    onClick={() => {
                        history.push("/login");
                    }}
                >
                    <div style={{ fontSize: "large" }}>Login</div>
                </Button>
            )}
        </Menu>
    );
}

export default connect()(NavigationBar);
