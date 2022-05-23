import React from "react";
import { useState, useEffect } from "react";
import ModalShare from "./components/ModalShare";
import Header from "./components/Header";
import ModalLogin from "./components/ModalLogin";
import SearchOptions from "./components/SearchOptions";
import CardContainer from "./components/CardContainer";
import ArrowBack from "./components/ArrowBack";
import ArrowNext from "./components/ArrowNext";
import Footer from "./components/Footer";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = (props) => {
  const [subreddit, setSubreddit] = useState("r/hiphopheads");
  const [searchOps, setSearchOps] = useState({
    q: "track",
    t: "month",
    sort: "top",
  });
  const [musicItems, setMusicItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [shareInfo, setShareInfo] = useState({});
  const [page, setPage] = useState({ index: 0, move: "", disable: false });
  const [after, setAfter] = useState(null);
  const [before, setBefore] = useState(null);

  useEffect(() => {
    const retrieveSavedItems = async () => {
      const getSavedItems = async () => {
        let url = process.env.REACT_APP_BACKEND_URL + "spotify/checkSaved";
        let ids = musicItems.map((i) => i.spotInfo.id).join(",");
        let res = await axios(url, {
          headers: { Authorization: props.auth.token },
          params: { type: searchOps.q, ids },
        });
        if (res.status == 401) {
          console.log("Expired / Bad Token, re-requesting");
          window.location.replace("/");
        }
        setSavedItems(res.data.results);
      };
      await getSavedItems();
      setLoading(false);
    };
    if (musicItems.length > 0 && props.auth.type !== "noScope") {
      retrieveSavedItems();
    } else {
      setLoading(false);
    }
  }, [musicItems]);

  useEffect(() => {
    const retrieveMusicItems = async (action) => {
      console.log(process.env);
      const getMusicItems = async (action) => {
        setLoading(true);
        // when disable reloaded, do not change items, just disable after and exit function
        if (page.disable) {
          setAfter(null);
          setLoading(false);
          return;
        }
        let params = {
          q: searchOps.q,
          t: searchOps.t,
          sort: searchOps.sort,
          page: page.index,
          after: action == "after" ? after : "after",
          before: action == "before" ? before : "before",
          subreddit,
        };
        let options = {
          url: process.env.REACT_APP_BACKEND_URL + "search/getItems",
          params,
          method: "get",
          headers: {
            Authorization: props.auth.token,
            "Content-Type": "application/json",
          },
        };
        let res = await axios(options);
        // if no results, set a disable reload of this function and return
        if (res.data.results.length == 0 && action == "after") {
          setPage({ index: page.index - 1, move: "before", disable: true });
          return;
        } else {
          setMusicItems(res.data.results);
          setAfter(res.data.after);
          setBefore(res.data.before);
        }
      };
      setLoading(true);
      getMusicItems(action);
    };
    console.log(page.index);
    retrieveMusicItems(page.move);
  }, [page, subreddit]);

  const openModal = (e) => {
    document.body.style.overflow = "hidden";
    setShareInfo(e);
    setShowModal(true);
  };

  const openLoginModal = (e) => {
    document.body.style.overflow = "hidden";
    setShowLoginModal(true);
  };

  return (
    <div className="view">
      {showModal ? (
        <ModalShare shareInfo={shareInfo} setShowModal={setShowModal} />
      ) : null}
      {showLoginModal ? (
        <ModalLogin setShowLoginModal={setShowLoginModal} />
      ) : null}
      <Header setSubreddit={setSubreddit} />
      <div className="dashboard">
        <SearchOptions
          loading={loading ? true : false}
          after={after}
          before={before}
          page={page}
          setPage={setPage}
          setMusicItems={setMusicItems}
          setSearchOps={setSearchOps}
          auth={props.auth}
          setAuth={props.setAuth}
        />
        <CardContainer
          loading={loading}
          musicItems={musicItems}
          openModal={openModal}
          type={searchOps.q}
          auth={props.auth}
          setAuth={props.setAuth}
          savedItems={savedItems}
          setSavedItems={setSavedItems}
          openLoginModal={openLoginModal}
        />
        {loading ? null : (
          <div className="page-buttons">
            <ArrowBack before={before} page={page} setPage={setPage} />
            <ArrowNext after={after} page={page} setPage={setPage} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
