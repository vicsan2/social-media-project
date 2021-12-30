import * as React from "react";

function Post({ message }) {
  return (
    <div
      style={{
        borderRadius: 15,
        maxWidth: 320,
        margin: "10px auto",
        border: "2px solid pink",
        padding: 10,
      }}
    >
      <p style={{ margin: 0, textAlign: "center" }}>{message}</p>
    </div>
  );
}

export default Post;
