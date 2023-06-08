import React from "react";
import "./Dictionary.css";

interface DictionaryProps {
  dictionaryData: Array<any>;
}

const Dictionary: React.FC<DictionaryProps> = ({ dictionaryData }) => {
  return (
    <div className="container-dictionary">
      <div className="row-alter"></div>
      <div className="row-dictionary">
        <div>
          <h3>Dictionary</h3>
        </div>
        <div className="row-dictionary-more-example">
          {dictionaryData?.map((item: any) => (
            <>
              <div>
                <span className="item-word-alternative">{item.text}</span>{" "}
                <span>[{item.ts}]</span> <span>{item.pos}</span>
              </div>
              {item.pos === "noun" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <>
                      <li key={index} className="item-word-synonym">
                        <span className="item-word-synonym-content">
                          {subItem.text}
                        </span>
                      </li>
                    </>
                  ))}
                </ol>
              )}
              {item.pos === "verb" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {item.pos === "interjection" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {item.pos === "adverb" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {item.pos === "adjective" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {item.pos === "preposition" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {item.pos === "conjunction" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {item.pos === "particle" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {item.pos === "pronoun" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {item.pos === "abbreviation" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {typeof item.pos === "undefined" && (
                <ol className="list-of-words">
                  {item.tr.map((subItem: any, index: number) => (
                    <li key={index} className="item-word-synonym">
                      <span className="item-word-synonym-content">
                        {subItem.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
