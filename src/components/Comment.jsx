import * as React from "react";
import ReactTextFormat from "react-text-format";
import { imageDecorator } from "./helper";

// Each Comment receives username and comment data from our query to display
function Comment(
  { data } = {
    data: {
      userName: "",
      comment: "",
    },
  },
) {
  const { userName, comment } = data;

  return (
    <div
      style={{
        marginTop: 10,
        borderBottom: "1px solid black",
        paddingBottom: 10,
      }}
    >
      <p style={{ fontWeight: "bold" }}>{userName}</p>
      <ReactTextFormat
        allowedFormats={["URL", "Image"]}
        imageDecorator={imageDecorator}
        style={{ margin: 0 }}
      >
        {comment}
      </ReactTextFormat>
    </div>
  );
}

export default Comment;
