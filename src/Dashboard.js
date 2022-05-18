import React from "react";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import Header from "./components/Header";
import SearchOptions from "./components/SearchOptions";
import CardContainer from "./components/CardContainer";
import Footer from "./components/Footer";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = (props) => {
  const [searchOps, setSearchOps] = useState({
    q: "album",
    t: "week",
    sort: "top",
  });
  const [musicItems, setMusicItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [shareInfo, setShareInfo] = useState({});
  const [page, setPage] = useState({ index: 0, move: "" });
  const [after, setAfter] = useState(null);
  const [before, setBefore] = useState(null);

  useEffect(() => {
    const retrieveSavedItems = async () => {
      const getSavedItems = async () => {
        let url = process.env.REACT_APP_BACKEND_URL + "spotify/checkSaved";
        let ids = musicItems.map((i) => i.spotInfo.id).join(",");
        let res = await axios(url, {
          headers: { Authorization: props.token },
          params: { type: searchOps.q, ids },
        });
        if (res.status == 401) {
          console.log("Expired / Bad Token, re-requesting");
          props.setToken("");
          window.location.replace("/");
        }
        console.timeEnd("savedItems");
        setSavedItems(res.data.results);
      };
      await getSavedItems();
      setLoading(false);
    };
    if (musicItems.length > 0) {
      retrieveSavedItems();
    } else {
      setLoading(false);
    }
  }, [musicItems]);

  useEffect(() => {
    const retrieveMusicItems = async (action) => {
      const getMusicItems = async (action) => {
        setLoading(true);
        let params = {
          q: searchOps.q,
          t: searchOps.t,
          sort: searchOps.sort,
          page: page.index,
          after: action == "after" ? after : "after",
          before: action == "before" ? before : "before",
        };
        let options = {
          url: process.env.REACT_APP_BACKEND_URL + "search/getItems",
          params,
          method: "get",
          headers: {
            Authorization: props.token,
            "Content-Type": "application/json",
          },
        };
        let res = await axios(options);
        setMusicItems(res.data.results);
        setAfter(res.data.after);
        setBefore(res.data.before);
      };
      setLoading(true);
      getMusicItems(action);
    };
    console.log(page.index);
    retrieveMusicItems(page.move);
  }, [page]);

  const searchSubmit = (e) => {
    e.preventDefault();
    setMusicItems([]);
    setSearchOps({
      q: e.target[0].value,
      sort: e.target[1].value,
      t: e.target[2].value,
    });
    setPage({ index: 0, move: "" });
  };

  const addSavedItem = async (id, index) => {
    console.log("sending");
    console.log(id);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        (searchOps.q == "album" ? "spotify/saveAlbum?" : "spotify/saveTrack?") +
        new URLSearchParams({
          id,
        }),
      {
        method: "put",
        headers: {
          Authorization: props.token,
        },
      }
    );
    if (res.status == 200) {
      let newSaved = savedItems;
      newSaved[index] = !newSaved[index];
      setSavedItems(newSaved);
      return true;
    } else if (res.status == 401) {
      console.log("Expired / Bad Token, re-requesting");
      props.setToken("");
      window.location.replace("/");
    } else {
      return false;
    }
  };

  const removeSavedItem = async (id, index) => {
    console.log("sending");
    console.log(id);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        (searchOps.q == "album"
          ? "spotify/removeAlbum?"
          : "spotify/removeTrack?") +
        new URLSearchParams({
          id,
        }),
      {
        method: "delete",
        headers: {
          Authorization: props.token,
        },
      }
    );
    if (res.status == 200) {
      let newSaved = savedItems;
      newSaved[index] = !newSaved[index];
      setSavedItems(newSaved);
      return true;
    } else if (res.status == 401) {
      console.log("Expired / Bad Token, re-requesting");
      props.setToken("");
      window.location.replace("/");
    } else {
      return false;
    }
  };

  const openModal = (e) => {
    document.body.style.overflow = "hidden";
    setShareInfo(e);
    setShowModal(true);
  };

  const closeModal = (e) => {
    document.body.style.overflow = "";
    setShowModal(false);
  };

  return (
    <div className="view">
      {showModal ? <Modal closeModal={closeModal} info={shareInfo} /> : null}
      <Header />
      <div className="dashboard">
        <SearchOptions
          searchSubmit={searchSubmit}
          loading={loading ? true : false}
          after={after}
          before={before}
          page={page}
          setPage={setPage}
        />
        <CardContainer
          loading={loading}
          musicItems={musicItems}
          openModal={openModal}
          type={searchOps.q}
          token={props.token}
          savedItems={savedItems}
          addSavedItem={addSavedItem}
          removeSavedItem={removeSavedItem}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
