import React, { useState } from "react";
import { ListGroup, ListGroupItem, Collapse, Card, CardBody } from "reactstrap";

export default function SuggestedDefinitions() {
  const [activeTab, setActiveTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
    setIsOpen(true);
  };

  //   const toggle = () => {
  //     setIsOpen(!isOpen);
  //   };

  return (
    <div className="container mt-3">
      <ListGroup>
        <ListGroupItem onClick={() => toggle(1)} tag="button" action>
          Cras justo odio
        </ListGroupItem>
        <Collapse isOpen={activeTab === 1}>
          <Card>
            <CardBody>
              1 Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </CardBody>
          </Card>
        </Collapse>
        <ListGroupItem onClick={() => toggle(2)} tag="button" action>
          Dapibus ac facilisis in
        </ListGroupItem>
        <Collapse isOpen={activeTab === 2}>
          <Card>
            <CardBody>
              2 Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </CardBody>
          </Card>
        </Collapse>
      </ListGroup>
    </div>
  );
}
