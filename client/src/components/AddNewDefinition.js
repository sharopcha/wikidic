import React, { useState, useEffect } from "react";

export default function AddNewDefinition(props) {
  const [modal, setModal] = useState(false);

  useEffect(
    () => {
      setModal(props.modal);
    }
    //   es-lint-disable-next-line
  );

  return (
    <div className={modal ? "" : "d-none"}>
      <div className="form-group mb-2">
        <label>Add new definition</label>
        <textarea
          name="definition"
          cols="10"
          rows="5"
          className="form-control"
        ></textarea>
      </div>
      <button className="btn btn-secondary m-2">Cancel</button>
      <button className="btn btn-primary m-2 tex-align-righ" type="submit">
        Submit
      </button>
    </div>
  );
}
