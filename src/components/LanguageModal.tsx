import React, { useState } from "react";
import listOfLanguages from "./ListOfLanguages.json";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";

import "./LanguageModal.css";

interface LanguageModalProps {
  onSelectLanguage: (language: string) => void;
  setSelectedLanguageText: (languageText: string) => void;
  setSelectedLanguageCode: (languageCode: string) => void;
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
  selectedLanguage?: string;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  onSelectLanguage,
  setSelectedLanguageText,
  setSelectedLanguageCode,
  setShowModal,
  showModal,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const toggleShow = () => setShowModal(!showModal);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredLanguages = listOfLanguages.filter((languageObj) => {
    const language = Object.keys(languageObj)[0];
    return language.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <MDBModal tabIndex="-1" show={showModal} setShow={setShowModal}>
        <MDBModalDialog centered className="three-column-modal">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Languages</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <input
                  type="text"
                  placeholder="Search for a language"
                  value={searchTerm}
                  onChange={handleSearch}
                  onClick={(event) => event.stopPropagation()}
                  className="search-bar-language"
                />
              </div>
              <div className="three-column-div">
                {filteredLanguages.map((languageObj, index) => {
                  const language = Object.keys(languageObj)[0];
                  const languageCode = Object.values(languageObj)[0];
                  return (
                    <div
                      key={index}
                      className="language-option"
                      onClick={() => {
                        onSelectLanguage(languageCode);
                        setSelectedLanguageCode(languageCode);
                        setSelectedLanguageText(language);
                        toggleShow();
                      }}
                    >
                      {language}
                    </div>
                  );
                })}
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default LanguageModal;

