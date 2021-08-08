import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

function DealsTabBar(props) {

  const [state, setState] = useState({ activeItem: props.data[0] })
  const dispatch = useDispatch();
  const handleItemClick = (e, { name }) => { setState({ activeItem: name }); dispatch({ type: "ACTIVE_DEAL_TAB", activeDealItem: name }); };

  function renderTab() {
    return props.data.map((tab) => {
      return <Menu.Item
      style={{fontSize:"larger"}}
        color="teal"
        name={tab}
        active={state.activeItem === tab}
        onClick={handleItemClick}
      />;
    });
  }
  return (
    <Menu tabular width={100} size={"small"} style={{ marginBottom: "1.5%" }}>
      {renderTab()}
    </Menu>
  );

}

export default DealsTabBar;
