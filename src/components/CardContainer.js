import "./CardContainer.css";
import Card from "./Card";
import { useState } from "react";

const CardContainer = (props) => {
  const [disableSave, setDisableSave] = useState(false);

  return (
    <ul className="card-container">
      {props.loading ? (
        <p>Loading...</p>
      ) : props.musicItems.length > 0 ? (
        props.musicItems.map((item, index) => {
          return (
            <Card
              item={item}
              openModal={props.openModal}
              saved={props.savedItems[index]}
              key={String(item._id)}
              disableSave={disableSave}
              setDisableSave={setDisableSave}
              index={index}
              savedItems={props.savedItems}
              setSavedItems={props.setSavedItems}
              type={props.type}
              auth={props.auth}
              setAuth={props.setAuth}
              openLoginModal={props.openLoginModal}
            />
          );
        })
      ) : (
        <p>No Results</p>
      )}
    </ul>
  );
};

export default CardContainer;
