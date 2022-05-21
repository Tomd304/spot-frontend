import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import copy from "copy-to-clipboard";

const Modal = (props) => {
  const iconSize = 40;
  const copyText = () => {
    copy(props.shareInfo.url);
    closeModal();
  };

  const closeModal = (e) => {
    document.body.style.overflow = "";
    props.setShowModal(false);
  };

  return (
    <div>
      <div id="overlay" onClick={closeModal}></div>
      <div className="modal-container">
        <div className="share-pop-up">
          <div className="close-button">
            <FontAwesomeIcon
              onClick={closeModal}
              style={{ cursor: "pointer" }}
              icon={solid("xmark")}
            />
          </div>
          <div className="share-icons">
            <FacebookShareButton url={props.shareInfo.url} onClick={closeModal}>
              <FacebookIcon round={true} size={iconSize} />
            </FacebookShareButton>
            <TelegramShareButton url={props.shareInfo.url} onClick={closeModal}>
              <TelegramIcon round={true} size={iconSize} />
            </TelegramShareButton>
            <WhatsappShareButton url={props.shareInfo.url} onClick={closeModal}>
              <WhatsappIcon round={true} size={iconSize} />
            </WhatsappShareButton>
            <TwitterShareButton url={props.shareInfo.url} onClick={closeModal}>
              <TwitterIcon round={true} size={iconSize} />
            </TwitterShareButton>

            <FontAwesomeIcon
              onClick={copyText}
              className="copy-button"
              icon={solid("copy")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
