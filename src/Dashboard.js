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
  const [musicItemsLoading, setMusicItemsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [shareInfo, setShareInfo] = useState({});
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [page, setPage] = useState({ index: 0, move: "refresh" });
  const [after, setAfter] = useState(null);
  const [before, setBefore] = useState(null);

  const getSavedAlbums = async () => {
    console.log("getting saved");
    console.time("savedAlbums");
    let url = process.env.REACT_APP_BACKEND_URL + "spotify/getSavedAlbums";
    let res = await fetch(url, {
      headers: { Authorization: props.token },
    });
    if (res.status == 401) {
      console.log("Expired / Bad Token, re-requesting");
      props.setToken("");
      window.location.replace("/");
    }
    let json = await res.json();
    console.timeEnd("savedAlbums");
    setSavedAlbums(json.results);
  };

  const redditGet = async (action) => {
    setMusicItemsLoading(true);
    console.log("token in props: " + props.token);
    console.log("page sending: " + page.index);
    let params = {
      q: searchOps.q,
      t: searchOps.t,
      sort: searchOps.sort,
      page: page.index,
    };
    if (action == "after") {
      params.after = after;
      params.before = "before";
    } else if (action == "before") {
      params.before = before;
      params.after = "after";
    } else if (action == "refresh") {
      params.before = "before";
      params.after = "after";
    }
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
    console.log(res.data);
    setMusicItems(res.data.results);
    setAfter(res.data.after);
    setBefore(res.data.before);
  };

  const apiCalls = async (action) => {
    setMusicItemsLoading(true);
    await Promise.all([redditGet(action), getSavedAlbums()]);
    setMusicItemsLoading(false);
  };

  useEffect(() => {
    console.log(page.index);
    apiCalls(page.move);
  }, [page]);

  const nextPage = () => {
    setPage({ index: page.index + 1, move: "after" });
  };

  const prevPage = () => {
    setPage({ index: page.index - 1, move: "before" });
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    setMusicItems([]);
    setSearchOps({
      q: e.target[0].value,
      sort: e.target[1].value,
      t: e.target[2].value,
    });
    setPage({ index: 0, move: "refresh" });
  };

  const addSavedAlbum = async (id) => {
    console.log("sending");
    console.log(id);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "spotify/saveAlbum?" +
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
      setSavedAlbums([...savedAlbums, id]);
      return true;
    } else if (res.status == 401) {
      console.log("Expired / Bad Token, re-requesting");
      props.setToken("");
      window.location.replace("/");
    } else {
      return false;
    }
  };

  const removeSavedAlbum = async (id) => {
    console.log("sending");
    console.log(id);
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "spotify/removeAlbum?" +
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
      setSavedAlbums([...savedAlbums].filter((i) => i !== id));
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
          loading={musicItemsLoading ? true : false}
          after={after}
          before={before}
          nextPage={nextPage}
          prevPage={prevPage}
        />
        <CardContainer
          musicItemsLoading={musicItemsLoading}
          musicItems={musicItems}
          openModal={openModal}
          type={searchOps.q}
          token={props.token}
          savedAlbums={savedAlbums}
          addSavedAlbum={addSavedAlbum}
          removeSavedAlbum={removeSavedAlbum}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
