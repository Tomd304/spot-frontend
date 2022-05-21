import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const ArrowBack = (props) => {
  const prevPage = () => {
    props.setPage({
      index: props.page.index - 1,
      move: "before",
      disable: false,
    });
  };

  return (
    <FontAwesomeIcon
      icon={solid("caret-left")}
      className="page-button"
      style={!props.before ? { color: "rgb(75,75,75)" } : null}
      onClick={props.before ? prevPage : null}
    />
  );
};

export default ArrowBack;
