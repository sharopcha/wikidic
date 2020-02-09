import React from "react";
import WordList from "../WordList";
import AdminTab from "../private/AdminTab";

export default function AdminArea() {
  return (
    <div className="row">
      <div className="col-5 ">
        <WordList />
      </div>
      <div className="col-7 ">
        <AdminTab />
      </div>
    </div>
  );
}
