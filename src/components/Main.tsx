import React, { useState, useRef, useEffect } from "react";
import { IoIosCopy } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineSwap } from "react-icons/ai";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./Main.css";
import LanguageModal from "./LanguageModal";
import { APIKEYS } from "../apis";
import Dictionary from "./Dictionary";

function Main() {
  const [fromLanguage, setFromLanguage] = useState("en");
  const [fromLanguageText, setFromLanguageText] = useState("English");
  const [toLanguage, setToLanguage] = useState("ru");
  const [toLanguageText, setToLanguageText] = useState("Russian");
  const [userText, setUserText] = useState("");
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [dictionaryData, setDictionaryData] = useState([]);

  const fromLanguageRef = useRef<HTMLDivElement>(null);

  const [showModalTo, setShowModalTo] = useState(false);
  const [showModalFrom, setShowModalFrom] = useState(false);

  const toggleShowFrom = () => setShowModalFrom(!showModalFrom);
  const toggleShowTo = () => setShowModalTo(!showModalTo);

  const onSelectFromLanguage = (language: string) => {
    setFromLanguage(Object.values(language)[0]);
    setFromLanguageText(Object.keys(language)[0]);
    setShowModalFrom(false);
  };

  const onSelectToLanguage = (language: string) => {
    setToLanguage(Object.values(language)[0]);
    setToLanguageText(Object.keys(language)[0]);
    setShowModalTo(false);
  };

  const translateAPI = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${APIKEYS.translate}&lang=${toLanguage}&text=${userText}&ui=${fromLanguage}`;
  const dictionaryAPI = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${APIKEYS.dictionary}&lang=${fromLanguage}-${toLanguage}&text=${userText}`;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (userText) {
        translateText();
        dictionaryTextTranslate();
      } else if (userText === "") {
        setTranslation("");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [userText, fromLanguage, toLanguage]);

  const translateText = async () => {
    setLoading(true);

    try {
      const response = await fetch(translateAPI);
      const data = await response.json();
      const translatedText = data.text[0];
      setTranslation(translatedText);
    } catch (error) {
      console.log("Error occurred during translation:", error);
    }

    setLoading(false);
  };

  const dictionaryTextTranslate = async () => {
    setLoading(true);

    try {
      const response = await fetch(dictionaryAPI);
      const data = await response.json();
      const dictionaryDataAPi = data.def;
      setDictionaryData(dictionaryDataAPi);
      console.log("dictionary data:", dictionaryDataAPi);
    } catch (error) {
      console.log("Error occurred during translation:", error);
    }

    setLoading(false);
  };

  const handleSwitchLanguage = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    setFromLanguageText(toLanguageText);
    setToLanguageText(fromLanguageText);
    setTranslation(userText);
    setUserText((prevUserText) => {
      setTranslation(prevUserText);
      return translation;
    });
  };
  
  const handleFromLanguageInput = () => {
    if (fromLanguageRef.current) {
      const textContent = fromLanguageRef.current.textContent || "";
      setUserText(textContent);
      const element = fromLanguageRef.current;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <div className="main-container">
      <div className="container-translate">
        <div className="row row-language-field">
          <div className="column language-title" onClick={toggleShowFrom}>
            {fromLanguageText ? fromLanguageText : "Select Language"}
            <LanguageModal
              onSelectLanguage={onSelectFromLanguage}
              selectedLanguage={fromLanguage}
              setSelectedLanguageText={setFromLanguageText}
              setShowModal={setShowModalFrom}
              showModal={showModalFrom}
            />
          </div>
          <div className="column" onClick={() => handleSwitchLanguage()}>
            <AiOutlineSwap size={30} className="icon-element" />
          </div>
          <div className="column language-title" onClick={toggleShowTo}>
            {toLanguageText ? toLanguageText : "Select Language"}
            <LanguageModal
              onSelectLanguage={onSelectToLanguage}
              selectedLanguage={toLanguage}
              setSelectedLanguageText={setToLanguageText}
              setShowModal={setShowModalTo}
              showModal={showModalTo}
            />
          </div>
        </div>
        <div className="row row-input-field">
          <div
            className="column input-text input-text-from"
            contentEditable={true}
            data-placeholder="Translate the text here"
            onInput={handleFromLanguageInput}
            ref={fromLanguageRef}
          >
            {userText}
          </div>
          
          <div className="column input-text input-text-to">
            <div>{translation}</div>
            {translation && (
              <div id="copy-clipboard">
                <CopyToClipboard
                  text={translation}
                  onCopy={() => setIsCopied(true)}
                >
                  <button
                    className="copy-button"
                    id="copy-clipboard-clicked"
                    data-tip="Text on Hover"
                    data-event="mouseenter"
                  >
                    <IoIosCopy />
                  </button>
                </CopyToClipboard>
                <ReactTooltip
                  anchorId="copy-clipboard"
                  place="bottom"
                  content="Translation Copied!"
                  className="tooltip"
                  openOnClick={true}
                  delayHide={700}
                />
                <ReactTooltip
                  anchorId="copy-clipboard"
                  place="bottom"
                  content="Copy(Option + C)"
                  className="tooltip"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {dictionaryData.length > 0 && (
        <Dictionary dictionaryData={dictionaryData} />
      )}
    </div>
  );
}

export default Main;
