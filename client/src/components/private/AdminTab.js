import React, { useState, useContext } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Badge } from "reactstrap";
import classnames from "classnames";

import WordContext from "../../context/word/wordContext";

import Word from "../Word";
import SuggestedDefinitions from "./SuggestedDefinitions";

const AdminTab = props => {
  const [activeTab, setActiveTab] = useState("1");

  const wordContext = useContext(WordContext);

  const { suggestDefs } = wordContext;

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Definitions
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Suggessted Definitions
            {suggestDefs !== null && suggestDefs.length > 0 && (
              <Badge color="danger" className="ml-2">
                {suggestDefs.length}
              </Badge>
            )}
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Suggessted New Words
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Word />
        </TabPane>
        <TabPane tabId="2">
          <SuggestedDefinitions />
        </TabPane>
        <TabPane tabId="3"></TabPane>
      </TabContent>
    </div>
  );
};

export default AdminTab;
