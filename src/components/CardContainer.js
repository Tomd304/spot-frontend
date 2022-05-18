import "./CardContainer.css";
import Card from "./Card";
import { useState, useEffect } from "react";

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
              addSavedItem={props.addSavedItem}
              removeSavedItem={props.removeSavedItem}
              key={String(item._id)}
              disableSave={disableSave}
              setDisableSave={setDisableSave}
              index={index}
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
