import React from "react";
import { Card, Icon, Image, Button, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";
import AvgStars from "../review/AvgStars";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function ProfileCard({ props }) {
  let path = "business";
  if (props.kind === "contentcreator") {
    path = "creator";
  }
  return (
    <Card fluid centered={true}>
      <Card.Content textAlign={"center"}>
        <img
          src={props.image}
          size="medium"
          wrapped
          ui={true}
          style={{ width: "220px", height: "220px", marginBottom: "10px", borderRadius: "50%" }}
        />
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>{props.subCategory}</Card.Meta>
        <div class="stars" style={{ marginLeft: "32%" }}>
          <AvgStars partnerName={props.username} ></AvgStars>
        </div>
        <Card.Description style={{ marginBottom: "1%" }}>
          {props.description.replace(/^(.{150}[^\s]*).*/, "$1") + "..."}
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"center"} style={{ marginTop: "10px" }}>
        <div className="ui buttons">
          <Button as={Link} to={`/users/${props.username}`} color={"blue"} >
            View Profile
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

export default ProfileCard;
