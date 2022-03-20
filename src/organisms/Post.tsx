import * as React from "react"
import ReactTextFormat from "react-text-format"
import { usePost } from "../contexts/Post"
import Comments from "./Comments"
import { Likes } from "./Likes"
import { imageDecorator } from "./helper"

import PostWrapper from "../molecules/PostWrapper"
import Typography from "../atoms/Typography"
import Button from "../atoms/Button"

// Each post receives a title, username, the content, and an id from our query to display
export default function Post({ title, userName, content, id }: PostData) {
  // assigning variables from function and post context
  const { handleCommentClick, showComments } = usePost()

  return (
    <PostWrapper>
      <Typography fontWeight="bold">{userName}</Typography>
      <div style={{ marginBottom: 10, textDecoration: `underline` }}>
        <Typography fontWeight={700} sx={{ textAlign: `center` }}>
          {title}
        </Typography>
      </div>
      {/* ReactTextFormat formats the text based on it's contents. I only want URLs and Images to be formatted */}
      <ReactTextFormat
        allowedFormats={[`URL`, `Image`]}
        imageDecorator={imageDecorator}
        style={{ margin: 0 }}
      >
        <p style={{ paddingLeft: `1rem` }}>{content}</p>
      </ReactTextFormat>

      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderBottom: `1px solid black`,
        }}
      />
      <div
        style={{
          display: `flex`,
          width: `100%`,
          flexDirection: `row`,
          flexWrap: `wrap`,
        }}
      >
        <div
          style={{
            display: `flex`,
            width: `50%`,
            flex: 1,
            flexBasis: `5%`,
            flexDirection: `column`,
          }}
        >
          {/* Button displays comments on request */}
          <Button variant="outlined" onClick={handleCommentClick}>
            Comments
          </Button>
        </div>
        <div
          style={{
            fontSize: `1.2rem`,
            display: `flex`,
            width: `50%`,
            flex: 1,
            flexBasis: `50%`,
            justifyContent: `flex-end`,
          }}
        >
          {/* Show us the likes for this post ID */}
          <Likes id={id} />
        </div>
      </div>
      <div style={{ width: `100%` }}>
        {showComments && <Comments id={id} />}
      </div>
    </PostWrapper>
  )
}
