import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Footer = (props) => {
  return (
    <div className="footer">
      <a rel="noreferrer" target="_blank" href="https://github.com/Two-Shot">
        <FontAwesomeIcon
          style={{ cursor: "pointer", fontSize: "1.75em" }}
          icon={brands("github")}
        />
      </a>
    </div>
  );
};

export default Footer;
