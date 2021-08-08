import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import DealGrid from "./DealGrid";

export default class ProfilesTabBar extends Component {

  state = {};
  constructor(props) {
    super(props);
    this.state = { activeItem: this.props.tab_data[0], filterdata: this.props.profile_info.filter((user) => user.subCategory.includes(this.props.tab_data[0])) };
  }
  componentWillReceiveProps(nextprops) {
    this.setState({ activeItem: nextprops.tab_data[0], filterdata: this.props.profile_info.filter((user) => user.subCategory.includes(nextprops.tab_data[0])) });
  }

  handleItemClick = (e, { name }) => { this.setState({ activeItem: name, filterdata: this.props.profile_info.filter((user) => user.subCategory.includes(name)) }); }

  renderTab() {
    return this.props.tab_data.map((tab) => {
      return <Menu.Item
        color="blue"
        name={tab}
        key={tab}
        active={this.state.activeItem === tab}
        onClick={this.handleItemClick}
      />;
    });
  }

  render() {
    return (<div>
      <Menu tabular width={100} size={"small"} style={{ marginBottom: "0.5%" }}>
        {this.renderTab()}
      </Menu>
      <div className="grid-deal">
        <DealGrid props={this.state.filterdata} />
      </div>
    </div>
    );
  }
}
