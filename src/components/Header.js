import "./Header.css";

const Header = (props) => {
  const subChange = (e) => {
    props.setSubreddit(e.target.value);
  };
  return (
    <div className="header">
      <h1>FRESH ALERTS</h1>
      <select className="subreddit-select" onChange={subChange}>
        <option>
          <a href="https://www.reddit.com/r/hiphopheads">r/HIPHOPHEADS</a>
        </option>
        <option>
          <a href="https://www.reddit.com/r/indieheads">r/INDIEHEADS</a>
        </option>
      </select>
    </div>
  );
};

export default Header;
