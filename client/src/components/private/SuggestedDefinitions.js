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
              <div className="d-flex">
                <ul className="list-group ml-aouto">
                  <div className="list-group-item border-0 p-1">
                    <p>
                      <i className="fas fa-user mr-3"></i>
                      Azizmatov Sharofiddin
                    </p>
                  </div>
                  <div className="list-group-item border-0 p-1">
                    <p>
                      <i className="fas fa-at mr-3"></i>
                      sharopcha1202@gmail.com
                    </p>
                  </div>
                </ul>
                <i className="fas fa-trash-alt ml-auto mr-2"></i>
              </div>
              <p className="p-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Accusantium saepe, rem tempore, nisi quis distinctio et fugiat
                repellat error consequuntur libero aliquam porro perferendis.
                Atque, et! Harum libero unde modi.
              </p>
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
