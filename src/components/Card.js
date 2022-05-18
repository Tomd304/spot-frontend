import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import axios from "axios";

const Card = (props) => {
  const saveClick = async () => {
    props.setDisableSave(true);
    const res = props.saved ? await removeSavedItem() : await addSavedItem();
    if (res) {
      props.setDisableSave(false);
    } else {
      // ADD ERROR HANDLING ALERT
      props.setDisableSave(true);
    }
  };

  const addSavedItem = async () => {
    let url =
      process.env.REACT_APP_BACKEND_URL +
      (props.type == "album" ? "spotify/saveAlbum" : "spotify/saveTrack");
    const res = await axios(url, {
      method: "put",
      headers: {
        Authorization: props.auth.token,
      },
      params: { id: props.item.spotInfo.id },
    });
    if (res.status == 200) {
      let newSaved = props.savedItems;
      newSaved[props.index] = !newSaved[props.index];
      props.setSavedItems(newSaved);
      return true;
    } else if (res.status == 401) {
      console.log("Expired / Bad Token, re-requesting");
      window.location.replace("/");
    } else {
      return false;
    }
  };

  const removeSavedItem = async () => {
    let url =
      process.env.REACT_APP_BACKEND_URL +
      (props.type == "album" ? "spotify/removeAlbum" : "spotify/removeTrack");
    const res = await axios(url, {
      method: "delete",
      headers: {
        Authorization: props.auth.token,
      },
      params: { id: props.item.spotInfo.id },
    });
    if (res.status == 200) {
      let newSaved = props.savedItems;
      newSaved[props.index] = !newSaved[props.index];
      props.setSavedItems(newSaved);
      return true;
    } else if (res.status == 401) {
      console.log("Expired / Bad Token, re-requesting");
      window.location.replace("/");
    } else {
      return false;
    }
  };

  return (
    <div className="card">
      <a href={props.item.spotInfo.url} rel="nor\eferrer" target="_blank">
        <img
          src={props.item.spotInfo.image}
          style={{ cursor: "pointer" }}
          className="card-img"
        />
      </a>
      <div className="info">
        <p className="score">
          <FontAwesomeIcon icon={solid("arrow-up")} />
          {" " + props.item.redditInfo.score}
        </p>

        <a
          className="item"
          href={props.item.spotInfo.url}
          rel="noreferrer"
          target="_blank"
          style={{ cursor: "pointer" }}
        >
          {props.item.spotInfo.name}
        </a>
        <a
          className="artist"
          href={props.item.spotInfo.artist.url}
          rel="noreferrer"
          target="_blank"
          style={{ cursor: "pointer" }}
        >
          {props.item.spotInfo.artist.name}
        </a>
      </div>

      <div className="text-links">
        <div>
          <a href={props.item.spotInfo.url} style={{ color: "rgb(30 215 96)" }}>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={brands("spotify")}
            />
          </a>
        </div>
        {props.auth.type == "withScope" ? (
          <div
            style={{
              color: props.disableSave
                ? "gray"
                : props.saved
                ? " rgb(255, 88, 88)"
                : "rgb(125, 70, 70)",
            }}
          >
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={
                props.saved
                  ? solid("heart-circle-minus")
                  : solid("heart-circle-plus")
              }
              onClick={props.disableSave ? null : saveClick}
            />
          </div>
        ) : null}
        <div>
          <a
            style={{ color: "rgb(212, 212, 212)" }}
            href={props.item.redditInfo.url}
          >
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={brands("reddit-alien")}
            />
          </a>
        </div>
        <div style={{ color: "aliceblue" }}>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={solid("share-nodes")}
            onClick={() => props.openModal(props.item.spotInfo)}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
