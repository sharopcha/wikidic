import React, { useState, useContext, useEffect, Fragment } from "react";
import { ListGroup, ListGroupItem, Collapse, Card, CardBody } from "reactstrap";
import WordContext from "../../context/word/wordContext";

export default function SuggetedWordsDrawer({ words }) {
  const wordContext = useContext(WordContext);
  const [activeTab, setActiveTab] = useState(0);
  const { deleteTerm, getWords, approveNewWord } = wordContext;
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getWords();
  });

  return (
    <div>
      <ListGroup>
        {words !== null &&
          words.map((def, i) => {
            // console.log(def, i);
            return (
              <Fragment key={def._id}>
                <ListGroupItem
                  onClick={() => toggle(i)}
                  tag="button"
                  action
                  className="font-weight-bold"
                >
                  {words && def.term}
                </ListGroupItem>
                <Collapse isOpen={activeTab === i}>
                  <Card>
                    <CardBody>
                      <div className="d-flex">
                        <ul className="list-group ml-aouto">
                          <div className="list-group-item border-0 p-1">
                            <p>
                              <i className="fas fa-user mr-3"></i>
                              {words && def.created.name}
                            </p>
                          </div>
                          <div className="list-group-item border-0 p-1">
                            <p>
                              <i className="fas fa-at mr-3"></i>
                              {words && def.created.email}
                            </p>
                          </div>
                        </ul>
                        <i
                          className="fas fa-trash-alt ml-auto  mr-2"
                          onClick={() => deleteTerm(def._id)}
                        ></i>
                      </div>
                      <p className="p-2">{words && def.definition[0].title}</p>
                      <a
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={() => approveNewWord(def._id)}
                      >
                        Approve
                      </a>
                    </CardBody>
                  </Card>
                </Collapse>
              </Fragment>
            );
          })}
      </ListGroup>
    </div>
  );
}
