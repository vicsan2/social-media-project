import * as React from "react";

export const imageDecorator = (decoratedURL, key) => (
  <div>
    <img
      src={decoratedURL}
      key={key}
      width="100%"
      margin="1rem"
      className="Image"
      alt={decoratedURL}
      style={{ borderRadius: "2%" }}
    />
  </div>
);