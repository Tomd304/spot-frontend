import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const ArrowNext = (props) => {
  const nextPage = () => {
    props.setPage({
      index: props.page.index + 1,
      move: "after",
      disable: false,
    });
  };
  return (
    <FontAwesomeIcon
      icon={solid("caret-right")}
      className="page-button"
      style={!props.after ? { color: "rgb(75,75,75)" } : null}
      onClick={props.after ? nextPage : null}
    />
  );
};

export default ArrowNext;
