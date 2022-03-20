import * as React from "react"

export const imageDecorator = (decoratedURL, key) => (
  <img
    src={decoratedURL}
    key={key}
    height="100px"
    className="Image"
    alt={decoratedURL}
    style={{ borderRadius: `5%` }}
  />
)
