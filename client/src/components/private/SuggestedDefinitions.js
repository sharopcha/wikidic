import React, { useState, useContext, useEffect, Fragment } from "react";
import { ListGroup, ListGroupItem, Collapse, Card, CardBody } from "reactstrap";

import WordContext from "../../context/word/wordContext";

export default function SuggestedDefinitions() {
  const [activeTab, setActiveTab] = useState(0);

  const wordContext = useContext(WordContext);
  const { getDefs, suggestDefs } = wordContext;

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getDefs();

    if (suggestDefs === null) {
      return <h5>There is no suggested definitions</h5>;
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-3">
      <ListGroup>
        {suggestDefs !== null &&
          suggestDefs.map((def, i) => {
            console.log(def, i);
            return (
              <Fragment key={def._id}>
                <ListGroupItem onClick={() => toggle(i)} tag="button" action>
                  {suggestDefs && def._id}
                </ListGroupItem>
                <Collapse isOpen={activeTab === i}>
                  <Card>
                    <CardBody>
                      <div className="d-flex">
                        <ul className="list-group ml-aouto">
                          <div className="list-group-item border-0 p-1">
                            <p>
                              <i className="fas fa-user mr-3"></i>
                              {suggestDefs && def.createdBy.firstName}
                            </p>
                          </div>
                          <div className="list-group-item border-0 p-1">
                            <p>
                              <i className="fas fa-at mr-3"></i>
                              {suggestDefs && def.createdBy.email}
                            </p>
                          </div>
                        </ul>
                        <i className="fas fa-trash-alt ml-auto  mr-2"></i>
                      </div>
                      <p className="p-2">{suggestDefs && def.definition}</p>
                      <a className="btn btn-outline-success btn-sm float-right">
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
