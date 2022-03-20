import * as React from "react"
import PostWrapper from "../molecules/PostWrapper"
import Typography from "../atoms/Typography"
import CircularProgress from "../atoms/CircularProgress"

export default function Post({ message = ``, loading = false }) {
  return (
    <PostWrapper>
      {loading && <CircularProgress />}
      {!loading && (
        <Typography sx={{ margin: 0, textAlign: `center` }}>
          {message}
        </Typography>
      )}
    </PostWrapper>
  )
}
