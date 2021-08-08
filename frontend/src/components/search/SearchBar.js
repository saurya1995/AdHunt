import _ from 'lodash'
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import ProfileService from "../../services/ProfileService";
import OfferService from "../../services/OfferService";


const initialState = { isLoading: false, results: [], value: '', username: '' }

const mapStateToProps = (state) => ({
  tab: state.tabReducer.activeDealItem
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  state = initialState
  isDeal = (this.props.path == "Creator" || this.props.path == "Business" || this.props.path == "BothProfiles") ? false : true;

  loadBusinessOffers = async () => {
    const resp = await OfferService.getFilteredOffers("business");
    this.setState({ data: resp });
  };
  loadCompanyOffers = async () => {
    const resp = await OfferService.getFilteredOffers("contentcreator");
    this.setState({ data: resp });
  };
  loadBusinessProfiles = async () => {
    const resp = await ProfileService.getBusinessProfiles();
    this.setState({ data: resp });
  }
  loadCreatorProfiles = async () => {
    const resp = await ProfileService.getCreatorProfiles();
    this.setState({ data: resp });
  }

  fetchData = () => {
    if (this.isDeal) {
      if (this.props.tab == "Businesses") {
        this.loadBusinessOffers();
      } else {
        this.loadCompanyOffers();
      }
    } else {
      if (this.props.path == "Creator" || this.props.searchTab == "Creator") {
        this.loadCreatorProfiles();
      } else {
        this.loadBusinessProfiles();
      }
    }
  }

  handleResultSelect = (e, { result }) => {
    (this.isDeal) ? this.setState({ value: result.title.substr(0, 16) + ". . ." }) : this.setState({ value: result.username.substr(0, 16) });
    (this.isDeal) ? this.setState({ username: result.user.username }) : this.setState({ username: result.username });
    this.setState({ redirect: true });
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      if (this.isDeal) {
        const isTitle = (this.props.searchTab !== "Title") ? true : false;
        const isMatch = (result) => re.test((isTitle) ? result.user.username : result.title);
        //filter results through pattern matching
        const results = _.filter(this.state.data, isMatch);
        results.forEach(function (part, index) {
          this[index].description = this[index].description.replace(/^(.{70}[^\s]*).*/, "$1") + "...";
          var price = this[index].price.toString();
          price.startsWith('$') ? this[index].price : this[index].price = "$ " + price;
        }, results);

        this.setState({
          isLoading: false,
          results: results,
        })
      } else {
        const isMatch = (result) => re.test(result.username);
        //filter results through pattern matching
        const results = _.filter(this.state.data, isMatch);
        results.forEach(function (part, index) {
          this[index].description = this[index].description.replace(/^(.{50}[^\s]*).*/, "$1") + "...";
          this[index].title = this[index].name;
        }, results);

        this.setState({
          isLoading: false,
          results: results,
        })
      }

    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    if (this.state.redirect) {
      let path = "/users/" + this.state.username;
      return <Redirect push to={path} />;
    }

    return (
      <Search
        input={{ icon: 'search', iconPosition: 'left' }}
        loading={isLoading}
        onFocus={this.fetchData}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
      />
    )
  }
}

export default connect(mapStateToProps)(SearchBar);