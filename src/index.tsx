import * as React from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import Routes from "./Routes"
// import reportWebVitals from "./reportWebVitals"

import "./index.css"
import theme from "./theme"

const queryClient = new QueryClient()

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>,
  document.getElementById(`root`)
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
