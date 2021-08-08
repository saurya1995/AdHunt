import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Modal from "react-modal";
import EditCategory from "./edit/EditCategory";
import EditIcon from "@material-ui/icons/Edit";
import { Popup } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const useStyles = makeStyles({
  edit_button: {
    float: "right",
  },
});
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

/**
 * header cells for sortable table columns
 * @param {props} props
 */

function Category(props) {
  const { category, subCategory } = props.profile[0];
  const classes = useStyles();
  const [popup, setPopup] = useState(0);
  const userAuthenticated = props.userAuthenticated;

  return (
    <div>
      {userAuthenticated && (
        <Popup
          content="Edit categories"
          trigger={
            <Button
              onClick={() => setPopup(true)}
              className={classes.edit_button}
              color="primary"
              endIcon={<EditIcon />}
            ></Button>
          }
        />
      )}

      <h1>Categories</h1>
      <h4>Main category:</h4>
      <Button variant="contained" color="secondary">
        {category}
      </Button>
      <h4>Subcategories:</h4>
      <h4>
        {subCategory.map((item, index) => {
          return (
            <Button
              style={{ marginRight: "5pt", marginBottom: "5pt" }}
              key={index}
              variant="contained"
              color="primary"
            >
              {item}
            </Button>
          );
        })}
      </h4>
      {userAuthenticated && (
        <Modal
          isOpen={popup == 1}
          size="sm"
          style={modalStyle}
          ariaHideApp={false}
        >
          <EditCategory
            profile={props.profile[0]}
            categories={props.categories}
            loadProfile={props.loadProfile}
            setPopup={setPopup}
          ></EditCategory>
        </Modal>
      )}
    </div>
  );
}

export default Category;
