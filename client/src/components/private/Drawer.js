import React, { Fragment, useState, useContext } from "react";
import { ListGroup, ListGroupItem, Collapse, Card, CardBody } from "reactstrap";
import WordContext from "../../context/word/wordContext";

export default function Drawer({ word }) {
  const [activeTab, setActiveTab] = useState(0);
  const wordContext = useContext(WordContext);

  const { deleteDefSuggestion, approveDefinition } = wordContext;

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // const onDelete = id => {
  //   console.log(id);
  //   deleteDefSuggestion(id);
  // };

  return (
    <div>
      <ListGroup>
        {word !== null &&
          word.map((def, i) => {
            // console.log(def, i);
            return (
              <Fragment key={def._id}>
                <ListGroupItem
                  onClick={() => toggle(i)}
                  tag="button"
                  action
                  className="font-weight-bold"
                >
                  {word && def.term}
                </ListGroupItem>
                <Collapse isOpen={activeTab === i}>
                  <Card>
                    <CardBody>
                      <div className="d-flex">
                        <ul className="list-group ml-aouto">
                          <div className="list-group-item border-0 p-1">
                            <p>
                              <i className="fas fa-user mr-3"></i>
                              {word && def.createdBy.name}
                            </p>
                          </div>
                          <div className="list-group-item border-0 p-1">
                            <p>
                              <i className="fas fa-at mr-3"></i>
                              {word && def.createdBy.email}
                            </p>
                          </div>
                        </ul>
                        <i
                          className="fas fa-trash-alt ml-auto  mr-2"
                          onClick={() => deleteDefSuggestion(def._id)}
                        ></i>
                      </div>
                      <p className="p-2">{word && def.definition}</p>
                      <a
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={() => approveDefinition(def._id)}
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
