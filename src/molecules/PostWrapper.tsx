import { BoxProps } from "@mui/material/Box"
import * as React from "react"
import Box from "../atoms/Box"

export default function PostWrapper({ children, ...props }: BoxProps) {
  return (
    <Box
      component="section"
      sx={{
        borderRadius: 5,
        border: `2px solid pink`,
        padding: 2,
        margin: 2,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
