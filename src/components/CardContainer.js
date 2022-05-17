import "./CardContainer.css";
import Card from "./Card";
import { useState, useEffect } from "react";

const CardContainer = (props) => {
  const [disableSave, setDisableSave] = useState(false);

  return (
    <ul className="card-container">
      {props.musicItemsLoading ? (
        <p>Loading...</p>
      ) : props.musicItems.length > 0 ? (
        props.musicItems.map((item) => {
          return (
            <Card
              item={item}
              openModal={props.openModal}
              saved={props.savedItems.includes(item.spotInfo.id) ? true : false}
              addSavedItem={props.addSavedItem}
              removeSavedItem={props.removeSavedItem}
              key={String(item._id)}
              disableSave={disableSave}
              setDisableSave={setDisableSave}
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
