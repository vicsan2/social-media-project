import * as React from "react"
import Box from "../atoms/Box"
import Posts from "./Posts"
import PostUser from "./PostUser"

export default function Index() {
  return (
    <Box sx={{ maxWidth: 640, margin: `10px auto` }}>
      <PostUser />
      <Posts />
    </Box>
  )
}
