import * as React from "react";
import { Routes as ReactRouter, Route } from "react-router-dom";
import Posts from "./pages/Posts";

function Routes() {
  return (
    <ReactRouter>
      <Route path="/" element={<Posts />} />
    </ReactRouter>
  );
}

export default Routes;
