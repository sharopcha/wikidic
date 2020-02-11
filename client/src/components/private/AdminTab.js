import React, { useState, useContext } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Badge } from "reactstrap";
import classnames from "classnames";

import WordContext from "../../context/word/wordContext";

import Word from "../Word";
import SuggestedDefinitions from "./SuggestedDefinitions";
import SuggestedWords from "./SuggestedWords";

const AdminTab = props => {
  const [activeTab, setActiveTab] = useState("1");
  const wordContext = useContext(WordContext);
  const { suggestDefs, words } = wordContext;

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
            {words !== null &&
              words.filter(i => i.approved === false).length > 0 && (
                <Badge color="danger" className="ml-2">
                  {words.filter(i => i.approved === false).length}
                </Badge>
              )}
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
        <TabPane tabId="3">
          <SuggestedWords />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AdminTab;
