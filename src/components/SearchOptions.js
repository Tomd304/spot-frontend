import "./SearchOptions.css";
import { useState } from "react";
import ArrowBack from "./ArrowBack";
import ArrowNext from "./ArrowNext";

const SearchOptions = (props) => {
  const [disable, setDisable] = useState(false);
  const onChange = (e) => {
    if (e.target.value !== "top") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const timeNow = new Date();
    if (
      timeNow.getTime() >= props.auth.expiry &&
      props.auth.type == "withScope"
    ) {
      props.setAuth({ token: "", type: "noScope", expiry: null });
    }
    props.setMusicItems([]);
    props.setSearchOps({
      q: e.target[0].value,
      sort: e.target[1].value,
      t: e.target[2].value,
    });
    props.setPage({ index: 0, move: "", disable: false });
  };

  return (
    <form className="form-container" onSubmit={submitSearch}>
      <select
        disabled={props.loading}
        name="q"
        className="typeSelect"
        defaultValue="track"
      >
        <option name="album" value="album">
          Albums
        </option>
        <option name="track" value="track">
          Tracks
        </option>
      </select>

      <select
        disabled={props.loading}
        onChange={onChange}
        className="sortSelect"
        name="sort"
        defaultValue="top"
      >
        <option name="top" value="top">
          Top
        </option>
        <option name="hot" value="hot">
          Hot
        </option>
        <option name="new" value="new">
          New
        </option>
      </select>
      {disable ? (
        <select disabled={true} className={"disabled"} name="t">
          <option name="year" value="year">
            N/A
          </option>{" "}
        </select>
      ) : (
        <select
          disabled={disable || props.loading}
          className={disable ? "disabled " : "" + "timeSelect"}
          name="t"
          defaultValue="month"
        >
          <option name="year" value="year">
            Year
          </option>
          <option name="month" value="month">
            Month
          </option>
          <option name="week" value="week">
            Week
          </option>
          <option name="day" value="day">
            Day
          </option>
          <option name="all" value="all">
            All
          </option>
        </select>
      )}

      {props.loading ? (
        <button disabled={props.loading}>Please wait</button>
      ) : (
        <div className="nav-buttons">
          <ArrowBack
            before={props.before}
            page={props.page}
            setPage={props.setPage}
          />
          <button className="clickable">Search</button>
          <ArrowNext
            after={props.after}
            page={props.page}
            setPage={props.setPage}
          />
        </div>
      )}
    </form>
  );
};

export default SearchOptions;
