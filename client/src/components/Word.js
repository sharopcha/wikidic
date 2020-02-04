import React, { useState } from "react";
import AddNewDefinition from "./AddNewDefinition";

export default function Word() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="pt-3">
      <div className="card p-3">
        <div className="card-body row">
          <h4 className="card-title ml-3">Thi is the definition</h4>
          {/* TO DO 
            Need to be inplemented when user authenticated
          */}
          <a
            onClick={toggle}
            className="btn btn-outline-success text-right ml-auto"
          >
            New definition
          </a>
          {/* <i className="fas fa-edit text-right ml-auto mr-3"></i>
          <i className="fas fa-trash-alt   mr-3"></i> */}
        </div>
        <AddNewDefinition modal={modal} />
        <div className="definition ml-5 mb-3">
          <div className="card-body">
            <div className="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Inventore, saepe maxime facere rerum provident facilis.
            </div>
          </div>
        </div>
        <div className="definition ml-5 mb-3">
          <div className="card-body">
            <div className="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Inventore, saepe maxime facere rerum provident facilis.
            </div>
          </div>
        </div>
        <p className="text-center mb-1">Related words:</p>
        <div className="text-left ml-5">
          <span className="badge badge-secondary mr-1 p-2">Consectetur.</span>
          <span className="badge badge-secondary mr-1 p-2">Consectetur.</span>
          <span className="badge badge-secondary mr-1 p-2">
            Consectetsaourmur.
          </span>
        </div>
      </div>
    </div>
  );
}
