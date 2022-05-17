import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Footer = (props) => {
  return (
    <div className="footer">
      <a href="https://github.com/Tomd304">
        <FontAwesomeIcon
          style={{ cursor: "pointer", fontSize: "1.75em" }}
          icon={brands("github")}
        />
      </a>
    </div>
  );
};

export default Footer;
