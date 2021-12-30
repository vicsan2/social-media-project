import * as React from "react";
import ReactTextFormat from "react-text-format";
import { usePost } from "../contexts/Post";
import Comments from "./Comments";
import { Likes } from "./Likes";
import { imageDecorator } from "./helper";

// Each post receives a title, username, the content, and an id from our query to display
function Post(
  { data } = {
    data: {
      title: "",
      userName: "",
      content: "",
      id: "",
    },
  },
) {
  // assigning variables from function and post context
  const { handleCommentClick, showComments } = usePost();
  const { title, userName, content, id } = data;

  return (
    <div
      style={{
        borderRadius: 15,
        maxWidth: 320,
        margin: "10px auto",
        border: "2px solid pink",
        padding: 10,
        overflow: "auto",
        overflowWrap: "break-word",
      }}
    >
      <p style={{ fontWeight: "bold" }}>{userName}</p>
      <div style={{ marginBottom: 10, textDecoration: "underline" }}>
        <p style={{ fontWeight: 700, textAlign: "center" }}>{title}</p>
      </div>
      {/* ReactTextFormat formats the text based on it's contents. I only want URLs and Images to be formatted */}
      <ReactTextFormat
        allowedFormats={["URL", "Image"]}
        imageDecorator={imageDecorator}
        style={{ margin: 0 }}
      >
        <p style={{ paddingLeft: "1rem" }}>{content}</p>
      </ReactTextFormat>

      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderBottom: "1px solid black",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "50%",
            flex: 1,
            flexBasis: "5%",
            flexDirection: "column",
          }}
        >
          {/* Button displays comments on request */}
          <button type="button" onClick={handleCommentClick}>
            Comments
          </button>
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            display: "flex",
            width: "50%",
            flex: 1,
            flexBasis: "50%",
            justifyContent: "flex-end",
          }}
        >
          {/* Show us the likes for this post ID */}
          <Likes id={id} />
        </div>
      </div>
      <div>{showComments && <Comments id={id} />}</div>
    </div>
  );
}

export default Post;
