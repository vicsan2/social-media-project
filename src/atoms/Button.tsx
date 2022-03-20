import * as React from "react"
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button"

export default function Button({
  variant = `contained`,
  ...props
}: MuiButtonProps) {
  return <MuiButton variant={variant} {...props} />
}
