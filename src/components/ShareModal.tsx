import React, { useState } from "react";
import "./ShareModal.css";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoCopy } from "react-icons/io5";
interface ShareModalProps {
  translatedLink: string;
  translationText: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  translatedLink,
  translationText,
}) => {
  let myInput: any = null;
  const copyToClipboard = () => {
    myInput.select();
    navigator.clipboard.writeText(myInput?.value);
  };

  const newYandexLink = encodeURIComponent(translationText);
  const yandexLink = `https://yandex.com/search/?text="${newYandexLink}"`;

  const openLinkFromYandex = () => {
    window.open(yandexLink, "_blank");
  };

  const handleShareTelegram = () => {
    const telegramLink = `https://t.me/share/url?url=${translatedLink}`;
    window.open(telegramLink, "_blank");
    };
  
  const handleShareWhatsapp = () => {
    const whatsappLink = `https://wa.me/?text=${translatedLink}`;
    window.open(whatsappLink, "_blank");
    };

  const handleShareEmail = () => {
    const emailLink = `mailto:?subject=New-Email&body=${translationText}`;
    window.open(emailLink, "_blank");
  }; 

  return (
    <div className="share-container">
      <div className="share-row">
        <div className="share-col">
          <input
            ref={(ref) => (myInput = ref)}
            id="inputField"
            type="text"
            value={translatedLink}
            disabled
            style={{
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
          <button onClick={copyToClipboard} className="icon-copy" id="copy-link-clipboard">
            <IoCopy size={26} />
          </button>
          <ReactTooltip
            anchorId="copy-link-clipboard"
            place="bottom"
            content="Translation Copied!"
            className="tooltip"
            openOnClick={true}
            delayHide={700}
          />
        </div>
        <div className="share-col share-icons">
          <div className="icon icon-telegram">
            <FaTelegram size={35} onClick={handleShareTelegram}/>
          </div>
          <div className="icon icon-whatsapp">
            <FaWhatsapp size={35} onClick={handleShareWhatsapp} />
          </div>
          <div className="icon icon-email" onClick={handleShareEmail}>
            <AiOutlineMail size={35} />
          </div>
        </div>
        <div className="share-col share-icon-btn">
          <button className="icon-find-in-yandex" onClick={openLinkFromYandex}>
            Find in Yandex
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
