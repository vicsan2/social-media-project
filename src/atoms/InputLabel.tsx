import * as React from "react"
import MuiInputLabel from "@mui/material/InputLabel"
import type { InputLabelProps } from "@mui/material/InputLabel"

export default function InputLabel({
  children = ``,
  ...props
}: InputLabelProps) {
  return (
    <MuiInputLabel {...props}>
      <strong>{children}</strong>
    </MuiInputLabel>
  )
}
