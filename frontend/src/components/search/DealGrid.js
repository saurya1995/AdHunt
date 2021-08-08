import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";

function DealGrid({ props }) {
  const prof = props.map((profile_info) => {
    return <ProfileCard props={profile_info} />;
  });

  return (
    <div className="grid-deals">
      <Card.Group itemsPerRow={4} stackable={true}>
        {prof}
      </Card.Group>
    </div>
  );
}

export default DealGrid;
