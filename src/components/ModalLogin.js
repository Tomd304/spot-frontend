import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const LoginModal = (props) => {
  const closeLoginModal = (e) => {
    document.body.style.overflow = "";
    props.setShowLoginModal(false);
  };

  return (
    <div>
      <div id="overlay" onClick={closeLoginModal}></div>
      <div className="modal-container">
        <div className="login-pop-up">
          <div className="close-button">
            <FontAwesomeIcon
              onClick={closeLoginModal}
              style={{ cursor: "pointer" }}
              icon={solid("xmark")}
            />
          </div>
          <a
            style={{ cursor: "pointer", fontWeight: 900 }}
            href={process.env.REACT_APP_BACKEND_URL + "auth/login"}
          >
            Authorise Spotify Here
          </a>
          <p style={{ margin: "0.5em 0" }}>To enable track / album saving</p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
