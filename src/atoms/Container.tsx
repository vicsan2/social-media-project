import * as React from "react"
import MuiContainer from "@mui/material/Container"
// import { ContainerProps as MuiContainerProps } from "@mui/material"

// export interface ContainerProps extends MuiContainerProps {}

export default function Container({ children, ...props }: any) {
  return (
    <MuiContainer maxWidth="xl" {...props}>
      {children}
    </MuiContainer>
  )
}
